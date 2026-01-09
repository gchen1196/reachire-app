interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-1 h-1',
  md: 'w-2 h-2',
  lg: 'w-3 h-3'
}

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3'
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`flex items-center ${gapClasses[size]} ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: '0ms', animationDuration: '600ms' }}
      />
      <div
        className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: '150ms', animationDuration: '600ms' }}
      />
      <div
        className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: '300ms', animationDuration: '600ms' }}
      />
    </div>
  )
}
