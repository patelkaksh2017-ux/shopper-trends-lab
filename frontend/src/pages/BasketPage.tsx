import React from 'react'
import { api } from '@/api/client'
import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'

export function BasketPage() {
	const [rules, setRules] = React.useState<any[] | null>(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const [minSupport, setMinSupport] = React.useState('0.02')
	const [minConfidence, setMinConfidence] = React.useState('0.3')

	const fetchRules = async () => {
		setLoading(true); setError(null)
		try {
			const res = await api.get('/analytics/basket', { params: { min_support: parseFloat(minSupport), min_confidence: parseFloat(minConfidence), top_n: 50 } })
			setRules(res.data.rules)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Failed to load basket rules')
		} finally {
			setLoading(false)
		}
	}
	React.useEffect(() => { fetchRules() }, [])
	return (
		<Stack spacing={2}>
			<Typography variant="h5">Market Basket Analysis</Typography>
			<Stack direction="row" spacing={2}>
				<TextField size="small" label="Min Support" value={minSupport} onChange={(e) => setMinSupport(e.target.value)} />
				<TextField size="small" label="Min Confidence" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} />
				<Button variant="outlined" onClick={fetchRules} disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Run'}</Button>
			</Stack>
			{error && <Alert severity="error">{error}</Alert>}
			{rules && <pre>{JSON.stringify(rules.slice(0, 100), null, 2)}</pre>}
		</Stack>
	)
}