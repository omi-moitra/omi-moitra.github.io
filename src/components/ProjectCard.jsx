// =============================================================================
// src/components/ProjectCard.jsx — accessible Portfolio project presentation
// -----------------------------------------------------------------------------
// 1. Project media        optional intrinsic screenshot with truthful fallback
// 2. Project content      purpose, description, technology list, and links
// =============================================================================

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {project.image ? (
        <figure className="project-card__media">
          <img
            src={project.image}
            width={project.imageWidth}
            height={project.imageHeight}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ) : null}

      <div className="project-card__content">
        <p className="project-card__eyebrow">Current project</p>
        <h3>{project.name}</h3>
        <p className="project-card__purpose">{project.purpose}</p>
        <p>{project.description}</p>

        <ul className="project-card__technologies" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-card__links">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Visit live site <span aria-hidden="true">↗</span>
          </a>
          {project.sourceUrl ? (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
              View source on GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
