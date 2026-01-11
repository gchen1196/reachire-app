import { LinkedinIcon, Trash2, Mail } from 'lucide-react'
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
            icon: <LinkedinIcon className="w-full h-full" />,
            onClick: () => window.open(contact.linkedinUrl, '_blank'),
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            label: 'Remove',
            icon: <Trash2 className="w-full h-full" />,
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
              <Mail className="w-4 h-4" />
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
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>
      )}
    </div>
  )
}
