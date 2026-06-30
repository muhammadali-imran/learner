import { lazy } from 'react'

export const profileRoutes = [
  { path: '/onboarding', Component: lazy(() => import('@features/profile/pages/OnboardingPage')) },
  { path: '/profile', Component: lazy(() => import('@features/profile/pages/ProfilePage')) },
  { path: '/settings', Component: lazy(() => import('@features/profile/pages/Settings')) },
  { path: '/feedback', Component: lazy(() => import('@features/profile/pages/FeedbackPage')) },
]
