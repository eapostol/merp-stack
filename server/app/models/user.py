from beanie import Document
from pydantic import EmailStr
from typing import Optional
from datetime import datetime

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

    def populate_full_name(self):
        """
        Populates the `full_name` attribute of the user instance.

        This instance method constructs the full name of the user by combining the 
        `first_name`, `middle_initial` (if present), and `last_name` attributes. 
        If `middle_initial` is not provided, it combines only `first_name` and 
        `last_name`.

        Returns:
            None
        """

        if self.middle_initial:
            self.full_name = f"{self.first_name} {self.middle_initial} {self.last_name}"
        else:
            self.full_name = f"{self.first_name} {self.last_name}"