import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function SignIn() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-sm px-4 animate-fade-in">
        {/* Modal-like card */}
        <div className="card-static p-8 shadow-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Hiredoor" className="h-9" />
            <img src="/logo_text.svg" alt="" className="h-5" />
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-primary">
              Sign in or create your account
            </h1>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            className="btn w-full gap-3 bg-white border border-gray-200 text-gray-700 py-3 px-4 hover:bg-gray-50 hover:border-primary-100 hover:shadow-md focus-ring"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary-dark transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-dark transition-colors">Privacy Policy</Link>
          </p>
        </div>

        {/* Back to home link */}
        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
