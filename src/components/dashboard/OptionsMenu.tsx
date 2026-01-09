import { useState, useRef, useEffect } from 'react'

interface MenuOption {
  label: string
  icon: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
}

interface OptionsMenuProps {
  options: MenuOption[]
}

export function OptionsMenu({ options }: OptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const isInsideMobileMenu = mobileMenuRef.current?.contains(target)
      const isInsideDesktopMenu = desktopMenuRef.current?.contains(target)
      const isInsideButton = buttonRef.current?.contains(target)

      if (!isInsideMobileMenu && !isInsideDesktopMenu && !isInsideButton) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOptionClick = (option: MenuOption) => {
    option.onClick()
    setIsOpen(false)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Options"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 sm:bg-transparent"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile: Bottom sheet */}
          <div
            ref={mobileMenuRef}
            className="sm:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl"
          >
            <div className="py-2">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOptionClick(option)
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors active:bg-gray-100 ${
                    option.variant === 'danger' ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-6 h-6">{option.icon}</span>
                  <span className="text-base">{option.label}</span>
                </button>
              ))}
            </div>
            <div className="h-safe-area-inset-bottom" />
          </div>

          {/* Desktop: Dropdown positioned near button */}
          <div
            ref={desktopMenuRef}
            className="hidden sm:block absolute bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-40 z-50"
            style={{
              top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 4 : 0,
              right: buttonRef.current ? window.innerWidth - buttonRef.current.getBoundingClientRect().right : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOptionClick(option)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                  option.variant === 'danger' ? 'text-red-600' : 'text-gray-700'
                }`}
              >
                <span className="w-5 h-5">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
