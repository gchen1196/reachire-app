import { useState, useEffect } from 'react'
import { Spinner } from '../ui'

const PROGRESS_MESSAGES = [
  { message: 'Fetching job posting...', delayMs: 0 },
  { message: 'Analyzing job details...', delayMs: 4000 },
  { message: 'Finding company contacts...', delayMs: 10000 },
  { message: 'Verifying contact information...', delayMs: 16000 },
  { message: 'Almost there...', delayMs: 22000 }
]

export function SearchLoading() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    PROGRESS_MESSAGES.forEach((_, index) => {
      if (index === 0) return

      const timer = setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentMessageIndex(index)
          setIsTransitioning(false)
        }, 150)
      }, PROGRESS_MESSAGES[index].delayMs)

      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-blue-50 rounded-full p-6 mb-6">
        <Spinner size="lg" />
      </div>
      <div className="text-center">
        <p
          className={`text-gray-800 text-lg tracking-wide transition-opacity duration-150 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {PROGRESS_MESSAGES[currentMessageIndex].message}
        </p>
        <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
      </div>
    </div>
  )
}
