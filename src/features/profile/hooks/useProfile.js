// src/hooks/useProfile.js
import { useApi } from '@shared/hooks/useApi'

export function useProfile() {
  const { data, loading, error, refetch } = useApi('/profile/')
  return { profile: data, loading, error, refetch }
}