import { useQuery } from '@tanstack/react-query'
import { getOutreaches } from '../api'

export function useOutreaches() {
  return useQuery({
    queryKey: ['outreaches'],
    queryFn: getOutreaches,
  })
}
