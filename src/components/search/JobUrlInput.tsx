import { useState } from 'react'

const UNSUPPORTED_SITES = ['LinkedIn', 'Wellfound', 'ZipRecruiter', 'Lever', 'Google']

interface JobUrlInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
  compact?: boolean
}

export function JobUrlInput({ onSubmit, isLoading = false, compact = false }: JobUrlInputProps) {
  const [url, setUrl] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a new job URL..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="px-4 py-2 bg-primary text-white text-sm rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">New Search</h1>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            onBlur={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showTooltip && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
              <p className="text-sm font-medium text-gray-900 mb-2">Unsupported sites</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {UNSUPPORTED_SITES.map((site) => (
                  <li key={site}>• {site}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a job posting link..."
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Find Contacts'}
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-gray-500 mt-4">
        1 credit per search · Only charged when contacts are found
      </p>
    </div>
  )
}
