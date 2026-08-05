// =============================================================================
// src/pages/PortfolioPage.jsx — Portfolio education, experience, and projects
// -----------------------------------------------------------------------------
// 1. Page canvas          full-page journey artwork and readable surface layers
// 2. Journey stage        upper-left title and wireframe-aligned résumé trail
// 3. Resume groups        semantic Education and Experience milestone tooltips
// 4. Projects             truthful current-site card and external links
// =============================================================================

import ProjectCard from '../components/ProjectCard.jsx'
import PortfolioExperience from '../components/PortfolioExperience.jsx'
import TimelineMilestone from '../components/TimelineMilestone.jsx'
import {
  education,
  portfolioImages,
  portfolioIntroduction,
  professionalExperience,
  projects,
  resume,
} from '../data/portfolioContent.js'
import './PortfolioPage.css'

function PortfolioPage() {
  return (
    <article
      className="portfolio-page"
      style={{ '--portfolio-journey-background': `url(${portfolioImages.journey.src})` }}
    >
      <PortfolioExperience imageSource={portfolioImages.journey.src} />

      <div className="portfolio-resume-journey">
        <section className="portfolio-hero" aria-labelledby="portfolio-title">
          <div className="portfolio-hero__copy">
            <p className="portfolio-eyebrow">Research. Requirements. Resilient software.</p>
            <h1 id="portfolio-title">Portfolio &amp; Experience</h1>
            <p className="portfolio-hero__introduction">{portfolioIntroduction}</p>

            {resume ? (
              <a
                className="portfolio-resume-link"
                href={resume.href}
                download={resume.downloadName}
              >
                {resume.label}
              </a>
            ) : null}
          </div>
        </section>

        <svg
          className="portfolio-resume-journey__path"
          viewBox="0 0 1000 900"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            className="portfolio-resume-journey__path-glow"
            d="M70 850 150 760C260 720 330 670 440 620L610 530C690 485 710 430 650 375 590 320 610 255 690 205 735 175 750 150 760 120"
          />
          <path
            className="portfolio-resume-journey__path-core"
            d="M70 850 150 760C260 720 330 670 440 620L610 530C690 485 710 430 650 375 590 320 610 255 690 205 735 175 750 150 760 120"
          />
        </svg>

        <section
          className="portfolio-journey-group portfolio-journey-group--education"
          aria-labelledby="education-title"
        >
          <h2 className="portfolio-journey-group__heading" id="education-title">
            Education
          </h2>
          <ol className="resume-timeline resume-timeline--education">
            {education.map((entry) => (
              <li
                className="journey-point"
                key={entry.id}
                style={{ '--journey-x': entry.trail.x, '--journey-y': entry.trail.y }}
              >
                <TimelineMilestone entry={entry} kind="education" />
              </li>
            ))}
          </ol>
        </section>

        <section
          className="portfolio-journey-group portfolio-journey-group--experience"
          aria-labelledby="experience-title"
        >
          <h2 className="portfolio-journey-group__heading" id="experience-title">
            Professional Experience
          </h2>
          <ol className="resume-timeline resume-timeline--experience">
            {professionalExperience.map((entry) => (
              <li
                className="journey-point"
                key={entry.id}
                style={{ '--journey-x': entry.trail.x, '--journey-y': entry.trail.y }}
              >
                <TimelineMilestone entry={entry} kind="experience" />
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section
        className="portfolio-section portfolio-section--projects"
        aria-labelledby="projects-title"
      >
        <div className="portfolio-section__heading portfolio-reveal">
          <p className="portfolio-eyebrow">Built work</p>
          <h2 id="projects-title">Selected Project</h2>
          <p>A current project documented through its purpose, implementation, and public source.</p>
        </div>

        <figure
          className="portfolio-media portfolio-media--scroll portfolio-reveal"
          aria-hidden="true"
        >
          <img
            src={portfolioImages.codeScroll.src}
            width={portfolioImages.codeScroll.width}
            height={portfolioImages.codeScroll.height}
            alt={portfolioImages.codeScroll.alt}
            loading={portfolioImages.codeScroll.loading}
            decoding="async"
          />
        </figure>

        <div className="project-list portfolio-reveal">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </article>
  )
}

export default PortfolioPage
