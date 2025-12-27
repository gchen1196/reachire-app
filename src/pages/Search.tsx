import { useState } from 'react'
import { toast } from 'sonner'
import {
  JobUrlInput,
  JobDetails,
  ContactList,
  SearchLoading,
  SearchError,
  DomainSelector,
  SearchEmptyState,
  type JobInfo,
  type Contact
} from '../components/search'
import { EmailDraftModal, type EmailDraft, type EmailContact } from '../components/email'
import { useSearchJob } from '../hooks/useSearchJob'
import { useGenerateEmail } from '../hooks/useGenerateEmail'
import type { ApiJob, ApiContact, SearchJobResponse } from '../types/api'

// Helper to convert API types to frontend types
function apiJobToJobInfo(job: ApiJob): JobInfo {
  return {
    company: job.company,
    domain: job.companyDomain || '',
    role: job.role,
    department: job.department || '',
    requirements: job.requirementsSummary || undefined,
    jobUrl: job.url
  }
}

function apiContactToContact(contact: ApiContact, company: string): Contact {
  return {
    id: contact.id,
    name: contact.fullName || '',
    title: contact.title || '',
    company,
    email: contact.email,
    emailConfidence: contact.emailConfidence,
    linkedinUrl: contact.linkedinUrl || undefined
  }
}

type SearchState =
  | 'initial'
  | 'loading'
  | 'results'
  | 'domain_selection'
  | 'no_contacts'
  | 'domain_not_found'
  | 'error'


