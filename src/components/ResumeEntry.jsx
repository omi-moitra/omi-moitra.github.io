// =============================================================================
// src/components/ResumeEntry.jsx — semantic Education and Experience entry
// -----------------------------------------------------------------------------
// 1. Content mapping      education/work labels without duplicated structures
// 2. ResumeEntry          article metadata and optional responsibility list
// =============================================================================

function ResumeEntry({ entry, kind }) {
  const isExperience = kind === 'experience'
  const heading = isExperience ? entry.role : entry.institution
  const organization = isExperience ? entry.organization : entry.program

  return (
    <article className={`resume-entry resume-entry--${kind}`}>
      <header className="resume-entry__header">
        <p className="resume-entry__dates">{entry.dates}</p>
        <h3>{heading}</h3>
        <p className="resume-entry__organization">{organization}</p>
        {entry.location ? (
          <p className="resume-entry__location">{entry.location}</p>
        ) : null}
      </header>

      {isExperience && entry.responsibilities.length > 0 ? (
        <ul className="resume-entry__responsibilities">
          {entry.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default ResumeEntry
