import { Spinner } from '../ui'

export function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner size="lg" className="mb-4" />
      <p className="text-gray-600">Searching for contacts...</p>
    </div>
  )
}