export function Search() {
  const [searchState, setSearchState] = useState<SearchState>('initial')
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [availableDomains, setAvailableDomains] = useState<string[]>([])
  const [searchError, setSearchError] = useState<string>('')

  // Email modal state
  const [selectedContact, setSelectedContact] = useState<EmailContact | null>(null)
  const [emailDraft, setEmailDraft] = useState<EmailDraft | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const searchMutation = useSearchJob()
  const emailMutation = useGenerateEmail()

  const handleSearchResponse = (response: SearchJobResponse) => {
    switch (response.status) {
      case 'success':
        setJobInfo(apiJobToJobInfo(response.job))
        setContacts(response.contacts.map(c => apiContactToContact(c, response.job.company)))
        setSearchState('results')
        break

      case 'domain_selection_required':
        setJobInfo(apiJobToJobInfo(response.job))
        setAvailableDomains(response.domains)
        setSearchState('domain_selection')
        break

      case 'domain_not_found':
        setJobInfo(apiJobToJobInfo(response.job))
        setSearchState('domain_not_found')
        break

      case 'no_contacts_found':
        setJobInfo(apiJobToJobInfo(response.job))
        setContacts([])
        setSearchState('no_contacts')
        break

      case 'parsing_failed':
        setSearchError(response.error)
        setSearchState('error')
        break
    }
  }

  const handleUrlSubmit = (url: string) => {
    setCurrentUrl(url)
    setSearchState('loading')
    setSearchError('')

    searchMutation.mutate(
      { url },
      {
        onSuccess: handleSearchResponse,
        onError: (error) => {
          const message = error instanceof Error ? error.message : 'An unexpected error occurred'
          setSearchError(message)
          setSearchState('error')
          toast.error(message)
        }
      }
    )
  }

  const handleDomainSelect = (domain: string) => {
    setSearchState('loading')

    searchMutation.mutate(
      { url: currentUrl, selectedDomain: domain },
      {
        onSuccess: handleSearchResponse,
        onError: (error) => {
          const message = error instanceof Error ? error.message : 'An unexpected error occurred'
          setSearchError(message)
          setSearchState('error')
          toast.error(message)
        }
      }
    )
  }

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
    setSelectedContact(null)
    setEmailDraft(null)
    emailMutation.reset()
  }

  const generateEmailDraft = (contact: EmailContact) => {
    if (!jobInfo) return

    setEmailDraft(null)

    emailMutation.mutate(
      {
        jobTitle: jobInfo.role,
        companyName: jobInfo.company,
        companyDescription: jobInfo.requirements,
        jobUrl: jobInfo.jobUrl,
        contactName: contact.name,
        contactFirstName: contact.name.split(' ')[0]
      },
      {
        onSuccess: (data) => {
          setEmailDraft({
            to: contact.email,
            subject: data.subject,
            body: data.body
          })
          toast.success('Email draft generated')
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Failed to generate email')
          handleCloseEmailModal()
        }
      }
    )
  }

  const handleGenerateEmail = (contact: Contact) => {
    if (!jobInfo) return

    const emailContact: EmailContact = {
      name: contact.name,
      title: contact.title,
      company: contact.company,
      email: contact.email
    }

    setSelectedContact(emailContact)
    setIsEmailModalOpen(true)
    generateEmailDraft(emailContact)
  }

  const handleRegenerateDraft = () => {
    if (!selectedContact) return
    generateEmailDraft(selectedContact)
  }

  const handleOpenInGmail = (draft: EmailDraft) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(draft.to)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
    window.open(gmailUrl, '_blank')
  }

  const handleAddToTracker = (contact: Contact) => {
    // TODO: Implement add to tracker
    console.log('Add to tracker:', contact)
  }

  const handleBackToSearch = () => {
    setSearchState('initial')
    setJobInfo(null)
    setContacts([])
    setCurrentUrl('')
    setAvailableDomains([])
    setSearchError('')
  }

  if (searchState === 'initial') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        <JobUrlInput onSubmit={handleUrlSubmit} />
      </div>
    )
  }

  // Loading state
  if (searchState === 'loading') {
    return <SearchLoading />
  }

  // Error state
  if (searchState === 'error') {
    return <SearchError message={searchError} onRetry={handleBackToSearch} />
  }

  // Domain selection state
  if (searchState === 'domain_selection' && jobInfo) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <JobUrlInput onSubmit={handleUrlSubmit} compact />
        <DomainSelector
          company={jobInfo.company}
          domains={availableDomains}
          onSelect={handleDomainSelect}
        />
      </div>
    )
  }

  // Domain not found state
  if (searchState === 'domain_not_found' && jobInfo) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <JobUrlInput onSubmit={handleUrlSubmit} compact />
        <JobDetails job={jobInfo} />
        <SearchEmptyState
          icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          iconBgColor="bg-yellow-100"
          title="Domain Not Found"
          message={<>We couldn't find a domain for <span className="font-medium">{jobInfo.company}</span>.</>}
        />
      </div>
    )
  }

  // No contacts found state
  if (searchState === 'no_contacts' && jobInfo) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <JobUrlInput onSubmit={handleUrlSubmit} compact />
        <JobDetails job={jobInfo} />
        <SearchEmptyState
          icon={<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          iconBgColor="bg-gray-100"
          title="No Contacts Found"
          message={<>We couldn't find any contacts at <span className="font-medium">{jobInfo.company}</span> for this role.</>}
        />
      </div>
    )
  }

  // Results state
  return (
    <div className="flex flex-col gap-6">
      <JobUrlInput onSubmit={handleUrlSubmit} compact />

      {jobInfo && (
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Result</p>
          <JobDetails job={jobInfo} />
        </div>
      )}

      <ContactList
        contacts={contacts}
        onGenerateEmail={handleGenerateEmail}
        onAddToTracker={handleAddToTracker}
        isLoading={false}
      />

      {/* Email Draft Modal */}
      {selectedContact && (
        <EmailDraftModal
          contact={selectedContact}
          draft={emailDraft}
          isOpen={isEmailModalOpen}
          isLoading={emailMutation.isPending}
          onClose={handleCloseEmailModal}
          onRegenerate={handleRegenerateDraft}
          onOpenInGmail={handleOpenInGmail}
        />
      )}
    </div>
  )
}
