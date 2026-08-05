// =============================================================================
// src/pages/LinksPage.jsx — curated professional development references
// -----------------------------------------------------------------------------
// 1. Imports       resource card, static data, and route-specific styles
// 2. Introduction page heading and purpose of the collection
// 3. Collection   semantic data-driven list of external resources
// =============================================================================

import ResourceCard from '../components/ResourceCard.jsx'
import { resources } from '../data/resources.js'
import './LinksPage.css'

function LinksPage() {
  return (
    <article className="links-page">
      <header className="links-hero" aria-labelledby="links-title">
        <p className="links-hero__eyebrow">A developer’s field guide</p>
        <h1 id="links-title">Developer Resources</h1>
        <p className="links-hero__introduction">
          These are a few of the references I return to while building accessible,
          maintainable web applications. Together they cover the browser platform,
          component-based interface development, and the data and authentication services
          used in this portfolio.
        </p>
      </header>

      <section className="links-collection" aria-labelledby="resources-title">
        <div className="links-collection__heading">
          <p>Three official references</p>
          <h2 id="resources-title">Explore the collection</h2>
        </div>

        <ul className="resource-grid">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </ul>
      </section>
    </article>
  )
}

export default LinksPage
