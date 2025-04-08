from fastapi import APIRouter

router = APIRouter()

# Import REST API routes
# test routes below
@router.get("/hello")
async def get_hello():
    return {"message": "Hello from the Python server environment"}

@router.get("/test")
async def test():
    return {"message": "Server is running"}
