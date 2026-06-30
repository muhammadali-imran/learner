import { authRoutes } from '@features/auth/routes'
import { landingRoutes } from '@features/landing/routes'
import { legalRoutes } from '@features/legal/routes'
import { profileRoutes } from '@features/profile/routes'

const publicOnboardingRoute = profileRoutes.find((route) => route.path === '/onboarding')
const legalRoutesWithoutCatchAll = legalRoutes.filter((route) => route.path !== '*')

export const publicRoutes = [
  ...landingRoutes,
  ...authRoutes,
  ...(publicOnboardingRoute ? [publicOnboardingRoute] : []),
  ...legalRoutesWithoutCatchAll,
]
