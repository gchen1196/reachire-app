import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setHomeJobUrl } from '../lib/storage'
import { isValidUrl } from '../lib/url'

export function Home() {
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      toast.error('Please enter a job URL')
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      toast.error('Please enter a valid URL')
      return
    }

    // Save to localStorage and navigate to signin
    setHomeJobUrl(trimmedUrl)
    navigate('/signin')
  }

  return (
    <div className="flex flex-col gap-12 py-8 sm:py-12 bg-gradient-to-b from-accent-50 via-white via-40% to-white">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto p-8 sm:p-12 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
          Apply <span className="font-bold">smarter</span>.<br />Land more <span className="font-bold">interviews</span>.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Turn cold applications into warm introductions
        </p>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://company.com/job-posting"
              className="input-url"
            />
            <button
              type="submit"
              className="btn btn-accent-glow btn-pill px-8 py-3 text-lg font-semibold"
            >
              Find Contacts
            </button>
          </div>
        </form>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto w-full">
        <h2 data-aos="fade-up" className="text-2xl font-semibold text-primary text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Step 1 - Paste */}
          <div data-aos="fade-up" data-aos-delay="100" className="card bg-primary-50 p-6 text-center shadow-xl border border-gray-100/50">
            <div className="relative w-14 h-14 mx-auto mb-4">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-primary text-xs font-bold rounded-full flex items-center justify-center shadow border border-primary/20">1</span>
            </div>
            <h3 className="font-semibold text-primary mb-2">Paste a job link</h3>
            <p className="text-sm text-gray-600">
              Drop in any job posting link from Glassdoor, Indeed, or company career sites
            </p>
          </div>
          {/* Step 2 - Find */}
          <div data-aos="fade-up" data-aos-delay="200" className="card bg-accent-50 p-6 text-center shadow-xl border border-gray-100/50">
            <div className="relative w-14 h-14 mx-auto mb-4">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-accent text-xs font-bold rounded-full flex items-center justify-center shadow border border-accent/20">2</span>
            </div>
            <h3 className="font-semibold text-primary mb-2">Find contacts</h3>
            <p className="text-sm text-gray-600">
              Get verified emails to the right people at the company
            </p>
          </div>
          {/* Step 3 - Reach out */}
          <div data-aos="fade-up" data-aos-delay="300" className="card bg-green-50 p-6 text-center shadow-xl border border-gray-100/50">
            <div className="relative w-14 h-14 mx-auto mb-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-green-500 text-xs font-bold rounded-full flex items-center justify-center shadow border border-green-200">3</span>
            </div>
            <h3 className="font-semibold text-primary mb-2">Reach out</h3>
            <p className="text-sm text-gray-600">
              Generate personalized emails and track your progress in one place
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section data-aos="fade-up" className="max-w-2xl mx-auto w-full">
        <div className="card-static p-6 sm:p-8 border-l-4 border-accent">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Skip the application black hole. Reach decision makers directly.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">AI-generated emails tailored to each job and contact.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Track every email from first contact to interview.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section data-aos="fade-up" className="text-center">
        <Link
          to="/signin"
          className="btn btn-primary btn-pill px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl"
        >
          Start Finding Contacts
        </Link>
        <p className="text-sm text-gray-500 mt-4">Free to try. No credit card required.</p>
      </section>

    </div>
  )
}
