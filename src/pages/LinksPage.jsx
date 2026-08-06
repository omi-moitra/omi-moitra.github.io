// =============================================================================
// src/pages/LinksPage.jsx — verified professional profile links
// -----------------------------------------------------------------------------
// 1. Imports       verified portals and route styles
// 2. Introduction clear page purpose with the Portals thematic subtitle
// 3. Portals       LinkedIn and GitHub profile destinations
// =============================================================================

import { professionalPortals } from '../data/profile.js'
import './LinksPage.css'

function LinksPage() {
  return (
    <article className="links-page">
      <header className="links-hero" aria-labelledby="links-title">
        <p className="links-hero__eyebrow">Portals · Find me online</p>
        <h1 id="links-title">Professional Links</h1>
        <p className="links-hero__introduction">
          Connect with me on LinkedIn or explore my work on GitHub.
        </p>
      </header>

      {professionalPortals.length > 0 ? (
        <section className="professional-portals" aria-labelledby="portals-title">
          <div className="links-collection__heading">
            <p>Professional destinations</p>
            <h2 id="portals-title">Open a portal</h2>
          </div>
          <ul>
            {professionalPortals.map((portal) => (
              <li key={portal.id}>
                <a
                  href={portal.href}
                  {...(portal.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <strong>{portal.label}</strong>
                  <span>{portal.description}</span>
                  <span aria-hidden="true">{portal.external ? '↗' : '→'}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

export default LinksPage
