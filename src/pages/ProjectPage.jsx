// =============================================================================
// src/pages/ProjectPage.jsx — data-driven project case study route
// -----------------------------------------------------------------------------
// 1. Record lookup       resolve the route slug against verified project data
// 2. Missing state       provide a readable recovery path for unknown slugs
// 3. Case-study sections omit optional content without leaving empty wrappers
// 4. Actions             internal collection link and safe external destinations
// =============================================================================

import { Link, useParams } from 'react-router-dom'
import StatusPanel from '../components/StatusPanel.jsx'
import { projects } from '../data/projects.js'
import './PortfolioPage.css'

function ProjectPage() {
  const { projectSlug } = useParams()
  const project = projects.find((entry) => entry.slug === projectSlug)

  if (!project) {
    return (
      <div className="status-page">
        <StatusPanel
          title="Project not found."
          message="That case study is not currently part of the published collection."
        >
          <Link className="status-panel__action" to="/projects">
            Return to selected work
          </Link>
        </StatusPanel>
      </div>
    )
  }

  const projectSections = [
    ['Overview', project.overview],
    ['Challenge', project.challenge],
    ['Solution', project.solution],
    ['Outcome', project.outcome],
  ].filter(([, content]) => content)

  // Project data owns ordering and copy; the route owns semantic composition.
  // This separation lets new verified records render without page-level edits.

  return (
    <article className="project-detail">
      <header className="project-detail__hero">
        <p className="portfolio-eyebrow">{project.year} case study</p>
        <h1>{project.title}</h1>
        {project.subtitle && <p className="project-detail__subtitle">{project.subtitle}</p>}
        {project.summary && <p>{project.summary}</p>}
      </header>

      {(project.role?.length > 0 || project.technologies?.length > 0) && (
        <dl className="project-detail__facts">
          {project.role?.length > 0 && (
            <div><dt>Role</dt><dd>{project.role.join(' · ')}</dd></div>
          )}
          {project.technologies?.length > 0 && (
            <div><dt>Technologies</dt><dd>{project.technologies.join(' · ')}</dd></div>
          )}
        </dl>
      )}

      <div className="project-detail__sections">
        {projectSections.map(([title, content]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{content}</p>
          </section>
        ))}

        {project.process?.length > 0 && (
          <section>
            <h2>Design decisions</h2>
            <ul>{project.process.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        )}

        {project.lessons?.length > 0 && (
          <section>
            <h2>Lessons and next steps</h2>
            <ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        )}
      </div>

      <footer className="project-detail__actions">
        <Link to="/projects">All projects</Link>
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer">
            Visit live site <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.links?.repository && (
          <a href={project.links.repository} target="_blank" rel="noopener noreferrer">
            View source <span aria-hidden="true">↗</span>
          </a>
        )}
      </footer>
    </article>
  )
}

export default ProjectPage
