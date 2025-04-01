from beanie import Document
from pydantic import EmailStr
from typing import Optional

class User(Document):
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None

    class Settings:
        name = "users"
