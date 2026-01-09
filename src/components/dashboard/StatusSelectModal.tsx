import { STATUS_CONFIG, type OutreachStatus } from './types'

interface StatusSelectModalProps {
  isOpen: boolean
  currentStatus: OutreachStatus
  onSelect: (status: OutreachStatus) => void
  onClose: () => void
}

const STATUS_OPTIONS: OutreachStatus[] = [
  'to_contact',
  'emailed',
  'replied',
  'interviewing',
]

export function StatusSelectModal({
  isOpen,
  currentStatus,
  onSelect,
  onClose
}: StatusSelectModalProps) {
  if (!isOpen) return null

  const handleSelect = (status: OutreachStatus) => {
    onSelect(status)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal - centered on desktop, bottom sheet on mobile */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <div className="bg-white sm:rounded-lg sm:max-w-sm sm:w-full sm:mx-auto rounded-t-2xl shadow-xl">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-primary text-center">Update Status</h3>
          </div>

          {/* Options */}
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            {STATUS_OPTIONS.map((status) => {
              const config = STATUS_CONFIG[status]
              const isSelected = status === currentStatus

              return (
                <button
                  key={status}
                  onClick={() => handleSelect(status)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 sm:py-3 text-left transition-colors ${
                    isSelected ? 'bg-primary-50' : 'active:bg-gray-100 sm:hover:bg-primary-50'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${config.bgColor} ${
                    status === 'to_contact' ? 'border border-primary-100' : ''
                  }`} />
                  <span className={`flex-1 ${isSelected ? 'font-medium text-primary' : 'text-gray-700'}`}>
                    {config.label}
                  </span>
                  {isSelected && (
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile bottom padding for safe area */}
          <div className="h-safe-area-inset-bottom sm:hidden" />
        </div>
      </div>
    </div>
  )
}
