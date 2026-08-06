// =============================================================================
// src/data/profile.js — approved public details for shared layout content
// -----------------------------------------------------------------------------
// 1. publicProfile          email, copyright identity, and verified profiles
// 2. professionalPortals    approved Links-page shortcuts and destinations
// =============================================================================

export const publicProfile = {
  email: 'omoitra@gmail.com',
  copyrightName: 'Oishieka Moitra',
  // Optional profiles remain absent until their exact public URLs are verified.
  socialLinks: [],
}

export const professionalPortals = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Connect with me and explore my professional experience.',
    href: 'https://www.linkedin.com/in/oishieka-moitra-6300181b7',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Explore my projects and source code on GitHub.',
    href: 'https://github.com/omi-moitra',
    external: true,
  },
]
