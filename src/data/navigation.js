// =============================================================================
// src/data/navigation.js — canonical public navigation destinations
// -----------------------------------------------------------------------------
// 1. publicNavigation    clear labels, thematic subtitles, paths, and icons
// =============================================================================

// :warning: Login and Back Office are intentionally absent. Route hiding is not
// security, but public navigation must never advertise administrator surfaces.
export const publicNavigation = [
  { label: 'Home', subtitle: 'Enter the Codex', to: '/', icon: 'home' },
  { label: 'Journey', subtitle: 'The Flight Path', to: '/journey', icon: 'journey' },
  { label: 'Projects', subtitle: 'Crafted Worlds', to: '/projects', icon: 'projects' },
  { label: 'Links', subtitle: 'Developer Codex', to: '/links', icon: 'links' },
  { label: 'Contact', subtitle: 'Send a Message', to: '/contact', icon: 'contact' },
]
