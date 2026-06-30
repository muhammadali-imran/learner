// src/hooks/useCourse.js
import { useApi } from '@shared/hooks/useApi'

export function useCourse(id) {
  return useApi(id ? `/courses/${id}/` : null)
}