export function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function openMailto(to: string, subject: string, body: string): void {
  const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  // Create a temporary anchor and click it - works better on mobile than window.location.href
  const link = document.createElement('a')
  link.href = mailtoUrl
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
