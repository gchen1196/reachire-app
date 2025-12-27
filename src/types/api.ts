// Request types
export interface SearchJobRequest {
  url: string
  selectedDomain?: string
}

// Shared types
export type Department =
  | 'engineering'
  | 'product'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'hr'
  | 'finance'
  | 'operations'
  | 'legal'
  | 'other'

export type SeniorityLevel =
  | 'intern'
  | 'entry'
  | 'mid'
  | 'senior'
  | 'staff'
  | 'principal'
  | 'director'
  | 'vp'
  | 'c_level'

export type ContactCategory = 'executive' | 'management' | 'engineering' | 'hr' | 'other'

export interface ApiContact {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  title: string | null
  email: string
  emailConfidence: number
  emailVerification: string
  linkedinUrl: string | null
  relevanceScore: number
  category: ContactCategory
}

export interface ApiJob {
  url: string
  company: string
  companyDomain: string | null
  role: string
  department: Department | null
  seniorityLevel: SeniorityLevel | null
  requirementsSummary: string | null
}

// Response types - discriminated union
export interface SearchJobSuccessResponse {
  status: 'success'
  job: ApiJob
  contacts: ApiContact[]
}

export interface SearchJobDomainSelectionRequiredResponse {
  status: 'domain_selection_required'
  job: ApiJob
  domains: string[]
}

export interface SearchJobDomainNotFoundResponse {
  status: 'domain_not_found'
  job: ApiJob
}

export interface SearchJobNoContactsFoundResponse {
  status: 'no_contacts_found'
  job: ApiJob
}

export interface SearchJobParsingFailedResponse {
  status: 'parsing_failed'
  job: null
  error: string
}

export interface SearchJobUnsupportedSiteResponse {
  status: 'unsupported_site'
  job: null
  error: string
  siteName: string
}

export type SearchJobResponse =
  | SearchJobSuccessResponse
  | SearchJobDomainSelectionRequiredResponse
  | SearchJobDomainNotFoundResponse
  | SearchJobNoContactsFoundResponse
  | SearchJobParsingFailedResponse
  | SearchJobUnsupportedSiteResponse

// Email generation types
export interface GenerateEmailRequest {
  jobTitle: string
  companyName: string
  companyDescription?: string
  jobUrl: string
  contactName: string
  contactFirstName?: string
  tone?: 'professional' | 'casual'
  askForReferral?: boolean
}

export interface GenerateEmailResponse {
  subject: string
  body: string
}
