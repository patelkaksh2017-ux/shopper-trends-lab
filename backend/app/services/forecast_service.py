import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
from app.core.config import DEFAULT_DATASET_PATH
from .rfm_service import _ensure_columns


def forecast_revenue(periods: int = 12):
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	df = _ensure_columns(df)
	df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"], errors="coerce")
	df["Revenue"] = df["UnitPrice"].fillna(0) * df["Quantity"].fillna(0)
	monthly = df.set_index("InvoiceDate").resample("MS")["Revenue"].sum()
	monthly = monthly.asfreq("MS").fillna(0)
	if len(monthly) < 6:
		# Too short, fallback to repeating mean
		avg = float(monthly.mean()) if len(monthly) > 0 else 0.0
		forecast = [{"date": str(monthly.index.max() + pd.offsets.MonthBegin(i+1)), "revenue": avg} for i in range(periods)]
		return {"forecast": forecast}
	try:
		model = SARIMAX(monthly, order=(1,1,1), seasonal_order=(0,1,1,12), enforce_stationarity=False, enforce_invertibility=False)
		res = model.fit(disp=False)
		pred = res.get_forecast(steps=periods)
		index = pd.date_range(start=monthly.index.max() + pd.offsets.MonthBegin(1), periods=periods, freq="MS")
		forecast_vals = pred.predicted_mean
		forecast = [{"date": str(idx.date()), "revenue": float(val)} for idx, val in zip(index, forecast_vals)]
		return {"forecast": forecast}
	except Exception:
		avg = float(monthly.tail(6).mean()) if len(monthly) > 0 else 0.0
		forecast = [{"date": str(monthly.index.max() + pd.offsets.MonthBegin(i+1)), "revenue": avg} for i in range(periods)]
		return {"forecast": forecast}