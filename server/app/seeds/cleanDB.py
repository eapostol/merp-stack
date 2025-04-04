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
        # Initialize the database connection
        await init_db()

        # Default to clearing the User model if no models are specified
        if models is None:
            models = [User]

        # Iterate through the models and clear their data
        for model in models:
            await model.delete_all()
            print(f"{model.__name__} collection cleaned.")

    except Exception as error:
        print("Error cleaning collections:", error)
        raise

# Allow the script to be run directly or imported
if __name__ == "__main__":
    # Run the clean_db function with default behavior (clearing User model)
    asyncio.run(clean_db())