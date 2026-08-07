// =============================================================================
// src/theme/themeContext.js — stable theme context contract
// -----------------------------------------------------------------------------
// Kept separate from ThemeProvider so Fast Refresh sees a component-only provider
// module while controls import the hook and supported preference values here.
// =============================================================================

import { createContext, useContext } from 'react'

export const ThemeContext = createContext(null)
export const themeChoices = ['light', 'dark', 'system']

export function useTheme() {
  const value = useContext(ThemeContext)
  // Fail at the call site when a consumer escapes the provider rather than
  // silently rendering a theme control with incomplete behavior.
  if (!value) throw new Error('useTheme must be used within ThemeProvider.')
  return value
}
