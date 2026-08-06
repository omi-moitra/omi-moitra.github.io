import { useEffect, useRef, useState } from 'react'

const sectionSelector = '[data-home-spine-section]'

function LotusMarker() {
  return (
    <span className="home-spine__lotus">
      <svg
        className="home-spine__lotus-art"
        viewBox="0 0 96 80"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="lotus-tip-coral-up" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#da5640" />
          </linearGradient>
          <linearGradient id="lotus-tip-blue-up" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#396cbf" />
          </linearGradient>
          <linearGradient id="lotus-tip-pale-up" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#f5d97f" />
          </linearGradient>
          <linearGradient id="lotus-tip-violet-up" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#976fde" />
          </linearGradient>
          <linearGradient id="lotus-tip-violet-left" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#976fde" />
          </linearGradient>
          <linearGradient id="lotus-tip-coral-left" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#da5640" />
          </linearGradient>
          <linearGradient id="lotus-tip-blue-right" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#396cbf" />
          </linearGradient>
          <linearGradient id="lotus-tip-violet-right" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#976fde" />
          </linearGradient>
          <linearGradient id="lotus-tip-coral-down" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffc64a" />
            <stop offset="68%" stopColor="#ffc64a" />
            <stop offset="100%" stopColor="#da5640" />
          </linearGradient>
        </defs>

        {/* Tall rear crown */}
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--pale-up"
          d="M48 4C37 16 36 31 48 47 60 31 59 16 48 4Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--coral-up"
          d="M30 10C20 23 22 39 41 51 41 32 37 18 30 10Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--violet-up"
          d="M66 10C76 23 74 39 55 51 55 32 59 18 66 10Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--blue-up"
          d="M13 21C11 36 21 48 39 54 35 38 26 27 13 21Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--pale-up"
          d="M83 21C85 36 75 48 57 54 61 38 70 27 83 21Z"
        />

        {/* Full inner bloom */}
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--blue-up"
          d="M48 17C35 31 34 48 48 61 62 48 61 31 48 17Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--pale-up"
          d="M26 27C23 43 32 55 46 60 43 43 35 32 26 27Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--coral-up"
          d="M70 27C73 43 64 55 50 60 53 43 61 32 70 27Z"
        />

        {/* Wide front petals */}
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--violet-left"
          d="M4 45C16 37 30 41 45 59 27 62 13 57 4 45Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--blue-right"
          d="M92 45C80 37 66 41 51 59 69 62 83 57 92 45Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--coral-left"
          d="M17 57C29 48 40 51 48 61 35 70 23 68 17 57Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--violet-right"
          d="M79 57C67 48 56 51 48 61 61 70 73 68 79 57Z"
        />
        <path
          className="home-spine__lotus-petal home-spine__lotus-petal--coral-down"
          d="M48 59C39 65 40 75 48 79 56 75 57 65 48 59Z"
        />

        {/* Fine structural veins echo the illustrated reference. */}
        <g className="home-spine__lotus-veins">
          <path d="M48 8c-2 14-2 26 0 38M31 15c2 13 6 24 10 34M65 15c-2 13-6 24-10 34" />
          <path d="M16 25c8 9 15 18 22 27M80 25c-8 9-15 18-22 27M48 22v36" />
          <path d="M9 46c14 2 25 6 34 12M87 46c-14 2-25 6-34 12" />
          <path d="M22 57c8 1 16 2 23 4M74 57c-8 1-16 2-23 4M48 63v12" />
        </g>
        <circle className="home-spine__lotus-heart" cx="48" cy="59" r="3.2" />
      </svg>
    </span>
  )
}

