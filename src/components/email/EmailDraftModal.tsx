import { useState } from 'react'

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
  draft: EmailDraft
  isOpen: boolean
  onClose: () => void
  onRegenerate: () => void
  onOpenInGmail: (draft: EmailDraft) => void
}

export function EmailDraftModal({
  contact,
  draft,
  isOpen,
  onClose,
  onRegenerate,
  onOpenInGmail
}: EmailDraftModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDraft, setEditedDraft] = useState(draft)

  if (!isOpen) return null

  const currentDraft = isEditing ? editedDraft : draft

  const handleOpenInGmail = () => {
    onOpenInGmail(currentDraft)
  }

  const handleEdit = () => {
    setEditedDraft(draft)
    setIsEditing(true)
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
              {!isEditing && (
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
            {/* To field */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">To</label>
              <p className="text-gray-900">{contact.email}</p>
            </div>

            {/* Subject field */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Subject</label>
              {isEditing ? (
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
              {isEditing ? (
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
          </div>

          {/* Footer actions */}
          {!isEditing && (
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
