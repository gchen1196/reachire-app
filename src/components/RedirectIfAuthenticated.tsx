import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode
  to?: string
}

export function RedirectIfAuthenticated({
  children,
  to = '/search'
}: RedirectIfAuthenticatedProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (user) {
    return <Navigate to={to} replace />
  }

  return <>{children}</>
}
