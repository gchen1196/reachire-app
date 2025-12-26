export function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Reachire
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your platform for connecting talent with opportunities.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-gray-900 text-lg">Search</h2>
          <p className="text-gray-600 mt-2">
            Find the right candidates or opportunities.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-gray-900 text-lg">Connect</h2>
          <p className="text-gray-600 mt-2">
            Reach out and build meaningful connections.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-gray-900 text-lg">Track</h2>
          <p className="text-gray-600 mt-2">
            Monitor your progress with our dashboard.
          </p>
        </div>
      </section>
    </div>
  )
}
