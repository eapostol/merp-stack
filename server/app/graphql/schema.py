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

