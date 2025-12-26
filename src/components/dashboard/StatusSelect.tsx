import { STATUS_CONFIG, type OutreachStatus } from './types'

interface StatusSelectProps {
  value: OutreachStatus
  onChange: (status: OutreachStatus) => void
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const config = STATUS_CONFIG[value]

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as OutreachStatus)}
      className={`appearance-none cursor-pointer px-3 py-1.5 pr-8 rounded-full text-xs font-medium border-0 ${config.color} ${config.bgColor} focus:outline-none focus:ring-2 focus:ring-primary`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.25rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.25em 1.25em',
      }}
    >
      {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  )
}
