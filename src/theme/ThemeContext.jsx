// =============================================================================
// src/theme/ThemeContext.jsx — theme resolution, persistence, and DOM effects
// -----------------------------------------------------------------------------
// 1. Initial preference  validate localStorage and default to System
// 2. System listener     follow OS changes while System remains selected
// 3. Document effects    synchronize data-theme, color-scheme, and theme-color
// 4. Context value       expose preference, resolved theme, and setter
// =============================================================================

import { useEffect, useMemo, useState } from 'react'
import { ThemeContext, themeChoices } from './themeContext.js'

const THEME_STORAGE_KEY = 'omi-portfolio-theme'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme() {
  // Ignore stale or manually edited values instead of introducing an unknown
  // CSS theme state into the document.
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return themeChoices.includes(storedTheme) ? storedTheme : 'system'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    // Listen continuously rather than only at startup so System mode responds
    // to a live operating-system preference change.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  useEffect(() => {
    // Keep browser chrome and native controls aligned with the resolved palette;
    // persist the user's preference (`system`), not merely its current result.
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', resolvedTheme === 'dark' ? '#151319' : '#F5EBD8')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [resolvedTheme, theme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
