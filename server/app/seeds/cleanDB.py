"""
This script is used to clean the database by removing all data from specified
models. It is particularly useful for resetting the database during 
development or testing.

This file can be run directly from the command line 
or imported into other scripts.

When run directly, it will clean the User model by default.
To execute the script, use the following command:

python -m app.seeds.cleanDB

from the server folder.
"""
import sys
import os

# Dynamically add the project root directory to sys.path
# this code has to be here to 
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "../../"))
if PROJECT_ROOT not in sys.path:
    sys.path.append(PROJECT_ROOT)


import asyncio
from app.config.connection import init_db
from app.models.index import User

async def clean_db(models=None):
    """
    Clean the database by clearing data from the specified models.
    If no models are provided, it defaults to clearing the User model.

    Args:
        models (list): A list of Beanie models to clear. Defaults to [User].
    """
    try:
        print("...initializing connection to the mongoDB server and database.")
        # Initialize the database connection
        await init_db()
        print("...connection to the mongoDB server and database initialized.")

        # Default to clearing the User model if no models are specified
        if models is None:
            print("...No models provided. Defaulting to cleaning User model.")
            models = [User]

        # Iterate through the models and clear their data
        for model in models:
            # Check if the model is a Beanie document model
            if not hasattr(model, "delete_all"):
                notBeanieMsg=f"{model.__name__} is not a Beanie document model."
                raise ValueError(notBeanieMsg)
            
            await model.delete_all()
            print(f"...{model.__name__} collection cleaned.")
            print("*** End cleaning the database ***")

    except Exception as error:
        print("Error cleaning collections:", error)
        raise

# Allow the script to be run directly or imported
if __name__ == "__main__":
    print("*** Cleaning the database ***")
    # Run the clean_db function with default behavior (clearing User model)
    asyncio.run(clean_db())