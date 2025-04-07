"""
Resolvers are Python functions that handle the logic for each field in
 the schema. This is equivalent to the resolvers.ts
"""


from ariadne import QueryType, MutationType
from app.models.user import User

query = QueryType()
mutation = MutationType()

# Mock database (replace with actual database logic)
users_db = [
    {
        "first_name": "John",
        "last_name": "Doe",
        "middle_initial": "A",
        "email": "john.doe@example.com",
        "password": "password01"
    },
    {
        "first_name": "Jane",
        "last_name": "Smith",
        "middle_initial": "B",
        "email": "jane.smith@example.com",
        "password": "password02"
    },
    {
        "first_name": "Michael",
        "last_name": "Johnson",
        "middle_initial": None,
        "email": "michael.johnson@example.com",
        "password": "password03"
    },
    {
        "first_name": "Emily",
        "last_name": "Davis",
        "middle_initial": "C",
        "email": "emily.davis@example.com",
        "password": "password04"
    },
    {
        "first_name": "Chris",
        "last_name": "Brown",
        "middle_initial": None,
        "email": "chris.brown@example.com",
        "password": "password05"
    },
    {
        "first_name": "Sarah",
        "last_name": "Wilson",
        "middle_initial": "D",
        "email": "sarah.wilson@example.com",
        "password": "password06"
    },
    {
        "first_name": "David",
        "last_name": "Martinez",
        "middle_initial": "E",
        "email": "david.martinez@example.com",
        "password": "password07"
    },
    {
        "first_name": "Laura",
        "last_name": "Garcia",
        "middle_initial": None,
        "email": "laura.garcia@example.com",
        "password": "password08"
    },
    {
        "first_name": "James",
        "last_name": "Anderson",
        "middle_initial": "F",
        "email": "james.anderson@example.com",
        "password": "password09"
    },
    {
        "first_name": "Olivia",
        "last_name": "Taylor",
        "middle_initial": "G",
        "email": "olivia.taylor@example.com",
        "password": "password10"
    }
]

# Query resolvers

@query.field("users")
async def resolve_users(*_):
    users = await User.find_all().to_list()
    # print(f"Fetched users: {users_db}")  # Debug statement
    print(f"Fetched users: {users}")
    # return [UserOut(**user.dict()) for user in users]
    # return users
    return users

# Mutation resolvers


@mutation.field("addUser")
def resolve_add_user(_, info,
                     firstName,
                     middleInitial,
                     lastName,
                     email,
                     username
                     ):
    new_user = {
        "id": str(len(users_db) + 1),
        "firstName": firstName,
        "middleInitial": middleInitial,
        "lastName": lastName,
        "email": email,
        "username": username,
    }
    users_db.append(new_user)
    return new_user


@mutation.field("deleteUser")
def resolve_delete_user(_, info, id):
    global users_db
    users_db = [user for user in users_db if user["id"] != id]
    return True
