// =============================================================================
// src/App.jsx — application routes composed inside the shared Main layout
// -----------------------------------------------------------------------------
// 1. Imports                    public pages, protected gate, and lazy scenes
// 2. Route fallback            lightweight status while route code loads
// 3. App                       separate public, protected, alias, and fallback routes
// =============================================================================

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import StatusPanel from './components/StatusPanel.jsx'
import Main from './layouts/Main.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'

// Route-level imports keep the Journey scene and Projects case-study code out
// of the initial Home bundle and out of each other's route payloads.
const JourneyPage = lazy(() => import('./pages/JourneyPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const LinksPage = lazy(() => import('./pages/LinksPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const RequireSession = lazy(() => import('./components/RequireSession.jsx'))
const BackOfficePage = lazy(() => import('./pages/BackOfficePage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function SuspendedRoute({ label, children }) {
  return <Suspense fallback={<RouteFallback label={label} />}>{children}</Suspense>
}

function RouteFallback({ label }) {
  return (
    <div className="status-page">
      <StatusPanel title={`Loading ${label}…`} message="Preparing this page." />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<SuspendedRoute label="contact"><ContactPage /></SuspendedRoute>} />
        <Route path="/links" element={<SuspendedRoute label="links"><LinksPage /></SuspendedRoute>} />
        <Route path="/login" element={<SuspendedRoute label="sign in"><LoginPage /></SuspendedRoute>} />
        <Route
          path="/journey"
          element={
            <Suspense fallback={<RouteFallback label="journey" />}>
              <JourneyPage />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<RouteFallback label="projects" />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/projects/:projectSlug"
          element={<SuspendedRoute label="project"><ProjectPage /></SuspendedRoute>}
        />
        <Route path="/portfolio" element={<Navigate to="/journey" replace />} />
        <Route path="/work" element={<Navigate to="/projects" replace />} />
        <Route path="/about" element={<Navigate to="/journey" replace />} />
        <Route path="/playground" element={<Navigate to="/links" replace />} />
        <Route
          element={<SuspendedRoute label="administrator access"><RequireSession /></SuspendedRoute>}
        >
          <Route
            path="/back-office"
            element={<SuspendedRoute label="messages"><BackOfficePage /></SuspendedRoute>}
          />
        </Route>
        <Route path="/backoffice" element={<Navigate to="/back-office" replace />} />
        <Route path="/admin" element={<Navigate to="/back-office" replace />} />
        <Route path="*" element={<SuspendedRoute label="page"><NotFoundPage /></SuspendedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
