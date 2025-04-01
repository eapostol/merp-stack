from fastapi import FastAPI
from ariadne.asgi import GraphQL
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.user import User
from app.graphql.schema import schema

app = FastAPI()

@app.on_event("startup")
async def init_db():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(database=client.db_name, document_models=[User])

app.mount("/graphql", GraphQL(schema, debug=True))
