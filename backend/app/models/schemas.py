from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UploadResponse(BaseModel):
    rows: int
    columns: int
    saved_path: str

class EDARequest(BaseModel):
    sample_size: int = 5

class EDAResponse(BaseModel):
    head: List[Dict[str, Any]]
    describe: Dict[str, Dict[str, float]]
    info: Dict[str, Any]

class RFMResponse(BaseModel):
    summary: List[Dict[str, Any]]

class SegmentResponse(BaseModel):
    n_segments: int
    segments: List[Dict[str, Any]]

class ChurnTrainResponse(BaseModel):
    auc_roc: float
    feature_importances: Optional[List[Dict[str, float]]]

class ChurnPredictRequest(BaseModel):
    customer_ids: Optional[List[str]] = None

class ChurnPredictResponse(BaseModel):
    predictions: List[Dict[str, Any]]

class BasketResponse(BaseModel):
    rules: List[Dict[str, Any]]

class ForecastResponse(BaseModel):
    forecast: List[Dict[str, Any]]