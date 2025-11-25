from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="ArthaGuide API", version="1.0.0")

# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "ArthaGuide API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Import and include routers
from app.api import advisor
app.include_router(advisor.router, prefix="/api/advisor", tags=["advisor"])
