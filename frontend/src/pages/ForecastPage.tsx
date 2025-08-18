import React from 'react'
import { api } from '@/api/client'
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function ForecastPage() {
	const [data, setData] = React.useState<any[] | null>(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const fetchForecast = async () => {
		setLoading(true); setError(null)
		try {
			const res = await api.get('/analytics/forecast', { params: { periods: 12 } })
			setData(res.data.forecast)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Failed to load forecast')
		} finally {
			setLoading(false)
		}
	}
	React.useEffect(() => { fetchForecast() }, [])
	return (
		<Stack spacing={2}>
			<Typography variant="h5">Revenue Forecast</Typography>
			<Button variant="outlined" onClick={fetchForecast} disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Refresh'}</Button>
			{error && <Alert severity="error">{error}</Alert>}
			{data && (
				<div style={{ width: '100%', height: 400 }}>
					<ResponsiveContainer>
						<LineChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" hide />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={2} dot={false} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</Stack>
	)
}