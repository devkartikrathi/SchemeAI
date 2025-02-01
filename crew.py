from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from pymongo import MongoClient
import json
from bson import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_NAME = "government_portal"
client = MongoClient(os.getenv('MONGO_URI'))
db = client[DATABASE_NAME]
users_collection = db["users"]
complaints_collection = db["complaints"]

@CrewBase
class SchemeAICrew:
    """SchemeAI Crew Configuration"""

    @agent
    def scheme_advisor(self) -> Agent:
        return Agent(
            config=self.agents_config['scheme_advisor'],
            llm = LLM(
                model="gemini/gemini-1.5-flash-latest",
                temperature=0.7
            ),
            verbose=True
        )

    @task
    def eligibility_check_task(self) -> Task:
        return Task(
            config=self.tasks_config['eligibility_check_task'],
        )

    @crew
    def crew(self) -> Crew:
        """Creates the SchemeAI crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )

    def process_user_query(self, user_id, query):
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"error": "User not found. Please provide a valid Unique ID."}

        missing_fields = []
        if "DOB" not in user or not user["DOB"]:
            missing_fields.append("Date of Birth")
        if "income_less_than" not in user or not user["income_less_than"]:
            missing_fields.append("Income Range")

        if missing_fields:
            missing_info_text = f"Your profile is missing: {', '.join(missing_fields)}. Please provide these details."
            self.raise_complaint(user_id, "Missing Information", missing_fields)
            return {"message": missing_info_text}

        schemes_data = self.load_schemes()
        
        b = "{" + ", ".join(f"'{k}': {v}" for k, v in user.items()) + "}"
        t = ""
        for scheme in schemes_data:
            t += "{" + ", ".join(f"'{k}': {v}" for k, v in scheme.items()) + "}"

        response = self.crew().kickoff({
            "query": query,
            "user_data": b,
            "schemes": t
        })
        if response.json_dict:
            response = json.dumps(response.json_dict)
        else: 
            response = response.raw
            response = self.remove_json_delimiters(response)
        return response

    def remove_json_delimiters(self, response_text):

        start_index = response_text.find("```json") + len("```json") 

        end_index = response_text.find("```", start_index)

        return response_text[start_index:end_index]

    def load_schemes(self):
        """Load government schemes from a JSON file."""
        SCHEMES_FILE = "government-schemes.json"
        with open(SCHEMES_FILE, "r") as file:
            return json.load(file)["schemes"]

    def raise_complaint(self, user_id, issue_type, missing_fields):
        """Raises a complaint for admin verification."""
        complaint = {
            "user_id": user_id,
            "type": issue_type,
            "description": f"Missing fields: {', '.join(missing_fields)}",
            "date": datetime.utcnow().isoformat(),
            "status": "Pending"
        }
        complaints_collection.insert_one(complaint)
        return {"message": "Complaint raised for missing information. Admin will verify and update your profile."}
