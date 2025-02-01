from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field, ConfigDict
from pymongo import MongoClient
from bson import ObjectId
from pydantic import GetCoreSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core.core_schema import CoreSchema, str_schema
from datetime import datetime, timedelta
import google.generativeai as genai
import os
import jwt
import json
import re
import math
import uvicorn
from typing import List, Optional

# Configuration 
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
JWT_SECRET = os.getenv("JWT_SECRET", "admin_secret_123")
SCHEMES_FILE = "government-schemes.json"

# Initialize Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# MongoDB Setup
client = MongoClient(MONGO_URI)
db = client["government_portal"]
users_collection = db["users"]
chat_collection = db["chat_history"]
complaints_collection = db["complaints"]
schemes_collection = db["schemes"]

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://scheme-ai.vercel.app/"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------- UTILS ---------------------------

class PyObjectId(str):
    """Custom Pydantic class to handle MongoDB's ObjectId in Pydantic v2."""

    @classmethod
    def __get_pydantic_core_schema__(cls, *args, **kwargs) -> CoreSchema:
        return str_schema()  # Convert ObjectId to a string

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema: CoreSchema, handler: GetCoreSchemaHandler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema

    @classmethod
    def __get_validators__(cls):
        """Ensure ObjectId is properly validated and converted to string."""
        yield cls.validate

    @classmethod
    def validate(cls, v, info):
        """Convert ObjectId to string for JSON serialization."""
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return v
        raise ValueError("Invalid ObjectId")

# --------------------------- MODELS ---------------------------

class UserQuery(BaseModel):
    unique_id: str
    message: str

class ComplaintRequest(BaseModel):
    mobile: str
    address: str
    message: str

class UserResponse(BaseModel):
    unique_id: str
    message: str
    timestamp: datetime

class AdminLogin(BaseModel):
    username: str
    password: str
    
class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  
    DOB: Optional[str] = None
    DOBVerified: Optional[str] = None
    DOBVerifiedSource: Optional[str] = None
    scheme: Optional[str] = None
    pension_ID: Optional[int] = None
    AGE: Optional[int] = None
    Contact_Department: Optional[str] = Field(None, alias="Contact Department") 
    UniqueID: Optional[str] = None
    income_greater_than: Optional[float] = None  
    income_less_than: Optional[float] = None 

    class Config:
        from_attributes = True
        populate_by_name = True  
        json_encoders = {datetime: lambda dt: dt.isoformat()}

# --------------------------- AI SERVICE ---------------------------

