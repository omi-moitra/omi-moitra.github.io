// =============================================================================
// src/App.jsx — application routes composed inside the shared Main layout
// -----------------------------------------------------------------------------
// 1. Imports                    public pages, protected gate, and lazy scenes
// 2. Route fallback            lightweight status while route code loads
// 3. App                       separate public, protected, alias, and fallback routes
// =============================================================================

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RequireSession from './components/RequireSession.jsx'
import Main from './layouts/Main.jsx'
import BackOfficePage from './pages/BackOfficePage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LinksPage from './pages/LinksPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import './App.css'

// Route-level imports keep the Journey scene and Projects case-study code out
// of the initial Home bundle and out of each other's route payloads.
const JourneyPage = lazy(() => import('./pages/JourneyPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))

function RouteFallback({ label }) {
  return (
    <div className="setup-route" role="status" aria-live="polite">
      <p>Loading {label}…</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/portfolio" element={<Navigate to="/journey" replace />} />
        <Route element={<RequireSession />}>
          <Route path="/back-office" element={<BackOfficePage />} />
        </Route>
        <Route path="/backoffice" element={<Navigate to="/back-office" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
