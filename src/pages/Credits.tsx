import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Coins, Zap, ClipboardList } from 'lucide-react'
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
          <ChevronLeft className="w-5 h-5" />
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
          <ChevronLeft className="w-5 h-5" />
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
            <Coins className="w-8 h-8 text-primary" />
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
              <Zap className="w-5 h-5 text-accent" />
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
              <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
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
