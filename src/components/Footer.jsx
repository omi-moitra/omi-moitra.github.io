// =============================================================================
// src/components/Footer.jsx — shared approved contact and copyright content
// -----------------------------------------------------------------------------
// 1. Footer    approved email, optional verified profiles, and current year
// =============================================================================

import { publicProfile } from '../data/profile.js'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <p className="site-footer__heading">Let’s build something thoughtful.</p>
          <a className="site-footer__email" href={`mailto:${publicProfile.email}`}>
            {publicProfile.email}
          </a>
        </div>

        {publicProfile.socialLinks.length > 0 && (
          <ul className="site-footer__social-links" aria-label="Professional profiles">
            {publicProfile.socialLinks.map((profile) => (
              <li key={profile.url}>
                <a href={profile.url} target="_blank" rel="noopener noreferrer">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="site-footer__copyright">
          © {currentYear} {publicProfile.copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
