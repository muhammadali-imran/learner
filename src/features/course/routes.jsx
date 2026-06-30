import { lazy } from 'react'

export const courseRoutes = [
  { path: '/courses', Component: lazy(() => import('@features/course/pages/CourseListPage')) },
  { path: '/courses/:id', Component: lazy(() => import('@features/course/pages/CoursePage')) },
  { path: '/my-courses', Component: lazy(() => import('@features/course/pages/EnrolledCoursePage')) },
  { path: '/lectures/:id', Component: lazy(() => import('@features/course/pages/LecturePage')) },
  { path: '/lecture-history', Component: lazy(() => import('@features/course/pages/LectureHistory')) },
  { path: '/elearning', Component: lazy(() => import('@features/course/pages/ELearningPage')) },
  { path: '/library/:id', Component: lazy(() => import('@features/course/pages/PDFViewer')) },
]
