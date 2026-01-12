import { apiClient } from './client'
import type { SearchJobRequest, SearchJobResponse, ConfirmDomainRequest } from '../types/api'

export async function searchJob(request: SearchJobRequest): Promise<SearchJobResponse> {
  const response = await apiClient.post<SearchJobResponse>('/api/jobs/search', request)
  return response.data
}

export async function confirmDomain(request: ConfirmDomainRequest): Promise<SearchJobResponse> {
  const response = await apiClient.post<SearchJobResponse>('/api/jobs/search/confirm', request)
  return response.data
}
