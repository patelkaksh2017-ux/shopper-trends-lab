from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import data, analytics

app = FastAPI(title="Retail Analytics API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(data.router, prefix="/data", tags=["data"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])