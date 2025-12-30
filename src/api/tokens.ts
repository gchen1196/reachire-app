import { apiClient } from './client'

export interface TokenUsage {
  id: string
  action: string
  jobUrl: string | null
  createdAt: string
}

export interface TokenUsageResponse {
  usage: TokenUsage[]
}

export async function getTokenUsage(): Promise<TokenUsageResponse> {
  const response = await apiClient.get<TokenUsageResponse>('/api/tokens/usage')
  return response.data
}
