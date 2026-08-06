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
