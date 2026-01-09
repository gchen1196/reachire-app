import type { DomainOption } from '../../types/api'

interface DomainSelectorProps {
  company: string
  domains: DomainOption[]
  onSelect: (domain: string) => void
}

export function DomainSelector({ company, domains, onSelect }: DomainSelectorProps) {
  // Find the domain with most contacts to mark as recommended
  const maxEmailCount = Math.max(...domains.map((d) => d.emailCount))

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Company Website</h3>
        <p className="text-gray-600">
          We found multiple websites for <span className="font-medium">{company}</span>.
          Please select the correct one.
        </p>
      </div>

      <div className="space-y-3">
        {domains.map((domainOption) => {
          const isRecommended = domainOption.emailCount === maxEmailCount
          return (
            <button
              key={domainOption.domain}
              onClick={() => onSelect(domainOption.domain)}
              className={`w-full px-4 py-4 text-left rounded-lg border-2 transition-all flex items-center justify-between ${
                isRecommended
                  ? 'border-blue-200 bg-blue-50 hover:border-blue-400'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">{domainOption.domain}</span>
                  {isRecommended && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-sm">
                  {domainOption.emailCount} contacts available
                </span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}
