import { ContactCard, type Contact } from './ContactCard'
import { Spinner } from '../ui'

interface ContactListProps {
  contacts: Contact[]
  onGenerateEmail: (contact: Contact) => void
  onAddToTracker: (contact: Contact) => void
  isLoading?: boolean
}

export function ContactList({
  contacts,
  onGenerateEmail,
  onAddToTracker,
  isLoading = false
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex flex-col items-center justify-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-gray-600">Searching for contacts...</p>
        </div>
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-600">No contacts found.</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting the job details and refetching.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recommended Contacts</h3>
        <span className="text-sm text-gray-500">{contacts.length} found</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onGenerateEmail={onGenerateEmail}
            onAddToTracker={onAddToTracker}
          />
        ))}
      </div>
    </div>
  )
}
