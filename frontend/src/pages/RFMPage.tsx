import React from 'react'
import { api } from '@/api/client'
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material'

export function RFMPage() {
	const [rows, setRows] = React.useState<any[] | null>(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const fetchRFM = async () => {
		setLoading(true); setError(null)
		try {
			const res = await api.get('/analytics/rfm')
			setRows(res.data.summary)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Failed to load RFM')
		} finally {
			setLoading(false)
		}
	}
	React.useEffect(() => { fetchRFM() }, [])
	return (
		<Stack spacing={2}>
			<Typography variant="h5">RFM Summary</Typography>
			<Button variant="outlined" onClick={fetchRFM} disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Refresh'}</Button>
			{error && <Alert severity="error">{error}</Alert>}
			{rows && <pre>{JSON.stringify(rows.slice(0, 50), null, 2)}</pre>}
		</Stack>
	)
}