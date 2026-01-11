import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, BarChart3, User, ChevronDown, Check } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { path: '/search', label: 'Search', icon: Search },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/account', label: 'Account', icon: User },
]

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const { user } = useAuth()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Get current page label for display
  const currentPage = NAV_ITEMS.find(item => item.path === location.pathname)

  // Hide header/footer on sign-in page
  const isSignInPage = location.pathname === '/signin'

  if (isSignInPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Hiredoor" className="h-7" />
              <img src="/logo_text.svg" alt="" className="h-5" />
            </Link>

            {/* Home page: Show Sign In button */}
            {location.pathname === '/' ? (
              !user && (
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </Link>
              )
            ) : (
              /* Other pages: Navigation dropdown */
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {currentPage ? (
                    <>
                      <currentPage.icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{currentPage.label}</span>
                    </>
                  ) : (
                    <span>Menu</span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                <div ref={menuRef}>
                  {/* Mobile: Full-width dropdown below header */}
                  <div
                    className="sm:hidden fixed left-0 right-0 top-14 bg-white border-b border-gray-200 shadow-lg z-20"
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = location.pathname === item.path
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-4 px-6 py-4 text-base transition-colors ${
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-700 active:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-6 h-6" />
                          {item.label}
                          {isActive && (
                            <Check className="w-5 h-5 ml-auto" />
                          )}
                        </Link>
                      )
                    })}
                    {!user && (
                      <Link
                        to="/signin"
                        className={`flex items-center gap-4 px-6 py-4 text-base transition-colors ${
                          location.pathname === '/signin'
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 active:bg-gray-100'
                        }`}
                      >
                        <User className="w-6 h-6" />
                        Sign In
                      </Link>
                    )}
                  </div>

                  {/* Desktop: Positioned dropdown */}
                  <div
                    className="hidden sm:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = location.pathname === item.path
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.label}
                          {isActive && (
                            <Check className="w-4 h-4 ml-auto" />
                          )}
                        </Link>
                      )
                    })}
                    {!user && (
                      <Link
                        to="/signin"
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          location.pathname === '/signin'
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-1 text-sm text-gray-500">
            <span>© 2025 Hiredoor</span>
            <span>·</span>
            <Link to="/terms" className="hover:text-gray-700">Terms</Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
