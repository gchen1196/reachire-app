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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PLANS.map((plan) => {
        const isCurrentPlan = currentPlan === plan.id

        return (
          <div
            key={plan.id}
            className={`relative border rounded-lg p-5 flex flex-col ${
              plan.popular ? 'border-primary bg-primary/5 md:scale-105 md:shadow-lg' : 'border-gray-200'
            } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-0.5 rounded-full">
                Most Popular
              </span>
            )}
            {isCurrentPlan && (
              <span className="absolute -top-2.5 right-4 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                Current Plan
              </span>
            )}
            <div className="text-center flex-1">
              <p className="font-semibold text-gray-900 text-lg">{plan.name}</p>
              <div className="mt-3">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-primary font-medium mt-2">{plan.tokens} credits/month</p>
              <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
            </div>
            <button
              onClick={() => onSelectPlan(plan.id)}
              disabled={isProcessing || isCurrentPlan}
              className={`w-full mt-4 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
                isCurrentPlan
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
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
