// =============================================================================
// src/components/PortfolioExperience.jsx — animated Journey phoenix experience
// -----------------------------------------------------------------------------
// 1. Scene helpers        image plane, registered gold trail, mist, particles
// 2. WebGL lifecycle     responsive render, visibility pause, and parallax
// 3. Reveal lifecycle    progressive milestone materialization on intersection
// =============================================================================

import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Group,
  LinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

const createSeededRandom = () => {
  let seed = 2846

  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

function createMistTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64)

  gradient.addColorStop(0, 'rgb(226 232 240 / 50%)')
  gradient.addColorStop(0.38, 'rgb(59 130 246 / 17%)')
  gradient.addColorStop(1, 'rgb(15 17 21 / 0%)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)

  return new CanvasTexture(canvas)
}

function buildPhoenixScene(scene, imageSource, particleCount, mistCount, onImageReady) {
  const random = createSeededRandom()
  const imageGroup = new Group()
  const disposableGeometries = []
  const disposableMaterials = []
  let imageTexture = null
  let disposed = false

  const loader = new TextureLoader()
  loader.load(imageSource, (texture) => {
    if (disposed) {
      texture.dispose()
      return
    }

    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearFilter
    imageTexture = texture

    const imageGeometry = new PlaneGeometry(1.5, 1)
    const imageMaterial = new MeshBasicMaterial({ map: texture })
    const shadeGeometry = new PlaneGeometry(1.5, 1)
    const shadeMaterial = new MeshBasicMaterial({
      color: 0x0f1115,
      opacity: 0.34,
      transparent: true,
    })
    const imagePlane = new Mesh(imageGeometry, imageMaterial)
    const shadePlane = new Mesh(shadeGeometry, shadeMaterial)

    shadePlane.position.z = 0.025
    imageGroup.add(imagePlane, shadePlane)
    disposableGeometries.push(imageGeometry, shadeGeometry)
    disposableMaterials.push(imageMaterial, shadeMaterial)
    onImageReady()
  })

  // These normalized plane coordinates trace the ember path already painted
  // into the source image, so the glow remains registered through cover crops.
  const trailCurve = new CatmullRomCurve3([
    new Vector3(-0.65, -0.38, 0.035),
    new Vector3(-0.42, -0.35, 0.038),
    new Vector3(-0.22, -0.25, 0.041),
    new Vector3(-0.12, -0.08, 0.044),
    new Vector3(0.2, -0.04, 0.047),
    new Vector3(0.16, 0.09, 0.05),
    new Vector3(0.28, 0.19, 0.053),
    new Vector3(0.31, 0.31, 0.056),
  ])
  const particlePositions = new Float32Array(particleCount * 3)
  for (let index = 0; index < particleCount; index += 1) {
    const point = trailCurve.getPointAt(random())
    const spread = 0.02 + random() * 0.14
    particlePositions[index * 3] = point.x + (random() - 0.5) * spread
    particlePositions[index * 3 + 1] = point.y + (random() - 0.5) * spread
    particlePositions[index * 3 + 2] = 0.04 + random() * 0.18
  }

  const particleGeometry = new BufferGeometry()
  particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3))
  const particleMaterial = new PointsMaterial({
    color: 0xfacc15,
    blending: AdditiveBlending,
    depthWrite: false,
    opacity: 0.75,
    size: 0.045,
    transparent: true,
  })
  const particles = new Points(particleGeometry, particleMaterial)

  const mistTexture = createMistTexture()
  const mist = new Group()
  for (let index = 0; index < mistCount; index += 1) {
    const mistMaterial = new SpriteMaterial({
      blending: AdditiveBlending,
      depthWrite: false,
      map: mistTexture,
      opacity: 0.13,
      transparent: true,
    })
    const sprite = new Sprite(mistMaterial)
    sprite.position.set((random() - 0.5) * 13, (random() - 0.5) * 6.5, 0.4 + random())
    sprite.scale.set(6 + random() * 6, 2 + random() * 2.4, 1)
    mist.add(sprite)
    disposableMaterials.push(mistMaterial)
  }

  disposableGeometries.push(particleGeometry)
  disposableMaterials.push(particleMaterial)
  imageGroup.add(particles)
  scene.add(imageGroup, mist)

  return {
    dispose() {
      disposed = true
      disposableGeometries.forEach((geometry) => geometry.dispose())
      disposableMaterials.forEach((material) => material.dispose())
      imageTexture?.dispose()
      mistTexture.dispose()
    },
    imageGroup,
    mist,
    particles,
  }
}

