import pandas as pd
import joblib
from datetime import timedelta
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
from app.core.config import DEFAULT_DATASET_PATH, MODELS_DIR, RANDOM_SEED
from .rfm_service import _ensure_columns

MODEL_PATH = MODELS_DIR / "churn_model.joblib"


def _build_features(df: pd.DataFrame, inactivity_days: int) -> pd.DataFrame:
	df = _ensure_columns(df)
	df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"], errors="coerce")
	df["Revenue"] = df["UnitPrice"].fillna(0) * df["Quantity"].fillna(0)
	reference_date = df["InvoiceDate"].max() + timedelta(days=1)
	rfm = df.groupby("CustomerID").agg({
		"InvoiceDate": lambda x: (reference_date - x.max()).days,
		"InvoiceNo": "nunique",
		"Revenue": "sum"
	}).rename(columns={"InvoiceDate": "Recency", "InvoiceNo": "Frequency", "Revenue": "Monetary"})
	rfm = rfm.fillna(0).reset_index()
	rfm["churned"] = (rfm["Recency"] > inactivity_days).astype(int)
	return rfm


def train_churn_model(inactivity_days: int = 90):
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	rfm = _build_features(df, inactivity_days)
	X = rfm[["Recency", "Frequency", "Monetary"]]
	y = rfm["churned"]
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=RANDOM_SEED, stratify=y)
	model = RandomForestClassifier(n_estimators=200, random_state=RANDOM_SEED, class_weight="balanced")
	model.fit(X_train, y_train)
	proba = model.predict_proba(X_test)[:, 1]
	auc = float(roc_auc_score(y_test, proba))
	joblib.dump({"model": model, "inactivity_days": inactivity_days}, MODEL_PATH)
	importances = [{"feature": f, "importance": float(i)} for f, i in zip(["Recency", "Frequency", "Monetary"], model.feature_importances_)]
	return {"auc_roc": auc, "feature_importances": importances}


def predict_churn(customer_ids=None):
	bundle = joblib.load(MODEL_PATH)
	model = bundle["model"]
	inactivity_days = bundle["inactivity_days"]
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	rfm = _build_features(df, inactivity_days)
	if customer_ids is not None and len(customer_ids) > 0:
		rfm = rfm[rfm["CustomerID"].astype(str).isin([str(x) for x in customer_ids])]
	proba = model.predict_proba(rfm[["Recency", "Frequency", "Monetary"]])[:, 1]
	preds = [
		{"CustomerID": str(cid), "churn_probability": float(p)}
		for cid, p in zip(rfm["CustomerID"].astype(str).tolist(), proba)
	]
	return {"predictions": preds}