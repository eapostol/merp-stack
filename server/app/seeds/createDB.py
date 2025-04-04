import sys
import os
import asyncio

# Dynamically add the project root directory to sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "../../"))
if PROJECT_ROOT not in sys.path:
    sys.path.append(PROJECT_ROOT)


from motor.motor_asyncio import AsyncIOMotorClient
from app.config.connection import MONGODB_URI

async def create_database(db_name="exampleDB"):
    """
    Check if the specified database exists, and create it if it does not.

    Args:
        db_name (str): The name of the database to check/create.
    """
    try:
        # Connect to the MongoDB server
        client = AsyncIOMotorClient(MONGODB_URI)

        # List existing databases
        existing_dbs = await client.list_database_names()

        if db_name in existing_dbs:
            print(f"Database '{db_name}' already exists.")
        else:
            # Create the database by inserting a dummy collection and deleting it
            db = client[db_name]
            await db.create_collection("dummy_collection")
            await db["dummy_collection"].drop()
            print(f"Database '{db_name}' created successfully.")

        # Close the connection
        client.close()

    except Exception as error:
        print(f"Error creating database '{db_name}':", error)
        raise

# Allow the script to be run directly or imported
if __name__ == "__main__":
    # Run the create_database function with the default database name
    asyncio.run(create_database())