// =============================================================================
// src/components/MobileNavigation.jsx — fixed public navigation for ≤768px
// -----------------------------------------------------------------------------
// 1. MobileNavigation    labeled navigation using the shared route renderer
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
