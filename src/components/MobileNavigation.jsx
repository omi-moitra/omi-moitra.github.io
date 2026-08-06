// =============================================================================
// src/components/MobileNavigation.jsx — accessible small-screen navigation drawer
// -----------------------------------------------------------------------------
// 1. MobileNavigation    trigger, modal focus behavior, route links, and theme
// =============================================================================

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import useModalDialog from '../hooks/useModalDialog.js'
import NavigationLinks from './NavigationLinks.jsx'
import ThemeControl from './ThemeControl.jsx'

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogId = useId()
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeMenu = useCallback(() => setIsOpen(false), [])

  useModalDialog({
    isOpen,
    dialogRef,
    initialFocusRef: closeButtonRef,
    openerRef: triggerRef,
    onRequestClose: closeMenu,
  })

  useEffect(() => {
    if (!isOpen) return undefined

    const backgroundElements = Array.from(
      document.querySelectorAll('.brand-link, .site-main, .site-footer'),
    )
    const previousStates = backgroundElements.map((element) => element.inert)
    backgroundElements.forEach((element) => {
      element.inert = true
    })

    return () => {
      backgroundElements.forEach((element, index) => {
        element.inert = previousStates[index]
      })
    }
  }, [isOpen])

  return (
    <div className="mobile-navigation">
      <button
        ref={triggerRef}
        className="mobile-navigation__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <span>Menu</span>
      </button>

      {isOpen && (
        <div className="mobile-navigation__backdrop" onClick={closeMenu}>
          <section
            ref={dialogRef}
            id={dialogId}
            className="mobile-navigation__drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            tabIndex="-1"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mobile-navigation__header">
              <div>
                <p>Explore the Codex</p>
                <h2 id="mobile-navigation-title">Navigation</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="mobile-navigation__close"
                type="button"
                onClick={closeMenu}
              >
                <span aria-hidden="true">×</span>
                <span>Close</span>
              </button>
            </header>

            <nav aria-label="Mobile navigation">
              <NavigationLinks showIcons onNavigate={closeMenu} />
            </nav>

            <ThemeControl className="theme-control--drawer" />
          </section>
        </div>
      )}
    </div>
  )
}

export default MobileNavigation
