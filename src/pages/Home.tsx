import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex flex-col gap-12 py-8 sm:py-12">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Apply smarter.<br />Land more interviews.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Turn cold applications into warm introductions.
        </p>
        <Link
          to="/signin"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Paste a job link</h3>
            <p className="text-sm text-gray-600">
              Drop in any job posting URL from LinkedIn, Indeed, or company sites.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Find contacts</h3>
            <p className="text-sm text-gray-600">
              Get verified emails to the right people at the company.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Reach out</h3>
            <p className="text-sm text-gray-600">
              Generate personalized emails and track your progress in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Skip the application black hole. Reach decision makers directly.</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">AI-generated emails tailored to each job and contact.</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Track every email from first contact to interview.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          to="/signin"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Start Finding Contacts
        </Link>
        <p className="text-sm text-gray-500 mt-3">Free to try. No credit card required.</p>
      </section>
    </div>
  )
}
