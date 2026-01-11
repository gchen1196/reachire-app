import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { getResume } from '../api/resume'

const RESUME_QUERY_KEY = 'resume'

export function useResume() {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: [RESUME_QUERY_KEY, user?.id],
    queryFn: getResume,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes - resume data doesn't change often
    refetchOnWindowFocus: true, // Refetch when user returns to tab (e.g., after uploading in new tab)
  })

  return {
    ...query,
    hasResume: query.data?.hasResume ?? false,
    resumeFilename: query.data?.resumeFilename ?? null,
    resumeUrl: query.data?.resumeUrl ?? null,
    profile: query.data?.profile ?? null,
  }
}

// Hook to invalidate resume data (call after upload or delete)
export function useInvalidateResume() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: [RESUME_QUERY_KEY, user.id] })
    }
  }
}
