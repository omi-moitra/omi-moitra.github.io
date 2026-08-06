// =============================================================================
// src/components/LotusGate.jsx — hidden musical lotus threshold for Login
// -----------------------------------------------------------------------------
// 1. Gate contract        values, notes, geometry, and personal-order sequence
// 2. Audio helpers        ambient chord and short petal chimes through Web Audio
// 3. Gate lifecycle       hidden phrase, modal focus, cleanup, and route opening
// 4. Petal interaction   progressive illumination, gentle reset, and full bloom
// 5. Gate rendering       accessible dialog, mandala, portal, lotus, and status
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKeySequence from '../hooks/useKeySequence.js'
import useModalDialog from '../hooks/useModalDialog.js'
import './LotusGate.css'

const GATE_SEQUENCE = 'lotus'

const petals = [
  { value: 'Curiosity', note: 'C4', solfege: 'Sa', frequency: 261.63, x: 0, y: -37, angle: 0 },
  { value: 'Creativity', note: 'D4', solfege: 'Re', frequency: 293.66, x: 27, y: -27, angle: 45 },
  { value: 'Logic', note: 'E4', solfege: 'Ga', frequency: 329.63, x: 37, y: 0, angle: 90 },
  { value: 'Kindness', note: 'F4', solfege: 'Ma', frequency: 349.23, x: 27, y: 27, angle: 135 },
  { value: 'Perseverance', note: 'G4', solfege: 'Pa', frequency: 392, x: 0, y: 37, angle: 180 },
  { value: 'Wonder', note: 'A4', solfege: 'Dha', frequency: 440, x: -27, y: 27, angle: 225 },
  { value: 'Balance', note: 'B4', solfege: 'Ni', frequency: 493.88, x: -37, y: 0, angle: 270 },
  { value: 'Growth', note: 'C5', solfege: 'Higher Sa', frequency: 523.25, x: -27, y: -27, angle: 315 },
]

// Zero-based petal indexes encode the intended seven-tap melody:
// 1 → 4 → 1 → 4 → 5 → 4 → 1 (C4, F4, C4, F4, G4, F4, C4).
const personalPhilosophySequence = [0, 3, 0, 3, 4, 3, 0]

function createAudioSystem() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null

  const context = new AudioContext()
  const master = context.createGain()
  const now = context.currentTime
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.14, now + 1.4)
  master.connect(context.destination)

  const ambientVoices = [110, 164.81, 220].map((frequency, index) => {
    const oscillator = context.createOscillator()
    const voiceGain = context.createGain()
    oscillator.type = index === 1 ? 'triangle' : 'sine'
    oscillator.frequency.value = frequency
    voiceGain.gain.value = index === 2 ? 0.035 : 0.055
    oscillator.connect(voiceGain)
    voiceGain.connect(master)
    oscillator.start()
    return oscillator
  })

  context.resume().catch(() => {})
  return { ambientVoices, context, master }
}

function stopAudioSystem(audioSystem) {
  if (!audioSystem) return

  const { ambientVoices, context, master } = audioSystem
  const now = context.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
  ambientVoices.forEach((voice) => voice.stop(now + 0.4))
  window.setTimeout(() => context.close().catch(() => {}), 450)
}

function playPetalChime(audioSystem, frequency, completion = false) {
  if (!audioSystem) return

  const { context, master } = audioSystem
  context.resume().catch(() => {})
  const now = context.currentTime
  const frequencies = completion ? [frequency, frequency * 1.25, frequency * 1.5] : [frequency]

  frequencies.forEach((voiceFrequency, index) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(voiceFrequency, now)
    oscillator.frequency.exponentialRampToValueAtTime(voiceFrequency * 0.995, now + 0.8)
    gain.gain.setValueAtTime(completion ? 0.34 : 0.25, now + index * 0.035)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1)
    oscillator.connect(gain)
    gain.connect(master)
    oscillator.start(now + index * 0.035)
    oscillator.stop(now + 1.15)
  })
}

