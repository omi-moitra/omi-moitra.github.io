// =============================================================================
// src/components/KeyboardScrollHint.jsx — reusable keyboard-navigation prompt
// -----------------------------------------------------------------------------
// The keycap artwork is decorative because the adjacent text supplies the full
// instruction. Components that render this hint own the actual key behavior.
// =============================================================================

import './KeyboardScrollHint.css'

function KeyboardScrollHint({ className = '' }) {
  return (
    <p className={`keyboard-scroll-hint ${className}`.trim()}>
      <span className="keyboard-scroll-hint__keys" aria-hidden="true">
        <kbd className="keyboard-scroll-hint__key keyboard-scroll-hint__key--up">
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="m4 9 4-4 4 4" />
          </svg>
        </kbd>
        <kbd className="keyboard-scroll-hint__key keyboard-scroll-hint__key--down">
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="m4 7 4 4 4-4" />
          </svg>
        </kbd>
      </span>
      <span>Explore with arrow keys</span>
    </p>
  )
}

export default KeyboardScrollHint
