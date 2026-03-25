import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import generate

from dotenv import load_dotenv
load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI(
    title="UI Architect API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL or "http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "UI Architect backend running :)"}
