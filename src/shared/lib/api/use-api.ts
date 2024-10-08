import { ref, Ref } from 'vue'
import axios, {
	AxiosResponse,
	InternalAxiosRequestConfig,
	AxiosInstance
} from 'axios'
import { twa } from './twa'

const api: AxiosInstance = axios.create({
	baseURL: 'https://dj-connect.xyz/api/v1',
	headers: {
		'Content-Type': 'application/json'
	}
})
const isLocal =
	process.env.NODE_ENV === 'development' &&
	import.meta.env.VITE_USE_TWA_MOCK === 'true'

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (twa && config.headers) {
		config.headers['Telegram-Init-Data'] = twa.initData
	}
	if (isLocal) {
		config.headers['Env-Mode'] = 'dev'
	}
	return config
})

type ApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export function useApi<T>(method: ApiMethod, url: string, payload?: any) {
	const data: Ref<T | null> = ref(null)
	const error: Ref<string | null> = ref(null)
	const loading: Ref<boolean> = ref(false)

	const execute = async (): Promise<void> => {
		loading.value = true
		error.value = null
		try {
			if (payload instanceof FormData) {
				api.defaults.headers['Content-Type'] = 'multipart/form-data'
			}

			const response: AxiosResponse<T> = await api[method](
				url,
				method === 'get' ? { params: payload } : payload
			)
			data.value = response.data
		} catch (e) {
			error.value = e instanceof Error ? e.message : String(e)
		} finally {
			loading.value = false
		}
	}

	return { data, error, loading, execute }
}

export const apiInstance = api

export default useApi
