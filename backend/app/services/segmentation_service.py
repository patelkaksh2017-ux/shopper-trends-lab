import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from app.core.config import DEFAULT_DATASET_PATH, RANDOM_SEED
from .rfm_service import _ensure_columns


def segment_customers(n_segments: int = 4):
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	df = _ensure_columns(df)
	df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"], errors="coerce")
	df["Revenue"] = df["UnitPrice"].fillna(0) * df["Quantity"].fillna(0)
	ref_date = df["InvoiceDate"].max()
	rfm = df.groupby("CustomerID").agg({
		"InvoiceDate": lambda x: (ref_date - x.max()).days,
		"InvoiceNo": "nunique",
		"Revenue": "sum"
	}).rename(columns={"InvoiceDate": "Recency", "InvoiceNo": "Frequency", "Revenue": "Monetary"})

	rfm = rfm.fillna(0)
	scaler = StandardScaler()
	rfm_scaled = scaler.fit_transform(rfm[["Recency", "Frequency", "Monetary"]])
	kmeans = KMeans(n_clusters=n_segments, random_state=RANDOM_SEED, n_init=10)
	rfm["Segment"] = kmeans.fit_predict(rfm_scaled)
	segments = rfm.reset_index().to_dict(orient="records")
	return {"n_segments": n_segments, "segments": segments}