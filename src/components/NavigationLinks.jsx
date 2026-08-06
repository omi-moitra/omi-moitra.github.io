// =============================================================================
// src/components/NavigationLinks.jsx — shared desktop/mobile NavLink renderer
// -----------------------------------------------------------------------------
// 1. Icon metadata       dependency-free paths for five public destinations
// 2. NavigationIcon      decorative mobile icon rendering
// 3. NavigationLinks     shared active-aware public route list
// =============================================================================

import { NavLink } from 'react-router-dom'
import { publicNavigation } from '../data/navigation.js'

const iconPaths = {
  home: [
    'M3 10.75 12 3l9 7.75',
    'M5 9.5V21h5v-6h4v6h5V9.5',
  ],
  journey: [
    'M5 20c1.5-4.5 3.25-7.5 7-9.5 3.2-1.7 5-3.8 6.5-7.5',
    'M4 20h4M16.5 3H20v3.5M11 15l2 2 3.5-4',
  ],
  projects: [
    'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z',
    'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
    'M2 12h20M10 12v2h4v-2',
  ],
  links: [
    'M10.5 13.5l3-3',
    'M7.75 15.25 5.5 17.5a3.54 3.54 0 0 1-5-5l3-3a3.54 3.54 0 0 1 5 0',
    'm16.25 8.75 2.25-2.25a3.54 3.54 0 0 1 5 5l-3 3a3.54 3.54 0 0 1-5 0',
  ],
  contact: [
    'M3 5h18v14H3z',
    'm3 7 9 7 9-7',
  ],
}

function NavigationIcon({ name }) {
  return (
    <svg
      className="navigation-link__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

function NavigationLinks({ showIcons = false, onNavigate }) {
  return (
    <ul className="navigation-list">
      {publicNavigation.map((destination) => (
        <li key={destination.to}>
          <NavLink
            className={({ isActive }) =>
              `navigation-link${isActive ? ' navigation-link--active' : ''}`
            }
            end={destination.to === '/'}
            to={destination.to}
            onClick={onNavigate}
          >
            {showIcons && <NavigationIcon name={destination.icon} />}
            <span className="navigation-link__text">
              <span>{destination.label}</span>
              {!showIcons && (
                <span className="navigation-link__subtitle">{destination.subtitle}</span>
              )}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavigationLinks
