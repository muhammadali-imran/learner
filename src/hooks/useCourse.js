// src/hooks/useCourse.js
import { useApi } from './useApi'

export function useCourse(id) {
  return useApi(id ? `/courses/${id}/` : null)
}