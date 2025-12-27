import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        classNames: {
          success: 'border-green-200',
          error: 'border-red-200',
        },
      }}
    />
  )
}
