// =============================================================================
// src/App.jsx — application routes composed inside the shared Main layout
// -----------------------------------------------------------------------------
// 1. Imports                    public pages, protected gate, and lazy Portfolio
// 2. Portfolio fallback        lightweight status while WebGL code loads
// 3. App                       public, protected, alias, and fallback routes
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

// Three.js is isolated to the Portfolio route so the 3D enhancement does not
// increase the initial JavaScript cost for every other public page.
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'))

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<PortfolioFallback />}>
              <PortfolioPage />
            </Suspense>
          }
        />
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
