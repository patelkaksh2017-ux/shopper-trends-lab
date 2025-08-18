import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from app.core.config import DEFAULT_DATASET_PATH
from .rfm_service import _ensure_columns


def _prepare_basket(df: pd.DataFrame) -> pd.DataFrame:
	df = _ensure_columns(df)
	# Expect InvoiceNo and Description or StockCode; fallback to product name if exists
	item_col = None
	for c in ["Description", "StockCode", "Item", "Product", "ProductName"]:
		if c in df.columns:
			item_col = c
			break
	if item_col is None:
		raise ValueError("No item column found (e.g., Description/StockCode)")
	basket = (
		df.groupby(["InvoiceNo", item_col])["Quantity"].sum().unstack().fillna(0)
	)
	basket = (basket > 0).astype(int)
	return basket


def mine_basket_rules(min_support: float = 0.01, min_confidence: float = 0.2, top_n: int = 30):
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	basket = _prepare_basket(df)
	frequent = apriori(basket, min_support=min_support, use_colnames=True)
	if frequent.empty:
		return {"rules": []}
	rules = association_rules(frequent, metric="confidence", min_threshold=min_confidence)
	if rules.empty:
		return {"rules": []}
	rules = rules.sort_values(["lift", "confidence", "support"], ascending=False).head(top_n)
	def frozenset_to_list(x):
		return list(x) if isinstance(x, frozenset) else [x]
	records = []
	for _, row in rules.iterrows():
		records.append({
			"antecedents": frozenset_to_list(row["antecedents"]),
			"consequents": frozenset_to_list(row["consequents"]),
			"support": float(row["support"]),
			"confidence": float(row["confidence"]),
			"lift": float(row["lift"]),
		})
	return {"rules": records}