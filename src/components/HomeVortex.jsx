// =============================================================================
// src/components/HomeVortex.jsx — intertwined kinetic typographic ribbons
// -----------------------------------------------------------------------------
// 1. Texture artwork       bold words and symbols on canonical color panels
// 2. Ribbon geometry       paired phase-offset strands forming a double helix
// 3. Scene lifecycle       responsive rendering, motion preferences, and cleanup
// =============================================================================

import { useEffect, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Group,
  LinearFilter,
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
  'GOOD IDEAS',
  'BETTER CODE',
  'BUILD',
  'CODE',
  'GOOD IDEAS',
  'BETTER CODE',
  'BUILD',
  'CODE',
]

const BAND_COLORS = [
  phoenixCodexPalette.magic.portalBlue,
  phoenixCodexPalette.magic.spiritCyan,
  phoenixCodexPalette.foundation.inkBlack,
  phoenixCodexPalette.foundation.warmIvory,
]

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

function createRibbonTexture() {
  const canvas = document.createElement('canvas')
  const width = 1024
  const height = 4096
  const bandHeight = height / RIBBON_WORDS.length
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  RIBBON_WORDS.forEach((word, index) => {
    const top = index * bandHeight
    const background = BAND_COLORS[index % BAND_COLORS.length]
    const ink = background === phoenixCodexPalette.foundation.inkBlack
      ? phoenixCodexPalette.foundation.warmIvory
      : phoenixCodexPalette.foundation.inkBlack

    context.fillStyle = background
    context.fillRect(0, top, width, bandHeight + 2)

    context.save()
    context.translate(width / 2, top + bandHeight / 2)
    context.rotate(Math.PI / 2)
    context.fillStyle = ink
    // Oversized condensed lettering fills the fabric width like the supplied
    // ticker reference while maxWidth keeps long phrases inside each panel.
    context.font = '900 680px "Arial Black", Impact, "Arial Narrow", sans-serif'
    context.fillText(word, 0, 0, bandHeight * 0.9)
    context.restore()

    drawBurst(context, 126, top + 108, 86, ink)
    drawBurst(context, width - 122, top + bandHeight - 104, 72, ink)

    context.fillStyle = ink
    context.font = '900 148px "Arial Black", Impact, sans-serif'
    context.fillText(index % 2 ? '✦' : '★', width - 132, top + 126)
    context.fillText(index % 2 ? '★' : '✦', 132, top + bandHeight - 116)
  })

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
    const primaryGeometry = createRibbonGeometry(compactScene ? 160 : 240, compactScene)
    const partnerGeometry = createRibbonGeometry(
      compactScene ? 160 : 240,
      compactScene,
      Math.PI,
      0.5,
    )
    const material = new MeshBasicMaterial({ map: texture, side: DoubleSide })
    const primaryRibbon = new Mesh(primaryGeometry, material)
    const partnerRibbon = new Mesh(partnerGeometry, material)
    const group = new Group()
    group.add(primaryRibbon, partnerRibbon)
    scene.add(group)

    const pointer = new Vector2()
    let frame = 0
    let visible = true

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false)
      camera.aspect = Math.max(width, 1) / Math.max(height, 1)
      camera.updateProjectionMatrix()

      const portraitCompensation = Math.min(1, Math.max(0.78, camera.aspect * 1.12))
      group.scale.setScalar(portraitCompensation)
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
      if (!reducedMotion) texture.offset.y = (time * 0.00007) % 1
      group.rotation.y = reducedMotion ? 0 : pointer.x * 0.035
      group.rotation.x += ((reducedMotion ? 0 : -pointer.y * 0.035) - group.rotation.x) * 0.035
      renderer.render(scene, camera)
      if (visible && !reducedMotion) frame = window.requestAnimationFrame(render)
    }

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

    resize()
    render()
    container.classList.add('home-media--vortex-ready')
    observer?.observe(container)
    window.addEventListener('resize', resize)
    if (!reducedMotion) window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      primaryGeometry.dispose()
      partnerGeometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      container.classList.remove('home-media--vortex-ready', 'home-media--webgl-unavailable')
    }
  }, [])

  return <canvas className="home-vortex" ref={canvasRef} aria-hidden="true" />
}

export default HomeVortex
