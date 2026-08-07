// =============================================================================
// vite.config.js — Vite build configuration for the root GitHub Pages site
// -----------------------------------------------------------------------------
// 1. Imports        Vite and React plugin configuration
// 2. React plugin   JSX transform and Fast Refresh during local development
// 3. Deploy base    root-relative assets for the username GitHub Pages site
// =============================================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // :warning: This is a username.github.io root site. A repository-name base
  // would break root-relative assets in both the Pages artifact and hash routes.
  base: '/',
})
