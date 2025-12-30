import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { PLANS, CREDIT_PACKS } from '../components/billing'
import { createCheckoutSession } from '../api'

export function Subscription() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    userData,
    isLoading,
    plan,
    isSubscribed,
    isFree,
    isExpired,
    totalTokens,
    isOutOfTokens,
    cancelAt,
    isCancelling,
  } = useUser()

  const handleBuyTokenPack = async (tokens: number) => {
    setIsProcessing(true)
    try {
      const { checkoutUrl } = await createCheckoutSession({ tokenPack: String(tokens) })
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      setIsProcessing(false)
    }
  }


  const formatPlanName = (planName: string) => {
    if (planName === 'free') return 'Free'
    if (planName === 'expired') return 'Expired'
    return planName.charAt(0).toUpperCase() + planName.slice(1)
  }

  const formatResetDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getPlanBadge = () => {
    if (isCancelling && cancelAt) {
      const cancelDate = cancelAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      return { text: `Ends ${cancelDate}`, className: 'bg-amber-100 text-amber-700' }
    }
    if (isSubscribed) {
      return { text: 'Active', className: 'bg-green-100 text-green-700' }
    }
    if (isExpired) {
      return { text: 'Expired', className: 'bg-red-100 text-red-700' }
    }
    // For free users, no badge needed since the plan name already says "Free"
    return null
  }

  const badge = getPlanBadge()

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

      <h1 className="text-2xl font-bold text-gray-900">Subscription & Billing</h1>

      {/* Cancellation notice */}
      {isCancelling && cancelAt && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-700">
            Your subscription ends on {cancelAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
            Your {userData?.tokensRemaining ?? 0} remaining monthly credits will expire on this date.
            {userData?.bonusTokens && userData.bonusTokens > 0 && (
              <> Your {userData.bonusTokens} bonus credits will not expire.</>
            )}
          </p>
        </div>
      )}

      {/* Current Plan & Credits */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Current Plan</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{formatPlanName(plan)}</p>
              {isSubscribed && (
                <p className="text-sm text-gray-500">
                  ${PLANS.find(p => p.id === plan)?.price ?? 0}/month
                </p>
              )}
            </div>
            {badge && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
                {badge.text}
              </span>
            )}
          </div>

          {/* Credit balance */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Credits Remaining</span>
              <span className={`text-2xl font-bold ${isOutOfTokens ? 'text-red-600' : 'text-gray-900'}`}>
                {totalTokens}
              </span>
            </div>
            {userData && (
              <div className="text-xs text-gray-500 space-y-1">
                {isSubscribed && (
                  <p>Monthly: {userData.tokensRemaining} credits</p>
                )}
                {userData.bonusTokens > 0 && (
                  <p>Bonus: {userData.bonusTokens} credits (never expire)</p>
                )}
                {isSubscribed && userData.tokensResetAt && (
                  <p>Resets: {formatResetDate(userData.tokensResetAt)}</p>
                )}
                {isFree && totalTokens > 0 && (
                  <p>Trial credits included with your free account</p>
                )}
                {isFree && totalTokens === 0 && (
                  <p>Subscribe to get monthly credits</p>
                )}
              </div>
            )}
          </div>

          {/* Manage subscription button (only for subscribers) */}
          {isSubscribed && (
            <button
              onClick={() => navigate('/pricing', { state: { from: '/account/subscription' } })}
              className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manage Subscription
            </button>
          )}

          {/* Subscribe button for trial/expired users */}
          {!isSubscribed && (
            <button
              onClick={() => navigate('/pricing', { state: { from: '/account/subscription' } })}
              className="w-full py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isExpired ? 'Resubscribe' : 'Subscribe Now'}
            </button>
          )}
        </div>
      </div>

      {/* Credit Packs (only for subscribers) */}
      {isSubscribed && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Buy More Credits</h2>
            <p className="text-sm text-gray-500 mt-1">Credit packs never expire</p>
          </div>
          <div className="p-4 space-y-3">
            {CREDIT_PACKS.map((pack) => (
              <div
                key={pack.tokens}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{pack.tokens} Credits</p>
                  <p className="text-sm text-gray-500">
                    ${(pack.price / pack.tokens).toFixed(2)}/credit
                  </p>
                </div>
                <button
                  onClick={() => handleBuyTokenPack(pack.tokens)}
                  disabled={isProcessing}
                  className="py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  ${pack.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
