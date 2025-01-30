from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from crew import SchemeAICrew
from pymongo import MongoClient
import json

app = FastAPI()
crew = SchemeAICrew()

MONGO_URI = "mongodb+srv://test:testPassword@cluster0.5rend.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DATABASE_NAME = "government_portal"
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
complaints_collection = db["complaints"]

# Pydantic Models for Input Validation
class QueryRequest(BaseModel):
    user_id: str
    user_query: str

class MissingInfoResponse(BaseModel):
    user_id: str
    field_name: str
    field_value: str
    
class MyJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o) # this will return the ID as a string
        return json.JSONEncoder.default(self, o)


@app.get("/query_scheme/")
async def query_scheme(request: QueryRequest):
    try:
        user_id = request.user_id
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    response = users_collection.find_one({"_id": ObjectId(user_id)})
    return MyJSONEncoder().encode(response)

@app.post("/query_scheme/")
async def query_scheme(request: QueryRequest):
    try: 
        user_id = request.user_id
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    response = crew.process_user_query(user_id, request.user_query)
    return MyJSONEncoder().encode(response)

@app.post("/respond_missing_info/")
async def respond_missing_info(response: MissingInfoResponse):
    try:
        user_id = ObjectId(response.user_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    user = users_collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    users_collection.update_one({"_id": user_id}, {"$set": {response.field_name: response.field_value}})

    complaints_collection.update_one(
        {"user_id": user_id, "type": "Missing Information"},
        {"$set": {"status": "Resolved"}}
    )

    return {"message": f"{response.field_name} updated successfully. Complaint resolved."}
