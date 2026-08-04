// =============================================================================
// src/pages/HomePage.jsx — public identity, capabilities, and strengths landing
// -----------------------------------------------------------------------------
// 1. Imports        router links, reusable cards, static content, and styles
// 2. Hero           identity, introduction, calls to action, and eager artwork
// 3. Technical      sourced technical skill card collection
// 4. Strengths      lazy supporting artwork and professional skill collection
// =============================================================================

import { Link } from 'react-router-dom'
import SkillCard from '../components/SkillCard.jsx'
import {
  homeHero,
  homeImages,
  professionalStrengths,
  technicalSkills,
} from '../data/homeContent.js'
import './HomePage.css'

function HomePage() {
  return (
    <article className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="home-section__eyebrow">Thoughtful engineering, built with care</p>
          <h1 id="home-title">{homeHero.name}</h1>
          <p className="home-hero__title">{homeHero.title}</p>
          <p className="home-hero__tagline">{homeHero.tagline}</p>
          <p className="home-hero__introduction">{homeHero.introduction}</p>
          <div className="home-hero__actions" role="group" aria-label="Home page actions">
            {homeHero.callsToAction.map((action) => (
              <Link
                key={action.to}
                className={`home-action home-action--${action.variant}`}
                to={action.to}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <figure className="home-media home-media--hero">
          <img
            src={homeImages.hero.src}
            width={homeImages.hero.width}
            height={homeImages.hero.height}
            alt={homeImages.hero.alt}
            loading={homeImages.hero.loading}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </section>

      <section className="home-section home-section--technical" aria-labelledby="technical-title">
        <div className="home-section__heading">
          <p className="home-section__eyebrow">Build the system</p>
          <h2 id="technical-title">Technical Skills</h2>
          <p>
            A full stack foundation spanning interactive interfaces, server behavior,
            and practical data work.
          </p>
        </div>
        <ul className="skill-grid">
          {technicalSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} tone="technical" />
          ))}
        </ul>
      </section>

      <section className="home-section home-section--strengths" aria-labelledby="strengths-title">
        <div className="home-strengths__introduction">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">Understand the whole problem</p>
            <h2 id="strengths-title">Professional Strengths</h2>
            <p>
              Disciplined analysis and clear communication help turn requirements into
              maintainable, people-centered work.
            </p>
          </div>
          <figure className="home-media home-media--bridge">
            <img
              src={homeImages.skillsBridge.src}
              width={homeImages.skillsBridge.width}
              height={homeImages.skillsBridge.height}
              alt={homeImages.skillsBridge.alt}
              loading={homeImages.skillsBridge.loading}
              decoding="async"
            />
          </figure>
        </div>
        <ul className="skill-grid">
          {professionalStrengths.map((skill) => (
            <SkillCard key={skill.id} skill={skill} tone="strength" />
          ))}
        </ul>
      </section>
    </article>
  )
}

export default HomePage
