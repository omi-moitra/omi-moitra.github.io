// =============================================================================
// src/components/ProjectCard.jsx — accessible Projects route presentation
// -----------------------------------------------------------------------------
// 1. Imports              dialog state, focus management, and React refs
// 2. Project media        optional intrinsic screenshot with truthful fallback
// 3. Project content      purpose, description, technology list, and links
// 4. Case study dialog    verified details, keyboard dismissal, focus restore
// =============================================================================

import { useRef, useState } from 'react'
import useModalDialog from '../hooks/useModalDialog.js'

function ProjectCard({ project }) {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const openerRef = useRef(null)
  const dialogRef = useRef(null)
  const headingRef = useRef(null)

  useModalDialog({
    isOpen: isCaseStudyOpen,
    dialogRef,
    initialFocusRef: headingRef,
    openerRef,
    onRequestClose: () => setIsCaseStudyOpen(false),
  })

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
          {project.caseStudy ? (
            <button
              ref={openerRef}
              type="button"
              onClick={() => setIsCaseStudyOpen(true)}
            >
              View case study
            </button>
          ) : null}
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

      {isCaseStudyOpen && project.caseStudy ? (
        <div
          className="project-case-study-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsCaseStudyOpen(false)
          }}
        >
          <section
            ref={dialogRef}
            className="project-case-study"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-study-${project.id}`}
            tabIndex="-1"
          >
            <header className="project-case-study__header">
              <div>
                <p>Crafted world case study</p>
                <h2 ref={headingRef} id={`case-study-${project.id}`} tabIndex="-1">
                  {project.name}
                </h2>
              </div>
              <button type="button" onClick={() => setIsCaseStudyOpen(false)}>
                Close
              </button>
            </header>

            <dl className="project-case-study__summary">
              <div><dt>Objective</dt><dd>{project.caseStudy.objective}</dd></div>
              <div><dt>Role</dt><dd>{project.caseStudy.role}</dd></div>
              <div><dt>Architecture</dt><dd>{project.caseStudy.architecture}</dd></div>
            </dl>

            {[
              ['Design decisions', project.caseStudy.decisions],
              ['Challenges', project.caseStudy.challenges],
              ['Solutions', project.caseStudy.solutions],
            ].map(([title, items]) => (
              <section key={title} className="project-case-study__section">
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}

            <section className="project-case-study__section">
              <h3>Outcome</h3>
              <p>{project.caseStudy.outcome}</p>
            </section>
            <section className="project-case-study__section">
              <h3>What comes next</h3>
              <p>{project.caseStudy.nextSteps}</p>
            </section>
          </section>
        </div>
      ) : null}
    </article>
  )
}

export default ProjectCard