function PortfolioExperience({ imageSource }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const page = canvas?.closest('.portfolio-page')
    if (!canvas || !page) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compactScene = window.matchMedia('(max-width: 768px)').matches
    const scene = new Scene()
    const camera = new PerspectiveCamera(48, 1, 0.1, 30)
    camera.position.z = 6
    let renderer
    let renderScene = () => {}

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas })
    } catch {
      page.classList.add('portfolio-page--webgl-unavailable')
      return () => page.classList.remove('portfolio-page--webgl-unavailable')
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactScene ? 1 : 1.5))

    const environment = buildPhoenixScene(
      scene,
      imageSource,
      compactScene ? 360 : 780,
      compactScene ? 6 : 13,
      () => {
        page.classList.add('portfolio-page--webgl-ready')
        if (reducedMotion || document.hidden) renderScene(performance.now())
      },
    )
    const pointer = new Vector2()
    const currentPointer = new Vector2()
    let currentProgress = 0
    let targetProgress = 0
    let animationFrame = 0
    let imageScale = 1
    let isDocumentVisible = !document.hidden

    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const visibleHeight = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const visibleWidth = visibleHeight * (width / height)
      imageScale = Math.max((visibleWidth * 1.18) / 1.5, visibleHeight * 1.18)

      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const updateScroll = () => {
      const maximumScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      targetProgress = Math.min(Math.max(window.scrollY / maximumScroll, 0), 1)
    }

    const updatePointer = (event) => {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      )
    }

    renderScene = (time = 0) => {
      currentProgress += (targetProgress - currentProgress) * (reducedMotion ? 1 : 0.045)
      currentPointer.lerp(pointer, reducedMotion ? 1 : 0.035)

      camera.position.x = Math.sin(currentProgress * Math.PI * 1.35) * 0.48 + currentPointer.x * 0.24
      camera.position.y = 0.35 - currentProgress * 0.7 + currentPointer.y * 0.18
      camera.position.z = 6 - currentProgress * 0.55
      camera.lookAt(0, 0, 0)
      environment.imageGroup.scale.setScalar(imageScale * (1 + currentProgress * 0.035))
      environment.imageGroup.rotation.y = currentPointer.x * 0.012
      environment.imageGroup.rotation.x = -currentPointer.y * 0.008
      environment.particles.rotation.z = Math.sin(time * 0.00016) * 0.055
      environment.mist.children.forEach((sprite, index) => {
        sprite.position.x += Math.sin(time * 0.0001 + index) * 0.0008
      })
      renderer.render(scene, camera)

      if (!reducedMotion && isDocumentVisible) {
        animationFrame = window.requestAnimationFrame(renderScene)
      }
    }

    const updateVisibility = () => {
      const wasVisible = isDocumentVisible
      isDocumentVisible = !document.hidden
      if (!isDocumentVisible) window.cancelAnimationFrame(animationFrame)
      if (isDocumentVisible && !wasVisible && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(renderScene)
      }
    }

    updateViewport()
    updateScroll()
    renderScene()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('scroll', updateScroll, { passive: true })
    document.addEventListener('visibilitychange', updateVisibility)
    if (!reducedMotion) window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('scroll', updateScroll)
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('pointermove', updatePointer)
      environment.dispose()
      renderer.dispose()
      page.classList.remove('portfolio-page--webgl-ready')
    }
  }, [imageSource])

  useEffect(() => {
    const page = canvasRef.current?.closest('.portfolio-page')
    if (!page) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = page.querySelectorAll('.portfolio-reveal')
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('portfolio-reveal--visible'))
      return undefined
    }

    page.classList.add('portfolio-page--enhanced')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('portfolio-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )
    revealTargets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      page.classList.remove('portfolio-page--enhanced')
    }
  }, [])

  return <canvas className="portfolio-experience__canvas" ref={canvasRef} aria-hidden="true" />
}

export default PortfolioExperience
