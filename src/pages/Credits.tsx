import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useTokenUsage } from '../hooks/useTokenUsage'

export function Credits() {
  const navigate = useNavigate()
  const { totalTokens, isFree, isSubscribed, isLoading } = useUser()
  const { data: tokenUsageData, isLoading: isUsageLoading } = useTokenUsage()

  const usageHistory = tokenUsageData?.usage ?? []

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Link
          to="/account"
          className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/account"
          className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-primary">Credits</h1>
      </div>

      {/* Credits Balance */}
      <div className="card-static p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Available Credits</p>
            <p className="text-4xl font-bold text-primary mt-1">{totalTokens}</p>
          </div>
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        {isSubscribed && (
          <button
            onClick={() => navigate('/account/subscription')}
            className="mt-4 w-full py-2.5 px-4 border border-primary-100 text-primary text-sm font-medium rounded-full hover:bg-primary-50 transition-colors"
          >
            Buy More Credits
          </button>
        )}
      </div>

      {/* Upgrade prompt for free users */}
      {isFree && (
        <div className="bg-accent-50 rounded-lg p-6 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary">Get more credits</h3>
              <p className="text-sm text-gray-600 mt-1">
                Upgrade to a paid plan to get monthly credits and unlock unlimited job searches.
              </p>
              <button
                onClick={() => navigate('/pricing', { state: { from: '/account/credits' } })}
                className="mt-4 btn btn-accent-glow btn-pill px-5 py-2.5 text-sm font-medium"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Usage History */}
      <div className="card-static">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-primary">Usage History</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {isUsageLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : usageHistory.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">No usage history yet</p>
              <p className="text-sm text-gray-400 mt-1">Your credit usage will appear here</p>
            </div>
          ) : (
            usageHistory.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {item.action === 'job_search' ? 'Job Search' : item.action}
                    {item.jobUrl && `: ${new URL(item.jobUrl).hostname}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(item.createdAt)}</p>
                </div>
                <span className="text-sm font-semibold text-red-600 ml-4">-1</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
