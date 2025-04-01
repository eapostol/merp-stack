from ariadne import QueryType, MutationType, make_executable_schema, gql
from app.models.user import User

type_defs = gql("""
    type Query {
        hello: String!
    }

    type Mutation {
        register(email: String!, password: String!): Boolean!
    }
""")

query = QueryType()
mutation = MutationType()

@query.field("hello")
def resolve_hello(*_):
    return "Hello from FastAPI + GraphQL!"

@mutation.field("register")
async def resolve_register(_, info, email, password):
    user = User(email=email, hashed_password=password)
    await user.insert()
    return True

schema = make_executable_schema(type_defs, query, mutation)
