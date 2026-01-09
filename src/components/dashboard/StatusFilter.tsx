import type { OutreachStatus } from './types'

export type FilterStatus = OutreachStatus | 'all'

interface StatusFilterProps {
  activeFilter: FilterStatus
  onFilterChange: (filter: FilterStatus) => void
  counts: Record<FilterStatus, number>
}

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'to_contact', label: 'To Contact' },
  { value: 'emailed', label: 'Emailed' },
  { value: 'replied', label: 'Replied' },
  { value: 'interviewing', label: 'Interviewing' },
]

export function StatusFilter({ activeFilter, onFilterChange, counts }: StatusFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      {FILTER_OPTIONS.map(({ value, label }) => {
        const isActive = activeFilter === value
        const count = counts[value] || 0

        return (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`btn-pill shrink-0 px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
            }`}
          >
            {label}
            <span className={`ml-1.5 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
              ({count})
            </span>
          </button>
        )
      })}
    </div>
  )
}
