// =============================================================================
// src/components/StatusPanel.jsx — shared route and service-state presentation
// -----------------------------------------------------------------------------
// Neutral/loading states announce politely; callers may opt into `alert` for an
// urgent failure. The heading remains an h1 because this panel replaces a route's
// primary content in loading, configuration, authorization, and Not Found states.
// =============================================================================

function StatusPanel({ title, message, tone = 'neutral', role = 'status', children }) {
  return (
    <section
      className={`status-panel status-panel--${tone}`}
      role={role}
      aria-live={role === 'status' ? 'polite' : undefined}
    >
      <span className="status-panel__mark" aria-hidden="true">
        {tone === 'error' ? '!' : tone === 'success' ? '✓' : '◇'}
      </span>
      <div>
        <h1>{title}</h1>
        {message && <p>{message}</p>}
        {children}
      </div>
    </section>
  )
}

export default StatusPanel
