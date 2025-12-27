import type { OutreachStatus } from '../../api'

export interface Contact {
  id: string
  name: string
  title: string
  company: string
  email: string
  emailConfidence: number
  linkedinUrl?: string
  outreachStatus?: OutreachStatus
}

interface ContactCardProps {
  contact: Contact
  onGenerateEmail: (contact: Contact) => void
  onAddToTracker: (contact: Contact) => void
}

export function ContactCard({ contact, onGenerateEmail, onAddToTracker }: ContactCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 font-medium text-sm sm:text-base">
            {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{contact.name}</h4>
          <p className="text-sm text-gray-600 truncate">{contact.title}</p>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700 truncate">{contact.email}</span>
            </div>

            {contact.linkedinUrl && (
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="truncate">LinkedIn Profile</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onGenerateEmail(contact)}
          className="flex-1 py-2.5 px-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </button>
        <button
          onClick={() => onAddToTracker(contact)}
          disabled={!!contact.outreachStatus}
          className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            contact.outreachStatus
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {contact.outreachStatus ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Save
            </>
          )}
        </button>
      </div>
    </div>
  )
}
