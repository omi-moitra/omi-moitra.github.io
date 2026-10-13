import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import notesArt from '../assets/portfolio-code-scroll.jpg'
import dashboardArt from '../assets/links-react-components.jpg'
import dataArt from '../assets/links-supabase-data.jpg'
import mobileArt from '../assets/home-skills-bridge.jpg'
import communityArt from '../assets/links-mdn-web-platform.jpg'

const artwork = [notesArt, dashboardArt, dataArt, mobileArt, communityArt]

function ProjectSlide({ project, index, count, active, onSwipeSlide }) {
  const [expanded, setExpanded] = useState(false)
  const [flipAngle, setFlipAngle] = useState(180)
  const gestureRef = useRef(null)
  const suppressClickRef = useRef(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const open = active && expanded

  useEffect(() => {
    if (expanded) closeRef.current?.focus({ preventScroll: true })
  }, [expanded])

  function startSwipe(event) {
    if (!active || !event.isPrimary || event.button !== 0 ||
        event.target.closest('a, button, input, textarea, select, iframe')) return
    gestureRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: null }
    suppressClickRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveSwipe(event) {
    const gesture = gestureRef.current
    if (!gesture || gesture.id !== event.pointerId) return
    const dx = event.clientX - gesture.x
    const dy = event.clientY - gesture.y
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 12) {
      if (Math.abs(dx) > Math.abs(dy) * 1.25) gesture.axis = 'x'
      else if (Math.abs(dy) > Math.abs(dx) * 1.25) gesture.axis = 'y'
    }
    if (gesture.axis) suppressClickRef.current = true
  }

  function finishSwipe(event) {
    const gesture = gestureRef.current
    gestureRef.current = null
    if (!gesture || gesture.id !== event.pointerId) return
    const dx = event.clientX - gesture.x
    const dy = event.clientY - gesture.y
    if (gesture.axis === 'x' && Math.abs(dx) >= 50) {
      onSwipeSlide(dx < 0 ? 1 : -1)
    } else if (gesture.axis === 'y' && Math.abs(dy) >= 50) {
      if (open) closeDetails()
      else {
        setFlipAngle(dy < 0 ? 180 : -180)
        setExpanded(true)
      }
    }
  }

  function closeDetails() {
    setExpanded(false)
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }))
  }

  return (
    <article className="project-carousel__slide" data-flipped={open} role="group"
      aria-roledescription="slide" aria-label={`${project.title}, ${index + 1} of ${count}`}
      inert={!active}
      onPointerDown={startSwipe}
      onPointerMove={moveSwipe}
      onPointerUp={finishSwipe}
      onPointerCancel={() => { gestureRef.current = null }}
      onLostPointerCapture={() => { gestureRef.current = null }}
      onClickCapture={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault()
          event.stopPropagation()
          suppressClickRef.current = false
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          closeDetails()
        }
      }}>
      <div className="project-carousel__flipper" style={{ '--flip-angle': `${flipAngle}deg` }}>
      <div className="project-carousel__front" inert={open} aria-hidden={open}>
      <img src={project.coverImage || artwork[index % artwork.length]} alt="" />
      <div className="project-carousel__caption">
        <p className="showcase__eyebrow">{project.categories[0]}</p>
        <h2>{project.title}</h2>
        <p>{project.subtitle}</p>
        <button ref={triggerRef} type="button" className="project-carousel__reveal"
          aria-expanded={open} aria-controls={`project-details-${project.id}`}
          onClick={() => setExpanded(true)}>View details</button>
      </div>
      </div>
      <div className="project-carousel__back" inert={!open} aria-hidden={!open}>
      <img src={project.coverImage || artwork[index % artwork.length]} alt="" />
      <div className="showcase__details project-carousel__overlay" id={`project-details-${project.id}`}>

        <button className="project-carousel__close" type="button" ref={closeRef} onClick={closeDetails}>Flip back</button>
        <div key={project.id} className="showcase__detail-copy">
          <p className="showcase__eyebrow">Inside the project</p>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <div className="showcase__actions">
            <Link className="showcase__cta" to={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link>
            {project.links?.repository && (
              <a className="showcase__cta showcase__cta--secondary" href={project.links.repository} target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
            )}
            {project.links?.live && (
              <a className="showcase__cta showcase__cta--secondary" href={project.links.live} target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">↗</span></a>
            )}
            {project.videos?.length > 0 && (
              <Link className="showcase__cta showcase__cta--secondary" to={`/projects/${project.slug}#project-videos`}>Watch demo</Link>
            )}
          </div>

        </div>
        <div className="showcase__stack"><p className="showcase__eyebrow">The building blocks</p>
          <ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        </div>
      </div>
      </div>
      </div>
    </article>
  )
}

export default function ProjectShowcase({ projects }) {
  const [active, setActive] = useState(0)
  const carouselRef = useRef(null)

  function selectProject(index) {
    const carousel = carouselRef.current
    if (!projects.length) return
    const wrappedIndex = (index + projects.length) % projects.length
    const wrapping = index < 0 || index >= projects.length
    const slide = carousel?.children[wrappedIndex]
    if (!slide) return
    const left = slide.getBoundingClientRect().left - carousel.getBoundingClientRect().left + carousel.scrollLeft
    if (wrapping && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carousel.animate([
        { transform: `translateX(${index < 0 ? '-3%' : '3%'})`, opacity: 0.5 },
        { transform: 'translateX(0)', opacity: 1 },
      ], { duration: 280, easing: 'ease-out' })
    }
    carousel.scrollTo({
      left,
      behavior: wrapping || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  function syncSelection() {
    const carousel = carouselRef.current
    if (!carousel) return
    const viewport = carousel.getBoundingClientRect()
    const center = viewport.left + viewport.width / 2
    const index = Array.from(carousel.children).findIndex((slide) => {
      const bounds = slide.getBoundingClientRect()
      return bounds.left <= center && bounds.right >= center
    })
    if (index >= 0) setActive(index)
  }

  const project = projects[active]
  if (!project) return null

  return (
    <section className="showcase" aria-label="Featured projects">
      <p className="showcase__hint">Swipe left or right to browse. Swipe up or down to flip. You can also use the buttons.</p>
      <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Project collection">
        <div className="project-carousel__track" id="project-carousel-track" ref={carouselRef} onScroll={syncSelection}>
          {projects.map((entry, index) => (
            <ProjectSlide key={`${entry.id}-${active === index}`} project={entry} index={index}
              count={projects.length} active={active === index} onSwipeSlide={(direction) => selectProject(index + direction)} />
          ))}
        </div>
        {projects.length > 1 && (
          <>
            <div className="project-carousel__navigation">
              <button type="button" aria-controls="project-carousel-track" onClick={() => selectProject(active - 1)}>Previous</button>
              <button type="button" aria-controls="project-carousel-track" onClick={() => selectProject(active + 1)}>Next</button>
            </div>

          </>
        )}
      </div>

    </section>
  )
}
