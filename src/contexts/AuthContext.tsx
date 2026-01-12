import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { upsertUser } from '../api/user'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  isSynced: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSynced, setIsSynced] = useState(false)
  const syncedUserIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Sync user to backend
    const handleUserSync = async (user: User) => {
      if (syncedUserIds.current.has(user.id)) {
        setIsSynced(true)
        return
      }
      syncedUserIds.current.add(user.id)

      try {
        await upsertUser({
          id: user.id,
          name: user.user_metadata?.full_name || user.user_metadata?.name,
        })
        setIsSynced(true)
      } catch (error) {
        console.error('Failed to sync user:', error)
        syncedUserIds.current.delete(user.id)
        setIsSynced(false)
      }
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
      if (session?.user) {
        handleUserSync(session.user)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
      if (event === 'SIGNED_IN' && session?.user) {
        handleUserSync(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/search`
      }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isSynced, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
