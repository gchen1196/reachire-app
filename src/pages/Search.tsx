import { useState } from 'react'
import {
  JobUrlInput,
  JobDetails,
  ContactList,
  RecentSearches,
  type JobInfo,
  type Contact,
  type RecentSearch
} from '../components/search'
import { EmailDraftModal, type EmailDraft, type EmailContact } from '../components/email'

// Mock data for demonstration
const mockRecentSearches: RecentSearch[] = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Backend Engineer',
    contactCount: 8,
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: '2',
    company: 'Airbnb',
    role: 'Senior PM',
    contactCount: 5,
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  }
]

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jane Smith',
    title: 'Engineering Manager',
    company: 'Stripe',
    email: 'jane.smith@stripe.com',
    emailConfidence: 94,
    linkedinUrl: 'https://linkedin.com/in/janesmith'
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'Senior Technical Recruiter',
    company: 'Stripe',
    email: 'm.chen@stripe.com',
    emailConfidence: 87,
    linkedinUrl: 'https://linkedin.com/in/mikechen'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Staff Engineer',
    company: 'Stripe',
    email: 'sarah.j@stripe.com',
    emailConfidence: 72
  }
]

// Mock email draft generator
function generateMockDraft(contact: Contact, jobInfo: JobInfo): EmailDraft {
  const firstName = contact.name.split(' ')[0]
  return {
    to: contact.email,
    subject: `${jobInfo.role} role – Quick intro`,
    body: `Hi ${firstName},

I just applied for the ${jobInfo.role} position at ${jobInfo.company} and wanted to reach out directly.

I've spent 3 years at Datadog building real-time data pipelines in Go, processing millions of events per second. The distributed systems focus in the role is right in my wheelhouse.

Would you be open to a quick chat?

LinkedIn: linkedin.com/in/johndoe
Resume: bit.ly/johndoe-resume

John`
  }
}

type SearchState = 'initial' | 'loading' | 'results'

export function Search() {
  const [searchState, setSearchState] = useState<SearchState>('initial')
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])

  // Email modal state
  const [selectedContact, setSelectedContact] = useState<EmailContact | null>(null)
  const [emailDraft, setEmailDraft] = useState<EmailDraft | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleUrlSubmit = (url: string) => {
    setSearchState('loading')

    // Simulate API call
    setTimeout(() => {
      setJobInfo({
        company: 'Stripe',
        domain: 'stripe.com',
        role: 'Backend Engineer',
        department: 'Engineering',
        requirements: 'Distributed systems, Go/Python, 5+ years experience',
        jobUrl: url
      })
      setContacts(mockContacts)
      setSearchState('results')
    }, 1500)
  }

  const handleRefetch = (updatedJob: JobInfo) => {
    setJobInfo(updatedJob)
    setSearchState('loading')

    // Simulate refetch
    setTimeout(() => {
      setSearchState('results')
    }, 1000)
  }

  const handleRecentSearchSelect = (search: RecentSearch) => {
    setSearchState('loading')

    setTimeout(() => {
      setJobInfo({
        company: search.company,
        domain: `${search.company.toLowerCase()}.com`,
        role: search.role,
        department: 'Engineering',
        jobUrl: '#'
      })
      setContacts(mockContacts)
      setSearchState('results')
    }, 500)
  }

  const handleGenerateEmail = (contact: Contact) => {
    if (!jobInfo) return

    const emailContact: EmailContact = {
      name: contact.name,
      title: contact.title,
      company: contact.company,
      email: contact.email
    }

    const draft = generateMockDraft(contact, jobInfo)

    setSelectedContact(emailContact)
    setEmailDraft(draft)
    setIsEmailModalOpen(true)
  }

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
    setSelectedContact(null)
    setEmailDraft(null)
  }

  const handleRegenerateDraft = () => {
    if (!selectedContact || !jobInfo) return

    // Simulate regeneration with slightly different content
    const contact = contacts.find(c => c.email === selectedContact.email)
    if (contact) {
      const newDraft = generateMockDraft(contact, jobInfo)
      newDraft.body = newDraft.body.replace(
        "I've spent 3 years at Datadog",
        "With my background at Datadog over 3 years"
      )
      setEmailDraft(newDraft)
    }
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
  }

  if (searchState === 'initial') {
    return (
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        <JobUrlInput onSubmit={handleUrlSubmit} />
        <RecentSearches
          searches={mockRecentSearches}
          onSelect={handleRecentSearchSelect}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back button on mobile */}
      <button
        onClick={handleBackToSearch}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 sm:hidden"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        New Search
      </button>

      {jobInfo && (
        <JobDetails
          job={jobInfo}
          onRefetch={handleRefetch}
          isLoading={searchState === 'loading'}
        />
      )}

      <ContactList
        contacts={contacts}
        onGenerateEmail={handleGenerateEmail}
        onAddToTracker={handleAddToTracker}
        isLoading={searchState === 'loading'}
      />

      {/* Desktop: New search button */}
      <div className="hidden sm:block">
        <button
          onClick={handleBackToSearch}
          className="text-primary hover:underline"
        >
          Start a new search
        </button>
      </div>

      {/* Email Draft Modal */}
      {selectedContact && emailDraft && (
        <EmailDraftModal
          contact={selectedContact}
          draft={emailDraft}
          isOpen={isEmailModalOpen}
          onClose={handleCloseEmailModal}
          onRegenerate={handleRegenerateDraft}
          onOpenInGmail={handleOpenInGmail}
        />
      )}
    </div>
  )
}
