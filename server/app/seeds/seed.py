import asyncio
import json
import os
from app.config.connection import init_db
from app.models.index import User
from app.seeds.cleanDB import clean_db

# Get the path to the current directory (where seed.py is located)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Construct the relative path to userseeds.json
USER_SEEDS_PATH = os.path.join(CURRENT_DIR, "userseeds.json")

async def seed_database():
    """
    Seed the database with initial data.
    """
    try:
        # Initialize the database connection
        await init_db()

        # Check if the User model exists and clean out the data if it does
        if await User.exists() and await User.count_documents({}) > 0:
            await clean_db()

        # Load seed data from the JSON file
        with open(USER_SEEDS_PATH, "r") as file:
            user_data = json.load(file)

        # Insert seed data into the User collection
        users = [User(**user) for user in user_data]
        await User.insert_many(users)

        print("Seeding completed successfully!")
    except Exception as error:
        print("Error seeding database:", error)
        raise

# Allow the script to be run directly or imported
if __name__ == "__main__":
    asyncio.run(seed_database())