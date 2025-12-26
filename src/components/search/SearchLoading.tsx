export function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">Searching for contacts...</p>
    </div>
  )
}
