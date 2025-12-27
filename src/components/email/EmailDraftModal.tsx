import { useState, useEffect } from 'react'
import { Spinner } from '../ui'
import type { PreviousOutreach } from '../../api'

export interface EmailDraft {
  to: string
  subject: string
  body: string
}

export interface EmailContact {
  name: string
  title: string
  company: string
  email: string
}

interface EmailDraftModalProps {
  contact: EmailContact
  draft: EmailDraft | null
  isOpen: boolean
  isLoading: boolean
  previousOutreaches?: PreviousOutreach[]
  onClose: () => void
  onRegenerate: () => void
  onOpenInGmail: (draft: EmailDraft) => void
}

export function EmailDraftModal({
  contact,
  draft,
  isOpen,
  isLoading,
  previousOutreaches,
  onClose,
  onRegenerate,
  onOpenInGmail
}: EmailDraftModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDraft, setEditedDraft] = useState<EmailDraft | null>(draft)

  // Reset edited draft when draft changes
  useEffect(() => {
    if (draft) {
      setEditedDraft(draft)
      setIsEditing(false)
    }
  }, [draft])

  if (!isOpen) return null

  const currentDraft = isEditing ? editedDraft : draft

  const handleOpenInGmail = () => {
    if (currentDraft) {
      onOpenInGmail(currentDraft)
    }
  }

  const handleEdit = () => {
    if (draft) {
      setEditedDraft(draft)
      setIsEditing(true)
    }
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedDraft(draft)
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="relative w-full sm:max-w-lg bg-white sm:rounded-lg shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">Email to {contact.name}</h3>
                <p className="text-sm text-gray-500 truncate">{contact.title} @ {contact.company}</p>
              </div>
            </div>

            {/* Header action buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!isEditing && !isLoading && draft && (
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Previous outreach warning */}
            {previousOutreaches && previousOutreaches.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">Previously contacted</p>
                    <p className="text-amber-700 mt-1">
                      You've emailed {contact.name} before for:
                    </p>
                    <ul className="mt-1 space-y-0.5 text-amber-700">
                      {previousOutreaches.map((o, i) => (
                        <li key={i}>
                          {o.jobTitle || 'Unknown role'}
                          {o.sentAt && ` (${new Date(o.sentAt).toLocaleDateString()})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Spinner className="mb-4" />
                <p className="text-gray-600 text-sm">Generating personalized email...</p>
              </div>
            )}

            {/* Draft content */}
            {!isLoading && currentDraft && (
              <>
                {/* To field */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">To</label>
                  <p className="text-gray-900">{contact.email}</p>
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Subject</label>
                  {isEditing && editedDraft ? (
                    <input
                      type="text"
                      value={editedDraft.subject}
                      onChange={(e) => setEditedDraft({ ...editedDraft, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                      {currentDraft.subject}
                    </div>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Message</label>
                  {isEditing && editedDraft ? (
                    <textarea
                      value={editedDraft.body}
                      onChange={(e) => setEditedDraft({ ...editedDraft, body: e.target.value })}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900 whitespace-pre-wrap text-sm leading-relaxed">
                      {currentDraft.body}
                    </div>
                  )}
                </div>

                {/* Edit mode buttons */}
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 py-2 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer actions */}
          {!isEditing && !isLoading && draft && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <button
                onClick={onRegenerate}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate
              </button>

              <button
                onClick={handleOpenInGmail}
                className="w-full py-3 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Open in Gmail
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
