import { dashboardRoutes } from '@features/dashboard/routes'
import { courseRoutes } from '@features/course/routes'
import { classroomRoutes } from '@features/classroom/routes'
import { assignmentRoutes } from '@features/assignment/routes'
import { quizRoutes } from '@features/quiz/routes'
import { libraryRoutes } from '@features/library/routes'
import { paymentRoutes } from '@features/payment/routes'
import { scheduleRoutes } from '@features/schedule/routes'
import { profileRoutes } from '@features/profile/routes'

const protectedProfileRoutes = profileRoutes.filter((route) => route.path !== '/onboarding')

export const protectedRoutes = [
  ...dashboardRoutes,
  ...courseRoutes,
  ...classroomRoutes,
  ...assignmentRoutes,
  ...quizRoutes,
  ...libraryRoutes,
  ...paymentRoutes,
  ...scheduleRoutes,
  ...protectedProfileRoutes,
]
