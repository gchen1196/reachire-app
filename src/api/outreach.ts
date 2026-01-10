import { apiClient } from './client'

export type OutreachStatus = 'to_contact' | 'emailed' | 'replied' | 'interviewing'

export interface OutreachStatusResponse {
  statuses: Record<string, { status: OutreachStatus; sentAt: string | null }>
}

export interface PreviousOutreach {
  jobTitle: string | null
  jobUrl: string
  sentAt: string | null
}

export interface PreviousOutreachesResponse {
  previousOutreaches: PreviousOutreach[]
}

// Types for GET /outreach (tracker data)
export interface TrackerContactOutreach {
  id: string
  status: OutreachStatus
  createdAt: string
  sentAt: string | null
  emailSubject: string | null
  notes: string | null
}

export interface TrackerContact {
  id: string
  email: string
  name: string | null
  title: string | null
  linkedinUrl: string | null
  outreach: TrackerContactOutreach
}

export interface TrackerCompany {
  domain: string
  name: string | null
}

export interface TrackerJob {
  id: string
  url: string
  title: string | null
  department: string | null
  requirementsSummary: string | null
  company: TrackerCompany
  contacts: TrackerContact[]
}

export interface GetOutreachesResponse {
  jobs: TrackerJob[]
}

export async function getOutreaches(): Promise<GetOutreachesResponse> {
  const response = await apiClient.get<GetOutreachesResponse>('/api/outreach')
  return response.data
}

export async function getOutreachStatuses(
  jobUrl: string,
  emails: string[]
): Promise<OutreachStatusResponse> {
  const response = await apiClient.get<OutreachStatusResponse>('/api/outreach/statuses', {
    params: {
      jobUrl,
      emails: emails.join(','),
    },
  })
  return response.data
}

export async function getPreviousOutreaches(
  email: string
): Promise<PreviousOutreachesResponse> {
  const response = await apiClient.get<PreviousOutreachesResponse>('/api/outreach/previous', {
    params: { email },
  })
  return response.data
}

export interface CreateOutreachRequest {
  jobUrl: string
  jobTitle: string
  companyDomain: string
  companyName: string
  department?: string
  contactEmail: string
  contactName: string
  contactTitle?: string
  contactLinkedinUrl?: string
  status?: OutreachStatus
}

export async function createOutreach(data: CreateOutreachRequest): Promise<void> {
  await apiClient.post('/api/outreach', data)
}

export interface UpdateOutreachStatusRequest {
  jobId: string
  contactId: string
  status: OutreachStatus
}

export async function updateOutreachStatus(data: UpdateOutreachStatusRequest): Promise<void> {
  await apiClient.put('/api/outreach/status', data)
}

export interface DeleteOutreachesRequest {
  jobId: string
  contactIds: string[]
}

export async function deleteOutreaches(data: DeleteOutreachesRequest): Promise<void> {
  await apiClient.delete('/api/outreach', { data })
}
