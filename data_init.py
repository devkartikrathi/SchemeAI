import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
SCHEMES_FILE = "government-schemes.json"
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DATABASE_NAME = "government_portal"
COLLECTION_NAME = "schemes"

def load_schemes_to_mongodb():
    """Load schemes from JSON file to MongoDB collection"""
    
    try:
        # Read JSON file
        with open(SCHEMES_FILE, "r") as file:
            data = json.load(file)
            schemes = data.get("schemes", [])
        
        if not schemes:
            print("No schemes found in the JSON file")
            return

        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]

        # Check if collection is empty
        if collection.count_documents({}) == 0:
            # Insert all schemes
            result = collection.insert_many(schemes)
            print(f"Successfully inserted {len(result.inserted_ids)} schemes")
        else:
            print("Collection already contains data. No insertion performed.")

        # Create index on scheme name
        collection.create_index("schemeName", unique=True)
        print("Created index on 'schemeName'")

    except FileNotFoundError:
        print(f"Error: JSON file '{SCHEMES_FILE}' not found")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{SCHEMES_FILE}'")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        if 'client' in locals():
            client.close()

if __name__ == "__main__":
    load_schemes_to_mongodb()