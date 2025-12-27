import { apiClient } from './client'
import type { GenerateEmailRequest, GenerateEmailResponse } from '../types/api'

export async function generateEmail(request: GenerateEmailRequest): Promise<GenerateEmailResponse> {
  const response = await apiClient.post<GenerateEmailResponse>('/api/email/generate', request)
  return response.data
}
