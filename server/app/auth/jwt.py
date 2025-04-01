from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    authjwt_secret_key: str = os.getenv("JWT_SECRET")

@AuthJWT.load_config
def get_config():
    return Settings()
