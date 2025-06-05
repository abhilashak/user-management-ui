import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'

const BASE_URL = 'http://localhost:3000'

export const api = axios.create({
  baseURL: BASE_URL,
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