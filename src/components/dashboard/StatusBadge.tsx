import { STATUS_CONFIG, type OutreachStatus } from './types'

interface StatusBadgeProps {
  status: OutreachStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bgColor}`}>
      {config.label}
    </span>
  )
}
