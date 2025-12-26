export interface JobInfo {
  company: string
  domain: string
  role: string
  department: string
  requirements?: string
  jobUrl: string
}

interface JobDetailsProps {
  job: JobInfo
}

export function JobDetails({ job }: JobDetailsProps) {
  const companyUrl = job.domain ? `https://${job.domain}` : null

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-900 hover:text-primary truncate block"
            >
              {job.company}
            </a>
          ) : (
            <h3 className="font-semibold text-gray-900 truncate">{job.company}</h3>
          )}
          <p className="text-sm text-gray-600 truncate">{job.role}</p>
        </div>

        <a
          href={job.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 text-gray-400 hover:text-primary transition-colors"
          title="View job posting"
        >
          {/* Briefcase icon */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
