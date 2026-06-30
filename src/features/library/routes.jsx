import { lazy } from 'react'

export const libraryRoutes = [
  { path: '/library', Component: lazy(() => import('@features/library/pages/DigitalLibrary')) },
  { path: '/bookmarks', Component: lazy(() => import('@features/library/pages/BookmarkPage')) },
]
