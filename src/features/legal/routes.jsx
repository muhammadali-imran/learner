import { lazy } from 'react'

export const legalRoutes = [
  { path: '/privacy', Component: lazy(() => import('@features/legal/pages/PrivacyPolicyPage')) },
  { path: '/terms', Component: lazy(() => import('@features/legal/pages/TermsofServicePage')) },
  { path: '/support', Component: lazy(() => import('@features/legal/pages/SupportPage')) },
  { path: '*', Component: lazy(() => import('@features/legal/pages/NotFoundPage')) },
]
