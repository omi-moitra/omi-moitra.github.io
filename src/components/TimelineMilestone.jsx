// Trail markers select the shared Journey hero carousel.
function TimelineMilestone({ entry, isSelected, kind, onSelect }) {
  const milestoneName = kind === 'experience' ? entry.role : entry.institution

  return (
    <div className={`timeline-milestone${isSelected ? ' timeline-milestone--selected' : ''}`}>
      <button
        className="timeline-milestone__trigger"
        id={`${entry.id}-trigger`}
        type="button"
        aria-controls="journey-milestone-card"
        aria-expanded={isSelected}
        aria-label={`${entry.startYear}: ${milestoneName}. ${isSelected ? 'Hide' : 'Show'} details.`}
        onClick={() => onSelect(isSelected ? null : entry.id)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onSelect(null)
        }}
      >
        <span>{entry.startYear}</span>
      </button>
    </div>
  )
}

export default TimelineMilestone
