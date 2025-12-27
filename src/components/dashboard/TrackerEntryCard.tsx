import { useState } from 'react'
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
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      ),
      onClick: () => window.open(entry.jobUrl, '_blank'),
    },
    {
      label: 'Delete',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: () => onDelete(entry.id),
      variant: 'danger' as const,
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header - always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-start gap-3 min-w-0 flex-1 text-left"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{entry.company}</h3>
              <p className="text-sm text-gray-600 truncate">{entry.role}</p>
            </div>
          </button>

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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{entry.contacts.length} contact{entry.contacts.length !== 1 ? 's' : ''}</span>
          </div>

          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
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
