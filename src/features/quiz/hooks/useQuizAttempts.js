// src/hooks/useQuizAttempts.js
import { useApi } from '@shared/hooks/useApi'
import { usePagination } from '@shared/hooks/usePagination'

/**
 * List all quiz attempts, optionally filtered by quizId.
 *
 * const { data, loading, error, refetch, page, setPage } = useQuizAttempts(quizId)
 */
export function useQuizAttempts(quizId = null) {
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const url = quizId ? `/quizzes/${quizId}/attempts/` : '/quiz-attempts/'

  const result = useApi(url, { params: { ...paginationParams } })

  return {
    ...result,
    page,
    pageSize,
    setPage,
  }
}

/**
 * Fetch a single attempt result by attemptId.
 */
export function useQuizAttempt(attemptId) {
  return useApi(attemptId ? `/quiz-attempts/${attemptId}/` : null)
}
