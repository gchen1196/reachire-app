import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { getUser, type UserResponse } from '../api/user'
import { DAILY_AI_EMAIL_LIMITS, type Plan } from '../types/plans'

const USER_QUERY_KEY = 'user'

export function useUser() {
  const { user: authUser } = useAuth()

  const query = useQuery({
    queryKey: [USER_QUERY_KEY, authUser?.id],
    queryFn: () => getUser(authUser!.id),
    enabled: !!authUser?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes - user data should be relatively fresh
  })

  const userData = query.data

  // Derived state for convenience
  const plan = userData?.plan ?? 'free'
  const isSubscribed = plan === 'starter' || plan === 'pro' || plan === 'power'
  const isFree = plan === 'free'
  const isExpired = plan === 'expired'
  const totalTokens = (userData?.tokensRemaining ?? 0) + (userData?.bonusTokens ?? 0)
  const isOutOfTokens = totalTokens <= 0

  // Check if subscription is scheduled to cancel
  const cancelAt = userData?.cancelAt ? new Date(userData.cancelAt) : null
  const isCancelling = cancelAt !== null && isSubscribed

  // Check if user needs to subscribe (expired OR free user out of tokens)
  const needsSubscription = isExpired || (isFree && isOutOfTokens)

  // AI email usage - check if reset is needed
  const aiEmailLimit = DAILY_AI_EMAIL_LIMITS[plan as Plan] ?? 0
  const resetAt = userData?.aiEmailsResetAt ? new Date(userData.aiEmailsResetAt) : null
  const shouldReset = !resetAt || new Date() >= resetAt
  const aiEmailsUsed = shouldReset ? 0 : (userData?.aiEmailsToday ?? 0)
  const aiEmailsRemaining = Math.max(0, aiEmailLimit - aiEmailsUsed)
  const canGenerateAiEmail = aiEmailLimit > 0 && aiEmailsUsed < aiEmailLimit

  return {
    // Raw query state
    ...query,
    userData,

    // Derived state
    plan,
    isSubscribed,
    isFree,
    isExpired,
    totalTokens,
    isOutOfTokens,
    cancelAt,
    isCancelling,
    needsSubscription,

    // AI email usage
    aiEmailLimit,
    aiEmailsUsed,
    aiEmailsRemaining,
    canGenerateAiEmail,
  }
}

// Hook to invalidate user data (call after token consumption, subscription change, etc.)
export function useInvalidateUser() {
  const queryClient = useQueryClient()
  const { user: authUser } = useAuth()

  return () => {
    if (authUser?.id) {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY, authUser.id] })
    }
  }
}

export type { UserResponse }
