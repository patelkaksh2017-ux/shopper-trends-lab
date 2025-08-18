import axios from 'axios'

const base = import.meta.env.VITE_API_BASE ?? '/api'

export const api = axios.create({
	baseURL: base,
})