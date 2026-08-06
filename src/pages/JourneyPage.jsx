// =============================================================================
// src/pages/JourneyPage.jsx — education, experience, and résumé Phoenix Path
// -----------------------------------------------------------------------------
// 1. Imports             Journey scene, timeline data, and shared route styles
// 2. Journey stage       page introduction and progressively enhanced trail
// 3. Resume groups       semantic Education and Experience milestone tooltips
// =============================================================================

import PortfolioExperience from '../components/PortfolioExperience.jsx'
import TimelineMilestone from '../components/TimelineMilestone.jsx'
import {
  education,
  portfolioImages,
  portfolioIntroduction,
  professionalExperience,
  resume,
} from '../data/portfolioContent.js'
import './PortfolioPage.css'

const journeyPath =
  'M67 850C120 825 175 790 220 765 280 735 330 705 350 675 375 610 400 555 420 522 485 495 560 490 630 486 650 450 640 405 610 369 620 330 650 298 690 279 700 235 706 200 710 171'

function JourneyPage() {
  return (
    <article
      className="portfolio-page journey-page"
      style={{ '--portfolio-journey-background': `url(${portfolioImages.journey.src})` }}
    >
      <PortfolioExperience imageSource={portfolioImages.journey.src} />

      <div className="portfolio-resume-journey">
        <section className="portfolio-hero" aria-labelledby="journey-title">
          <div className="portfolio-hero__copy">
            <p className="portfolio-eyebrow">The Phoenix Path</p>
            <h1 id="journey-title">Journey &amp; Experience</h1>
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
            className="portfolio-resume-journey__path-particles"
            d={journeyPath}
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
    </article>
  )
}

export default JourneyPage
