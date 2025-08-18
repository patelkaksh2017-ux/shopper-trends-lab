# Supermarket Retail Analytics – Full Stack

This project provides a complete data mining and predictive analytics stack for supermarket retail:
- Data upload and preview
- EDA (head/describe/info)
- RFM scoring and summary
- Customer segmentation (KMeans over R, F, M)
- Churn modeling (RandomForest based on RFM) with training and prediction
- Market basket analysis (Apriori + association rules)
- Revenue forecasting (SARIMAX with naive fallback)

## Run with Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000 (Swagger at /docs)

## Run locally

Backend:
```bash
# Ensure Python 3.11+ with venv, or install python3-venv on Debian-based systems
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend
```

Frontend:
```bash
cd frontend
npm i
npm run dev
```

Update the frontend dev proxy in `frontend/vite.config.ts` if backend runs on a different host/port.
