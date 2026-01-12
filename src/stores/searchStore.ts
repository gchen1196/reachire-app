import { create } from 'zustand'
import type { JobInfo, Contact } from '../components/search'
import type { DomainOption, ApiJob } from '../types/api'

type SearchState =
  | 'initial'
  | 'loading'
  | 'results'
  | 'domain_selection'
  | 'no_contacts'
  | 'domain_not_found'
  | 'error'

interface SearchStore {
  searchState: SearchState
  jobInfo: JobInfo | null
  /** Raw API job data - needed for confirmDomain endpoint */
  apiJob: ApiJob | null
  contacts: Contact[]
  currentUrl: string
  availableDomains: DomainOption[]
  searchError: string

  setSearchState: (state: SearchState) => void
  setJobInfo: (job: JobInfo | null) => void
  setApiJob: (job: ApiJob | null) => void
  setContacts: (contacts: Contact[] | ((prev: Contact[]) => Contact[])) => void
  setCurrentUrl: (url: string) => void
  setAvailableDomains: (domains: DomainOption[]) => void
  setSearchError: (error: string) => void
  resetSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchState: 'initial',
  jobInfo: null,
  apiJob: null,
  contacts: [],
  currentUrl: '',
  availableDomains: [],
  searchError: '',

  setSearchState: (searchState) => set({ searchState }),
  setJobInfo: (jobInfo) => set({ jobInfo }),
  setApiJob: (apiJob) => set({ apiJob }),
  setContacts: (contacts) =>
    set((state) => ({
      contacts: typeof contacts === 'function' ? contacts(state.contacts) : contacts
    })),
  setCurrentUrl: (currentUrl) => set({ currentUrl }),
  setAvailableDomains: (availableDomains) => set({ availableDomains }),
  setSearchError: (searchError) => set({ searchError }),
  resetSearch: () =>
    set({
      searchState: 'initial',
      jobInfo: null,
      apiJob: null,
      contacts: [],
      currentUrl: '',
      availableDomains: [],
      searchError: ''
    })
}))
