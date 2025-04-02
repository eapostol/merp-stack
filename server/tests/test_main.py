from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_hello_query():
    response = client.post("/graphql", json={"query": "{ hello }"})
    assert response.status_code == 200
    assert response.json()["data"]["hello"] == "Hello from FastAPI + GraphQL!"

def test_dummy():
    assert 1 + 1 == 2

