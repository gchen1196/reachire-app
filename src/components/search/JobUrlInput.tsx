import { useState } from 'react'

interface JobUrlInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
  compact?: boolean
}

export function JobUrlInput({ onSubmit, isLoading = false, compact = false }: JobUrlInputProps) {
  const [url, setUrl] = useState('')

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
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Find the right person to contact
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Paste a job listing URL to find decision-makers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a job listing URL..."
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="w-full sm:w-auto sm:px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Find Contacts'}
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-gray-500 mt-4">
        Supports LinkedIn, Greenhouse, Lever, Indeed, Workday, and most career pages
      </p>
    </div>
  )
}
