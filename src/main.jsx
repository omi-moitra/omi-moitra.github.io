// =============================================================================
// src/main.jsx — React bootstrap and GitHub Pages-compatible router boundary
// -----------------------------------------------------------------------------
// 1. Imports       React, router, application, and global styles
// 2. Bootstrap     one root render with the single HashRouter boundary
// =============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* :warning: HashRouter keeps every GitHub Pages request at the domain root.
        Replacing it with BrowserRouter requires server rewrites Pages cannot provide. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
