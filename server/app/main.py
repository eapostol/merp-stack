from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from ariadne.asgi import GraphQL
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.user import User
from app.graphql.schema import schema

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.routes.hello import router as hello_router


class LogRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print(f"Incoming request: {request.method} {request.url}")
        response = await call_next(request)
        return response

app = FastAPI(
    docs_url=None,  # Disable Swagger docs if not needed
    redoc_url=None,  # Disable ReDoc if not needed
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],  # Allow all origins (use specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LogRequestMiddleware)

@app.options("/graphql")
async def graphql_options(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.on_event("startup")
async def init_db():
    """
    Initialize the database connection and configure Beanie with the User model.
    """
    print("Connecting to the database...")
    client = AsyncIOMotorClient("mongodb://localhost:27017/exampleDB")
    db = client["exampleDB"]  # Explicitly reference the database
    print(f"Connected to database: {db.name}")

    await init_beanie(database=db, document_models=[User])

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

# Wrap the GraphQL app with CORS middleware
graphql_app = CORSMiddleware(
    GraphQL(schema, debug=True),
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Allow only the React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/graphql/", graphql_app)

# include REST request routes
app.include_router(hello_router, prefix="/api")