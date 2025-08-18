import React from 'react'
import { Layout } from '@/components/Layout'
import { UploadPage } from './UploadPage'
import { EDAPage } from './EDAPage'
import { RFMPage } from './RFMPage'
import { SegmentsPage } from './SegmentsPage'
import { ChurnPage } from './ChurnPage'
import { BasketPage } from './BasketPage'
import { ForecastPage } from './ForecastPage'

export default function App() {
	const [path, setPath] = React.useState(window.location.pathname)
	React.useEffect(() => {
		const onPop = () => setPath(window.location.pathname)
		window.addEventListener('popstate', onPop)
		return () => window.removeEventListener('popstate', onPop)
	}, [])
	const navigate = (p: string) => { window.history.pushState({}, '', p); setPath(p) }
	let page: React.ReactNode
	switch (path) {
		case '/': page = UploadPage(); break
		case '/eda': page = EDAPage(); break
		case '/rfm': page = RFMPage(); break
		case '/segments': page = SegmentsPage(); break
		case '/churn': page = ChurnPage(); break
		case '/basket': page = BasketPage(); break
		case '/forecast': page = ForecastPage(); break
		default: page = UploadPage(); break
	}
	return (
		<Layout onNavigate={navigate} currentPath={path}>
			{page}
		</Layout>
	)
}