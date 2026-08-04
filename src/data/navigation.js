// =============================================================================
// src/data/navigation.js — canonical public navigation destinations
// -----------------------------------------------------------------------------
// 1. publicNavigation    shared labels, hash-router paths, and icon identifiers
// =============================================================================

// :warning: Login and Back Office are intentionally absent. Route hiding is not
// security, but public navigation must never advertise administrator surfaces.
export const publicNavigation = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'Portfolio', to: '/portfolio', icon: 'portfolio' },
  { label: 'Links', to: '/links', icon: 'links' },
  { label: 'Contact', to: '/contact', icon: 'contact' },
]