class AIService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.system_prompt = """
        You are a government assistant specialized in providing information about social welfare schemes.

        **Handling General Queries:**
        - If the user asks a general question about government schemes, provide an overview of all available schemes.
        - Do NOT ask for personal details (income, age, job) in this case.
        - Example general questions:
          - "What government schemes are available?"
          - "Tell me about welfare programs."

        **Handling User-Specific Queries:**
        - If the user asks about their **eligibility** for schemes, analyze their **income, age, and job**.
        - If any of these details are missing, ask for them before determining eligibility.
        - Do NOT ask for Aadhaar number or full name.

        **Format your response in strict JSON format:**
        ```json
        {
            "response": "Provide a clear answer based on the user's query.",
            "next_question": "Ask for missing details only if required.",
            "requires_info": ["income", "age", "job"],
            "schemes": ["Scheme Name 1", "Scheme Name 2"]
        }
        ```
        """

    def load_schemes(self):
        """Load schemes from the JSON file."""
        try:
            with open("government-schemes.json", "r") as file:
                return json.load(file).get("schemes", [])
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error loading schemes: {str(e)}")

    def determine_query_type(self, message):
        """Determine if the query is general or user-specific."""
        general_keywords = ["all schemes", "list of schemes", "government programs", "available schemes"]
        return any(keyword in message.lower() for keyword in general_keywords)

    def generate_response(self, user_data: dict, chat_history: list, message: str):
        try:
            schemes_data = self.load_schemes()  # Load schemes
            is_general_query = self.determine_query_type(message)

            if is_general_query:
                llm_prompt = [
                    self.system_prompt,
                    "User is asking a general question about all available government schemes.",
                    f"Available Schemes: {json.dumps(self.convert_objectid(schemes_data), indent=2)}",
                    f"User's latest query: {message}"
                ]
            else:
                llm_prompt = [
                    self.system_prompt,
                    f"User Profile: {json.dumps(self.convert_objectid(user_data), indent=2)}",
                    f"Available Schemes: {json.dumps(self.convert_objectid(schemes_data), indent=2)}",
                    f"Conversation History: {json.dumps(self.convert_objectid(chat_history), indent=2)}",
                    f"User's latest query: {message}"
                ]

            response = self.model.generate_content(llm_prompt)

            # Extract response text correctly
            if not response or not response.candidates:
                raise ValueError("Empty response from Gemini API")

            raw_text = response.candidates[0].content.parts[0].text

            # Remove markdown-style code block (```json ... ```)
            json_match = re.search(r"```json\n(.*?)\n```", raw_text, re.DOTALL)

            if json_match:
                cleaned_json = json_match.group(1)  # Extract JSON content
            else:
                raise ValueError("No valid JSON found in AI response")

            return json.loads(cleaned_json)

        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"AI Response Error: Invalid JSON - {str(e)}")
        except ValueError as e:
            raise HTTPException(status_code=500, detail=f"AI Service Error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Gemini API Failure: {str(e)}")

    def convert_objectid(self, data):
        """Recursively convert ObjectId, datetime, and NaN fields in nested data structures."""
        if isinstance(data, list):
            return [self.convert_objectid(item) for item in data]
        elif isinstance(data, dict):
            return {key: self.convert_objectid(value) for key, value in data.items()}
        elif isinstance(data, ObjectId):
            return str(data)  
        elif isinstance(data, datetime):
            return data.isoformat() 
        elif isinstance(data, float) and math.isnan(data):
            return None  
        elif isinstance(data, str) and data.lower() == "nan":
            return None  
        return data

# --------------------------- CORE ENDPOINTS ---------------------------

@app.get("/")
def home():
    return {"RUNNING!"}

@app.post("/start-chat/")
async def chat_interaction(query: UserQuery):
    user = users_collection.find_one({"_id": ObjectId(query.unique_id) if ObjectId.is_valid(query.unique_id) else None})

    if user:
        user = {**user, "_id": str(user["_id"])} 
        user = User.model_validate(user)

    if not user:
        user = User()
        users_collection.insert_one(user.model_dump(by_alias=True))

    chat_entry = {
        "user_id": user.id,
        "message": query.message,
        "timestamp": datetime.now()
    }
    chat_collection.insert_one(chat_entry)

    history = list(chat_collection.find(
        {"user_id": user.id},
        {"_id": 0, "message": 1, "timestamp": 1}
    ).sort("timestamp", -1).limit(10))

    ai_service = AIService()
    response = ai_service.generate_response(user.model_dump(by_alias=True), history, query.message)
    
    chat_collection.insert_one({
        "user_id": user.id,
        "message": response,
        "is_bot": True,
        "timestamp": datetime.now()
    })

    return {
        "unique_id": str(user.id),
        "response": response,
        "requires_action": bool(response.get('requires_info'))
    }

@app.post("/raise-complaint/")
async def raise_complaint(request: ComplaintRequest):
    complaint = {
        "_id": ObjectId(),
        "mobile": request.mobile,
        "address": request.address,
        "message": request.message,
        "status": "pending",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    complaints_collection.insert_one(complaint)
    return {"complaint_id": str(complaint["_id"])}

# --------------------------- ADMIN ENDPOINTS ---------------------------

@app.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    if credentials.username == "admin" and credentials.password == "securepassword":
        token = jwt.encode({
            "role": "admin",
            "exp": datetime.utcnow() + timedelta(hours=8)
        }, JWT_SECRET)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

def verify_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if payload.get("role") == "admin":
            return payload
        raise HTTPException(status_code=403, detail="Access forbidden: Admins only")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')