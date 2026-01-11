import { useState } from 'react'
import { ExternalLink, Globe, Trash2, Building2, Users, ChevronDown } from 'lucide-react'
import { ContactRow } from './ContactRow'
import { OptionsMenu } from './OptionsMenu'
import { StatusBadge } from './StatusBadge'
import {
  getBestStatus,
  getLatestActionDate,
  type TrackerEntry,
  type ContactEntry,
  type OutreachStatus
} from './types'

interface TrackerEntryCardProps {
  entry: TrackerEntry
  onContactStatusChange: (entryId: string, contactId: string, status: OutreachStatus) => void
  onDelete: (id: string) => void
  onContactDelete: (entryId: string, contactId: string) => void
  onEmailContact: (entry: TrackerEntry, contact: ContactEntry) => void
}

export function TrackerEntryCard({ entry, onContactStatusChange, onDelete, onContactDelete, onEmailContact }: TrackerEntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const bestStatus = getBestStatus(entry.contacts)
  const latestDate = getLatestActionDate(entry.contacts)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const menuOptions = [
    {
      label: 'View Job Posting',
      icon: <ExternalLink className="w-full h-full" />,
      onClick: () => window.open(entry.jobUrl, '_blank'),
    },
    {
      label: 'View Company Website',
      icon: <Globe className="w-full h-full" />,
      onClick: () => window.open(entry.companyUrl, '_blank'),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-full h-full" />,
      onClick: () => onDelete(entry.id),
      variant: 'danger' as const,
    },
  ]

  return (
    <div className="card-static overflow-hidden">
      {/* Header - always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0"
            >
              <Building2 className="w-5 h-5 text-primary" />
            </button>
            <div className="min-w-0">
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 truncate block hover:text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {entry.company}
              </a>
              <a
                href={entry.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 truncate block hover:text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {entry.role}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={bestStatus} />
              <span className="text-xs text-gray-400">{formatDate(latestDate)}</span>
            </div>
            <OptionsMenu options={menuOptions} />
          </div>
        </div>

        {/* Contact count & expand indicator */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mt-3 pt-3 border-t border-gray-100"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{entry.contacts.length} contact{entry.contacts.length !== 1 ? 's' : ''}</span>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Contacts list */}
          <div className="px-4 py-2">
            {entry.contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onStatusChange={(status) => onContactStatusChange(entry.id, contact.id, status)}
                onEmail={() => onEmailContact(entry, contact)}
                onDelete={() => onContactDelete(entry.id, contact.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
