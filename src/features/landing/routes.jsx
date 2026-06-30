import { lazy } from 'react'

export const landingRoutes = [
  { path: '/', Component: lazy(() => import('@features/landing/pages/LandingPage')) },
  { path: '/about', Component: lazy(() => import('@features/landing/pages/AboutPage')) },
]
