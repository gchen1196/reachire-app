// localStorage keys
const STORAGE_KEYS = {
  HIDE_RESUME_PROMPT: 'hiredoor_hide_resume_prompt',
} as const

// Resume prompt preference
export function getHideResumePrompt(): boolean {
  return localStorage.getItem(STORAGE_KEYS.HIDE_RESUME_PROMPT) === 'true'
}

export function setHideResumePrompt(value: boolean): void {
  if (value) {
    localStorage.setItem(STORAGE_KEYS.HIDE_RESUME_PROMPT, 'true')
  } else {
    localStorage.removeItem(STORAGE_KEYS.HIDE_RESUME_PROMPT)
  }
}
