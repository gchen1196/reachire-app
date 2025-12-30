import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook to capture a return path from navigation state on initial mount.
 * Useful for "Go back" buttons that should return to the original page,
 * even if the user navigates away (e.g., to an external site like Stripe)
 * and comes back.
 *
 * Uses sessionStorage to persist the return path across external navigations
 * (like Stripe checkout) that would otherwise lose React Router state.
 *
 * @param key - Unique storage key for this return path
 * @param fallback - Default path if no state is provided (defaults to '/')
 * @returns The captured return path
 *
 * @example
 * // In the source page:
 * navigate('/pricing', { state: { from: '/subscription' } })
 *
 * // In the target page:
 * const returnPath = useReturnPath('pricing', '/home')
 * <button onClick={() => navigate(returnPath)}>Go back</button>
 */
export function useReturnPath(key: string, fallback: string = '/'): string {
  const location = useLocation()
  const storageKey = `returnPath:${key}`

  // Read synchronously to avoid returning fallback on first render
  const stateFrom = (location.state as { from?: string })?.from
  const stored = sessionStorage.getItem(storageKey)

  // Determine the return path: state > stored > fallback
  const returnPath = stateFrom || stored || fallback

  // Persist state to sessionStorage for external navigations (e.g., Stripe)
  useEffect(() => {
    if (stateFrom) {
      sessionStorage.setItem(storageKey, stateFrom)
    }
  }, [stateFrom, storageKey])

  return returnPath
}
