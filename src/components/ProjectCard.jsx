// =============================================================================
// src/components/ProjectCard.jsx — accessible project summary and route links
// -----------------------------------------------------------------------------
// 1. Project media        optional intrinsic screenshot with truthful fallback
// 2. Project content      summary, technology list, case study, and source links
// =============================================================================

import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {project.coverImage?.src ? (
        <figure className="project-card__media">
          <img
            src={project.coverImage.src}
            width={project.coverImage.width}
            height={project.coverImage.height}
            alt={project.coverImage.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ) : null}

      <div className="project-card__content">
        <p className="project-card__eyebrow">Current project</p>
        <h3>{project.title}</h3>
        {project.subtitle && <p className="project-card__purpose">{project.subtitle}</p>}
        {project.summary && <p>{project.summary}</p>}

        {project.technologies?.length > 0 && (
          <ul className="project-card__technologies" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}

        <div className="project-card__links">
          <Link to={`/projects/${project.slug}`}>View case study</Link>
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              Visit live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.links?.repository ? (
            <a href={project.links.repository} target="_blank" rel="noopener noreferrer">
              View source on GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
