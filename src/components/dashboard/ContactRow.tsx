import { OptionsMenu } from './OptionsMenu'
import { StatusButton } from './StatusButton'
import type { ContactEntry, OutreachStatus } from './types'

interface ContactRowProps {
  contact: ContactEntry
  onStatusChange: (status: OutreachStatus) => void
  onEmail?: () => void
  onDelete?: () => void
}

export function ContactRow({ contact, onStatusChange, onEmail, onDelete }: ContactRowProps) {
  const showEmailButton = contact.status === 'to_contact'

  const menuOptions = [
    ...(contact.linkedinUrl
      ? [
          {
            label: 'View LinkedIn',
            icon: (
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            ),
            onClick: () => window.open(contact.linkedinUrl, '_blank'),
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            label: 'Remove',
            icon: (
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ),
            onClick: onDelete,
            variant: 'danger' as const,
          },
        ]
      : []),
  ]

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      {/* Contact info row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-medium">
              {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-sm truncate">{contact.name}</p>
            <p className="text-xs text-gray-500 truncate">{contact.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Email button - circle icon on desktop, hidden on mobile */}
          {showEmailButton && onEmail && (
            <button
              onClick={onEmail}
              className="hidden sm:flex w-8 h-8 bg-accent text-white rounded-full items-center justify-center hover:bg-accent-dark transition-colors"
              title="Send email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          <StatusButton value={contact.status} onChange={onStatusChange} />
          {menuOptions.length > 0 && <OptionsMenu options={menuOptions} />}
        </div>
      </div>

      {/* Email button row - mobile only */}
      {showEmailButton && onEmail && (
        <div className="mt-3 flex justify-center sm:hidden">
          <button
            onClick={onEmail}
            className="btn btn-accent btn-pill px-5 py-2 text-sm gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
        </div>
      )}
    </div>
  )
}
