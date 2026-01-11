// localStorage keys
const STORAGE_KEYS = {
  HIDE_RESUME_PROMPT: 'hiredoor_hide_resume_prompt',
  HOME_JOB_URL: 'hiredoor_home_job_url',
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

// Job URL from home page (saved before login, used to pre-fill search)
export function getHomeJobUrl(): string | null {
  return localStorage.getItem(STORAGE_KEYS.HOME_JOB_URL)
}

export function setHomeJobUrl(url: string): void {
  localStorage.setItem(STORAGE_KEYS.HOME_JOB_URL, url)
}

export function clearHomeJobUrl(): void {
  localStorage.removeItem(STORAGE_KEYS.HOME_JOB_URL)
}
