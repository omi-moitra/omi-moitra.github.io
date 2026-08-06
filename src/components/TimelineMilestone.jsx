// =============================================================================
// src/components/TimelineMilestone.jsx — trail point with résumé tooltip
// -----------------------------------------------------------------------------
// 1. Milestone labels      education/work names and stable tooltip identifiers
// 2. Interaction state     hover/focus preview, click pinning, and Escape close
// 3. TimelineMilestone     accessible point control and anchored detail panel
// =============================================================================

import { useState } from 'react'
import ResumeEntry from './ResumeEntry.jsx'

function TimelineMilestone({ entry, isSelected, kind, onSelect }) {
  const [isPreviewed, setIsPreviewed] = useState(false)
  const isExperience = kind === 'experience'
  const milestoneName = isExperience ? entry.role : entry.institution
  const tooltipId = `${entry.id}-tooltip`
  const triggerId = `${entry.id}-trigger`
  const isOpen = isSelected || isPreviewed

  const closeMilestone = (event) => {
    if (event.key !== 'Escape') return

    onSelect(null)
    setIsPreviewed(false)
    event.currentTarget.blur()
  }

  const toggleMilestone = () => {
    if (isSelected) setIsPreviewed(false)
    onSelect(isSelected ? null : entry.id)
  }

  return (
    <div
      className={`timeline-milestone timeline-milestone--${entry.trail.side}${isOpen ? ' timeline-milestone--open' : ''}${isSelected ? ' timeline-milestone--selected' : ''}`}
      onMouseEnter={() => setIsPreviewed(true)}
      onMouseLeave={() => setIsPreviewed(false)}
    >
      <button
        className="timeline-milestone__trigger"
        id={triggerId}
        type="button"
        aria-controls={tooltipId}
        aria-expanded={isOpen}
        aria-label={`${entry.startYear}: ${milestoneName}. ${isOpen ? 'Hide' : 'Show'} details.`}
        onBlur={() => setIsPreviewed(false)}
        onClick={toggleMilestone}
        onFocus={() => setIsPreviewed(true)}
        onKeyDown={closeMilestone}
      >
        <span>{entry.startYear}</span>
      </button>

      <div
        className="timeline-milestone__tooltip"
        id={tooltipId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
      >
        <ResumeEntry entry={entry} kind={kind} />
      </div>
    </div>
  )
}

export default TimelineMilestone
