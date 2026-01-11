import { useState } from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import { getHideResumePrompt, setHideResumePrompt } from '../../lib/storage'

interface ResumeRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  onContinueAnyway: () => void
}

export function ResumeRequiredModal({
  isOpen,
  onClose,
  onContinueAnyway,
}: ResumeRequiredModalProps) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)

  if (!isOpen) return null

  const handleOpenResumePage = () => {
    if (doNotShowAgain) {
      setHideResumePrompt(true)
    }
    window.open('/account/resume', '_blank')
    onClose()
  }

  const handleContinueAnyway = () => {
    if (doNotShowAgain) {
      setHideResumePrompt(true)
    }
    onContinueAnyway()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Purple accent bar */}
        <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600" />

        <div className="p-6">
          {/* Icon */}
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-purple-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Upload Your Resume
          </h3>

          {/* Message */}
          <p className="text-gray-600 text-center text-sm mb-6">
            For better AI-generated emails that highlight your skills and experience,
            please upload your resume first.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleOpenResumePage}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Upload Resume
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleContinueAnyway}
              className="w-full py-2.5 px-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm"
            >
              Continue without resume
            </button>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 mt-5 cursor-pointer justify-center">
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-xs text-gray-500">Don't show this again</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export function shouldShowResumePrompt(): boolean {
  return !getHideResumePrompt()
}
