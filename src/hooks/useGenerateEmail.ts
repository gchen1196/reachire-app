import { useMutation } from '@tanstack/react-query'
import { generateEmail } from '../api'

export function useGenerateEmail() {
  return useMutation({
    mutationFn: generateEmail,
  })
}
