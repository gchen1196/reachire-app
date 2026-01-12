import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, X, AlertTriangle, Sparkles, Send, Lock } from 'lucide-react'
import { Spinner, ResumeRequiredModal, shouldShowResumePrompt } from '../ui'
import type { PreviousOutreach } from '../../api'
import type { EmailType } from '../../types/api'

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
  companyDomain: string
  jobUrl: string
  requirements?: string
}

interface EmailDraftModalProps {
  contact: EmailContact
  draft: EmailDraft | null
  isOpen: boolean
  isRegenerating: boolean
  hasResume?: boolean
  canGenerateAI?: boolean
  aiEmailsRemaining?: number
  aiEmailLimit?: number
  previousOutreaches?: PreviousOutreach[]
  onClose: () => void
  onDraftChange: (draft: EmailDraft) => void
  onRegenerate: (emailType: EmailType) => void
  onOpenInGmail: (draft: EmailDraft) => void
}

export function EmailDraftModal({
  contact,
  draft,
  isOpen,
  isRegenerating,
  hasResume = true,
  canGenerateAI = true,
  aiEmailsRemaining,
  aiEmailLimit,
  previousOutreaches,
  onClose,
  onDraftChange,
  onRegenerate,
  onOpenInGmail
}: EmailDraftModalProps) {
  // Animation state - triggers after mount for slide-up effect
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [pendingEmailType, setPendingEmailType] = useState<EmailType | null>(null)

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

  const handleRegenerateClick = (emailType: EmailType) => {
    // If user has no resume and hasn't dismissed the prompt, show the modal
    if (!hasResume && shouldShowResumePrompt()) {
      setPendingEmailType(emailType)
      setShowResumeModal(true)
      return
    }
    onRegenerate(emailType)
  }

  const handleContinueWithoutResume = () => {
    setShowResumeModal(false)
    if (pendingEmailType) {
      onRegenerate(pendingEmailType)
      setPendingEmailType(null)
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
                <Mail className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600" />
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
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Content - scrollable area that fills available space */}
          <div className="p-5 sm:p-4 space-y-4 sm:space-y-3 flex-1 overflow-y-auto min-h-0">
            {/* Previous outreach warning */}
            {previousOutreaches && previousOutreaches.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-2">
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 sm:w-4 sm:h-4 text-amber-600 shrink-0 mt-0.5" />
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
            <div className="px-6 py-4 pb-8 sm:p-3 sm:pb-3 border-t border-gray-100 bg-gray-50/50 shrink-0">
              <div className="flex justify-between items-center">
                {/* AI Generate segmented button */}
                {canGenerateAI ? (
                  aiEmailsRemaining !== undefined && aiEmailsRemaining <= 0 ? (
                    // Subscriber but daily limit reached
                    <div className="flex flex-col gap-1">
                      <div className="flex rounded-lg sm:rounded border border-amber-200 overflow-hidden">
                        <div className="py-3 sm:py-2 px-3 sm:px-2.5 bg-amber-50 text-amber-600 font-medium text-sm flex items-center gap-1.5 border-r border-amber-200 cursor-not-allowed">
                          <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          Quick Intro
                        </div>
                        <div className="py-3 sm:py-2 px-3 sm:px-2.5 bg-amber-50 text-amber-600 font-medium text-sm flex items-center gap-1.5 cursor-not-allowed">
                          <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          Cover Letter
                        </div>
                      </div>
                      <span className="text-xs text-amber-600">
                        Daily limit reached ({aiEmailLimit}/day). Resets at midnight UTC.
                      </span>
                    </div>
                  ) : (
                    // Can generate - show buttons with remaining count
                    <div className="flex flex-col gap-1">
                      <div className="flex rounded-lg sm:rounded border border-purple-200 overflow-hidden">
                        <button
                          onClick={() => handleRegenerateClick('intro')}
                          className="py-3 sm:py-2 px-3 sm:px-2.5 bg-purple-50/50 text-purple-700 font-medium text-sm hover:bg-purple-100 transition-colors flex items-center gap-1.5 border-r border-purple-200"
                        >
                          <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          Quick Intro
                        </button>
                        <button
                          onClick={() => handleRegenerateClick('cover-letter')}
                          className="py-3 sm:py-2 px-3 sm:px-2.5 bg-purple-50/50 text-purple-700 font-medium text-sm hover:bg-purple-100 transition-colors flex items-center gap-1.5"
                        >
                          <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          Cover Letter
                        </button>
                      </div>
                      {aiEmailsRemaining !== undefined && aiEmailLimit !== undefined && (
                        <span className="text-xs text-gray-500">
                          {aiEmailsRemaining}/{aiEmailLimit} AI emails remaining today
                        </span>
                      )}
                    </div>
                  )
                ) : (
                  // Not subscribed - show upgrade prompt
                  <div className="flex flex-col gap-1">
                    <div className="flex rounded-lg sm:rounded border border-gray-200 overflow-hidden">
                      <div className="py-3 sm:py-2 px-3 sm:px-2.5 bg-gray-50 text-gray-400 font-medium text-sm flex items-center gap-1.5 border-r border-gray-200 cursor-not-allowed">
                        <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                        Quick Intro
                      </div>
                      <div className="py-3 sm:py-2 px-3 sm:px-2.5 bg-gray-50 text-gray-400 font-medium text-sm flex items-center gap-1.5 cursor-not-allowed">
                        <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                        Cover Letter
                      </div>
                    </div>
                    <Link to="/pricing" className="text-xs text-purple-600 hover:text-purple-700">
                      Upgrade to generate AI emails
                    </Link>
                  </div>
                )}

                <button
                  onClick={handleOpenInGmail}
                  className="btn-accent-glow p-3 sm:p-2 rounded-lg sm:rounded flex items-center justify-center"
                  title="Open in Gmail"
                >
                  <Send className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resume required modal */}
      <ResumeRequiredModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onContinueAnyway={handleContinueWithoutResume}
      />
    </div>
  )
}
