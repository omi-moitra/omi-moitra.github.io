// =============================================================================
// src/pages/SetupRoutePage.jsx — temporary route-safe setup view
// -----------------------------------------------------------------------------
// 1. SetupRoutePage    semantic placeholder for page-owned feature content
// =============================================================================

function SetupRoutePage({ description, routePath, title }) {
  return (
    <section className="setup-route" aria-labelledby="route-title">
      <div className="setup-route__card">
        <p className="setup-route__eyebrow">Application foundation</p>
        <h1 id="route-title">{title}</h1>
        <p>{description}</p>
        <p className="setup-route__path">
          Hash route: <code>{routePath}</code>
        </p>
      </div>
    </section>
  )
}

export default SetupRoutePage
