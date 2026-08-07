// =============================================================================
// src/components/ResourceCard.jsx — compact semantic codex entry
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

function ResourceCard({ resource, tone }) {
  return (
    <li className={`resource-card resource-card--${tone}`}>
      <article className="resource-card__article">
        <header className="resource-card__header">
          <span className="resource-card__mark" aria-hidden="true">
            {resource.mark}
          </span>
          <div className="resource-card__badges" aria-label="Resource classification">
            <span>{resource.resourceType}</span>
            <span>{resource.authority}</span>
          </div>
        </header>

        <div className="resource-card__content">
          <p className="resource-card__source">{resource.source}</p>
          <h3>{resource.title}</h3>
          <p className="resource-card__description">{resource.description}</p>

          <ul className="resource-card__tags" aria-label="Topics">
            {resource.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <a
            className="resource-card__action"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Open resource</span>
            <ExternalLinkIcon />
            <span className="visually-hidden">: {resource.title} (opens in a new tab)</span>
          </a>
        </div>
      </article>
    </li>
  )
}

export default ResourceCard
