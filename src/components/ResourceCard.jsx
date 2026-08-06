// =============================================================================
// src/components/ResourceCard.jsx — semantic card for one external resource
// -----------------------------------------------------------------------------
// 1. ExternalLinkIcon    decorative indicator for off-site navigation
// 2. ResourceCard        resilient media, copy, and safe new-tab action
// =============================================================================

function ExternalLinkIcon() {
  return (
    <svg
      className="resource-card__external-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

function ResourceCard({ resource }) {
  return (
    <li className={`resource-card resource-card--${resource.tone}`}>
      <article className="resource-card__article">
        <div className="resource-card__media">
          <img
            src={resource.image}
            srcSet={resource.imageSrcSet}
            sizes="(min-width: 64rem) 30vw, 100vw"
            width={resource.imageWidth}
            height={resource.imageHeight}
            alt={resource.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="resource-card__content">
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>

          {/* :warning: target and rel are a single security contract. Keeping
              this as a native anchor also preserves expected browser behavior. */}
          <a
            className="resource-card__action"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="resource-card__action-label">
              {resource.actionLabel}
              <ExternalLinkIcon />
            </span>
            <span className="resource-card__new-tab">Opens in a new tab</span>
          </a>
        </div>
      </article>
    </li>
  )
}

export default ResourceCard
