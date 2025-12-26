import { useState } from 'react'

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
  onRefetch: (updatedJob: JobInfo) => void
  isLoading?: boolean
}

export function JobDetails({ job, onRefetch, isLoading = false }: JobDetailsProps) {
  const [editedJob, setEditedJob] = useState(job)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (field: keyof JobInfo, value: string) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleRefetch = () => {
    onRefetch(editedJob)
    setHasChanges(false)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Job Details</h3>
        <button
          onClick={handleRefetch}
          disabled={!hasChanges || isLoading}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refetch
        </button>
      </div>

      <div className="space-y-4">
        <EditableField
          label="Company"
          value={editedJob.company}
          onChange={(value) => handleChange('company', value)}
        />
        <EditableField
          label="Domain"
          value={editedJob.domain}
          onChange={(value) => handleChange('domain', value)}
        />
        <EditableField
          label="Role"
          value={editedJob.role}
          onChange={(value) => handleChange('role', value)}
        />
        <EditableField
          label="Department"
          value={editedJob.department}
          onChange={(value) => handleChange('department', value)}
        />

        {editedJob.requirements && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Requirements</p>
            <p className="text-sm text-gray-700">{editedJob.requirements}</p>
          </div>
        )}

        <a
          href={editedJob.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View original posting
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

interface EditableFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function EditableField({ label, value, onChange }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div>
        <label className="block text-sm text-gray-500 mb-1">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer group"
    >
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md group-hover:bg-gray-100 transition-colors">
        <span className="text-gray-900">{value || '-'}</span>
        <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </div>
    </div>
  )
}
