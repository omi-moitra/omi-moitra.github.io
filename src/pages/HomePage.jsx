// =============================================================================
// src/pages/HomePage.jsx — public identity, capabilities, and strengths landing
// -----------------------------------------------------------------------------
// 1. Imports & hidden route   lazy scene, router, content, and key sequence
// 2. HomePage setup           invisible Login sequence and navigation callback
// 3. Scene                    fixed vortex, phoenix, dragon, and static fallback
// 4. Hero                     centered portrait, concise identity, and actions
// 5. Capabilities             alternating technical and professional cards
// 6. Previews                 verified project, journey, and contact cards
// =============================================================================

import { lazy, Suspense, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import portraitFrame from '../assets/home-portrait-frame.png'
import portraitFrameSmall from '../assets/home-portrait-frame-450.png'
import SkillCard from '../components/SkillCard.jsx'
import {
  homeHero,
  homeImages,
  professionalStrengths,
  technicalSkills,
} from '../data/homeContent.js'
import useKeySequence from '../hooks/useKeySequence.js'
import { projects } from '../data/projects.js'
import './HomePage.css'

const LOGIN_OPEN_SEQUENCE = "heaven's library"
const HomeVortex = lazy(() => import('../components/HomeVortex.jsx'))

function HomePage() {
  const navigate = useNavigate()
  const openLogin = useCallback(() => navigate('/login'), [navigate])

  // :warning: This gesture changes discoverability only. Authentication and
  // RLS—not knowledge of the phrase—protect administrator data.
  useKeySequence({ sequence: LOGIN_OPEN_SEQUENCE, onMatch: openLogin })

  return (
    <article className="home-page">
      <div className="home-scene" aria-hidden="true">
        <img
          className="home-scene__creatures"
          src={homeImages.vortexCreatures.src}
          srcSet={homeImages.vortexCreatures.srcSet}
          sizes={homeImages.vortexCreatures.sizes}
          width={homeImages.vortexCreatures.width}
          height={homeImages.vortexCreatures.height}
          alt={homeImages.vortexCreatures.alt}
          loading={homeImages.vortexCreatures.loading}
          fetchPriority="high"
          decoding="async"
        />
        <div className="home-vortex-stage">
          <svg
            className="home-vortex-fallback"
            viewBox="0 0 760 700"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <path
                id="home-vortex-fallback-path"
                d="M220 -24 C690 48 710 148 170 220 C-60 270 30 365 510 404 C680 422 620 520 285 558 C125 582 160 635 390 680"
              />
              <path
                id="home-vortex-fallback-partner-path"
                d="M540 -24 C70 48 50 148 590 220 C820 270 730 365 250 404 C80 422 140 520 475 558 C635 582 600 635 370 680"
              />
            </defs>
            <use className="home-vortex-fallback__shadow" href="#home-vortex-fallback-path" />
            <use className="home-vortex-fallback__band home-vortex-fallback__band--black" href="#home-vortex-fallback-path" />
            <use className="home-vortex-fallback__band home-vortex-fallback__band--blue" href="#home-vortex-fallback-path" />
            <use className="home-vortex-fallback__band home-vortex-fallback__band--purple" href="#home-vortex-fallback-path" />
            <use className="home-vortex-fallback__band home-vortex-fallback__band--ivory" href="#home-vortex-fallback-path" />
            <g className="home-vortex-fallback__partner">
              <use className="home-vortex-fallback__shadow" href="#home-vortex-fallback-partner-path" />
              <use className="home-vortex-fallback__band home-vortex-fallback__band--black" href="#home-vortex-fallback-partner-path" />
              <use className="home-vortex-fallback__band home-vortex-fallback__band--blue" href="#home-vortex-fallback-partner-path" />
              <use className="home-vortex-fallback__band home-vortex-fallback__band--purple" href="#home-vortex-fallback-partner-path" />
              <use className="home-vortex-fallback__band home-vortex-fallback__band--ivory" href="#home-vortex-fallback-partner-path" />
            </g>
            <text className="home-vortex-fallback__type">
              <textPath href="#home-vortex-fallback-path" startOffset="2%">
                GOOD IDEAS ★ BETTER CODE ✦ BUILD ★ CODE ✦ GOOD IDEAS ★ BETTER CODE
              </textPath>
            </text>
            <text className="home-vortex-fallback__type home-vortex-fallback__type--partner">
              <textPath href="#home-vortex-fallback-partner-path" startOffset="4%">
                GOOD IDEAS ✦ BETTER CODE ★ BUILD ✦ CODE ★ GOOD IDEAS ✦ BETTER CODE
              </textPath>
            </text>
          </svg>
          <Suspense fallback={null}>
            <HomeVortex />
          </Suspense>
        </div>
      </div>

      <div className="home-intro">
        <figure className="home-portrait">
          <img
            className="home-portrait__photo"
            src="/me-720.jpg"
            srcSet="/me-720.jpg 720w, /me.png 1448w"
            sizes="(min-width: 59.4375rem) 22rem, 16rem"
            width="720"
            height="540"
            alt="Oishieka Moitra"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="home-portrait__frame"
            src={portraitFrame}
            srcSet={`${portraitFrameSmall} 450w, ${portraitFrame} 900w`}
            sizes="(min-width: 59.4375rem) 22rem, 16rem"
            alt=""
            width="900"
            height="900"
            loading="eager"
            decoding="async"
          />
        </figure>
        <section className="home-hero home-flow-card home-flow-card--center" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <h1 id="home-title">{homeHero.name}</h1>
            <p className="home-hero__title">{homeHero.title}</p>
            <p className="home-hero__tagline">{homeHero.tagline}</p>
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
        </section>
      </div>

      <section className="home-section home-section--technical home-flow-card home-flow-card--right" aria-labelledby="technical-title">
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

      <section className="home-section home-section--strengths home-flow-card home-flow-card--left" aria-labelledby="strengths-title">
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
              srcSet={homeImages.skillsBridge.srcSet}
              sizes={homeImages.skillsBridge.sizes}
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

      <section className="home-codex-preview home-flow-card home-flow-card--right" aria-labelledby="codex-preview-title">
        <div className="home-section__heading">
          <p className="home-section__eyebrow">Crafted worlds</p>
          <h2 id="codex-preview-title">Selected Work</h2>
          <p>Verified projects only—each one opens into its own Crafted Worlds case study.</p>
        </div>
        <div className="home-project-previews">
          {projects.slice(0, 3).map((project) => (
            <article className="home-project-preview" key={project.id}>
              <p>{project.technologies.slice(0, 3).join(' · ')}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link to={`/projects/${project.slug}`}>Explore this project</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-journey-preview home-flow-card home-flow-card--left" aria-labelledby="journey-preview-title">
        <div>
          <p className="home-section__eyebrow">The Phoenix Path</p>
          <h2 id="journey-preview-title">A journey through research, systems, and code.</h2>
          <p>
            Follow the glowing timeline through education, professional experience,
            and the work those disciplines shape.
          </p>
        </div>
        <Link className="home-action home-action--primary" to="/journey">
          Follow My Journey
        </Link>
      </section>

      <section className="home-contact-callout home-flow-card home-flow-card--right" aria-labelledby="home-contact-title">
        <p className="home-section__eyebrow">Send a message</p>
        <h2 id="home-contact-title">Have a role, project, or collaboration in mind?</h2>
        <Link className="home-action home-action--secondary" to="/contact">
          Contact Me
        </Link>
      </section>
    </article>
  )
}

export default HomePage
