// =============================================================================
// src/components/SkillCard.jsx — accessible card for Home skill collections
// -----------------------------------------------------------------------------
// 1. Icon paths     dependency-free symbols for six skill concepts
// 2. SkillCard      semantic list item with decorative icon and sourced copy
// =============================================================================

const iconPaths = {
  'component-code': [
    'M8 7 3 12l5 5',
    'm16 7 5 5-5 5',
    'm14 4-4 16',
  ],
  'connected-nodes': [
    'M12 5v4M6 15l4-3M18 15l-4-3',
    'M9 3a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
    'M3 18a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
    'M15 18a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
  ],
  database: [
    'M4 5c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3Z',
    'M4 5v7c0 2 3.6 3 8 3s8-1 8-3V5',
    'M4 12v7c0 2 3.6 3 8 3s8-1 8-3v-7',
  ],
  'risk-assessment': [
    'M10 3 4 6v5c0 4.4 2.6 7.7 6 9 2-.8 3.7-2.2 4.8-4',
    'M16 10a4 4 0 1 0 0 8 4 4 0 1 0 0-8',
    'm19 17 3 3',
  ],
  documentation: [
    'M6 2h9l3 3v17H6Z',
    'M14 2v5h4',
    'M9 12h6M9 16h6',
  ],
  communication: [
    'M3 4h12v8H8l-5 4Z',
    'M11 9h10v7h-4l-4 4v-4h-2',
  ],
}

function SkillCard({ skill, tone }) {
  return (
    <li className={`skill-card skill-card--${tone}`}>
      <svg
        className="skill-card__icon"
        viewBox="0 0 24 24"
        aria-hidden={skill.iconIsDecorative}
        focusable="false"
      >
        {iconPaths[skill.icon].map((path) => (
          <path key={path} d={path} />
        ))}
      </svg>
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </li>
  )
}

export default SkillCard
