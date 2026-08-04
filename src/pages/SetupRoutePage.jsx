// =============================================================================
// src/pages/SetupRoutePage.jsx — temporary route-safe setup view
// -----------------------------------------------------------------------------
// 1. SetupRoutePage    semantic placeholder for page-owned feature content
// =============================================================================

function SetupRoutePage({ description, routePath, title }) {
  return (
    <main className="setup-route">
      <section className="setup-route__card" aria-labelledby="route-title">
        <p className="setup-route__eyebrow">Application foundation</p>
        <h1 id="route-title">{title}</h1>
        <p>{description}</p>
        <p className="setup-route__path">
          Hash route: <code>{routePath}</code>
        </p>
      </section>
    </main>
  )
}

export default SetupRoutePage
