import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectShowcase({ projects }) {
  const [active, setActive] = useState(0)
  const gesture = useRef(null)
  const stage = useRef(null)
  const project = projects[active]
  const select = (index) => setActive((index + projects.length) % projects.length)

  function finishGesture(event, cancelled = false) {
    const start = gesture.current
    if (!start || start.id !== event.pointerId) return
    gesture.current = null
    stage.current.style.setProperty('--drag', '0px')
    stage.current.removeAttribute('data-dragging')
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!cancelled && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1))
  }

  return (
    <section className="showcase" aria-label="Featured projects" aria-roledescription="carousel">
      <div className="showcase__stage" ref={stage} tabIndex={0}
        aria-label="Project carousel. Use left and right arrow keys, or swipe to explore."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault()
            select(event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1))
          }
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0 || event.target.closest('a, button')) return
          gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.setAttribute('data-dragging', '')
        }}
        onPointerMove={(event) => {
          if (gesture.current?.id !== event.pointerId) return
          const dx = Math.max(-100, Math.min(100, event.clientX - gesture.current.x))
          event.currentTarget.style.setProperty('--drag', `${dx}px`)
        }}
        onPointerUp={finishGesture}
        onPointerCancel={(event) => finishGesture(event, true)}
        onLostPointerCapture={(event) => finishGesture(event, true)}
      >
        <div className="showcase__orbit" aria-hidden="true" />
        {projects.map((entry, index) => {
          const offset = (index - active + projects.length) % projects.length
          const position = offset === 0 ? 'center' : offset === 1 ? 'next' : offset === projects.length - 1 ? 'previous' : 'back'
          return (
            <div key={entry.id} className="showcase__card" data-position={position}
              aria-hidden={index !== active} inert={index !== active}
              role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${entry.title}`}>
              <div className="showcase__card-top"><span>{entry.categories[0]}</span><span>0{index + 1} / 0{projects.length}</span></div>
              <div className="showcase__symbol" aria-hidden="true">{['↗', '{ }', '↔', '</>'][index % 4]}</div>
              <p className="showcase__eyebrow">{entry.technologies.slice(0, 3).join(' / ')}</p>
              <h2>{entry.title}</h2>
              <p>{entry.subtitle}</p>
              <Link className="showcase__cta" to={`/projects/${entry.slug}`}>Explore case study <span aria-hidden="true">↗</span></Link>
            </div>
          )
        })}
        <div className="showcase__float showcase__float--left" aria-hidden="true"><span>Built with</span><strong>{project.technologies[0]}</strong><small>{project.technologies[1]}</small></div>
        <div className="showcase__float showcase__float--right" aria-hidden="true"><span>Explore the work</span><strong>{project.videos?.length || 0} demo videos</strong><small>{project.categories.at(-1)}</small></div>
      </div>
      <div className="showcase__controls">
        <button type="button" onClick={() => select(active - 1)} aria-label="Previous project">←</button>
        <span className="showcase__count">0{active + 1} <span>/ 0{projects.length}</span></span>
        <button type="button" onClick={() => select(active + 1)} aria-label="Next project">→</button>
      </div>
      <p className="showcase__hint">Drag or swipe to explore · Arrow keys work too</p>
      <div className="showcase__selectors" aria-label="Choose a project">
        {projects.map((entry, index) => <button key={entry.id} type="button" aria-pressed={active === index} onClick={() => select(index)}><span>0{index + 1}</span>{entry.title}</button>)}
      </div>
      <div className="showcase__details" aria-live="polite" aria-atomic="true">
        <div key={project.id} className="showcase__detail-copy"><p className="showcase__eyebrow">Inside the project</p><h3>{project.title}</h3><p>{project.summary}</p></div>
        <div className="showcase__stack"><p className="showcase__eyebrow">The building blocks</p><ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><a href={project.links.repository} target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a></div>
      </div>
    </section>
  )
}
