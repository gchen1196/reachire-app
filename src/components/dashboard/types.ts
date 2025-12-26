export type OutreachStatus =
  | 'to_contact'
  | 'emailed'
  | 'followed_up'
  | 'replied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'no_response'

export interface ContactEntry {
  id: string
  name: string
  title: string
  email: string
  status: OutreachStatus
  lastActionAt: Date
  notes?: string
}

export interface TrackerEntry {
  id: string
  company: string
  role: string
  jobUrl: string
  contacts: ContactEntry[]
}

// Status priority for determining "best" status (higher = better)
export const STATUS_PRIORITY: Record<OutreachStatus, number> = {
  offer: 8,
  interviewing: 7,
  replied: 6,
  followed_up: 5,
  emailed: 4,
  to_contact: 3,
  no_response: 2,
  rejected: 1,
}

export const STATUS_CONFIG: Record<OutreachStatus, { label: string; color: string; bgColor: string }> = {
  to_contact: { label: 'To Contact', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  emailed: { label: 'Emailed', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  followed_up: { label: 'Followed Up', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  replied: { label: 'Replied', color: 'text-green-700', bgColor: 'bg-green-100' },
  interviewing: { label: 'Interviewing', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  offer: { label: 'Offer', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  rejected: { label: 'Rejected', color: 'text-red-700', bgColor: 'bg-red-100' },
  no_response: { label: 'No Response', color: 'text-gray-500', bgColor: 'bg-gray-100' },
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
