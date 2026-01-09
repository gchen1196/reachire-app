import { PLANS, type SubscribablePlan } from '../../types/plans'

interface PlanSelectorProps {
  onSelectPlan: (planId: SubscribablePlan) => void
  isProcessing?: boolean
  currentPlan?: string
}

export function PlanSelector({ onSelectPlan, isProcessing = false, currentPlan }: PlanSelectorProps) {
  const getButtonText = (isCurrentPlan: boolean) => {
    if (isProcessing) return 'Loading...'
    if (isCurrentPlan) return 'Current Plan'
    if (!currentPlan) return 'Subscribe'
    return 'Switch'
  }

  // Get tier-specific styling
  const getCardStyle = (planId: string, isPopular: boolean) => {
    if (planId === 'power') {
      return 'border-gold bg-gold-50'
    }
    if (isPopular) {
      return 'border-accent bg-accent-50 md:scale-105'
    }
    return 'border-primary-100 bg-white'
  }

  const getButtonStyle = (planId: string, isPopular: boolean, isCurrentPlan: boolean) => {
    if (isCurrentPlan) {
      return 'bg-gray-100 text-gray-500 cursor-not-allowed'
    }
    if (isPopular) {
      return 'btn btn-accent-glow btn-pill'
    }
    if (planId === 'power') {
      return 'bg-gold text-white hover:bg-gold-dark rounded-full'
    }
    return 'border border-primary-100 text-primary hover:bg-primary-50 rounded-full'
  }

  const getCreditsStyle = (planId: string, isPopular: boolean) => {
    if (planId === 'power') return 'text-gold'
    if (isPopular) return 'text-accent'
    return 'text-primary'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PLANS.map((plan) => {
        const isCurrentPlan = currentPlan === plan.id

        return (
          <div
            key={plan.id}
            className={`relative border-2 rounded-xl p-5 flex flex-col card-static ${getCardStyle(plan.id, plan.popular)} ${
              isCurrentPlan ? 'ring-2 ring-green-500' : ''
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}
            {plan.id === 'power' && !plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                Best Value
              </span>
            )}
            {isCurrentPlan && (
              <span className="absolute -top-3 right-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                Current
              </span>
            )}
            <div className="text-center flex-1">
              <p className="font-semibold text-primary text-lg">{plan.name}</p>
              <div className="mt-3">
                <span className="text-3xl font-bold text-primary">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className={`text-sm font-semibold mt-2 ${getCreditsStyle(plan.id, plan.popular)}`}>
                {plan.tokens} credits/month
              </p>
              <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
            </div>
            <button
              onClick={() => onSelectPlan(plan.id)}
              disabled={isProcessing || isCurrentPlan}
              className={`w-full mt-4 py-2.5 px-4 text-sm font-medium transition-colors disabled:opacity-50 ${getButtonStyle(plan.id, plan.popular, isCurrentPlan)}`}
            >
              {getButtonText(isCurrentPlan)}
            </button>
          </div>
        )
      })}
    </div>
  )
}

// Re-export from types for backwards compatibility
export { PLANS, CREDIT_PACKS, type PlanConfig, type CreditPackConfig, type SubscribablePlan } from '../../types/plans'
