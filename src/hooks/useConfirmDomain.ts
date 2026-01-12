import { useMutation } from '@tanstack/react-query'
import { confirmDomain } from '../api'

export function useConfirmDomain() {
  return useMutation({
    mutationFn: confirmDomain,
  })
}
