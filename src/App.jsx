// =============================================================================
// src/App.jsx — application routes composed inside the shared Main layout
// -----------------------------------------------------------------------------
// 1. Imports & route metadata   layout, lazy Portfolio, setup views, and paths
// 2. Portfolio fallback         lightweight status while WebGL code loads
// 3. App                        nested route registration and fallback
// =============================================================================

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './layouts/Main.jsx'
import HomePage from './pages/HomePage.jsx'
import SetupRoutePage from './pages/SetupRoutePage.jsx'
import './App.css'

// Three.js is isolated to the Portfolio route so the 3D enhancement does not
// increase the initial JavaScript cost for every other public page.
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'))

const setupRouteDefinitions = [
  {
    path: '/links',
    title: 'Links',
    description: 'The links route is ready for curated professional resources.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'The contact route is ready for its validated message form.',
  },
  {
    path: '/login',
    title: 'Administrator Login',
    description: 'This hidden route is reserved for the administrator sign-in feature.',
  },
  {
    path: '/back-office',
    title: 'Back Office',
    description: 'This route is registered, but no private data is loaded during setup.',
  },
]

function PortfolioFallback() {
  return (
    <div className="setup-route" role="status" aria-live="polite">
      <p>Loading portfolio experience…</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<PortfolioFallback />}>
              <PortfolioPage />
            </Suspense>
          }
        />
        {setupRouteDefinitions.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <SetupRoutePage
                description={route.description}
                routePath={route.path}
                title={route.title}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
