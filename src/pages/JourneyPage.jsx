// =============================================================================
// src/pages/JourneyPage.jsx — education, experience, and résumé Phoenix Path
// -----------------------------------------------------------------------------
// 1. Imports             Journey scene, timeline data, and shared route styles
// 2. Journey stage       page introduction and progressively enhanced trail
// 3. Resume groups       semantic Education and Experience milestone tooltips
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import KeyboardScrollHint from '../components/KeyboardScrollHint.jsx'
import LotusMarker from '../components/LotusMarker.jsx'
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
const timelineEntries = [...education, ...professionalExperience].sort(
  (firstEntry, secondEntry) =>
    Number.parseFloat(firstEntry.trail.y) - Number.parseFloat(secondEntry.trail.y),
)

function findNearestPathDistance(path, targetX, targetY) {
  const pathLength = path.getTotalLength()
  let nearestDistance = 0
  let nearestDelta = Number.POSITIVE_INFINITY

  for (let step = 0; step <= 320; step += 1) {
    const distance = (step / 320) * pathLength
    const point = path.getPointAtLength(distance)
    const delta = (point.x - targetX) ** 2 + (point.y - targetY) ** 2

    if (delta < nearestDelta) {
      nearestDelta = delta
      nearestDistance = distance
    }
  }

  return nearestDistance
}

