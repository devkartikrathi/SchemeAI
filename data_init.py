
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import json

uri = "mongodb+srv://test:testPassword@cluster0.5rend.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

MONGO_URI = "mongodb+srv://test:testPassword@cluster0.5rend.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
DATABASE_NAME = "government_portal"
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
complaints_collection = db["complaints"]

user = users_collection.find_one({"_id": ObjectId("6798fcac6dc00c08c0710beb")})

# print(user)



SCHEMES_FILE = "government-schemes.json"
with open(SCHEMES_FILE, "r") as file:
    schemes = (json.load(file)["schemes"])
t = ""

for scheme in schemes:
    t += "{" + ", ".join(f"'{k}': {v}" for k, v in scheme.items()) + "}"
    
print(type(t))

response = 
```json
{
  "eligibleSchemes": [
    {
      "slNo": 5,
      "department": "Information, Public Relations and Languages Department",
      "schemeName": "Mukhyamantri Tirth Yatra Yojana",
      "annualIncomeCriteria": "Upto 1.80 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 6,
      "department": "Education Department",
      "schemeName": "Chirau Yojna(Previous section 134 A)",
      "annualIncomeCriteria": "Upto 1.80 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 7,
      "department": "Health Services Department",
      "schemeName": "PMJAY Ayushman Bharat Health Card",
      "annualIncomeCriteria": "Upto 1.80 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 8,
      "department": "Food & Supplies Department",
      "schemeName": "BPL Ration Card",
      "annualIncomeCriteria": "Upto 1.80 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 9,
      "department": "Social Justice & Empowerment",
      "schemeName": "National family benefits scheme for BPL families",
      "annualIncomeCriteria": "Upto 1.80 Lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 10,
      "department": "Welfare of SCs & BCs",
      "schemeName": "Dr B.R Ambedkar Awas Navinikaran Yojna",
      "annualIncomeCriteria": "Upto 1.80 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 11,
      "department": "Social Justice & Empowerment",
      "schemeName": "Financial Assistance to Destitute Child",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    },
    {
      "slNo": 12,
      "department": "Social Justice & Empowerment",
      "schemeName": "Ladli Yojna",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Potentially Eligible",
      "message": "Further information may be required to determine eligibility for this scheme based on other criteria."
    },
    {
      "slNo": 13,
      "department": "Social Justice & Empowerment",
      "schemeName": "Old Age Pension Scheme",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Potentially Eligible",
      "message": "Further information may be required to determine eligibility for this scheme based on other criteria."
    },
    {
      "slNo": 14,
      "department": "Social Justice & Empowerment",
      "schemeName": "Widow & Destitute Women Pension",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Not Eligible",
      "message": "Based on the provided data, this scheme is not applicable."
    },
    {
      "slNo": 15,
      "department": "Social Justice & Empowerment",
      "schemeName": "Bona Bhata",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Potentially Eligible",
      "message": "Further information may be required to determine eligibility for this scheme based on other criteria."
    },
    {
      "slNo": 16,
      "department": "Social Justice & Empowerment",
      "schemeName": "Financial Assistance to Widower and Unmarried Persons",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Not Eligible",
      "message": "Based on the provided data, this scheme is not applicable."
    },
    {
      "slNo": 17,
      "department": "Social Justice & Empowerment",
      "schemeName": "Disability Pension",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Potentially Eligible",
      "message": "Further information may be required to determine eligibility for this scheme based on other criteria."
    },
    {
      "slNo": 18,
      "department": "Welfare of SCs & BCs",
      "schemeName": "Mukhyamantri Vivah Shagun Yojana",
      "annualIncomeCriteria": "Upto 3.00 lack",
      "eligibilityStatus": "Potentially Eligible",
      "message": "Further information may be required to determine eligibility for this scheme based on other criteria."
    },
    {
      "slNo": 19,
      "department": "Haryana Parivar Suraksha Nyas",
      "schemeName": "Deen Dayal Upadyay Antodya Parivar Suraksha Yojna",
      "annualIncomeCriteria": "Upto 5 lack",
      "eligibilityStatus": "Eligible",
      "message": "Your income falls within the eligibility criteria."
    }
  ],
  "message": "What schemes am I eligible for?"
}
```