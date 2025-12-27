import { apiClient } from './client'

export interface UpsertUserDto {
  id: string
  name?: string
  linkedinUrl?: string
  resumeFilename?: string
}

export interface UserResponse {
  id: string
  name: string | null
  linkedinUrl: string | null
  resumeFilename: string | null
  profile: unknown | null
  createdAt: string
  plan: string
  tokensRemaining: number
  tokensResetAt: string | null
  bonusTokens: number
}

export async function upsertUser(dto: UpsertUserDto): Promise<UserResponse> {
  const response = await apiClient.post<UserResponse>('/api/user', dto)
  return response.data
}

export async function getUser(id: string): Promise<UserResponse | null> {
  const response = await apiClient.get<UserResponse>(`/api/user/${id}`)
  return response.data
}
