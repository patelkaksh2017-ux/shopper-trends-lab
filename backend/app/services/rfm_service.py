import pandas as pd
from datetime import timedelta
from app.core.config import DEFAULT_DATASET_PATH

# Expected columns: CustomerID, InvoiceDate, InvoiceNo, Quantity, UnitPrice
# Fallback: try common variants

def _ensure_columns(df: pd.DataFrame) -> pd.DataFrame:
	columns_map = {
		"customerid": "CustomerID",
		"customer_id": "CustomerID",
		"invoice_date": "InvoiceDate",
		"date": "InvoiceDate",
		"order_date": "InvoiceDate",
		"invoice": "InvoiceNo",
		"invoiceid": "InvoiceNo",
		"invoice_no": "InvoiceNo",
		"qty": "Quantity",
		"quantity": "Quantity",
		"unit_price": "UnitPrice",
		"price": "UnitPrice",
		"amount": "UnitPrice",
	}
	lower_cols = {c.lower(): c for c in df.columns}
	for key, target in columns_map.items():
		if key in lower_cols and lower_cols[key] != target:
			df = df.rename(columns={lower_cols[key]: target})
	return df


def compute_rfm():
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	df = _ensure_columns(df)
	if "InvoiceDate" in df.columns:
		df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"], errors="coerce")
	else:
		raise ValueError("InvoiceDate column not found")
	if "UnitPrice" in df.columns and "Quantity" in df.columns:
		df["Revenue"] = df["UnitPrice"].fillna(0) * df["Quantity"].fillna(0)
	else:
		raise ValueError("Quantity/UnitPrice columns not found")

	reference_date = df["InvoiceDate"].max() + timedelta(days=1)
	rfm = df.groupby("CustomerID").agg({
		"InvoiceDate": lambda x: (reference_date - x.max()).days,
		"InvoiceNo": "nunique",
		"Revenue": "sum"
	}).rename(columns={"InvoiceDate": "Recency", "InvoiceNo": "Frequency", "Revenue": "Monetary"})
	rfm = rfm.reset_index()
	return {"summary": rfm.sort_values(["Monetary"], ascending=False).head(100).to_dict(orient="records")}