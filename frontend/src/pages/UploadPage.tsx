import React from 'react'
import { api } from '@/api/client'
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'

export function UploadPage() {
	const [file, setFile] = React.useState<File | null>(null)
	const [status, setStatus] = React.useState<string | null>(null)
	const [preview, setPreview] = React.useState<any[] | null>(null)
	const [loading, setLoading] = React.useState(false)

	const onUpload = async () => {
		if (!file) return
		setLoading(true)
		setStatus(null)
		try {
			const form = new FormData()
			form.append('file', file)
			await api.post('/data/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
			setStatus('Uploaded successfully')
			const res = await api.get('/data/preview', { params: { sample_size: 5 } })
			setPreview(res.data.head)
		} catch (e: any) {
			setStatus(e.response?.data?.detail || 'Upload failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Stack spacing={2}>
			<Typography variant="h5">Upload Transactions CSV</Typography>
			<Stack direction="row" spacing={2} alignItems="center">
				<input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
				<Button variant="contained" onClick={onUpload} disabled={!file || loading}>
					{loading ? <CircularProgress size={20} /> : 'Upload'}
				</Button>
			</Stack>
			{status && <Alert severity={status.includes('success') ? 'success' : 'error'}>{status}</Alert>}
			{preview &&
				<Box>
					<Typography variant="h6">Preview</Typography>
					<pre>{JSON.stringify(preview, null, 2)}</pre>
				</Box>
			}
		</Stack>
	)
}