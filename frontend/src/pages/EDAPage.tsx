import React from 'react'
import { api } from '@/api/client'
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'

export function EDAPage() {
	const [data, setData] = React.useState<any | null>(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const fetchEDA = async () => {
		setLoading(true); setError(null)
		try {
			const res = await api.get('/analytics/eda', { params: { sample_size: 5 } })
			setData(res.data)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Failed to load EDA')
		} finally {
			setLoading(false)
		}
	}
	React.useEffect(() => { fetchEDA() }, [])
	return (
		<Stack spacing={2}>
			<Typography variant="h5">Exploratory Data Analysis</Typography>
			<Button variant="outlined" onClick={fetchEDA} disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Refresh'}</Button>
			{error && <Alert severity="error">{error}</Alert>}
			{data &&
				<Box>
					<Typography variant="h6">Head</Typography>
					<pre>{JSON.stringify(data.head, null, 2)}</pre>
					<Typography variant="h6">Describe</Typography>
					<pre>{JSON.stringify(data.describe, null, 2)}</pre>
					<Typography variant="h6">Info</Typography>
					<pre>{JSON.stringify(data.info, null, 2)}</pre>
				</Box>
			}
		</Stack>
	)
}