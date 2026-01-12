import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../contexts/AuthContext'
import { useGenerateEmail } from './useGenerateEmail'
import { useInvalidateUser } from './useUser'
import { createDefaultEmailDraft } from '../lib/email-template'
import type { EmailDraft, EmailContact, JobContext } from '../components/email'
import type { EmailType } from '../types/api'

interface UseEmailDraftParams {
  contact: EmailContact | null
  job: JobContext | null
  isOpen: boolean
}

interface UseEmailDraftReturn {
  editedDraft: EmailDraft | null
  setEditedDraft: (draft: EmailDraft) => void
  isRegenerating: boolean
  regenerate: (emailType: EmailType) => void
  reset: () => void
}

export function useEmailDraft({ contact, job, isOpen }: UseEmailDraftParams): UseEmailDraftReturn {
  const { user } = useAuth()
  const emailMutation = useGenerateEmail()
  const invalidateUser = useInvalidateUser()

  // Store mutation in ref to avoid dependency issues
  const emailMutationRef = useRef(emailMutation)
  emailMutationRef.current = emailMutation

  // Store invalidateUser in ref to avoid dependency issues
  const invalidateUserRef = useRef(invalidateUser)
  invalidateUserRef.current = invalidateUser

  // LLM-generated draft (null until regenerate is clicked)
  const [llmDraft, setLlmDraft] = useState<EmailDraft | null>(null)

  // The current edited draft
  const [editedDraft, setEditedDraft] = useState<EmailDraft | null>(null)

  // Track previous isOpen to detect when modal opens
  const wasOpen = useRef(false)

  // Store user in ref to avoid dependency issues
  const userRef = useRef(user)
  userRef.current = user

  // Update edited draft when LLM draft becomes available
  useEffect(() => {
    if (llmDraft) {
      setEditedDraft(llmDraft)
    }
  }, [llmDraft])

  // Reset state when modal opens (transition from closed to open)
  useEffect(() => {
    if (isOpen && !wasOpen.current && contact && job) {
      const senderName = userRef.current?.user_metadata?.full_name || userRef.current?.user_metadata?.name || ''
      const draft = createDefaultEmailDraft({
        contactFirstName: contact.name.split(' ')[0],
        contactEmail: contact.email,
        jobRole: job.role,
        companyName: job.company,
        jobUrl: job.jobUrl,
        senderName,
      })
      setLlmDraft(null)
      setEditedDraft(draft)
      emailMutationRef.current.reset()
    }
    wasOpen.current = isOpen
  }, [isOpen, contact, job])

  const regenerate = useCallback((emailType: EmailType) => {
    if (!contact || !job) return

    emailMutationRef.current.mutate(
      {
        jobTitle: job.role,
        companyName: job.company,
        companyDomain: job.companyDomain,
        companyDescription: job.requirements,
        jobUrl: job.jobUrl,
        contactName: contact.name,
        contactFirstName: contact.name.split(' ')[0],
        contactEmail: contact.email,
        contactTitle: contact.title,
        emailType,
      },
      {
        onSuccess: (data) => {
          setLlmDraft({
            to: contact.email,
            subject: data.subject,
            body: data.body
          })
          // Refresh user data to update AI email usage count
          invalidateUserRef.current()
          toast.success('Email draft generated')
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Failed to generate email')
        }
      }
    )
  }, [contact, job])

  const reset = useCallback(() => {
    setLlmDraft(null)
    setEditedDraft(null)
    emailMutationRef.current.reset()
  }, [])

  return {
    editedDraft,
    setEditedDraft,
    isRegenerating: emailMutation.isPending,
    regenerate,
    reset,
  }
}
