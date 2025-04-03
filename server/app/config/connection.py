import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv
from app.models.user import User  # Import your models here

# Load environment variables from .env file
load_dotenv()

# Get MongoDB connection details from environment variables
MONGO_URL = os.getenv("MONGO_URL")
MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")

# Create the MongoDB URI
MONGODB_URI = f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_URL.split('://')[1]}"

async def init_db():
    """
    Initialize the database connection and register Beanie models.
    """
    try:
        # Create a Motor client
        client = AsyncIOMotorClient(MONGODB_URI)

        # Initialize Beanie with the database and models
        await init_beanie(database=client.get_default_database(), document_models=[User])

        print("Database connected.")
    except Exception as e:
        print("Database connection error:", e)
        raise RuntimeError("Database connection failed.")