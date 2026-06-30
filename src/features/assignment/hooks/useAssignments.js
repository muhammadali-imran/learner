// src/hooks/useAssignments.js
import { useApi } from '@shared/hooks/useApi'
import { usePagination } from '@shared/hooks/usePagination'
import { useDebounce } from '@shared/hooks/useDebounce'
import { useState } from 'react'

export function useAssignments(courseId) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const url = courseId ? `/courses/${courseId}/assignments/` : '/assignments/'
  const api = useApi(url, {
    params: { ...paginationParams, search: debouncedSearch },
  })

  return {
    ...api,
    search,
    setSearch,
    page,
    pageSize,
    setPage,
  }
}