// src/hooks/useProfile.js
import { useApi } from './useApi'

// Dummy profile data – remove when API is live
const DUMMY_PROFILE = {
  id: 1,
  name: 'Ali Hassan',
  email: 'ali.hassan@school.edu',
  avatar: null,
  bio: 'Computer Science student passionate about AI and web development.',
  phone: '+92 300 1234567',
  address: 'Lahore, Pakistan',
  date_of_birth: '2002-05-15',
  education: 'BS Computer Science, 5th Semester',
  cgpa: 3.8,
  enrolled_since: '2023-09-01',
  total_courses: 12,
  completed_courses: 4,
  attendance_percentage: 91,
  skills: ['React', 'Python', 'Machine Learning', 'Tailwind CSS'],
}

/**
 * Fetch detailed user profile.
 * Falls back to dummy data when the backend is unreachable.
 */
export function useProfile() {
  const { data, loading, error, refetch } = useApi('/profile/')

  // While API is not ready, return dummy data after a short simulated loading
  const simulatedLoading = loading && !data
  const finalData = data || DUMMY_PROFILE
  const finalError = error && !data ? error : null

  return {
    profile: finalData,
    loading: simulatedLoading,
    error: finalError,
    refetch,
  }
}