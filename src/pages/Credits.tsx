import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

// Mock usage data
const MOCK_USAGE_HISTORY = [
  { id: '1', date: '2024-12-28', description: 'Search: Software Engineer at Stripe', credits: 1 },
  { id: '2', date: '2024-12-27', description: 'Search: Product Manager at Figma', credits: 1 },
  { id: '3', date: '2024-12-26', description: 'Search: Frontend Developer at Vercel', credits: 1 },
  { id: '4', date: '2024-12-25', description: 'Search: Data Scientist at OpenAI', credits: 1 },
  { id: '5', date: '2024-12-24', description: 'Search: Backend Engineer at Notion', credits: 1 },
]

export function Credits() {
  const navigate = useNavigate()
  const { totalTokens, isFree, isSubscribed, isLoading } = useUser()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Link
          to="/account"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Account</span>
        </Link>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        to="/account"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Account</span>
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Credits</h1>

      {/* Credits Balance */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Available Credits</p>
            <p className="text-4xl font-bold text-gray-900 mt-1">{totalTokens}</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        {isSubscribed && (
          <button
            onClick={() => navigate('/account/subscription')}
            className="mt-4 w-full py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Buy More Credits
          </button>
        )}
      </div>

      {/* Upgrade prompt for free users */}
      {isFree && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Get more credits</h3>
              <p className="text-sm text-gray-600 mt-1">
                Upgrade to a paid plan to get monthly credits and unlock unlimited job searches.
              </p>
              <button
                onClick={() => navigate('/pricing', { state: { from: '/account/credits' } })}
                className="mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Usage History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Usage History</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {MOCK_USAGE_HISTORY.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">No usage history yet</p>
              <p className="text-sm text-gray-400 mt-1">Your credit usage will appear here</p>
            </div>
          ) : (
            MOCK_USAGE_HISTORY.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(item.date)}</p>
                </div>
                <span className="text-sm font-medium text-gray-600 ml-4">-{item.credits}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
