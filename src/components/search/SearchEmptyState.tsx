import type { ReactNode } from 'react'

interface SearchEmptyStateProps {
  icon: ReactNode
  iconBgColor: string
  title: string
  message: ReactNode
}

export function SearchEmptyState({ icon, iconBgColor, title, message }: SearchEmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  )
}
