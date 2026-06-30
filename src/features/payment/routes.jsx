import { lazy } from 'react'

export const paymentRoutes = [
  { path: '/fees', Component: lazy(() => import('@features/payment/pages/FeePage')) },
  { path: '/fees/pay', Component: lazy(() => import('@features/payment/pages/PaymentPage')) },
  { path: '/fees/history', Component: lazy(() => import('@features/payment/pages/PaymentHistoryPage')) },
]
