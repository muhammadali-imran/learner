import { lazy } from 'react'

export const assignmentRoutes = [
  { path: '/assignments', Component: lazy(() => import('@features/assignment/pages/AssignmentListPage')) },
  { path: '/assignments/:id', Component: lazy(() => import('@features/assignment/pages/AssignmentPage')) },
]
