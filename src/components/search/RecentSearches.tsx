export interface RecentSearch {
  id: string
  company: string
  role: string
  contactCount: number
  searchedAt: Date
}

interface RecentSearchesProps {
  searches: RecentSearch[]
  onSelect: (search: RecentSearch) => void
}

export function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="w-full">
      <h3 className="font-semibold text-gray-900 mb-3">Recent Searches</h3>
      <div className="space-y-2">
        {searches.map((search) => (
          <button
            key={search.id}
            onClick={() => onSelect(search)}
            className="w-full text-left bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{search.company}</p>
                  <p className="text-sm text-gray-600 truncate">{search.role}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-sm text-gray-500">{search.contactCount} contacts</p>
                <p className="text-xs text-gray-400">{formatDate(search.searchedAt)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
