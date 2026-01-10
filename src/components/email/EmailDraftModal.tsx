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

export interface JobContext {
  role: string
  company: string
  jobUrl: string
  requirements?: string
}

interface EmailDraftModalProps {
  contact: EmailContact
  draft: EmailDraft | null
  isOpen: boolean
  isRegenerating: boolean
  previousOutreaches?: PreviousOutreach[]
  onClose: () => void
  onDraftChange: (draft: EmailDraft) => void
  onRegenerate: () => void
  onOpenInGmail: (draft: EmailDraft) => void
}

export function EmailDraftModal({
  contact,
  draft,
  isOpen,
  isRegenerating,
  previousOutreaches,
  onClose,
  onDraftChange,
  onRegenerate,
  onOpenInGmail
}: EmailDraftModalProps) {
  // Animation state - triggers after mount for slide-up effect
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the initial state is rendered before animating
      const timer = requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      return () => cancelAnimationFrame(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOpenInGmail = () => {
    if (draft) {
      onOpenInGmail(draft)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex h-full items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className={`relative w-full sm:max-w-lg sm:max-h-[90vh] bg-white sm:rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-out flex flex-col ${
            isAnimating
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Colored top accent */}
          <div className="h-1 bg-linear-to-r from-blue-500 to-blue-600" />

          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-3 border-b border-gray-100 bg-gray-50/50 shrink-0">
            <div className="flex items-center gap-3 sm:gap-2 min-w-0">
              <div className="w-11 h-11 sm:w-9 sm:h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate sm:text-sm">Email to {contact.name}</h3>
                <p className="text-sm sm:text-xs text-gray-500 truncate">{contact.title} @ {contact.company}</p>
              </div>
            </div>

            {/* Header action buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onClose}
                className="p-2 sm:p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - scrollable area that fills available space */}
          <div className="p-5 sm:p-4 space-y-4 sm:space-y-3 flex-1 overflow-y-auto min-h-0">
            {/* Previous outreach warning */}
            {previousOutreaches && previousOutreaches.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-2">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm sm:text-xs">
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
            {isRegenerating && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-8">
                <div className="bg-blue-50 rounded-full p-5 sm:p-4 mb-4 sm:mb-3">
                  <Spinner size="lg" />
                </div>
                <p className="text-gray-800 text-base sm:text-sm">Generating personalized email...</p>
              </div>
            )}

            {/* Draft content */}
            {!isRegenerating && draft && (
              <div className="bg-gray-50 rounded-xl sm:rounded-lg p-4 sm:p-3 space-y-4 sm:space-y-2 border border-gray-100">
                {/* To field */}
                <div className="flex items-center gap-3 sm:gap-2">
                  <div className="w-16 sm:w-14 text-sm sm:text-xs text-gray-500 shrink-0">To</div>
                  <div className="text-gray-900 font-medium text-sm">{contact.email}</div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Subject field - always editable */}
                <div className="flex items-start gap-3 sm:gap-2">
                  <div className="w-16 sm:w-14 text-sm sm:text-xs text-gray-500 shrink-0 pt-2 sm:pt-1.5">Subject</div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={draft.subject}
                      onChange={(e) => onDraftChange({ ...draft, subject: e.target.value })}
                      className="w-full px-3 py-2 sm:px-2 sm:py-1.5 bg-white border border-gray-200 rounded-lg sm:rounded text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Message field - always editable */}
                <div>
                  <div className="text-sm sm:text-xs text-gray-500 mb-2 sm:mb-1">Message</div>
                  <textarea
                    value={draft.body}
                    onChange={(e) => onDraftChange({ ...draft, body: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 sm:px-3 sm:py-2 bg-white border border-gray-200 rounded-lg sm:rounded text-gray-800 text-sm sm:text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          {!isRegenerating && draft && (
            <div className="p-4 pb-8 sm:p-3 sm:pb-3 border-t border-gray-100 bg-gray-50/50 space-y-3 sm:space-y-2 shrink-0">
              <button
                onClick={handleOpenInGmail}
                className="w-full py-3 sm:py-2 px-4 sm:px-3 bg-[#EA4335] text-white font-medium text-sm rounded-lg sm:rounded hover:bg-[#D93025] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                Open in Gmail
              </button>

              <button
                onClick={onRegenerate}
                className="w-full py-3 sm:py-2 px-4 sm:px-3 bg-white text-gray-700 font-medium text-sm rounded-lg sm:rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-200"
              >
                <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate Draft
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
