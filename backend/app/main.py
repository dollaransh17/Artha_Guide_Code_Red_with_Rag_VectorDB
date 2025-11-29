from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Import routers at the top
from app.api import rag_advisor, intent_router

load_dotenv()

app = FastAPI(title="ArthaGuide API", version="1.0.0")

# CORS - Allow all Vercel deployments
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
# Add wildcard for Vercel preview deployments
if any("vercel.app" in origin for origin in origins):
    origins.append("https://*.vercel.app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
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

# Register routers
app.include_router(rag_advisor.router, prefix="/api", tags=["rag-advisor"])
app.include_router(intent_router.router, prefix="/api", tags=["intent-router"])
