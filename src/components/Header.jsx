// =============================================================================
// src/components/Header.jsx — sticky brand header and responsive navigation
// -----------------------------------------------------------------------------
// 1. Header    logo Home link, desktop navigation, and mobile navigation
// =============================================================================

import { Link } from 'react-router-dom'
import MobileNavigation from './MobileNavigation.jsx'
import NavigationLinks from './NavigationLinks.jsx'

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__content">
        <Link
          className="brand-link"
          to="/"
          aria-label="Oishieka Moitra portfolio home"
        >
          <img
            className="brand-link__logo"
            src="/personal-logo-header.png"
            width="320"
            height="320"
            alt=""
          />
          <span className="brand-link__text">
            <span className="brand-link__name">Oishieka Moitra</span>
            <span className="brand-link__role">Full Stack Developer</span>
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>
      </div>

      <MobileNavigation />
    </header>
  )
}

export default Header
