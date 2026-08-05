// =============================================================================
// src/components/PortfolioExperience.jsx — animated phoenix-image experience
// -----------------------------------------------------------------------------
// 1. Scene helpers        image plane, registered gold trail, mist, particles
// 2. Spatial ambience    opt-in Web Audio soundscape with moving HRTF source
// 3. WebGL lifecycle     responsive image render, scroll drift, and parallax
// 4. Reveal lifecycle    progressive milestone materialization on intersection
// 5. Controls            accessible user-controlled ambience toggle
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

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

  return new THREE.CanvasTexture(canvas)
}

function buildPhoenixScene(scene, imageSource, onImageReady) {
  const random = createSeededRandom()
  const imageGroup = new THREE.Group()
  const disposableGeometries = []
  const disposableMaterials = []
  let imageTexture = null
  let disposed = false

  const loader = new THREE.TextureLoader()
  loader.load(imageSource, (texture) => {
    if (disposed) {
      texture.dispose()
      return
    }

    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    imageTexture = texture

    const imageGeometry = new THREE.PlaneGeometry(1.5, 1)
    const imageMaterial = new THREE.MeshBasicMaterial({ map: texture })
    const shadeGeometry = new THREE.PlaneGeometry(1.5, 1)
    const shadeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f1115,
      opacity: 0.34,
      transparent: true,
    })
    const imagePlane = new THREE.Mesh(imageGeometry, imageMaterial)
    const shadePlane = new THREE.Mesh(shadeGeometry, shadeMaterial)

    shadePlane.position.z = 0.025
    imageGroup.add(imagePlane, shadePlane)
    disposableGeometries.push(imageGeometry, shadeGeometry)
    disposableMaterials.push(imageMaterial, shadeMaterial)
    onImageReady()
  })

  // These normalized plane coordinates trace the ember path already painted
  // into the source image, so the glow remains registered through cover crops.
  const trailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.65, -0.38, 0.035),
    new THREE.Vector3(-0.42, -0.35, 0.038),
    new THREE.Vector3(-0.22, -0.25, 0.041),
    new THREE.Vector3(-0.12, -0.08, 0.044),
    new THREE.Vector3(0.2, -0.04, 0.047),
    new THREE.Vector3(0.16, 0.09, 0.05),
    new THREE.Vector3(0.28, 0.19, 0.053),
    new THREE.Vector3(0.31, 0.31, 0.056),
  ])
  const particlePositions = new Float32Array(780 * 3)
  for (let index = 0; index < 780; index += 1) {
    const point = trailCurve.getPointAt(random())
    const spread = 0.02 + random() * 0.14
    particlePositions[index * 3] = point.x + (random() - 0.5) * spread
    particlePositions[index * 3 + 1] = point.y + (random() - 0.5) * spread
    particlePositions[index * 3 + 2] = 0.04 + random() * 0.18
  }

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xfacc15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.75,
    size: 0.045,
    transparent: true,
  })
  const particles = new THREE.Points(particleGeometry, particleMaterial)

  const mistTexture = createMistTexture()
  const mist = new THREE.Group()
  for (let index = 0; index < 13; index += 1) {
    const mistMaterial = new THREE.SpriteMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: mistTexture,
      opacity: 0.13,
      transparent: true,
    })
    const sprite = new THREE.Sprite(mistMaterial)
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

