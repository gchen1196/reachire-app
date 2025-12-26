import { useMutation } from '@tanstack/react-query'
import { searchJob } from '../api'

export function useSearchJob() {
  return useMutation({
    mutationFn: searchJob,
  })
}
