from fastapi import FastAPI
from ariadne.asgi import GraphQL
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.user import User
from app.graphql.schema import schema

# add test route
from app.routes.hello import router as hello_router

app = FastAPI()

@app.on_event("startup")
async def init_db():
    """
    Initialize the database connection and configure Beanie with the User model.
    """
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(database=client.db_name, document_models=[User])

    # Perform a test query during startup
    await test_query()

async def test_query():
    """
    Perform a test query to verify the database connection.
    """
    try:
        # Count the number of documents in the User collection
        user_count = await User.find_all().count()
        print(f"Test Query: Number of users in the database: {user_count}")
    except Exception as e:
        print("Test Query Error:", e)

app.mount("/graphql", GraphQL(schema, debug=True))
app.include_router(hello_router, prefix="/api")