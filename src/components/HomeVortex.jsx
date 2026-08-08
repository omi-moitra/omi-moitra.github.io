// =============================================================================
// src/components/HomeVortex.jsx — intertwined kinetic typographic ribbons
// -----------------------------------------------------------------------------
// 1. Texture artwork       canonical accent words on translucent black fabric
// 2. Ribbon geometry       paired phase-offset strands forming a double helix
// 3. Card motion           scroll-linked DOM depth driven by the Three.js loop
// 4. Scene lifecycle       responsive rendering, motion preferences, and cleanup
// =============================================================================

import { useEffect, useRef } from 'react'
import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  FrontSide,
  Group,
  LinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { phoenixCodexPalette } from '../data/phoenixCodexPalette.js'

const RIBBON_WORDS = [
  'Code',
  'Create',
  'Connect',
  'Code',
  'Create',
  'Connect',
  'Code',
  'Create',
  'Connect',
  'Code',
  'Create',
  'Connect',
]

const LIGHT_WORD_COLORS = [
  phoenixCodexPalette.magic.phoenixCoral,
  phoenixCodexPalette.magic.radiantGold,
  phoenixCodexPalette.magic.portalBlue,
  phoenixCodexPalette.magic.arcaneViolet,
]

const DARK_WORD_COLORS = [
  phoenixCodexPalette.foundation.inkBlack,
  phoenixCodexPalette.magic.radiantGold,
  phoenixCodexPalette.magic.portalBlue,
  phoenixCodexPalette.foundation.warmIvory,
]

const LIGHT_RIBBON_BACKGROUND = `${phoenixCodexPalette.foundation.inkBlack}99`
const DARK_RIBBON_BACKGROUND = `${phoenixCodexPalette.magic.softVermilion}99`

const HOME_CARD_SELECTOR = '.home-flow-card, .skill-card, .home-project-preview'

function getDocumentTop(element) {
  let top = 0
  let node = element

  while (node) {
    top += node.offsetTop
    node = node.offsetParent
  }

  return top
}

function drawBurst(context, x, y, radius, color) {
  context.save()
  context.translate(x, y)
  context.strokeStyle = color
  context.lineWidth = 16

  for (let ray = 0; ray < 12; ray += 1) {
    const angle = (ray / 12) * Math.PI * 2
    context.beginPath()
    context.moveTo(Math.cos(angle) * radius * 0.48, Math.sin(angle) * radius * 0.48)
    context.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
    context.stroke()
  }

  context.restore()
}

function drawRibbonTexture(canvas, darkMode = false) {
  const width = 1024
  const height = 4096
  const bandHeight = height / RIBBON_WORDS.length
  const context = canvas.getContext('2d')
  const wordColors = darkMode ? DARK_WORD_COLORS : LIGHT_WORD_COLORS
  const ribbonBackground = darkMode
    ? DARK_RIBBON_BACKGROUND
    : LIGHT_RIBBON_BACKGROUND
  context.clearRect(0, 0, width, height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  RIBBON_WORDS.forEach((word, index) => {
    const top = index * bandHeight
    const ink = wordColors[index % wordColors.length]

    // Hex alpha 99 is exactly 60%, keeping the fabric translucent while the
    // themed lettering and symbols remain fully opaque.
    context.fillStyle = ribbonBackground
    context.fillRect(0, top, width, bandHeight + 2)

    context.save()
    context.translate(width / 2, top + bandHeight / 2)
    context.rotate(Math.PI / 2)
    context.fillStyle = ink
    // Oversized condensed lettering fills the fabric width like the supplied
    // ticker reference while maxWidth keeps long phrases inside each panel.
    context.font = '400 680px "Offside", sans-serif'
    context.fillText(word, 0, 0, bandHeight * 0.9)
    context.restore()

    drawBurst(context, 126, top + 108, 86, ink)
    drawBurst(context, width - 122, top + bandHeight - 104, 72, ink)

    context.fillStyle = ink
    context.font = '900 148px "Arial Black", Impact, sans-serif'
    context.fillText(index % 2 ? '✦' : '★', width - 132, top + 126)
    context.fillText(index % 2 ? '★' : '✦', 132, top + bandHeight - 116)
  })
}

function createRibbonTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 4096
  drawRibbonTexture(canvas, document.documentElement.dataset.theme === 'dark')

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.magFilter = LinearFilter
  texture.minFilter = LinearFilter
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  // One texture cycle spans nearly the full helix so each broad front-facing
  // curve carries a dominant ticker phrase like the supplied reference.
  texture.repeat.set(1, 1.15)
  return texture
}

