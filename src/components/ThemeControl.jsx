import { themeChoices, useTheme } from '../theme/themeContext.js'

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

function ThemeIcon({ theme }) {
  if (theme === 'light') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="3.75" />
        <path d="M12 2.25v2M12 19.75v2M4.25 12h-2M21.75 12h-2M5.1 5.1 3.7 3.7M20.3 20.3l-1.4-1.4M18.9 5.1l1.4-1.4M3.7 20.3l1.4-1.4" />
      </svg>
    )
  }

  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.2 15.35A8.5 8.5 0 0 1 8.65 3.8 8.5 8.5 0 1 0 20.2 15.35Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function ThemeControl({ className = '' }) {
  const { theme, setTheme } = useTheme()

  return (
    <fieldset className={`theme-control${className ? ` ${className}` : ''}`}>
      <legend className="theme-control__label">Theme</legend>
      <div className="theme-control__options">
        {themeChoices.map((choice) => (
          <button
            key={choice}
            className="theme-control__button"
            type="button"
            aria-label={`${themeLabels[choice]} theme`}
            aria-pressed={theme === choice}
            title={`${themeLabels[choice]} theme`}
            onClick={() => setTheme(choice)}
          >
            <ThemeIcon theme={choice} />
            <span className="theme-control__button-label">{themeLabels[choice]}</span>
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default ThemeControl
