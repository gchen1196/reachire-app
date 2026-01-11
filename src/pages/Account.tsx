import { Link } from 'react-router-dom'
import { FileText, CreditCard, Coins, ChevronRight, LogOut } from 'lucide-react'
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
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Resume</p>
              <p className="text-sm text-gray-500">Upload or update your resume</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Subscription Section */}
        <Link
          to="/account/subscription"
          className="card-static p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Subscription & Billing</p>
              <p className="text-sm text-gray-500">Manage your plan and payment</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Credits Section */}
        <Link
          to="/account/credits"
          className="card-static p-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Credits</p>
              <p className="text-sm text-gray-500">View usage and buy more</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>

      {/* Sign Out */}
      <div className="pt-4">
        <button
          onClick={signOut}
          className="w-full card-static p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <LogOut className="w-5 h-5 text-gray-500" />
          </div>
          <span className="font-medium text-gray-700">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
