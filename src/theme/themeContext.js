import { createContext, useContext } from 'react'

export const ThemeContext = createContext(null)
export const themeChoices = ['light', 'dark', 'system']

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used within ThemeProvider.')
  return value
}
