/**
 * All possible plan types (matches Prisma enum)
 */
export type Plan = 'free' | 'starter' | 'pro' | 'power' | 'expired'

/**
 * Plans available for subscription (excludes free and expired)
 */
export type SubscribablePlan = 'starter' | 'pro' | 'power'

/**
 * Plan configuration with pricing and features
 */
export interface PlanConfig {
  id: SubscribablePlan
  name: string
  price: number
  tokens: number
  dailyAiEmails: number
  description: string
  popular: boolean
}

/**
 * Subscription plans available for purchase
 */
export const PLANS: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 15,
    tokens: 25,
    dailyAiEmails: 15,
    description: 'Great for occasional job searching',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 35,
    tokens: 75,
    dailyAiEmails: 30,
    description: 'Best for active job seekers',
    popular: true,
  },
  {
    id: 'power',
    name: 'Power',
    price: 59,
    tokens: 150,
    dailyAiEmails: 50,
    description: 'For high-volume outreach',
    popular: false,
  },
]

/**
 * Daily AI email limits by plan (includes non-subscribable plans)
 */
export const DAILY_AI_EMAIL_LIMITS: Record<Plan, number> = {
  free: 0,
  expired: 0,
  starter: 15,
  pro: 30,
  power: 50,
}

/**
 * Get plan config by ID
 */
export function getPlanConfig(planId: SubscribablePlan): PlanConfig | undefined {
  return PLANS.find((p) => p.id === planId)
}

/**
 * Credit pack configuration
 */
export interface CreditPackConfig {
  tokens: number
  price: number // in dollars
}

/**
 * Credit packs available for purchase (only for subscribers)
 */
export const CREDIT_PACKS: CreditPackConfig[] = [
  { tokens: 50, price: 15 },
  { tokens: 100, price: 25 },
]
