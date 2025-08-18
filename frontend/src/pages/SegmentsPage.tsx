import React from 'react'
import { api } from '@/api/client'
import { Alert, Box, Button, CircularProgress, Slider, Stack, Typography } from '@mui/material'

export function SegmentsPage() {
	const [segments, setSegments] = React.useState<any[] | null>(null)
	const [nSegments, setNSegments] = React.useState(4)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const fetchSegments = async () => {
		setLoading(true); setError(null)
		try {
			const res = await api.get('/analytics/segments', { params: { n_segments: nSegments } })
			setSegments(res.data.segments)
		} catch (e: any) {
			setError(e.response?.data?.detail || 'Failed to load segments')
		} finally {
			setLoading(false)
		}
	}
	React.useEffect(() => { fetchSegments() }, [])
	return (
		<Stack spacing={2}>
			<Typography variant="h5">Customer Segmentation</Typography>
			<Box width={300}>
				<Slider value={nSegments} min={2} max={10} step={1} onChange={(_, v) => setNSegments(v as number)} valueLabelDisplay="auto" />
			</Box>
			<Button variant="outlined" onClick={fetchSegments} disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Run'}</Button>
			{error && <Alert severity="error">{error}</Alert>}
			{segments && <pre>{JSON.stringify(segments.slice(0, 50), null, 2)}</pre>}
		</Stack>
	)
}