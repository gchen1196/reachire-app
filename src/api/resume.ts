import { apiClient } from './client'

export interface ParsedProfile {
  currentRole?: string
  currentCompany?: string
  yearsOfExperience?: number
  skills?: string[]
  achievements?: string[]
  previousCompanies?: string[]
  education?: string
  summary?: string
}

export interface ResumeUploadResponse {
  success: boolean
  profile: ParsedProfile
  resumeUrl: string
  resumeS3Key: string
  resumeFilename: string
}

export interface ResumeResponse {
  hasResume: boolean
  resumeFilename: string | null
  resumeUrl: string | null
  profile: ParsedProfile | null
}

export async function getResume(): Promise<ResumeResponse> {
  const response = await apiClient.get<ResumeResponse>('/api/resume')
  return response.data
}

export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<ResumeUploadResponse>('/api/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function uploadResumeText(text: string, filename?: string): Promise<ResumeUploadResponse> {
  const response = await apiClient.post<ResumeUploadResponse>('/api/resume', {
    text,
    filename,
  })
  return response.data
}

export async function deleteResume(): Promise<void> {
  await apiClient.delete('/api/resume')
}
