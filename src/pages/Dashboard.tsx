import { useState } from 'react'
import {
  TrackerEntryCard,
  StatusFilter,
  getBestStatus,
  type FilterStatus,
  type OutreachStatus,
  type TrackerEntry,
  type ContactEntry
} from '../components/dashboard'

// Mock data - grouped by company/role
const mockEntries: TrackerEntry[] = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Backend Engineer',
    jobUrl: 'https://jobs.lever.co/stripe/backend-engineer',
    contacts: [
      {
        id: 'c1',
        name: 'Jane Smith',
        title: 'Engineering Manager',
        email: 'jane.smith@stripe.com',
        status: 'emailed',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        notes: 'Sent initial outreach, mentioned distributed systems experience'
      },
      {
        id: 'c2',
        name: 'Mike Chen',
        title: 'Senior Technical Recruiter',
        email: 'm.chen@stripe.com',
        status: 'replied',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      }
    ]
  },
  {
    id: '2',
    company: 'Airbnb',
    role: 'Senior PM',
    jobUrl: 'https://careers.airbnb.com/senior-pm',
    contacts: [
      {
        id: 'c3',
        name: 'Sarah Lee',
        title: 'Director of Product',
        email: 'sarah.lee@airbnb.com',
        status: 'emailed',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      }
    ]
  },
  {
    id: '3',
    company: 'Notion',
    role: 'Product Designer',
    jobUrl: 'https://notion.so/careers/product-designer',
    contacts: [
      {
        id: 'c4',
        name: 'Alex Kim',
        title: 'Design Lead',
        email: 'alex.k@notion.so',
        status: 'no_response',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
      },
      {
        id: 'c5',
        name: 'Chris Wu',
        title: 'Head of Recruiting',
        email: 'chris.wu@notion.so',
        status: 'to_contact',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
      }
    ]
  },
  {
    id: '4',
    company: 'Figma',
    role: 'Frontend Engineer',
    jobUrl: 'https://figma.com/careers/frontend',
    contacts: [
      {
        id: 'c6',
        name: 'Emily Zhang',
        title: 'Engineering Manager',
        email: 'emily@figma.com',
        status: 'interviewing',
        lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
      }
    ]
  }
]

export function Dashboard() {
  const [entries, setEntries] = useState<TrackerEntry[]>(mockEntries)
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')

  const handleContactStatusChange = (entryId: string, contactId: string, status: OutreachStatus) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              contacts: entry.contacts.map((contact) =>
                contact.id === contactId
                  ? { ...contact, status, lastActionAt: new Date() }
                  : contact
              )
            }
          : entry
      )
    )
  }

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const handleEmailContact = (entry: TrackerEntry, contact: ContactEntry) => {
    // TODO: Open email draft modal and use credits
    console.log('Email contact:', entry.company, contact.name)
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Outreach Tracker</h1>
        <span className="text-sm text-gray-500">
          {entries.length} companies, {totalContacts} contacts
        </span>
      </div>

      <StatusFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600">
            {activeFilter === 'all'
              ? 'No contacts tracked yet.'
              : 'No companies in this category.'}
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
              onDelete={handleDelete}
              onEmailContact={handleEmailContact}
            />
          ))}
        </div>
      )}
    </div>
  )
}
