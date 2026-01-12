import axios, { AxiosError } from 'axios'
import { supabase } from '../lib/supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030'

interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    userMessage: string
    timestamp: string
    path: string
  }
}

/**
 * Extracts user-friendly error message from API errors.
 * Returns the userMessage from the API response, or a generic message for other errors.
 */
export function getApiErrorMessage(error: unknown): string {
  const genericMessage = 'Something went wrong. Please try again.'

  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiErrorResponse
    return data.error?.userMessage ?? genericMessage
  }

  if (error instanceof Error) {
    return error.message
  }

  return genericMessage
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token from Supabase session
apiClient.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to sign in
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)
