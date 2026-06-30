// src/hooks/useAttendance.js
import { useState } from 'react'
import { useApi } from '@shared/hooks/useApi'
import { usePagination } from '@shared/hooks/usePagination'

/**
 * const { data, loading, error, refetch, courseId, setCourseId } = useAttendance()
 */
export function useAttendance(initialCourseId = null) {
  const [courseId, setCourseId] = useState(initialCourseId)
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const url = courseId
    ? `/courses/${courseId}/attendance/`
    : '/attendance/'

  const result = useApi(url, {
    params: { ...paginationParams },
  })

  return {
    ...result,
    courseId,
    setCourseId,
    page,
    pageSize,
    setPage,
  }
}
