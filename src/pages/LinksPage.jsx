// =============================================================================
// src/pages/LinksPage.jsx — searchable developer documentation codex
// =============================================================================

import { useMemo, useState } from 'react'
import ResourceCard from '../components/ResourceCard.jsx'
import { professionalPortals } from '../data/profile.js'
import { resourceCollections, resourceCount } from '../data/resources.js'
import './LinksPage.css'

const allCategory = 'all'

function resourceMatches(resource, query) {
  if (!query) return true

  const searchableText = [
    resource.title,
    resource.source,
    resource.description,
    resource.resourceType,
    resource.authority,
    ...resource.tags,
  ]
    .join(' ')
    .toLocaleLowerCase()

  return searchableText.includes(query)
}

function LinksPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(allCategory)

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visibleCollections = useMemo(
    () =>
      resourceCollections
        .filter(
          (collection) =>
            activeCategory === allCategory || collection.id === activeCategory,
        )
        .map((collection) => ({
          ...collection,
          resources: collection.resources.filter((resource) =>
            resourceMatches(resource, normalizedQuery),
          ),
        }))
        .filter((collection) => collection.resources.length > 0),
    [activeCategory, normalizedQuery],
  )

  const visibleCount = visibleCollections.reduce(
    (total, collection) => total + collection.resources.length,
    0,
  )

  const clearFilters = () => {
    setQuery('')
    setActiveCategory(allCategory)
  }

  return (
    <article className="links-page">
      <header className="links-hero" aria-labelledby="links-title">
        <p className="links-hero__eyebrow">Portals · Documentation · Field notes</p>
        <h1 id="links-title">Developer Codex</h1>
        <p className="links-hero__introduction">
          A curated library of the documentation, standards, tutorials, and technical
          references I trust when building for the web.
        </p>
      </header>

      <section className="codex-controls" aria-labelledby="browse-codex-title">
        <div className="links-collection__heading">
          <p>Search the shelves</p>
          <h2 id="browse-codex-title">Browse the codex</h2>
        </div>

        <div className="codex-search">
          <label htmlFor="codex-query">Search by technology, source, or topic</label>
          <div className="codex-search__field">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              id="codex-query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try React, accessibility, or WebGL"
            />
          </div>
        </div>

        <div className="codex-filters" aria-label="Filter resources by category">
          <button
            type="button"
            className={activeCategory === allCategory ? 'is-active' : undefined}
            aria-pressed={activeCategory === allCategory}
            onClick={() => setActiveCategory(allCategory)}
          >
            All resources
          </button>
          {resourceCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={activeCategory === collection.id ? 'is-active' : undefined}
              aria-pressed={activeCategory === collection.id}
              onClick={() => setActiveCategory(collection.id)}
            >
              {collection.title}
            </button>
          ))}
        </div>

        <p className="codex-results" aria-live="polite" aria-atomic="true">
          Showing {visibleCount} of {resourceCount} resources
        </p>
      </section>

      <div className="codex-collections">
        {visibleCollections.length > 0 ? (
          visibleCollections.map((collection) => (
            <section
              className={`links-collection links-collection--${collection.tone}`}
              key={collection.id}
              aria-labelledby={`${collection.id}-title`}
            >
              <div className="links-collection__heading">
                <p>{collection.description}</p>
                <h2 id={`${collection.id}-title`}>{collection.title}</h2>
              </div>
              <ul className="resource-grid">
                {collection.resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    tone={collection.tone}
                  />
                ))}
              </ul>
            </section>
          ))
        ) : (
          <section className="codex-empty" aria-labelledby="codex-empty-title">
            <p aria-hidden="true">⌕</p>
            <h2 id="codex-empty-title">No matching entries</h2>
            <p>Try another search term or return to the complete collection.</p>
            <button type="button" onClick={clearFilters}>
              Clear search and filters
            </button>
          </section>
        )}
      </div>

      {professionalPortals.length > 0 ? (
        <section className="professional-portals" aria-labelledby="portals-title">
          <div className="links-collection__heading">
            <p>Beyond the library</p>
            <h2 id="portals-title">My portals</h2>
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
