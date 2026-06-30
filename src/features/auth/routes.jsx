import { lazy } from 'react'

export const authRoutes = [
  { path: '/login', Component: lazy(() => import('@features/auth/pages/LoginPage')) },
  { path: '/register', Component: lazy(() => import('@features/auth/pages/RegisterPage')) },
  { path: '/forgot-password', Component: lazy(() => import('@features/auth/pages/ForgetPasswordPage')) },
  { path: '/reset-password', Component: lazy(() => import('@features/auth/pages/ResetPasswordPage')) },
  { path: '/verify-email', Component: lazy(() => import('@features/auth/pages/EmailVerificationPage')) },
]
