import pandas as pd
from typing import Dict, Any
from app.core.config import DEFAULT_DATASET_PATH


def _dataframe_info(df: pd.DataFrame) -> Dict[str, Any]:
	info = {
		"columns": list(df.columns),
		"dtypes": {c: str(t) for c, t in df.dtypes.items()},
		"num_rows": int(df.shape[0]),
		"num_columns": int(df.shape[1]),
		"null_counts": {c: int(df[c].isna().sum()) for c in df.columns},
	}
	return info


def generate_eda(sample_size: int = 5):
	df = pd.read_csv(DEFAULT_DATASET_PATH)
	head = df.head(sample_size).to_dict(orient="records")
	describe = df.describe(include='all', datetime_is_numeric=True).fillna(0).to_dict()
	info = _dataframe_info(df)
	return {"head": head, "describe": describe, "info": info}