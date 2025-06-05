import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { config } from './index'

export const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Define error response type
interface ApiError {
  message: string
  status?: number
  data?: unknown
}

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError): Promise<never> => {
    const errorResponse: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data
    }
    return Promise.reject(errorResponse)
  }
)

export default api 