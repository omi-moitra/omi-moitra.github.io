import { useState } from 'react'
import { Link } from 'react-router-dom'
import notesArt from '../assets/portfolio-code-scroll.jpg'
import dashboardArt from '../assets/links-react-components.jpg'
import dataArt from '../assets/links-supabase-data.jpg'
import mobileArt from '../assets/home-skills-bridge.jpg'
import communityArt from '../assets/links-mdn-web-platform.jpg'

const artwork = [notesArt, dashboardArt, dataArt, mobileArt, communityArt]

function HeroDemos({ videos }) {
  const [selected, setSelected] = useState(0)
  const video = videos[selected]

  return (
    <div className="showcase__demos">
      <iframe
        key={video.id}
        src={video.embedUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {videos.length > 1 && (
        <div className="showcase__demo-selectors" aria-label="Choose a demo video">
          {videos.map((demo, index) => (
            <button key={demo.id} type="button" aria-pressed={selected === index}
              aria-label={demo.title} onClick={() => setSelected(index)}>
              Demo {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectShowcase({ projects }) {
  const [active, setActive] = useState(0)
  const project = projects[active]
  if (!project) return null

  return (
    <section className="showcase" aria-label="Featured projects">
      <p className="showcase__hint">Hover, focus, or tap a project to explore.</p>
      <div className="hover-gallery" aria-label="Choose a project">
        {projects.map((entry, index) => (
          <button key={entry.id} type="button" className="hover-gallery__panel"
            data-active={active === index} aria-pressed={active === index}
            aria-controls="project-gallery-details"
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActive(index) }}
            onFocus={() => setActive(index)} onClick={() => setActive(index)}>
            <img src={entry.coverImage || artwork[index % artwork.length]} alt="" />
            <span className="hover-gallery__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="hover-gallery__caption">
              <span className="hover-gallery__category">{entry.categories[0]}</span>
              <span className="hover-gallery__title">{entry.title}</span>
              <span className="hover-gallery__subtitle">{entry.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="showcase__details" id="project-gallery-details">
        <div key={project.id} className="showcase__detail-copy">
          <p className="showcase__eyebrow">Inside the project</p>
          <h2>{project.title}</h2><p>{project.summary}</p>
          <Link className="showcase__cta" to={`/projects/${project.slug}`}>Explore case study <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="showcase__stack"><p className="showcase__eyebrow">The building blocks</p>
          <ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <a href={project.links.repository} target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>
          {project.videos?.length > 0 && <HeroDemos key={project.id} videos={project.videos} />}
        </div>
      </div>
    </section>
  )
}
