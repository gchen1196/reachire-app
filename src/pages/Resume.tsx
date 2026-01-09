import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner, ConfirmModal } from '../components/ui'
import { getResume, uploadResume, uploadResumeText, deleteResume } from '../api/resume'

const ACCEPTED_FILE_TYPES = '.pdf,.docx,.doc,.txt'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

type InputMode = 'upload' | 'paste'

export function Resume() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [resumeFilename, setResumeFilename] = useState<string | null>(null)
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [inputMode, setInputMode] = useState<InputMode>('upload')
  const [pastedText, setPastedText] = useState('')
  // Staged file before upload
  const [stagedFile, setStagedFile] = useState<File | null>(null)
  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Load existing resume data on mount
  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await getResume()
        if (data.hasResume) {
          setResumeFilename(data.resumeFilename)
          setResumeUrl(data.resumeUrl)
        }
      } catch (error) {
        console.error('Failed to load resume:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadResume()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be under 5MB')
      return
    }

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOCX, DOC, or TXT file')
      return
    }

    // Stage the file instead of uploading immediately
    setStagedFile(file)

    // Reset file input so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadStaged = async () => {
    if (!stagedFile) return

    setIsUploading(true)
    try {
      const response = await uploadResume(stagedFile)
      setResumeFilename(response.resumeFilename)
      setResumeUrl(response.resumeUrl)
      setStagedFile(null)
      toast.success('Resume uploaded successfully')
    } catch (error) {
      console.error('Failed to upload resume:', error)
      toast.error('Failed to upload resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveStaged = () => {
    setStagedFile(null)
  }

  const handleDelete = async () => {
    setShowDeleteModal(false)
    setIsDeleting(true)
    try {
      await deleteResume()
      setResumeFilename(null)
      setResumeUrl(null)
      toast.success('Resume deleted')
    } catch (error) {
      console.error('Failed to delete resume:', error)
      toast.error('Failed to delete resume. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handlePasteSubmit = async () => {
    if (!pastedText.trim()) {
      toast.error('Please paste your resume text')
      return
    }

    if (pastedText.trim().length < 100) {
      toast.error('Resume text seems too short. Please paste your full resume.')
      return
    }

    setIsUploading(true)
    try {
      const response = await uploadResumeText(pastedText.trim())
      setResumeFilename(response.resumeFilename || 'Pasted resume')
      setResumeUrl(response.resumeUrl)
      setPastedText('')
      toast.success('Resume saved successfully')
    } catch (error) {
      console.error('Failed to save resume:', error)
      toast.error('Failed to save resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/account"
          className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-primary">Resume</h1>
      </div>

      {/* Upload Section */}
      <div className="card-static p-6">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : resumeFilename ? (
          <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-primary truncate">{resumeFilename}</p>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View file
                </a>
              )}
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="Delete resume"
            >
              {isDeleting ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tab selector */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setInputMode('upload')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  inputMode === 'upload'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setInputMode('paste')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  inputMode === 'paste'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Paste Text
              </button>
            </div>

            {/* Upload mode */}
            {inputMode === 'upload' && (
              stagedFile ? (
                // Show staged file with options
                <div className="space-y-4">
                  <button
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="w-full flex items-center gap-3 p-4 bg-primary-50 rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors text-left disabled:opacity-50"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary truncate">{stagedFile.name}</p>
                      <p className="text-sm text-gray-500">{(stagedFile.size / 1024).toFixed(1)} KB - Click to replace</p>
                    </div>
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveStaged()
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </button>
                  <button
                    onClick={handleUploadStaged}
                    disabled={isUploading}
                    className="w-full py-3 px-4 btn btn-accent-glow btn-pill font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        Uploading...
                      </>
                    ) : (
                      'Upload'
                    )}
                  </button>
                </div>
              ) : (
                // Show file picker
                <button
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className="w-full border-2 border-dashed border-primary-100 rounded-lg p-8 hover:border-accent hover:bg-accent-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-primary">Drop your file here or click to browse</p>
                      <p className="text-sm text-gray-500 mt-1">.pdf, .docx, .doc, .txt up to 5MB</p>
                    </div>
                  </div>
                </button>
              )
            )}

            {/* Paste mode */}
            {inputMode === 'paste' && (
              <div className="space-y-4">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  rows={10}
                  disabled={isUploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm disabled:opacity-50"
                />
                <button
                  onClick={handlePasteSubmit}
                  disabled={isUploading || !pastedText.trim()}
                  className="w-full py-3 px-4 btn btn-accent-glow btn-pill font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info note */}
      <div className="bg-accent-50 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-primary">
            <p className="font-medium">Why upload your resume?</p>
            <p className="mt-1">
              Your resume is used to generate personalized outreach emails that highlight your relevant experience for each job.
            </p>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Resume"
        message="Are you sure you want to delete your resume? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}
