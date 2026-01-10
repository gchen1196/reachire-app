import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import { isMobile, openMailto } from '../lib/device'
import {
  TrackerEntryCard,
  StatusFilter,
  getBestStatus,
  type FilterStatus,
  type OutreachStatus,
  type TrackerEntry,
  type ContactEntry
} from '../components/dashboard'
import { EmailDraftModal, type EmailDraft, type EmailContact } from '../components/email'
import { useOutreaches } from '../hooks/useOutreaches'
import { useEmailDraft } from '../hooks/useEmailDraft'
import { updateOutreachStatus, deleteOutreaches, getPreviousOutreaches, type TrackerJob, type PreviousOutreach } from '../api'
import { useQueryClient } from '@tanstack/react-query'
import { PageLoading, ConfirmModal } from '../components/ui'

// Convert API response to dashboard types
function apiToTrackerEntry(job: TrackerJob): TrackerEntry {
  return {
    id: job.id,
    company: job.company.name || job.company.domain,
    companyUrl: `https://${job.company.domain}`,
    role: job.title || 'Unknown Role',
    jobUrl: job.url,
    contacts: job.contacts.map((contact) => ({
      id: contact.id,
      name: contact.name || 'Unknown',
      title: contact.title || '',
      email: contact.email,
      status: contact.outreach.status,
      lastActionAt: new Date(contact.outreach.sentAt || contact.outreach.createdAt),
      notes: contact.outreach.notes || undefined,
      linkedinUrl: contact.linkedinUrl || undefined
    }))
  }
}

interface DeleteJobConfirm {
  jobId: string
  company: string
}

