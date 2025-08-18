from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from app.core.config import DEFAULT_DATASET_PATH
from app.models.schemas import UploadResponse

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_csv(file: UploadFile = File(...)):
	if not file.filename.endswith(".csv"):
		raise HTTPException(status_code=400, detail="Only CSV files are supported")
	content = await file.read()
	try:
		with open(DEFAULT_DATASET_PATH, "wb") as f:
			f.write(content)
		df = pd.read_csv(DEFAULT_DATASET_PATH)
		return UploadResponse(rows=df.shape[0], columns=df.shape[1], saved_path=str(DEFAULT_DATASET_PATH))
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/preview")
def preview(sample_size: int = 5):
	try:
		df = pd.read_csv(DEFAULT_DATASET_PATH)
		return {
			"head": df.head(sample_size).to_dict(orient="records")
		}
	except FileNotFoundError:
		raise HTTPException(status_code=404, detail="No dataset uploaded yet")
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))