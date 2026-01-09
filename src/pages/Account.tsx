import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUser } from '../hooks/useUser'
import { PLANS } from '../types/plans'

export function Account() {
  const { user, signOut } = useAuth()
  const { plan, totalTokens, isSubscribed, isFree, isExpired } = useUser()

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'User'
  const userEmail = user?.email || ''
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Get display name for the plan
  const planDisplayName = PLANS.find((p) => p.id === plan)?.name || (isFree ? 'Free' : isExpired ? 'Expired' : plan)

  // Get plan badge colors - progression from subtle to premium
  const getPlanBadgeClass = () => {
    switch (plan) {
      case 'power':
        return 'bg-gold-50 text-gold'
      case 'pro':
        return 'bg-accent-50 text-accent'
      case 'starter':
        return 'bg-primary-50 text-primary'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* User Header */}
      <div className="card-static p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
            <span className="text-primary font-semibold text-xl">{userInitials}</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-primary truncate">{userName}</h1>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanBadgeClass()}`}>
                {planDisplayName} Plan
              </span>
              {isSubscribed && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Active
                </span>
              )}
              {isExpired && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Expired
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan/10 text-primary">
                {totalTokens} credits
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Sections */}
      <div className="space-y-3">
        {/* Resume Section */}
        <Link
          to="/account/resume"
          className="card-static p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-primary">Resume</p>
              <p className="text-sm text-gray-500">Upload or update your resume</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Subscription Section */}
        <Link
          to="/account/subscription"
          className="card-static p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-primary">Subscription & Billing</p>
              <p className="text-sm text-gray-500">Manage your plan and payment</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Credits Section */}
        <Link
          to="/account/credits"
          className="card-static p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-primary">Credits</p>
              <p className="text-sm text-gray-500">View usage and buy more</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Sign Out */}
      <div className="pt-4">
        <button
          onClick={signOut}
          className="w-full card-static p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-medium text-gray-700">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