function HomeJourneySpine() {
  const spineRef = useRef(null)
  const activeIndexRef = useRef(0)
  const animationFrameRef = useRef(0)
  const [points, setPoints] = useState([])
  const [spineStart, setSpineStart] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const spine = spineRef.current
    const page = spine?.closest('.home-page')
    if (!page) return undefined

    const targets = Array.from(page.querySelectorAll(sectionSelector))
    const topAnchor = page.querySelector('.home-portrait__photo')
    if (targets.length === 0) return undefined
    let isActive = true

    function updateActiveSection() {
      const focusLine = window.innerHeight * 0.46
      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      targets.forEach((target, index) => {
        const targetRect = target.getBoundingClientRect()
        const targetCenter = targetRect.top + targetRect.height / 2
        const distance = Math.abs(targetCenter - focusLine)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      if (nearestIndex === activeIndexRef.current) return
      activeIndexRef.current = nearestIndex
      setActiveIndex(nearestIndex)
    }

    function measureSpine() {
      if (!isActive) return
      const pageRect = page.getBoundingClientRect()
      const spineX = pageRect.left + pageRect.width / 2

      if (topAnchor) {
        const anchorRect = topAnchor.getBoundingClientRect()
        const rootFontSize = Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
        const lotusRadius = rootFontSize * 1.8
        setSpineStart(anchorRect.bottom - pageRect.top - lotusRadius)
      }

      setPoints(
        targets.map((target, index) => {
          const targetRect = target.getBoundingClientRect()
          const targetCenter = targetRect.top - pageRect.top + targetRect.height / 2
          const targetIsLeft = targetRect.right < spineX - 4
          const targetIsRight = targetRect.left > spineX + 4

          return {
            id: target.dataset.homeSpineSection || String(index),
            y: targetCenter,
            side: targetIsLeft ? 'left' : targetIsRight ? 'right' : 'center',
            connectorLength: targetIsLeft
              ? Math.max(spineX - targetRect.right, 0)
              : targetIsRight
                ? Math.max(targetRect.left - spineX, 0)
                : 0,
          }
        }),
      )
      updateActiveSection()
    }

    function scheduleActiveUpdate() {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = window.requestAnimationFrame(updateActiveSection)
    }

    const resizeObserver = new ResizeObserver(measureSpine)
    resizeObserver.observe(page)
    if (topAnchor) resizeObserver.observe(topAnchor)
    targets.forEach((target) => resizeObserver.observe(target))
    window.addEventListener('resize', measureSpine)
    window.addEventListener('scroll', scheduleActiveUpdate, { passive: true })
    document.fonts?.ready.then(() => {
      if (isActive) measureSpine()
    })
    measureSpine()

    return () => {
      isActive = false
      window.cancelAnimationFrame(animationFrameRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('resize', measureSpine)
      window.removeEventListener('scroll', scheduleActiveUpdate)
    }
  }, [])

  const firstPoint = points[0]
  const lastPoint = points.at(-1)
  const activePoint = points[activeIndex] || firstPoint
  const lineStart = spineStart ?? firstPoint?.y
  const activeLotusPosition = activeIndex === 0 ? lineStart : activePoint?.y

  return (
    <div ref={spineRef} className="home-spine" aria-hidden="true">
      {firstPoint && lastPoint && (
        <>
          <span
            className="home-spine__line"
            style={{
              '--spine-start': `${lineStart}px`,
              '--spine-length': `${Math.max(lastPoint.y - lineStart, 0)}px`,
            }}
          />

          {points.map((point, index) => (
            <span
              key={point.id}
              className={`home-spine__point home-spine__point--${point.side}${
                index === activeIndex ? ' home-spine__point--active' : ''
              }`}
              style={{
                '--point-y': `${point.y}px`,
                '--connector-length': `${point.connectorLength}px`,
                '--orb-delay': `${index * -0.28}s`,
              }}
            >
              <span className="home-spine__connector" />
              <span className="home-spine__orb" />
            </span>
          ))}

          {activePoint && (
            <span
              className="home-spine__lotus-track"
              style={{
                '--lotus-start': `${lineStart}px`,
                '--lotus-offset': `${activeLotusPosition - lineStart}px`,
              }}
            >
              <LotusMarker />
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default HomeJourneySpine
