import os
from ariadne import QueryType, MutationType, make_executable_schema, gql, load_schema_from_path
from app.models.user import User
from app.graphql.resolvers import query, mutation  # Import resolvers

# Resolve the absolute path to the schema.graphql file
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "schema.graphql")
print(f"Loaded schema from: {SCHEMA_PATH}")

# Load schema from the absolute path
type_defs = load_schema_from_path(SCHEMA_PATH)

# Load schema from SDL file
# type_defs = load_schema_from_path("app/graphql/schema.graphql")
schema = make_executable_schema(type_defs, query, mutation)


query = QueryType()
mutation = MutationType()

@query.field("hello")
def resolve_hello(*_):
    return "Hello from FastAPI + GraphQL!"

# Query resolvers
# @query.field("users")
#async def resolve_users(*_):
#    return await User.find_all().to_list()

# Mutation resolvers
@mutation.field("addUser")
async def resolve_add_user(_, info, firstName, middleInitial, lastName, email, password):
    new_user = User(
        first_name=firstName,
        middle_initial=middleInitial,
        last_name=lastName,
        email=email,
        hashed_password=password,
    )
    await new_user.insert()
    return new_user



@mutation.field("register")
async def resolve_register(_, info, email, password):
    user = User(email=email, hashed_password=password)
    await user.insert()
    return True


