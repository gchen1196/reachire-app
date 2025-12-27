import { Spinner } from './Spinner'

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner size="lg" className="mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}
