"""
This script is responsible for seeding the database with initial data for the User model.

It performs the following tasks:
1. Initializes the database connection using the `init_db` function.
2. Cleans the existing data in the User collection if any documents are present.
3. Loads seed data from a JSON file (`userseeds.json`) located in the same directory.
4. Inserts each user into the database, triggering any defined hooks (e.g., hashing passwords, setting timestamps).
5. Prints the seeded data in a formatted table for verification.

How to Use:
------------
1. **Run the script directly from the terminal**:
   Navigate to the `server` folder (the root of the project) and run:
   
   python -m apps.seed.seed

This will execute the `seed_database` function, which 
seeds the database with the data from `userseeds.json`.

2. **Import and use in another Python file**:
You can also import the `seed_database` function into another Python file and
 invoke it programmatically:

from app.seeds.seed import seed_database
import asyncio

asyncio.run(seed_database())

"""

import asyncio
import json
import os
from datetime import datetime
from app.config.connection import init_db
from app.models.index import User
from app.seeds.cleanDB import clean_db
from prettytable import PrettyTable  # Import PrettyTable for formatting
from passlib.hash import bcrypt

# Get the path to the current directory (where seed.py is located)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Construct the relative path to userseeds.json
USER_SEEDS_PATH = os.path.join(CURRENT_DIR, "userseeds.json")

async def seed_database():
    """
    Seed the database with initial data.
    """
    print("*** Seeding the database... ***")
    try:
        # Initialize the database connection
        await init_db()

        # Check if the User collection has any documents and clean out the data if it does
        if await User.find_all().count() > 0:
            await clean_db()

        # Load seed data from the JSON file
        with open(USER_SEEDS_PATH, "r") as file:
            user_data = json.load(file)

        # Insert each user individually to trigger the insert hook
        for user in user_data:
            # Rename the field `password` to `hashed_password`
            user["hashed_password"] = user.pop("password")

            # Add required fields
            user["date_created"] = datetime.utcnow()
            user["last_modified"] = datetime.utcnow()

            # Create and insert a User instance
            user_instance = User(**user)
            await user_instance.insert()

        print("...Seeding completed successfully!")

        # Retrieve and print the documents as a formatted table
        all_users = await User.find_all().to_list()
        table = PrettyTable()
        table.field_names = ["First Name", "Last Name", "Email", "Full Name", "Date Created", "Last Modified", "hashed password"]
        for user in all_users:
            user.hashed_password = bcrypt.hash(user.hashed_password)  
            # Hash the password for display

            # test if the password is hashed correctly
            if bcrypt.verify(user.hashed_password, user.hashed_password):
                print("Password hashed correctly")
            else:
                print("Password hashing failed")

            table.add_row([
                user.first_name,
                user.last_name,
                user.email,
                user.full_name,
                user.date_created.strftime("%Y-%m-%d %H:%M:%S"),
                user.last_modified.strftime("%Y-%m-%d %H:%M:%S"),
                user.hashed_password
            ])
        print(table)

    except Exception as error:
        print("...Error seeding database:", error)
        raise

# Allow the script to be run directly or imported
if __name__ == "__main__":
    asyncio.run(seed_database())