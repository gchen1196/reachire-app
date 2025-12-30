import { useQuery } from '@tanstack/react-query'
import { getTokenUsage } from '../api'

export function useTokenUsage() {
  return useQuery({
    queryKey: ['tokenUsage'],
    queryFn: getTokenUsage,
  })
}
