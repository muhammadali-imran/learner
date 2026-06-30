import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@shared/layouts/MainLayout'
import ProtectedRoute from '@shared/components/layout/ProtectedRoute'
import Loading from '@shared/components/ui/Loading'
import { publicRoutes } from './publicRoutes'
import { protectedRoutes } from './protectedRoutes'
import { legalRoutes } from '@features/legal/routes'

function LazyLoad({ children }) {
  return <Suspense fallback={<Loading fullscreen />}>{children}</Suspense>
}

function renderRoute({ path, Component }) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <LazyLoad>
          <Component />
        </LazyLoad>
      }
    />
  )
}

export default function AppRouter() {
  const notFoundRoute = legalRoutes.find((route) => route.path === '*')

  return (
    <Routes>
      {publicRoutes.map(renderRoute)}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {protectedRoutes.map(renderRoute)}
      </Route>

      {notFoundRoute && renderRoute(notFoundRoute)}
    </Routes>
  )
}
