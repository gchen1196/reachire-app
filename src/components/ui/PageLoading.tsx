import { useState, useEffect } from 'react'
import { Spinner } from './Spinner'

interface PageLoadingProps {
  message?: string
  /** Array of messages to show progressively based on elapsed time */
  progressMessages?: { message: string; delayMs: number }[]
}

const DEFAULT_PROGRESS_MESSAGES = [
  { message: 'Loading...', delayMs: 0 }
]

export function PageLoading({
  message,
  progressMessages = DEFAULT_PROGRESS_MESSAGES
}: PageLoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    // If using simple message prop, no need for timers
    if (message) return

    const timers: ReturnType<typeof setTimeout>[] = []

    // Set up timers for each message transition
    progressMessages.forEach((_, index) => {
      if (index === 0) return // First message shows immediately

      const timer = setTimeout(() => {
        setCurrentMessageIndex(index)
      }, progressMessages[index].delayMs)

      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [message, progressMessages])

  const displayMessage = message || progressMessages[currentMessageIndex]?.message || 'Loading...'

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-blue-50 rounded-full p-6 mb-6">
        <Spinner size="lg" />
      </div>
      <p className="text-gray-700 font-medium text-lg transition-opacity duration-300">
        {displayMessage}
      </p>
    </div>
  )
}
