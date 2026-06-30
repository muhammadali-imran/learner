// src/hooks/useEnrollment.js
import { useMutation } from '@shared/hooks/useMutation'

export function useEnrollment() {
  const enroll = useMutation('/enrollments/', 'post')
  const unenroll = useMutation(null, 'delete') // url will be overridden

  const unenrollById = (enrollmentId) => unenroll.mutate(null, `/enrollments/${enrollmentId}/`)
  return { enroll, unenroll: unenrollById }
}