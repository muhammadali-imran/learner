import { lazy } from 'react'

export const classroomRoutes = [
  { path: '/classroom', Component: lazy(() => import('@features/classroom/pages/ClassroomPage')) },
  { path: '/classroom/:id', Component: lazy(() => import('@features/classroom/pages/ClassroomPage')) },
  { path: '/attendance', Component: lazy(() => import('@features/classroom/pages/AttendancePage')) },
  { path: '/discussions', Component: lazy(() => import('@features/classroom/pages/DiscussionPage')) },
]
