// =============================================================================
// src/components/Footer.jsx — shared icon links for approved contact profiles
// -----------------------------------------------------------------------------
// 1. FooterIcon    accessible inline symbols for each contact destination
// 2. Footer        email, GitHub, LinkedIn icon links, and copyright
// =============================================================================

import { professionalPortals, publicProfile } from '../data/profile.js'

function FooterIcon({ icon }) {
  if (icon === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }

  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2.75a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.67c-2.66.58-3.22-1.13-3.22-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.85 1.46 2.24 1.04 2.79.8.09-.62.33-1.04.61-1.28-2.12-.24-4.36-1.06-4.36-4.7 0-1.04.37-1.89.99-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.61.98a9.1 9.1 0 0 1 4.76 0c1.81-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.09 2.52.62.67.99 1.52.99 2.56 0 3.65-2.24 4.45-4.37 4.69.34.3.65.88.65 1.78v2.5c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.75Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="9" width="4" height="12" rx="0.75" />
      <circle cx="5" cy="5" r="2.25" />
      <path d="M11 21V9h4v1.7c.85-1.3 2.15-2.1 4-2.1 2.75 0 4 1.85 4 5.2V21h-4v-6.35c0-1.7-.55-2.7-1.9-2.7-1.5 0-2.1 1.05-2.1 3.15V21Z" />
    </svg>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  const professionalLinks = ['github', 'linkedin']
    .map((id) => professionalPortals.find((profile) => profile.id === id))
    .filter(Boolean)

  const footerLinks = [
    {
      id: 'email',
      label: `Email ${publicProfile.email}`,
      href: `mailto:${publicProfile.email}`,
      external: false,
    },
    ...professionalLinks,
  ]

  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <ul className="site-footer__links" aria-label="Contact and professional links">
          {footerLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <FooterIcon icon={link.id} />
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer__copyright">
          © {currentYear} {publicProfile.copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
