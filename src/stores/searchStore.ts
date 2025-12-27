import { create } from 'zustand'
import type { JobInfo, Contact } from '../components/search'

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
  contacts: Contact[]
  currentUrl: string
  availableDomains: string[]
  searchError: string

  setSearchState: (state: SearchState) => void
  setJobInfo: (job: JobInfo | null) => void
  setContacts: (contacts: Contact[] | ((prev: Contact[]) => Contact[])) => void
  setCurrentUrl: (url: string) => void
  setAvailableDomains: (domains: string[]) => void
  setSearchError: (error: string) => void
  resetSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchState: 'initial',
  jobInfo: null,
  contacts: [],
  currentUrl: '',
  availableDomains: [],
  searchError: '',

  setSearchState: (searchState) => set({ searchState }),
  setJobInfo: (jobInfo) => set({ jobInfo }),
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
      contacts: [],
      currentUrl: '',
      availableDomains: [],
      searchError: ''
    })
}))