export function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')
  const [deleteJobConfirm, setDeleteJobConfirm] = useState<DeleteJobConfirm | null>(null)

  // Email modal state
  const [selectedEntry, setSelectedEntry] = useState<TrackerEntry | null>(null)
  const [selectedContact, setSelectedContact] = useState<EmailContact | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [previousOutreaches, setPreviousOutreaches] = useState<PreviousOutreach[]>([])

  const { data, isLoading, error } = useOutreaches()
  const queryClient = useQueryClient()

  // Email draft hook - manages draft state and LLM regeneration
  const jobContext = selectedEntry ? {
    role: selectedEntry.role,
    company: selectedEntry.company,
    jobUrl: selectedEntry.jobUrl,
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

  // Show error toast when fetch fails
  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load contacts')
    }
  }, [error])

  // Convert API data to dashboard entries
  const entries = useMemo(() => {
    if (!data?.jobs) return []
    return data.jobs.map(apiToTrackerEntry)
  }, [data])

  const handleContactStatusChange = async (entryId: string, contactId: string, status: OutreachStatus) => {
    try {
      await updateOutreachStatus({
        jobId: entryId,
        contactId,
        status,
      })

      // Update cache directly instead of refetching
      queryClient.setQueryData<{ jobs: TrackerJob[] }>(['outreaches'], (old) => {
        if (!old) return old
        return {
          jobs: old.jobs.map((job) =>
            job.id === entryId
              ? {
                  ...job,
                  contacts: job.contacts.map((contact) =>
                    contact.id === contactId
                      ? { ...contact, outreach: { ...contact.outreach, status } }
                      : contact
                  ),
                }
              : job
          ),
        }
      })

      toast.success('Status updated')
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleJobDeleteClick = (jobId: string) => {
    const job = entries.find((e) => e.id === jobId)
    if (!job) return
    setDeleteJobConfirm({ jobId, company: job.company })
  }

  const handleConfirmJobDelete = async () => {
    if (!deleteJobConfirm) return

    const job = data?.jobs.find((j) => j.id === deleteJobConfirm.jobId)
    if (!job) return

    const contactIds = job.contacts.map((c) => c.id)

    try {
      await deleteOutreaches({ jobId: deleteJobConfirm.jobId, contactIds })

      queryClient.setQueryData<{ jobs: TrackerJob[] }>(['outreaches'], (old) => {
        if (!old) return old
        return {
          jobs: old.jobs.filter((j) => j.id !== deleteJobConfirm.jobId),
        }
      })

      toast.success('Job removed from dashboard')
    } catch (error) {
      console.error('Failed to delete job:', error)
      toast.error('Failed to remove job')
    }

    setDeleteJobConfirm(null)
  }

  const handleContactDelete = async (jobId: string, contactId: string) => {
    try {
      await deleteOutreaches({ jobId, contactIds: [contactId] })

      queryClient.setQueryData<{ jobs: TrackerJob[] }>(['outreaches'], (old) => {
        if (!old) return old

        const job = old.jobs.find((j) => j.id === jobId)
        if (!job) return old

        if (job.contacts.length === 1) {
          return {
            jobs: old.jobs.filter((j) => j.id !== jobId),
          }
        }

        return {
          jobs: old.jobs.map((j) =>
            j.id === jobId
              ? { ...j, contacts: j.contacts.filter((c) => c.id !== contactId) }
              : j
          ),
        }
      })

      toast.success('Contact removed')
    } catch (error) {
      console.error('Failed to delete contact:', error)
      toast.error('Failed to remove contact')
    }
  }

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
    setSelectedEntry(null)
    setSelectedContact(null)
    setPreviousOutreaches([])
    resetEmailDraft()
  }

  const handleEmailContact = async (entry: TrackerEntry, contact: ContactEntry) => {
    const emailContact: EmailContact = {
      name: contact.name,
      title: contact.title,
      company: entry.company,
      email: contact.email
    }

    setSelectedEntry(entry)
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

  const handleOpenInGmail = (draft: EmailDraft) => {
    if (!selectedEntry || !selectedContact) return

    // Find the full contact info to get linkedinUrl
    const fullContact = selectedEntry.contacts.find(c => c.email === draft.to)

    // Use mailto on mobile (Gmail app handles it), Gmail web URL on desktop
    if (isMobile()) {
      openMailto(draft.to, draft.subject, draft.body)
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(draft.to)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
      window.open(gmailUrl, '_blank')
    }

    // Update local status to emailed
    queryClient.setQueryData<{ jobs: TrackerJob[] }>(['outreaches'], (old) => {
      if (!old) return old
      return {
        jobs: old.jobs.map((job) =>
          job.id === selectedEntry.id
            ? {
                ...job,
                contacts: job.contacts.map((contact) =>
                  contact.email === draft.to
                    ? { ...contact, outreach: { ...contact.outreach, status: 'emailed' as const } }
                    : contact
                ),
              }
            : job
        ),
      }
    })

    // Update status on backend
    if (fullContact) {
      updateOutreachStatus({
        jobId: selectedEntry.id,
        contactId: fullContact.id,
        status: 'emailed',
      }).catch(console.error)
    }

    toast.success('Email opened in Gmail')
    handleCloseEmailModal()
  }

  // Calculate counts based on best status per entry
  const counts = entries.reduce(
    (acc, entry) => {
      const bestStatus = getBestStatus(entry.contacts)
      acc[bestStatus] = (acc[bestStatus] || 0) + 1
      acc.all = (acc.all || 0) + 1
      return acc
    },
    { all: 0 } as Record<FilterStatus, number>
  )

  // Filter entries by best status
  const filteredEntries =
    activeFilter === 'all'
      ? entries
      : entries.filter((entry) => getBestStatus(entry.contacts) === activeFilter)

  // Count total contacts
  const totalContacts = entries.reduce((sum, entry) => sum + entry.contacts.length, 0)

  if (isLoading) {
    return <PageLoading message="Loading your contacts..." />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <span className="text-sm text-gray-500">
          {entries.length} {entries.length === 1 ? 'job' : 'jobs'}, {totalContacts} {totalContacts === 1 ? 'contact' : 'contacts'}
        </span>
      </div>

      <StatusFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {filteredEntries.length === 0 ? (
        <div className="card-static p-8 text-center animate-fade-in">
          <svg className="w-12 h-12 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600">
            {activeFilter === 'all'
              ? 'No contacts tracked yet.'
              : 'No jobs in this category.'}
          </p>
          {activeFilter === 'all' && (
            <p className="text-sm text-gray-500 mt-1">
              Search for jobs and add contacts to start tracking.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <TrackerEntryCard
              key={entry.id}
              entry={entry}
              onContactStatusChange={handleContactStatusChange}
              onDelete={handleJobDeleteClick}
              onContactDelete={handleContactDelete}
              onEmailContact={handleEmailContact}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteJobConfirm !== null}
        title="Remove Job"
        message={`Are you sure you want to remove ${deleteJobConfirm?.company} and all its contacts from your dashboard?`}
        confirmLabel="Remove"
        variant="danger"
        onConfirm={handleConfirmJobDelete}
        onCancel={() => setDeleteJobConfirm(null)}
      />

      {selectedContact && (
        <EmailDraftModal
          contact={selectedContact}
          draft={editedDraft}
          isOpen={isEmailModalOpen}
          isRegenerating={isRegenerating}
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