function LotusGate() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('closed')
  const [illuminatedPetals, setIlluminatedPetals] = useState([])
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const audioRef = useRef(null)
  const timerRef = useRef(new Set())
  const phaseRef = useRef(phase)
  const isOpen = phase !== 'closed'

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  const clearTimers = useCallback(() => {
    timerRef.current.forEach((timer) => window.clearTimeout(timer))
    timerRef.current.clear()
  }, [])

  const stopAudio = useCallback(() => {
    stopAudioSystem(audioRef.current)
    audioRef.current = null
  }, [])

  const closeGate = useCallback(() => {
    if (phaseRef.current === 'unlocking') return
    clearTimers()
    setPhase('closed')
    setIlluminatedPetals([])
    stopAudio()
  }, [clearTimers, stopAudio])

  const openGate = useCallback(() => {
    clearTimers()
    if (audioRef.current) stopAudioSystem(audioRef.current)
    audioRef.current = createAudioSystem()
    setIlluminatedPetals([])
    setPhase('open')
  }, [clearTimers])

  useKeySequence({
    sequence: GATE_SEQUENCE,
    enabled: phase === 'closed',
    onMatch: openGate,
  })

  useModalDialog({
    isOpen,
    canDismiss: phase !== 'unlocking',
    dialogRef,
    initialFocusRef: closeRef,
    onRequestClose: closeGate,
  })

  useEffect(() => {
    const timers = timerRef.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
      stopAudioSystem(audioRef.current)
      audioRef.current = null
    }
  }, [])

  function schedule(action, delay) {
    const timer = window.setTimeout(() => {
      timerRef.current.delete(timer)
      action()
    }, delay)
    timerRef.current.add(timer)
  }

  function handlePetalSelection(index) {
    if (phase !== 'open') return

    const expectedPetal = personalPhilosophySequence[illuminatedPetals.length]
    const isCorrect = index === expectedPetal
    const isFinalSelection =
      isCorrect && illuminatedPetals.length === personalPhilosophySequence.length - 1
    playPetalChime(audioRef.current, petals[index].frequency, isFinalSelection)

    if (!isCorrect) {
      setPhase('resetting')
      schedule(() => {
        setIlluminatedPetals([])
        setPhase('open')
      }, 900)
      return
    }

    const nextIlluminatedPetals = [...illuminatedPetals, index]
    setIlluminatedPetals(nextIlluminatedPetals)

    if (nextIlluminatedPetals.length === personalPhilosophySequence.length) {
      setPhase('unlocking')
      schedule(() => {
        stopAudio()
        navigate('/login')
      }, 1800)
    }
  }

  if (!isOpen) return null

  return (
    <div className={`lotus-gate lotus-gate--${phase}`}>
      <section
        ref={dialogRef}
        className="lotus-gate__dialog"
        role="dialog"
        aria-label="The Lotus Gate"
        aria-modal="true"
        aria-describedby="lotus-gate-instructions lotus-gate-status"
        tabIndex="-1"
      >
        <button
          ref={closeRef}
          className="lotus-gate__close"
          type="button"
          aria-label="Close the Lotus Gate"
          disabled={phase === 'unlocking'}
          onClick={closeGate}
        >
          <span aria-hidden="true">×</span>
        </button>

        <p id="lotus-gate-instructions" className="lotus-gate__sr-only">
          Choose the eight petals in their intended order. Each petal represents a value and plays a musical note.
        </p>

        <div className="lotus-gate__mandala" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="lotus-gate__portal" aria-hidden="true" />

        <div className="lotus-gate__flower">
          {petals.map((petal, index) => {
            const isIlluminated = illuminatedPetals.includes(index)
            return (
              <button
                key={petal.value}
                className={`lotus-gate__petal${isIlluminated ? ' lotus-gate__petal--illuminated' : ''}`}
                style={{
                  '--petal-angle': `${petal.angle}deg`,
                  '--petal-delay': `${index * 70}ms`,
                  '--petal-x': `${petal.x}%`,
                  '--petal-y': `${petal.y}%`,
                }}
                type="button"
                aria-label={`${petal.value} petal, note ${petal.note}, ${petal.solfege}`}
                aria-pressed={isIlluminated}
                title={`${petal.value} · ${petal.note} (${petal.solfege})`}
                disabled={phase !== 'open'}
                onClick={() => handlePetalSelection(index)}
              >
                <span aria-hidden="true">✦</span>
              </button>
            )
          })}
          <div className="lotus-gate__heart" aria-hidden="true">
            <span>✧</span>
          </div>
        </div>

        <p id="lotus-gate-status" className="lotus-gate__sr-only" aria-live="polite">
          {phase === 'resetting' && 'The melody faded. The lotus is resetting.'}
          {phase === 'unlocking' && 'The lotus is fully illuminated. The portal is opening.'}
          {phase === 'open' &&
            `${illuminatedPetals.length} of ${personalPhilosophySequence.length} melody steps complete.`}
        </p>
      </section>
    </div>
  )
}

export default LotusGate
