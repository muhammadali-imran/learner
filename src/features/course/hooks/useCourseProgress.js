import { useApi } from '@shared/hooks/useApi'

export function useCourseProgress(courseId) {
  const { data, loading, error, refetch } = useApi(
    courseId ? `/courses/${courseId}/progress/` : null
  )
  return { progress: data, loading, error, refetch }
}