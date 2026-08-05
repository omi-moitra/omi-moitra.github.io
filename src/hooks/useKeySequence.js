// =============================================================================
// src/hooks/useKeySequence.js — route-scoped invisible keyboard sequence matcher
// -----------------------------------------------------------------------------
// 1. Pure helpers       apostrophe normalization, target safety, rolling suffix
// 2. useKeySequence     ephemeral listener, callback ref, match, and cleanup
// =============================================================================

import { useEffect, useMemo, useRef } from 'react'

const excludedTargetSelector =
  'input, textarea, select, button, [contenteditable]:not([contenteditable="false"])'

export function normalizeSequenceText(value) {
  return value.replaceAll('’', "'").toLowerCase()
}

export function isSequenceTargetExcluded(target) {
  return Boolean(target?.closest?.(excludedTargetSelector))
}

export function getEligibleSequenceKey(event) {
  if (
    event.isComposing ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.repeat ||
    event.key.length !== 1
  ) {
    return ''
  }

  return normalizeSequenceText(event.key)
}

export function appendSequenceKey(buffer, key, sequence) {
  const nextBuffer = `${buffer}${key}`.slice(-sequence.length)
  return {
    buffer: nextBuffer === sequence ? '' : nextBuffer,
    matched: nextBuffer === sequence,
  }
}

function useKeySequence({ sequence, enabled = true, onMatch }) {
  const normalizedSequence = useMemo(() => normalizeSequenceText(sequence), [sequence])
  const bufferRef = useRef('')
  const onMatchRef = useRef(onMatch)

  useEffect(() => {
    onMatchRef.current = onMatch
  }, [onMatch])

  useEffect(() => {
    if (!enabled || !normalizedSequence) return undefined

    function handleKeyDown(event) {
      // Credential and editable targets reset partial matches so a sequence can
      // never bridge text entry and later page-level typing.
      if (isSequenceTargetExcluded(event.target)) {
        bufferRef.current = ''
        return
      }

      const key = getEligibleSequenceKey(event)
      if (!key) return

      const result = appendSequenceKey(bufferRef.current, key, normalizedSequence)
      bufferRef.current = result.buffer

      if (result.matched) onMatchRef.current()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      bufferRef.current = ''
    }
  }, [enabled, normalizedSequence])
}

export default useKeySequence
