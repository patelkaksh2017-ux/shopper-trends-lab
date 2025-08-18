# Retail Analytics API

## Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend
```

## Endpoints
- POST `/data/upload` (CSV)
- GET `/data/preview`
- GET `/analytics/eda`
- GET `/analytics/rfm`
- GET `/analytics/segments?n_segments=4`
- POST `/analytics/churn/train?inactivity_days=90`
- POST `/analytics/churn/predict` {"customer_ids": ["123"]}
- GET `/analytics/basket?min_support=0.02&min_confidence=0.3&top_n=30`
- GET `/analytics/forecast?periods=12`