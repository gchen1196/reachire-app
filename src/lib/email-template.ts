import type { EmailDraft } from '../components/email'

export interface EmailTemplateParams {
  contactFirstName: string
  contactEmail: string
  jobRole: string
  companyName: string
  jobUrl: string
  senderName: string
}

type SubjectTemplate = (role: string, company: string, senderName: string) => string

const SUBJECT_TEMPLATES: SubjectTemplate[] = [
  (_role, _company, senderName) => `Quick intro – ${senderName}`,
  (role) => `Interest in the ${role} role`,
  (role, _company, senderName) => `${role} – ${senderName}`,
  (role, company) => `${role} opportunity at ${company}`,
]

function getRandomSubject(role: string, company: string, senderName: string): string {
  const index = Math.floor(Math.random() * SUBJECT_TEMPLATES.length)
  return SUBJECT_TEMPLATES[index](role, company, senderName)
}

/**
 * Creates a default email draft template for job outreach.
 * This is used as the initial draft when opening the email modal,
 * before any LLM-generated personalization.
 */
export function createDefaultEmailDraft(params: EmailTemplateParams): EmailDraft {
  const { contactFirstName, contactEmail, jobRole, companyName, jobUrl, senderName } = params

  const subject = getRandomSubject(jobRole, companyName, senderName)

  const body = `Hi ${contactFirstName},

I came across the ${jobRole} position at ${companyName} and wanted to reach out directly.

I'm very interested in this opportunity and believe my background would be a strong fit for the role. I'd love to learn more about the team and how I might contribute.

Would you have a few minutes for a quick chat this week?

Job posting: ${jobUrl}

Best regards,
${senderName}`

  return {
    to: contactEmail,
    subject,
    body,
  }
}
