// =============================================================================
// src/layouts/Main.jsx — shared landmark composition for every application route
// -----------------------------------------------------------------------------
// 1. Imports & skip behavior    layout dependencies and HashRouter-safe focus
// 2. Main                       skip link, Header, route Outlet, and Footer
// =============================================================================

import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import RouteMetadata from '../components/RouteMetadata.jsx'

function focusMainContent(event) {
  // A normal fragment link would replace HashRouter's route fragment. Preventing
  // that default keeps the active route intact while preserving a real link.
  event.preventDefault()
  const mainContent = document.getElementById('main-content')
  mainContent?.focus({ preventScroll: true })
  mainContent?.scrollIntoView({ block: 'start' })
}

function Main() {
  return (
    <div className="site-shell" data-theme="cozy-fantasy">
      <RouteMetadata />
      <a className="skip-link" href="#main-content" onClick={focusMainContent}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex="-1">
        <div className="site-main__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Main
