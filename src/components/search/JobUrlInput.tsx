import { useState } from 'react'
import { toast } from 'sonner'
import { isValidUrl } from '../../lib/url'

const UNSUPPORTED_SITES = ['LinkedIn', 'Wellfound', 'ZipRecruiter', 'Lever', 'Google']

interface JobUrlInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
  compact?: boolean
  initialUrl?: string
}

export function JobUrlInput({ onSubmit, isLoading = false, compact = false, initialUrl = '' }: JobUrlInputProps) {
  const [url, setUrl] = useState(initialUrl)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      toast.error('Please enter a job URL')
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      toast.error('Please enter a valid URL')
      return
    }

    onSubmit(trimmedUrl)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="card-static p-3 flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://company.com/job-posting"
            className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-cyan transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="w-full animate-fade-in">
      {/* Search card container */}
      <div className="card-static bg-gradient-to-br from-white to-primary-50 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-primary">Find Contacts</h1>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onBlur={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {showTooltip && (
              <div className="absolute left-0 top-full mt-2 w-56 card-static p-3 z-10 border-l-2 border-accent">
                <p className="text-sm font-medium text-primary mb-2">Unsupported sites</p>
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
          <div className="flex flex-col gap-4">
            {/* Enhanced search input */}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://company.com/job-posting"
              className="input-url"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="btn btn-accent-glow btn-pill w-full py-4 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          <span className="inline-flex items-center gap-1">
            1 credit per search · Only charged when contacts are found
          </span>
        </p>
      </div>
    </div>
  )
}
