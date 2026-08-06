// =============================================================================
// src/components/Header.jsx — sticky brand header and responsive navigation
// -----------------------------------------------------------------------------
// 1. Route theme    active public-route current selection
// 2. Header         warm brand surface, navigation, and gradient current
// =============================================================================

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileNavigation from './MobileNavigation.jsx'
import NavigationLinks from './NavigationLinks.jsx'
import ThemeControl from './ThemeControl.jsx'

function Header() {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 8)
  const routeTheme =
    pathname === '/'
      ? 'home'
      : ['journey', 'projects', 'links', 'contact'].find((route) =>
          pathname.startsWith(`/${route}`),
        ) || 'neutral'

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 8)
    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  return (
    <header
      className={`site-header site-header--${routeTheme}${
        isScrolled ? ' site-header--scrolled' : ''
      }`}
    >
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

        <div className="site-header__actions">
          <nav className="desktop-navigation" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <ThemeControl className="theme-control--desktop" />
          <MobileNavigation />
        </div>
      </div>

      <div className="gradient-current" aria-hidden="true" />
    </header>
  )
}

export default Header
