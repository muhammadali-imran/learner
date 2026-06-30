// src/hooks/useLectures.js
import { useState } from 'react'
import { useApi } from '@shared/hooks/useApi'
import { usePagination } from '@shared/hooks/usePagination'
import { useDebounce } from '@shared/hooks/useDebounce'

/**
 * Fetch lectures for a given classroom/course.
 *
 * const { data, loading, error, refetch, search, setSearch } = useLectures(classroomId)
 */
export function useLectures(classroomId) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const url = classroomId
    ? `/classrooms/${classroomId}/lectures/`
    : '/lectures/'

  const result = useApi(url, {
    params: {
      ...paginationParams,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
    },
  })

  return {
    ...result,
    search,
    setSearch,
    page,
    pageSize,
    setPage,
  }
}

/**
 * Fetch a single lecture by ID.
 */
export function useLecture(id) {
  return useApi(id ? `/lectures/${id}/` : null)
}
