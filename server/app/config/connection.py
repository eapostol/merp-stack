import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv
from app.models.user import User  # Import your models here

"""
This file can be run in the terminal from the ./server folder to test the
connection to the database. The command to use would be

python -m app.config.connection

notice app refers to the app folder from the server folder.
config refers to the config folder from the app folder.
connection refers to this file.
This is because the server folder is the root of the project.
"""

# Load environment variables from .env file
load_dotenv()

# Get MongoDB connection details from environment variables
MONGO_URL = os.getenv("MONGO_URL")
MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
DATABASE_NAME =  os.getenv("MONGO_DBNAME") or "exampleDB"  # Specify the database name

print ("*** connecting to the database ***")
print("The name of the database to connect to is " + DATABASE_NAME)

# Create the MongoDB URI
if MONGO_USERNAME and MONGO_PASSWORD:
    # Use credentials if provided
    MONGODB_URI = f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_URL.split('://')[1]}/{DATABASE_NAME}"
else:
    # Omit credentials for local MongoDB
    MONGODB_URI = f"{MONGO_URL}/{DATABASE_NAME}"

print("The URI to connect with is " + MONGODB_URI)

async def init_db():
    """
    Initialize the database connection and register Beanie models.
    """
    try:
        # Create a Motor client
        client = AsyncIOMotorClient(MONGODB_URI)

        # Initialize Beanie with the database and models
        await init_beanie(database=client.get_default_database(), document_models=[User])

        print("...Database connected.")
        print ("*** end connecting to the database ***")
    except Exception as e:
        print("...Database connection error:", e)
        print ("*** end connecting to the database ***")
        raise RuntimeError("Database connection failed.")

    

async def test_connection():
    """
    Test the database connection and ensure the database is created only if it does not exist.
    """
    try:
        # Create a Motor client
        client = AsyncIOMotorClient(MONGODB_URI)

        # Check if the database already exists by listing its collections
        db = client[DATABASE_NAME]
        collections = await db.list_collection_names()

        if collections:
            print(f"Database '{DATABASE_NAME}' already exists and is active with collections: {collections}.")
        else:
            # Ensure the database is created by adding a dummy collection
            dummy_collection = db["dummy_collection"]
            await dummy_collection.insert_one({"dummy_key": "dummy_value"})
            print(f"Dummy collection created in database '{DATABASE_NAME}'.")

            # Confirm the database is now active
            collections = await db.list_collection_names()
            if collections:
                print(f"Database '{DATABASE_NAME}' is now active and ready to use with collections: {collections}.")
            else:
                print(f"Failed to activate database '{DATABASE_NAME}'.")

            # Clean up by deleting the dummy collection
            await dummy_collection.drop()
            print(f"Dummy collection removed from database '{DATABASE_NAME}'.")

        print("*** end connecting to the database ***")

    except Exception as e:
        print("Database connection error:", e)
        raise RuntimeError("Database connection failed.")
    
if __name__ == "__main__":
    import asyncio
    asyncio.run(test_connection())