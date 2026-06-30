import { lazy } from 'react'

export const quizRoutes = [
  { path: '/quizzes', Component: lazy(() => import('@features/quiz/pages/QuizHistory')) },
  { path: '/quizzes/:id', Component: lazy(() => import('@features/quiz/pages/QuizPage')) },
  { path: '/quizzes/:id/result', Component: lazy(() => import('@features/quiz/pages/ResultPage')) },
  { path: '/grades', Component: lazy(() => import('@features/quiz/pages/GradesPage')) },
]
