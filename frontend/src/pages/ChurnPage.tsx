import React from 'react'
import { api } from '@/api/client'
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'

export function ChurnPage() {
	const [training, setTraining] = React.useState(false)
	const [auc, setAuc] = React.useState<number | null>(null)
	const [preds, setPreds] = React.useState<any[] | null>(null)
	const [customerIds, setCustomerIds] = React.useState('')
	const [error, setError] = React.useState<string | null>(null)

	const train = async () => {
		setTraining(true); setError(null)
		try {
			const res = await api.post('/analytics/churn/train', null, { params: { inactivity_days: 90 } })
			setAuc(res.data.auc_roc)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Training failed')
		} finally {
			setTraining(false)
		}
	}

	const predict = async () => {
		setTraining(true); setError(null)
		try {
			const ids = customerIds.trim() ? customerIds.split(',').map(s => s.trim()) : undefined
			const res = await api.post('/analytics/churn/predict', { customer_ids: ids })
			setPreds(res.data.predictions)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Prediction failed')
		} finally {
			setTraining(false)
		}
	}

	return (
		<Stack spacing={2}>
			<Typography variant="h5">Churn Modeling</Typography>
			<Stack direction="row" spacing={2}>
				<Button variant="contained" onClick={train} disabled={training}>{training ? <CircularProgress size={20} /> : 'Train Model'}</Button>
				<TextField size="small" label="Customer IDs (comma-separated)" value={customerIds} onChange={(e) => setCustomerIds(e.target.value)} />
				<Button variant="outlined" onClick={predict} disabled={training}>Predict</Button>
			</Stack>
			{error && <Alert severity="error">{error}</Alert>}
			{auc !== null && <Box>AUC: {auc.toFixed(3)}</Box>}
			{preds && <pre>{JSON.stringify(preds.slice(0, 100), null, 2)}</pre>}
		</Stack>
	)
}