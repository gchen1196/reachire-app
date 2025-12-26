import { useState } from 'react'
import { StatusSelectModal } from './StatusSelectModal'
import { STATUS_CONFIG, type OutreachStatus } from './types'

interface StatusButtonProps {
  value: OutreachStatus
  onChange: (status: OutreachStatus) => void
}

export function StatusButton({ value, onChange }: StatusButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const config = STATUS_CONFIG[value]

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${config.color} ${config.bgColor} hover:opacity-80`}
      >
        {config.label}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <StatusSelectModal
        isOpen={isModalOpen}
        currentStatus={value}
        onSelect={onChange}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
