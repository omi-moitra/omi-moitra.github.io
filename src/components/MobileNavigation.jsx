// =============================================================================
// src/components/MobileNavigation.jsx — accessible small-screen bottom navigation
// -----------------------------------------------------------------------------
// 1. MobileNavigation    persistent icon links for the five public destinations
// =============================================================================

import NavigationLinks from './NavigationLinks.jsx'

function MobileNavigation() {
  return (
    <nav className="mobile-navigation" aria-label="Mobile navigation">
      <NavigationLinks showIcons />
    </nav>
  )
}

export default MobileNavigation
