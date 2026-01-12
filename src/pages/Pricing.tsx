import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useReturnPath } from '../hooks/useReturnPath'
import { PlanSelector } from '../components/billing'
import { createCheckoutSession, createPortalSession } from '../api'
import type { SubscribablePlan } from '../types/plans'

export function Pricing() {
  const navigate = useNavigate()
  const returnPath = useReturnPath('pricing', '/')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { isLoading, plan, isSubscribed, isCancelling } = useUser()

  const handleSelectPlan = async (planId: SubscribablePlan) => {
    setIsProcessing(true)
    setError(null)
    try {
      // If already subscribed, redirect to portal for plan changes
      if (isSubscribed) {
        const { portalUrl } = await createPortalSession('/pricing')
        window.location.href = portalUrl
      } else {
        // New subscription
        const { checkoutUrl } = await createCheckoutSession({ planId })
        window.location.href = checkoutUrl
      }
    } catch (err) {
      console.error('Failed to process plan selection:', err)
      setError('Failed to process request. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleManageSubscription = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      const { portalUrl } = await createPortalSession('/pricing')
      window.location.href = portalUrl
    } catch (err) {
      console.error('Failed to open customer portal:', err)
      setError('Failed to open subscription management. Please try again.')
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header - different layout for subscribers vs non-subscribers */}
      {isSubscribed ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(returnPath)}
            className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-primary">Manage Your Plan</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Choose Your Plan</h1>
          <p className="text-gray-600 mt-2">
            Land <span className="text-accent font-medium">more interviews</span>, faster
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Cancellation pending notice */}
      {isCancelling && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-700">
            Your subscription is set to cancel at the end of the billing period.
            You can reactivate anytime before then.
          </p>
        </div>
      )}

      {/* Plan cards */}
      <PlanSelector
        onSelectPlan={handleSelectPlan}
        isProcessing={isProcessing}
        currentPlan={isSubscribed ? plan : undefined}
      />

      {/* Cancel/Manage subscription button for subscribers */}
      {isSubscribed && (
        <button
          onClick={handleManageSubscription}
          disabled={isProcessing}
          className="text-sm text-gray-500 hover:text-gray-700 text-center disabled:opacity-50"
        >
          {isProcessing ? 'Loading...' : 'Cancel or manage billing'}
        </button>
      )}

      {/* What's included */}
      <div className="card-static">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-primary">What's included in each plan?</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>1 credit = 1 job search to find up to 10 verified emails</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>AI-personalized outreach emails for each contact</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>One-click email sending directly from the app</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Track and manage all your job applications</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Only charged when contacts are found</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Additional credits available to purchase anytime</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
