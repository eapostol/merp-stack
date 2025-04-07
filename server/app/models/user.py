from beanie import Document, before_event
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from passlib.hash import bcrypt

class User(Document):
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    first_name: str
    middle_initial: Optional[str] = None
    last_name: str
    date_created: datetime
    last_modified: datetime

    class Settings:
        name = "users"

    def populate_full_name(self, first_name: str, last_name: str, middle_initial: Optional[str] = None) -> str:
        """
        Constructs and returns the full name of the user by combining the 
        `first_name`, `middle_initial` (if present), and `last_name`.

        Args:
            first_name (str): The first name of the user.
            last_name (str): The last name of the user.
            middle_initial (Optional[str]): The middle initial of the user.

        Returns:
            str: The constructed full name.
        """
        if middle_initial:
            return f"{first_name} {middle_initial}. {last_name}"
        return f"{first_name} {last_name}"

@before_event("insert")
async def set_creation_date_and_encrypt_password(self):
    """
    Automatically set the `date_created` and `last_modified` fields
    when a new document is inserted, encrypt the password, and populate the full name,
    but only if the required properties exist in the object.
    """
    print("*** in model user: set_creation_date_and_encrypt_password ***")

    # Check if the required properties exist in the object
    if hasattr(self, "first_name") and hasattr(self, "last_name") and hasattr(self, "hashed_password"):
        current_time = datetime.utcnow()  # Use UTC for standard database storage
        self.date_created = current_time
        self.last_modified = current_time

        # Encrypt the password before inserting
        self.hashed_password = bcrypt.hash(self.hashed_password)

        # Populate the full_name field
        self.full_name = self.populate_full_name(self.first_name, self.last_name, getattr(self, "middle_initial", None))
        print(f"Full name set to: {self.full_name}")
        print(f"Password hashed: {self.hashed_password}")
    else:
        print("*** Skipping set_creation_date_and_encrypt_password as required properties are missing ***")


@before_event("save")
async def update_last_modified_date_and_encrypt_password(self):
    """
    Automatically update the `last_modified` field when a document is updated,
    encrypt the password if it has been changed, and update the full name if necessary.
    """
    self.last_modified = datetime.utcnow()  # Use UTC for standard database storage

    # Check if the password is already hashed; if not, hash it
    if not bcrypt.verify(self.hashed_password, bcrypt.hash(self.hashed_password)):
        self.hashed_password = bcrypt.hash(self.hashed_password)

    # Check if the name fields have changed and update the full_name if necessary
    current_full_name = self.populate_full_name(self.first_name, self.last_name, self.middle_initial)
    if self.full_name != current_full_name:
        self.full_name = current_full_name