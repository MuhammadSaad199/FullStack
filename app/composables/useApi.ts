import axios from 'axios'

// apiBase aur auth token ke saath configured axios instance
export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('token')

  const api = axios.create({
    baseURL: config.public.apiBase as string
  })

  api.interceptors.request.use((req) => {
    if (token.value) {
      req.headers.Authorization = `Bearer ${token.value}`
    }
    return req
  })

  return api
}
