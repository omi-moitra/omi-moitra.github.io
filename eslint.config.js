// =============================================================================
// eslint.config.js — authored JavaScript and JSX quality contract
// -----------------------------------------------------------------------------
// 1. Generated output   exclude Vite's dist artifact from source diagnostics
// 2. Base JavaScript    apply the recommended language correctness rules
// 3. React behavior    validate Hooks ordering and Vite Fast Refresh exports
// 4. Browser runtime   expose DOM globals used by this client-only application
// =============================================================================

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Build output is reproducible and must be checked through the source that
  // generated it, not linted as if it were maintained application code.
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