function JourneyPage() {
  const journeyPathRef = useRef(null)
  const journeyLotusRef = useRef(null)
  const lotusDistanceRef = useRef(null)
  const lotusAnimationFrameRef = useRef(0)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null)
  const [cameraResetVersion, setCameraResetVersion] = useState(0)
  const selectedMilestone = timelineEntries.find(
    (entry) => entry.id === selectedMilestoneId,
  )
  const lotusTarget = selectedMilestone

  useEffect(() => {
    if (!selectedMilestoneId) return undefined

    const animationFrame = window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const trigger = document.getElementById(`${selectedMilestoneId}-trigger`)

      trigger?.focus({ preventScroll: true })
      trigger?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center',
        inline: 'nearest',
      })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [selectedMilestoneId])

  useEffect(() => {
    const path = journeyPathRef.current
    const lotus = journeyLotusRef.current
    if (!path || !lotus) return undefined

    const targetDistance = lotusTarget
      ? findNearestPathDistance(
          path,
          (Number.parseFloat(lotusTarget.trail.x) / 100) * 1000,
          (Number.parseFloat(lotusTarget.trail.y) / 100) * 900,
        )
      : path.getTotalLength()
    const startingDistance = lotusDistanceRef.current ?? targetDistance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const positionLotus = (distance) => {
      const point = path.getPointAtLength(distance)
      lotus.setAttribute('transform', `translate(${point.x} ${point.y})`)
      lotusDistanceRef.current = distance
    }

    window.cancelAnimationFrame(lotusAnimationFrameRef.current)

    if (prefersReducedMotion || lotusDistanceRef.current === null) {
      positionLotus(targetDistance)
      return undefined
    }

    const animationStartedAt = performance.now()
    const animationDuration = 900

    const animateLotus = (timestamp) => {
      const progress = Math.min((timestamp - animationStartedAt) / animationDuration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      positionLotus(startingDistance + (targetDistance - startingDistance) * easedProgress)

      if (progress < 1) {
        lotusAnimationFrameRef.current = window.requestAnimationFrame(animateLotus)
      }
    }

    lotusAnimationFrameRef.current = window.requestAnimationFrame(animateLotus)
    return () => window.cancelAnimationFrame(lotusAnimationFrameRef.current)
  }, [lotusTarget])

  const resetTimelineView = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const activeElement = document.activeElement

    if (activeElement instanceof HTMLElement && activeElement.matches('.timeline-milestone__trigger')) {
      activeElement.blur()
    }
    setSelectedMilestoneId(null)
    setCameraResetVersion((currentVersion) => currentVersion + 1)
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [])

  const selectMilestone = useCallback((milestoneId) => {
    if (!milestoneId || milestoneId === selectedMilestoneId) {
      resetTimelineView()
      return
    }

    setSelectedMilestoneId(milestoneId)
  }, [resetTimelineView, selectedMilestoneId])

  useEffect(() => {
    const navigateTimeline = (event) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')
      ) {
        return
      }

      const eventTarget = event.target
      if (
        eventTarget instanceof Element &&
        eventTarget.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return
      }

      const currentIndex = timelineEntries.findIndex(
        (entry) => entry.id === selectedMilestoneId,
      )

      if (currentIndex === -1) {
        if (event.key === 'ArrowUp') return

        event.preventDefault()
        setSelectedMilestoneId(timelineEntries[0].id)
        return
      }

      const nextIndex = currentIndex + (event.key === 'ArrowDown' ? 1 : -1)
      event.preventDefault()

      if (nextIndex < 0) {
        resetTimelineView()
        return
      }

      if (nextIndex >= timelineEntries.length) return
      setSelectedMilestoneId(timelineEntries[nextIndex].id)
    }

    window.addEventListener('keydown', navigateTimeline)
    return () => window.removeEventListener('keydown', navigateTimeline)
  }, [resetTimelineView, selectedMilestoneId])

  return (
    <article
      className={`portfolio-page journey-page${selectedMilestone ? ' journey-page--timeline-focused' : ''}`}
      style={{ '--portfolio-journey-background': `url(${portfolioImages.journey.src})` }}
    >
      <PortfolioExperience
        focusPoint={selectedMilestone?.trail ?? null}
        imageSource={portfolioImages.journey.src}
        key={`journey-scene-${cameraResetVersion}`}
        resetVersion={cameraResetVersion}
      />

      <div className="portfolio-resume-journey">
        <div className="portfolio-journey-actions">
          {resume ? (
            <a
              className="portfolio-resume-link"
              href={resume.href}
              download={resume.downloadName}
            >
              {resume.label}
            </a>
          ) : null}
          <button
            className="portfolio-timeline-reset"
            type="button"
            aria-label="Reset timeline view"
            onClick={resetTimelineView}
            title="Reset timeline view"
          >
            <span aria-hidden="true">↺</span>
          </button>
        </div>

        <section className="portfolio-hero" aria-labelledby="journey-title">
          <div className="portfolio-hero__copy">
            <p className="portfolio-eyebrow">Journey &amp; Experience</p>
            <h1 id="journey-title">Flight Path</h1>
            <p className="portfolio-hero__introduction">{portfolioIntroduction}</p>
            <KeyboardScrollHint className="portfolio-keyboard-scroll-hint" />
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
            d={journeyPath}
          />
          <path
            className="portfolio-resume-journey__path-line"
            d={journeyPath}
          />
          <path
            className="portfolio-resume-journey__path-particles"
            d={journeyPath}
            ref={journeyPathRef}
          />
          <g
            className="portfolio-resume-journey__lotus"
            ref={journeyLotusRef}
            transform="translate(710 171)"
          >
            <foreignObject
              className="portfolio-resume-journey__lotus-object"
              x="-48"
              y="-40"
              width="96"
              height="80"
            >
              <div className="portfolio-resume-journey__lotus-frame" xmlns="http://www.w3.org/1999/xhtml">
                <LotusMarker
                  className="portfolio-resume-journey__lotus-marker"
                  idPrefix="journey-lotus"
                />
              </div>
            </foreignObject>
          </g>
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
                className={`journey-point${selectedMilestoneId === entry.id ? ' journey-point--active' : ''}`}
                key={entry.id}
                style={{ '--journey-x': entry.trail.x, '--journey-y': entry.trail.y }}
              >
                <TimelineMilestone
                  entry={entry}
                  isSelected={selectedMilestoneId === entry.id}
                  kind="education"
                  onSelect={selectMilestone}
                />
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
                className={`journey-point${selectedMilestoneId === entry.id ? ' journey-point--active' : ''}`}
                key={entry.id}
                style={{ '--journey-x': entry.trail.x, '--journey-y': entry.trail.y }}
              >
                <TimelineMilestone
                  entry={entry}
                  isSelected={selectedMilestoneId === entry.id}
                  kind="experience"
                  onSelect={selectMilestone}
                />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

export default JourneyPage
