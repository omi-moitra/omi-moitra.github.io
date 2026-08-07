// =============================================================================
// src/pages/NotFoundPage.jsx — public wildcard route recovery
// -----------------------------------------------------------------------------
// Unknown hashes resolve to readable route content and a native router link back
// to Home; no redirect hides the invalid address from the visitor.
// =============================================================================

import { Link } from 'react-router-dom'
import StatusPanel from '../components/StatusPanel.jsx'

function NotFoundPage() {
  return (
    <div className="status-page">
      <StatusPanel
        title="This path is not in the Codex."
        message="The page may have moved, or the address may be incomplete."
      >
        <Link className="status-panel__action" to="/">
          Return home
        </Link>
      </StatusPanel>
    </div>
  )
}

export default NotFoundPage
