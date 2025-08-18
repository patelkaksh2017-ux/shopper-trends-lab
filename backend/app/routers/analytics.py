from fastapi import APIRouter, HTTPException
from typing import Optional
from app.models.schemas import (
	EDARequest, EDAResponse, RFMResponse, SegmentResponse,
	ChurnTrainResponse, ChurnPredictRequest, ChurnPredictResponse,
	BasketResponse, ForecastResponse
)
from app.services.eda_service import generate_eda
from app.services.rfm_service import compute_rfm
from app.services.segmentation_service import segment_customers
from app.services.churn_service import train_churn_model, predict_churn
from app.services.basket_service import mine_basket_rules
from app.services.forecast_service import forecast_revenue

router = APIRouter()

@router.get("/eda", response_model=EDAResponse)
def eda(sample_size: int = 5):
	try:
		return generate_eda(sample_size=sample_size)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/rfm", response_model=RFMResponse)
def rfm():
	try:
		return compute_rfm()
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/segments", response_model=SegmentResponse)
def segments(n_segments: int = 4):
	try:
		return segment_customers(n_segments=n_segments)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.post("/churn/train", response_model=ChurnTrainResponse)
def churn_train(inactivity_days: int = 90):
	try:
		return train_churn_model(inactivity_days=inactivity_days)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.post("/churn/predict", response_model=ChurnPredictResponse)
def churn_predict(payload: ChurnPredictRequest):
	try:
		return predict_churn(customer_ids=payload.customer_ids)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet or model not trained")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/basket", response_model=BasketResponse)
def basket(min_support: float = 0.01, min_confidence: float = 0.2, top_n: int = 30):
	try:
		return mine_basket_rules(min_support=min_support, min_confidence=min_confidence, top_n=top_n)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/forecast", response_model=ForecastResponse)
def forecast(periods: int = 12):
	try:
		return forecast_revenue(periods=periods)
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))