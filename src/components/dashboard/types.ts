export type OutreachStatus = 'to_contact' | 'emailed' | 'replied' | 'interviewing'

export interface ContactEntry {
  id: string
  name: string
  title: string
  email: string
  status: OutreachStatus
  lastActionAt: Date
  notes?: string
  linkedinUrl?: string
}

export interface TrackerEntry {
  id: string
  company: string
  companyDomain: string
  companyUrl: string
  role: string
  jobUrl: string
  requirements?: string
  contacts: ContactEntry[]
}

// Status priority for determining "best" status (higher = better)
export const STATUS_PRIORITY: Record<OutreachStatus, number> = {
  interviewing: 4,
  replied: 3,
  emailed: 2,
  to_contact: 1,
}

export const STATUS_CONFIG: Record<OutreachStatus, { label: string; color: string; bgColor: string }> = {
  to_contact: { label: 'To Contact', color: 'text-accent', bgColor: 'bg-accent-50' },
  emailed: { label: 'Emailed', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  replied: { label: 'Replied', color: 'text-green-700', bgColor: 'bg-green-100' },
  interviewing: { label: 'Interviewing', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
}

// Get the best status from a list of contacts
export function getBestStatus(contacts: ContactEntry[]): OutreachStatus {
  if (contacts.length === 0) return 'to_contact'

  return contacts.reduce((best, contact) => {
    return STATUS_PRIORITY[contact.status] > STATUS_PRIORITY[best]
      ? contact.status
      : best
  }, contacts[0].status)
}

// Get the most recent action date from contacts
export function getLatestActionDate(contacts: ContactEntry[]): Date {
  if (contacts.length === 0) return new Date()

  return contacts.reduce((latest, contact) => {
    return contact.lastActionAt > latest ? contact.lastActionAt : latest
  }, contacts[0].lastActionAt)
}
