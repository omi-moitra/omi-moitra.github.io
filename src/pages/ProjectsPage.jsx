// =============================================================================
// src/pages/ProjectsPage.jsx — separate Crafted Worlds project collection
// -----------------------------------------------------------------------------
// 1. Imports             verified projects, generated artwork, and route styles
// 2. Introduction        clear page purpose and independent Projects identity
// 3. Project collection  settled media wall and direct case-study routes
// =============================================================================

import ProjectCard from '../components/ProjectCard.jsx'
import { portfolioImages, projects } from '../data/portfolioContent.js'
import './PortfolioPage.css'

function ProjectsPage() {
  return (
    <article
      className="portfolio-page projects-page"
      style={{ '--projects-background': `url(${portfolioImages.codeScroll.src})` }}
    >
      <header className="projects-hero" aria-labelledby="projects-title">
        <p className="portfolio-eyebrow">Crafted Worlds</p>
        <h1 id="projects-title">Projects</h1>
        <p>
          Explore verified work through its purpose, architecture, design decisions,
          challenges, and honest next steps.
        </p>
      </header>

      <section
        className="portfolio-section portfolio-section--projects"
        aria-labelledby="project-collection-title"
      >
        <div className="portfolio-section__heading portfolio-reveal">
          <p className="portfolio-eyebrow">Settled studio wall</p>
          <h2 id="project-collection-title">Selected Projects</h2>
          <p>
            Each verified project opens into an accessible case study with direct
            links to the live experience and public source when available.
          </p>
        </div>

        <figure
          className="portfolio-media portfolio-media--scroll portfolio-reveal"
          aria-hidden="true"
        >
          <img
            src={portfolioImages.codeScroll.src}
            srcSet={portfolioImages.codeScroll.srcSet}
            sizes={portfolioImages.codeScroll.sizes}
            width={portfolioImages.codeScroll.width}
            height={portfolioImages.codeScroll.height}
            alt=""
            loading={portfolioImages.codeScroll.loading}
            decoding="async"
          />
        </figure>

        <div className="project-list portfolio-reveal portfolio-reveal--visible">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </article>
  )
}

export default ProjectsPage