function createRibbonGeometry(
  segmentCount,
  compactScene,
  phaseOffset = 0,
  textureProgressOffset = 0,
) {
  const vertexCount = (segmentCount + 1) * 2
  const positions = new Float32Array(vertexCount * 3)
  const uvs = new Float32Array(vertexCount * 2)
  const indices = []
  const tangent = new Vector3()
  const normal = new Vector3()
  const side = new Vector3()
  const turns = compactScene ? 2.15 : 2.45
  const angleRange = Math.PI * 2 * turns
  const ribbonWidth = 1.18 / 3
  const topRadiusX = compactScene ? 1.65 : 3.55
  const bottomRadiusX = compactScene ? 0.46 : 0.72
  const topRadiusZ = compactScene ? 0.7 : 1.08
  const bottomRadiusZ = compactScene ? 0.3 : 0.4
  const verticalLength = compactScene ? 7 : 7.7

  for (let segment = 0; segment <= segmentCount; segment += 1) {
    const progress = segment / segmentCount
    const smoothTaper = 1 - progress * progress * (3 - 2 * progress)
    const taperDerivative = -6 * progress * (1 - progress)
    const radiusX = bottomRadiusX + (topRadiusX - bottomRadiusX) * smoothTaper
    const radiusZ = bottomRadiusZ + (topRadiusZ - bottomRadiusZ) * smoothTaper
    const radiusXDerivative = (topRadiusX - bottomRadiusX) * taperDerivative
    const radiusZDerivative = (topRadiusZ - bottomRadiusZ) * taperDerivative
    const angle = progress * angleRange - Math.PI * 0.72 + phaseOffset
    const centerX = Math.sin(angle) * radiusX
    const centerY = verticalLength * 0.5 - progress * verticalLength
    const centerZ = Math.cos(angle) * radiusZ

    tangent.set(
      Math.cos(angle) * angleRange * radiusX + Math.sin(angle) * radiusXDerivative,
      -verticalLength,
      -Math.sin(angle) * angleRange * radiusZ + Math.cos(angle) * radiusZDerivative,
    ).normalize()
    normal.set(-Math.sin(angle), 0, -Math.cos(angle)).normalize()
    side.crossVectors(tangent, normal).normalize()

    const breathingWidth = ribbonWidth * (0.92 + Math.sin(progress * Math.PI) * 0.08)
    const leftIndex = segment * 2
    const rightIndex = leftIndex + 1

    positions[leftIndex * 3] = centerX - side.x * breathingWidth * 0.5
    positions[leftIndex * 3 + 1] = centerY - side.y * breathingWidth * 0.5
    positions[leftIndex * 3 + 2] = centerZ - side.z * breathingWidth * 0.5
    positions[rightIndex * 3] = centerX + side.x * breathingWidth * 0.5
    positions[rightIndex * 3 + 1] = centerY + side.y * breathingWidth * 0.5
    positions[rightIndex * 3 + 2] = centerZ + side.z * breathingWidth * 0.5

    uvs[leftIndex * 2] = 0
    uvs[leftIndex * 2 + 1] = progress + textureProgressOffset
    uvs[rightIndex * 2] = 1
    uvs[rightIndex * 2 + 1] = progress + textureProgressOffset

    if (segment < segmentCount) {
      indices.push(leftIndex, rightIndex, leftIndex + 2)
      indices.push(rightIndex, rightIndex + 2, leftIndex + 2)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function createReadableRibbon(geometry, frontMaterial, backMaterial) {
  const ribbon = new Group()
  ribbon.add(
    new Mesh(geometry, frontMaterial),
    new Mesh(geometry, backMaterial),
  )
  return ribbon
}

function HomeVortex() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compactScene = window.matchMedia('(max-width: 768px)').matches
    const scene = new Scene()
    const camera = new PerspectiveCamera(39, 1, 0.1, 30)
    camera.position.set(0, 0, compactScene ? 10.8 : 11.4)
    let renderer

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas })
    } catch {
      container.classList.add('home-media--webgl-unavailable')
      return () => container.classList.remove('home-media--webgl-unavailable')
    }

    renderer.setClearColor(0x000000, 0)
    // A full-screen transparent canvas is fill-rate heavy during scrolling.
    // These caps preserve crisp ribbons without forcing high-DPI repaint cost.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactScene ? 1 : 1.15))
    renderer.outputColorSpace = SRGBColorSpace

    const texture = createRibbonTexture()
    // Three.js mirrors a texture when a DoubleSide material turns away from
    // the camera. A horizontally flipped back-face texture cancels that mirror
    // so the lettering remains legible as either side of the helix comes forward.
    const backTexture = texture.clone()
    backTexture.repeat.x = -1
    backTexture.offset.x = 1
    backTexture.needsUpdate = true
    const primaryGeometry = createRibbonGeometry(compactScene ? 160 : 240, compactScene)
    const partnerGeometry = createRibbonGeometry(
      compactScene ? 160 : 240,
      compactScene,
      Math.PI,
      0.5,
    )
    const frontMaterial = new MeshBasicMaterial({
      map: texture,
      side: FrontSide,
      transparent: true,
    })
    const backMaterial = new MeshBasicMaterial({
      map: backTexture,
      side: BackSide,
      transparent: true,
    })
    const primaryRibbon = createReadableRibbon(primaryGeometry, frontMaterial, backMaterial)
    const partnerRibbon = createReadableRibbon(partnerGeometry, frontMaterial, backMaterial)
    const group = new Group()
    group.add(primaryRibbon, partnerRibbon)
    scene.add(group)

    const pointer = new Vector2()
    const page = canvas.closest('.home-page')
    const cardElements = !reducedMotion && page
      ? Array.from(page.querySelectorAll(HOME_CARD_SELECTOR))
      : []
    const scrollMotion = new Vector2(window.scrollY, window.scrollY)
    const cardStates = cardElements.map((element, index) => {
      const isNested = !element.classList.contains('home-flow-card')
      const direction = element.classList.contains('home-flow-card--left')
        ? -1
        : element.classList.contains('home-flow-card--right')
          ? 1
          : index % 2 === 0 ? -1 : 1

      return {
        direction,
        documentTop: 0,
        element,
        height: 0,
        isNested,
      }
    })
    let frame = 0
    let visible = true
    let active = true

    const updateCardLayout = () => {
      cardStates.forEach((card) => {
        card.documentTop = getDocumentTop(card.element)
        card.height = card.element.offsetHeight
      })
    }

    const updateCardMotion = () => {
      if (!cardStates.length) return

      const scrollY = window.scrollY
      const viewportHeight = Math.max(window.innerHeight, 1)
      scrollMotion.x = MathUtils.lerp(scrollMotion.x, scrollY, 0.14)
      const scrollLag = MathUtils.clamp(scrollY - scrollMotion.x, -120, 120)

      cardStates.forEach((card) => {
        const cardTop = card.documentTop - scrollY
        const revealStart = viewportHeight * (card.isNested ? 0.96 : 0.94)
        const revealEnd = viewportHeight * (card.isNested ? 0.66 : 0.56)
        const revealRange = Math.max(revealStart - revealEnd, 1)
        const rawProgress = MathUtils.clamp(
          (revealStart - cardTop) / revealRange,
          0,
          1,
        )
        const progress = rawProgress * rawProgress * (3 - 2 * rawProgress)
        const viewportPosition = MathUtils.clamp(
          (cardTop + card.height / 2 - viewportHeight / 2) / viewportHeight,
          -1,
          1,
        )
        const travelX = card.isNested ? 28 : 72
        const hiddenY = card.isNested ? 32 : 64
        const hiddenDepth = card.isNested ? -42 : -110
        const floatY = progress * viewportPosition * (card.isNested ? -5 : -10)
        const x = MathUtils.lerp(card.direction * travelX, 0, progress)
          + progress * pointer.x * (card.isNested ? 1.5 : 3)
        const y = MathUtils.lerp(hiddenY, floatY, progress)
          + scrollLag * (card.isNested ? 0.025 : 0.045)
        const z = MathUtils.lerp(hiddenDepth, 0, progress)
        const rotateX = MathUtils.lerp(6, 0, progress) + scrollLag * 0.008
        const rotateY = MathUtils.lerp(card.direction * -7, 0, progress)
          + progress * pointer.x * (card.isNested ? 0.35 : 0.7)
        const rotateZ = MathUtils.lerp(card.direction * -0.7, 0, progress)
        const scale = MathUtils.lerp(0.94, 1, progress)
        const opacity = MathUtils.lerp(0.05, 1, progress)
        const blur = MathUtils.lerp(7, 0, progress)

        card.element.style.opacity = opacity.toFixed(3)
        card.element.style.filter = `blur(${blur.toFixed(2)}px)`
        card.element.style.transform = [
          'perspective(70rem)',
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`,
          `rotateX(${rotateX.toFixed(2)}deg)`,
          `rotateY(${rotateY.toFixed(2)}deg)`,
          `rotateZ(${rotateZ.toFixed(2)}deg)`,
          `scale(${scale.toFixed(4)})`,
        ].join(' ')
      })
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false)
      camera.aspect = Math.max(width, 1) / Math.max(height, 1)
      camera.updateProjectionMatrix()

      const portraitCompensation = Math.min(1, Math.max(0.78, camera.aspect * 1.12))
      group.scale.setScalar(portraitCompensation)
      updateCardLayout()
    }

    const updatePointer = (event) => {
      const bounds = container.getBoundingClientRect()
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      )
    }

    const render = (time = 0) => {
      // Moving the repeating print upward through the fixed helix makes every
      // panel travel into the same broad top curve without rotating the open
      // geometry and exposing its ends like an unwinding strip.
      if (!reducedMotion) {
        const textureProgress = (time * 0.000035) % 1
        texture.offset.y = textureProgress
        backTexture.offset.y = textureProgress
      }
      group.rotation.y = reducedMotion ? 0 : pointer.x * 0.035
      group.rotation.x += ((reducedMotion ? 0 : -pointer.y * 0.035) - group.rotation.x) * 0.035
      if (!reducedMotion) updateCardMotion()
      renderer.render(scene, camera)
      if (visible && !reducedMotion) frame = window.requestAnimationFrame(render)
    }

    const redrawRibbonTexture = () => {
      drawRibbonTexture(
        texture.image,
        document.documentElement.dataset.theme === 'dark',
      )
      texture.needsUpdate = true
      backTexture.needsUpdate = true
      if (reducedMotion) render()
    }

    const themeObserver = new MutationObserver(redrawRibbonTexture)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    document.fonts?.load('400 680px "Offside"').then(() => {
      if (!active) return
      redrawRibbonTexture()
    })

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          const wasVisible = visible
          visible = entry.isIntersecting
          if (visible && !wasVisible && !reducedMotion) {
            frame = window.requestAnimationFrame(render)
          }
          if (!visible) window.cancelAnimationFrame(frame)
        })
      : null
    const cardResizeObserver = cardStates.length && 'ResizeObserver' in window
      ? new ResizeObserver(updateCardLayout)
      : null

    page?.classList.toggle('home-card-motion-ready', cardStates.length > 0)
    resize()
    updateCardMotion()
    render()
    container.classList.add('home-media--vortex-ready')
    observer?.observe(container)
    if (page) cardResizeObserver?.observe(page)
    window.addEventListener('resize', resize)
    if (!reducedMotion) window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      active = false
      themeObserver.disconnect()
      observer?.disconnect()
      cardResizeObserver?.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      primaryGeometry.dispose()
      partnerGeometry.dispose()
      frontMaterial.dispose()
      backMaterial.dispose()
      texture.dispose()
      backTexture.dispose()
      renderer.dispose()
      page?.classList.remove('home-card-motion-ready')
      cardElements.forEach((element) => {
        element.style.removeProperty('filter')
        element.style.removeProperty('opacity')
        element.style.removeProperty('transform')
      })
      container.classList.remove('home-media--vortex-ready', 'home-media--webgl-unavailable')
    }
  }, [])

  return <canvas className="home-vortex" ref={canvasRef} aria-hidden="true" />
}

export default HomeVortex
