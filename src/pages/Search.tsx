import { useState } from 'react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { isMobile, openMailto } from '../lib/device'
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
import { EmailDraftModal, type EmailDraft, type EmailContact, type JobContext } from '../components/email'
import { useSearchJob } from '../hooks/useSearchJob'
import { useEmailDraft } from '../hooks/useEmailDraft'
import { useResume } from '../hooks/useResume'
import { useSearchStore } from '../stores/searchStore'
import { getOutreachStatuses, getPreviousOutreaches, createOutreach, type PreviousOutreach } from '../api'
import type { ApiJob, ApiContact, SearchJobResponse } from '../types/api'

// Helper to convert API types to frontend types
function apiJobToJobInfo(job: ApiJob): JobInfo {
  return {
    company: job.resolvedCompanyName || job.companyNames[0] || '',
    domain: job.resolvedDomain || '',
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

export function Search() {
  // Persistent search state from store
  const {
    searchState,
    setSearchState,
    jobInfo,
    setJobInfo,
    contacts,
    setContacts,
    currentUrl,
    setCurrentUrl,
    availableDomains,
    setAvailableDomains,
    searchError,
    setSearchError,
    resetSearch
  } = useSearchStore()

  // Email modal state (local - doesn't need to persist)
  const [selectedContact, setSelectedContact] = useState<EmailContact | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [previousOutreaches, setPreviousOutreaches] = useState<PreviousOutreach[]>([])

  const queryClient = useQueryClient()
  const searchMutation = useSearchJob()
  const { hasResume } = useResume()

  // Email draft hook - manages draft state and LLM regeneration
  const jobContext: JobContext | null = jobInfo ? {
    role: jobInfo.role,
    company: jobInfo.company,
    companyDomain: jobInfo.domain,
    jobUrl: jobInfo.jobUrl,
    requirements: jobInfo.requirements
  } : null

  const {
    editedDraft,
    setEditedDraft,
    isRegenerating,
    regenerate,
    reset: resetEmailDraft
  } = useEmailDraft({
    contact: selectedContact,
    job: jobContext,
    isOpen: isEmailModalOpen
  })

  const handleSearchResponse = async (response: SearchJobResponse) => {
    switch (response.status) {
      case 'success': {
        const jobInfoData = apiJobToJobInfo(response.job)
        const companyName = response.job.resolvedCompanyName || response.job.companyNames[0] || ''
        const contactsData = response.contacts.map(c => apiContactToContact(c, companyName))

        setJobInfo(jobInfoData)
        setContacts(contactsData)
        setSearchState('results')

        // Fetch outreach statuses in background
        try {
          const emails = contactsData.map(c => c.email)
          const { statuses } = await getOutreachStatuses(response.job.url, emails)

          // Update contacts with their outreach status
          setContacts(prev => prev.map(contact => ({
            ...contact,
            outreachStatus: statuses[contact.email]?.status
          })))
        } catch {
          // Silently fail - statuses are optional enhancement
        }
        break
      }

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

      case 'unsupported_site':
        toast.error(response.error)
        setSearchState('initial')
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
    setPreviousOutreaches([])
    resetEmailDraft()
  }

  const handleGenerateEmail = async (contact: Contact) => {
    if (!jobInfo) return

    const emailContact: EmailContact = {
      name: contact.name,
      title: contact.title,
      company: contact.company,
      email: contact.email
    }

    setSelectedContact(emailContact)
    setIsEmailModalOpen(true)
    setPreviousOutreaches([])

    // Fetch previous outreaches in background
    try {
      const { previousOutreaches: prev } = await getPreviousOutreaches(contact.email)
      setPreviousOutreaches(prev)
    } catch {
      // Silently fail - previous outreaches are optional
    }
  }

  const handleOpenInGmail = async (draft: EmailDraft) => {
    if (!jobInfo || !selectedContact) return

    // Find the full contact info to get linkedinUrl
    const fullContact = contacts.find(c => c.email === draft.to)

    // Use mailto on mobile (Gmail app handles it), Gmail web URL on desktop
    if (isMobile()) {
      openMailto(draft.to, draft.subject, draft.body)
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(draft.to)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
      window.open(gmailUrl, '_blank')
    }

    // Record the outreach in background
    try {
      await createOutreach({
        jobUrl: jobInfo.jobUrl || currentUrl,
        jobTitle: jobInfo.role,
        companyDomain: jobInfo.domain,
        companyName: jobInfo.company,
        department: jobInfo.department || undefined,
        contactEmail: draft.to,
        contactName: selectedContact.name,
        contactTitle: selectedContact.title || undefined,
        contactLinkedinUrl: fullContact?.linkedinUrl,
        status: 'emailed'
      })

      // Update local contact state to reflect emailed status
      setContacts(prev => prev.map(contact =>
        contact.email === draft.to
          ? { ...contact, outreachStatus: 'emailed' as const }
          : contact
      ))

      // Invalidate outreaches query so Dashboard refreshes
      queryClient.invalidateQueries({ queryKey: ['outreaches'] })

      toast.success('Contact saved to dashboard')
    } catch (error) {
      // Don't block the user - Gmail already opened
      console.error('Failed to record outreach:', error)
      toast.error('Failed to save contact')
    }

    handleCloseEmailModal()
  }

  const handleAddToTracker = async (contact: Contact) => {
    if (!jobInfo) return

    // Optimistic update - update UI immediately
    setContacts(prev => prev.map(c =>
      c.email === contact.email
        ? { ...c, outreachStatus: 'to_contact' as const }
        : c
    ))

    try {
      await createOutreach({
        jobUrl: jobInfo.jobUrl || currentUrl,
        jobTitle: jobInfo.role,
        companyDomain: jobInfo.domain,
        companyName: jobInfo.company,
        department: jobInfo.department || undefined,
        contactEmail: contact.email,
        contactName: contact.name,
        contactTitle: contact.title || undefined,
        contactLinkedinUrl: contact.linkedinUrl
      })

      // Invalidate outreaches query so Dashboard refreshes
      queryClient.invalidateQueries({ queryKey: ['outreaches'] })

      toast.success('Contact saved to dashboard')
    } catch (error) {
      // Rollback on failure
      setContacts(prev => prev.map(c =>
        c.email === contact.email
          ? { ...c, outreachStatus: undefined }
          : c
      ))
      console.error('Failed to add to tracker:', error)
      toast.error('Failed to save contact')
    }
  }

  const handleBackToSearch = () => {
    resetSearch()
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
          draft={editedDraft}
          isOpen={isEmailModalOpen}
          isRegenerating={isRegenerating}
          hasResume={hasResume}
          previousOutreaches={previousOutreaches}
          onClose={handleCloseEmailModal}
          onDraftChange={setEditedDraft}
          onRegenerate={regenerate}
          onOpenInGmail={handleOpenInGmail}
        />
      )}
    </div>
  )
}
