import { apiClient } from './client'
import type { SearchJobRequest, SearchJobResponse } from '../types/api'

export async function searchJob(request: SearchJobRequest): Promise<SearchJobResponse> {
  const response = await apiClient.post<SearchJobResponse>('/api/jobs/search', request)
  return response.data
}