function createSpatialAmbience() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null

  const context = new AudioContext()
  const master = context.createGain()
  master.gain.value = 0.12
  master.connect(context.destination)

  const createPanner = (xPosition, zPosition) => {
    const panner = context.createPanner()
    panner.panningModel = 'HRTF'
    panner.distanceModel = 'inverse'
    panner.refDistance = 1
    panner.maxDistance = 14
    panner.rolloffFactor = 0.45
    panner.positionX.value = xPosition
    panner.positionY.value = 0.3
    panner.positionZ.value = zPosition
    return panner
  }

  // Air layer: filtered noise suggests heat and upward movement without using
  // a prerecorded or remotely loaded sound asset.
  const airBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate)
  const airSamples = airBuffer.getChannelData(0)
  for (let index = 0; index < airSamples.length; index += 1) {
    airSamples[index] = (Math.random() * 2 - 1) * 0.24
  }
  const air = context.createBufferSource()
  const airFilter = context.createBiquadFilter()
  const airGain = context.createGain()
  const airPanner = createPanner(-1.6, -1)
  air.buffer = airBuffer
  air.loop = true
  airFilter.type = 'bandpass'
  airFilter.frequency.value = 560
  airFilter.Q.value = 0.55
  airGain.gain.value = 0.2
  air.connect(airFilter).connect(airGain).connect(airPanner).connect(master)
  air.start()

  // Ember layer: short decaying noise impulses create a quiet, irregular
  // crackle instead of a continuous static texture.
  const emberBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate)
  const emberSamples = emberBuffer.getChannelData(0)
  for (let spark = 0; spark < 52; spark += 1) {
    const start = Math.floor(Math.random() * (emberSamples.length - 900))
    const decayLength = 180 + Math.floor(Math.random() * 620)
    for (let offset = 0; offset < decayLength; offset += 1) {
      emberSamples[start + offset] +=
        (Math.random() * 2 - 1) * Math.exp(-offset / (decayLength * 0.18))
    }
  }
  const embers = context.createBufferSource()
  const emberFilter = context.createBiquadFilter()
  const emberGain = context.createGain()
  const emberPanner = createPanner(1.8, -1.8)
  embers.buffer = emberBuffer
  embers.loop = true
  emberFilter.type = 'highpass'
  emberFilter.frequency.value = 1700
  emberGain.gain.value = 0.1
  embers.connect(emberFilter).connect(emberGain).connect(emberPanner).connect(master)
  embers.start()

  // Resonance and shimmer use low-amplitude oscillators. An LFO makes the high
  // layer breathe gently so it reads as a phoenix rise, not a musical melody.
  const resonancePanner = createPanner(0, -2.4)
  const resonanceGain = context.createGain()
  const resonance = context.createOscillator()
  const overtone = context.createOscillator()
  resonance.type = 'sine'
  resonance.frequency.value = 82.41
  overtone.type = 'sine'
  overtone.frequency.value = 123.47
  resonanceGain.gain.value = 0.034
  resonance.connect(resonanceGain)
  overtone.connect(resonanceGain)
  resonanceGain.connect(resonancePanner).connect(master)
  resonance.start()
  overtone.start()

  const shimmerPanner = createPanner(0.8, -1.2)
  const shimmerGain = context.createGain()
  const shimmer = context.createOscillator()
  const shimmerOvertone = context.createOscillator()
  const shimmerLfo = context.createOscillator()
  const shimmerDepth = context.createGain()
  shimmer.type = 'sine'
  shimmer.frequency.value = 523.25
  shimmerOvertone.type = 'sine'
  shimmerOvertone.frequency.value = 659.25
  shimmerGain.gain.value = 0.012
  shimmerLfo.frequency.value = 0.11
  shimmerDepth.gain.value = 0.008
  shimmerLfo.connect(shimmerDepth).connect(shimmerGain.gain)
  shimmer.connect(shimmerGain)
  shimmerOvertone.connect(shimmerGain)
  shimmerGain.connect(shimmerPanner).connect(master)
  shimmer.start()
  shimmerOvertone.start()
  shimmerLfo.start()

  return {
    context,
    panners: { air: airPanner, embers: emberPanner, resonance: resonancePanner, shimmer: shimmerPanner },
  }
}

function PortfolioExperience({ imageSource }) {
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const page = canvas?.closest('.portfolio-page')
    if (!canvas || !page) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 30)
    camera.position.z = 6
    let renderer
    let renderScene = () => {}

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas })
    } catch {
      page.classList.add('portfolio-page--webgl-unavailable')
      return () => page.classList.remove('portfolio-page--webgl-unavailable')
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const environment = buildPhoenixScene(scene, imageSource, () => {
      page.classList.add('portfolio-page--webgl-ready')
      renderScene(performance.now())
    })
    const pointer = new THREE.Vector2()
    const currentPointer = new THREE.Vector2()
    let currentProgress = 0
    let targetProgress = 0
    let animationFrame = 0
    let imageScale = 1

    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
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

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(renderScene)
    }

    updateViewport()
    updateScroll()
    renderScene()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('scroll', updateScroll, { passive: true })
    if (!reducedMotion) window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('scroll', updateScroll)
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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !soundEnabled) return undefined

    const moveSound = () => {
      const maximumScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / maximumScroll, 0), 1)
      const time = audio.context.currentTime
      audio.panners.air.positionX.setTargetAtTime(
        Math.sin(progress * Math.PI * 2.5) * 2.2,
        time,
        0.08,
      )
      audio.panners.embers.positionX.setTargetAtTime(
        Math.cos(progress * Math.PI * 4) * 1.8,
        time,
        0.08,
      )
      audio.panners.shimmer.positionY.setTargetAtTime(0.5 + progress * 2.4, time, 0.08)
      audio.panners.resonance.positionZ.setTargetAtTime(-2.4 - progress * 2, time, 0.08)
    }

    moveSound()
    window.addEventListener('scroll', moveSound, { passive: true })
    return () => window.removeEventListener('scroll', moveSound)
  }, [soundEnabled])

  useEffect(
    () => () => {
      audioRef.current?.context.close()
    },
    [],
  )

  const toggleSound = async () => {
    if (!audioRef.current) audioRef.current = createSpatialAmbience()
    const audio = audioRef.current
    if (!audio) return

    if (soundEnabled) {
      await audio.context.suspend()
      setSoundEnabled(false)
    } else {
      await audio.context.resume()
      setSoundEnabled(true)
    }
  }

  return (
    <>
      <canvas className="portfolio-experience__canvas" ref={canvasRef} aria-hidden="true" />
      <button
        className="portfolio-sound-toggle"
        type="button"
        aria-pressed={soundEnabled}
        onClick={toggleSound}
      >
        <span aria-hidden="true">{soundEnabled ? '◉' : '○'}</span>
        {soundEnabled ? 'Phoenix ambience on' : 'Enable phoenix ambience'}
      </button>
    </>
  )
}

export default PortfolioExperience
