import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { useUser, useInvalidateUser } from '../hooks/useUser'
import { PLANS, CREDIT_PACKS } from '../components/billing'
import { createCheckoutSession } from '../api'

export function Subscription() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const invalidateUser = useInvalidateUser()
  const hasHandledSuccess = useRef(false)

  // Handle success redirect from Stripe
  useEffect(() => {
    if (searchParams.get('success') === 'true' && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true
      // Clear the query param
      setSearchParams({}, { replace: true })
      // Refresh user data to get updated subscription
      invalidateUser()
      toast.success('Payment successful!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <h1 className="text-xl font-bold text-primary">Subscription & Billing</h1>
      </div>

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
      <div className="card-static">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-primary">Current Plan</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary">{formatPlanName(plan)}</p>
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
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">Credits Remaining</span>
              <span className={`text-2xl font-bold ${isOutOfTokens ? 'text-red-600' : 'text-primary'}`}>
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
              className="w-full py-2.5 px-4 border border-primary-100 text-primary text-sm font-medium rounded-full hover:bg-primary-50 transition-colors"
            >
              Manage Subscription
            </button>
          )}

          {/* Subscribe button for trial/expired users */}
          {!isSubscribed && (
            <button
              onClick={() => navigate('/pricing', { state: { from: '/account/subscription' } })}
              className="w-full py-3 px-4 btn btn-accent-glow btn-pill font-medium"
            >
              {isExpired ? 'Resubscribe' : 'Subscribe Now'}
            </button>
          )}
        </div>
      </div>

      {/* Credit Packs (only for subscribers) */}
      {isSubscribed && (
        <div className="card-static">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary">Buy More Credits</h2>
            <p className="text-sm text-gray-500 mt-1">Credit packs never expire</p>
          </div>
          <div className="p-4 space-y-3">
            {CREDIT_PACKS.map((pack) => (
              <button
                key={pack.tokens}
                onClick={() => handleBuyTokenPack(pack.tokens)}
                disabled={isProcessing}
                className="w-full border border-primary-100 rounded-lg p-4 flex items-center justify-between hover:bg-primary-50 hover:border-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                <p className="font-semibold text-primary">{pack.tokens} Credits</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">${pack.price}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
