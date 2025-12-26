interface DomainSelectorProps {
  company: string
  domains: string[]
  onSelect: (domain: string) => void
}

export function DomainSelector({ company, domains, onSelect }: DomainSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Company Domain</h3>
        <p className="text-gray-600">
          We found multiple domains for <span className="font-medium">{company}</span>.
          Please select the correct one.
        </p>
      </div>

      <div className="space-y-2">
        {domains.map((domain) => (
          <button
            key={domain}
            onClick={() => onSelect(domain)}
            className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
          >
            <span className="text-gray-900">{domain}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
