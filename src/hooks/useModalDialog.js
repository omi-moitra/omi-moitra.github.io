// =============================================================================
// src/hooks/useModalDialog.js — accessible modal focus and dismissal behavior
// -----------------------------------------------------------------------------
// 1. Focusable controls      selector shared by both administrator dialogs
// 2. useModalDialog          focus trap, Escape, scroll lock, and restoration
// =============================================================================

import { useEffect } from 'react'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusRestorationTarget(openingControl, fallbackFocusRef) {
  if (openingControl?.isConnected) return openingControl

  const fallbackControl = fallbackFocusRef?.current
  return fallbackControl?.isConnected ? fallbackControl : null
}

function useModalDialog({
  isOpen,
  canDismiss = true,
  dialogRef,
  initialFocusRef,
  openerRef,
  fallbackFocusRef,
  onRequestClose,
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    const dialog = dialogRef.current
    if (!dialog) return undefined
    const openingControl = openerRef?.current

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Waiting one frame makes the selected dialog content available before
    // focus moves, while reduced-motion users receive the same behavior.
    const focusFrame = window.requestAnimationFrame(() => {
      const initialTarget = initialFocusRef?.current || dialog
      initialTarget.focus({ preventScroll: true })
    })

    function handleKeyDown(event) {
      if (event.key === 'Escape' && canDismiss) {
        event.preventDefault()
        onRequestClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableControls = Array.from(
        dialog.querySelectorAll(focusableSelector),
      ).filter((control) => !control.hasAttribute('hidden'))

      if (focusableControls.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstControl = focusableControls[0]
      const lastControl = focusableControls[focusableControls.length - 1]
      const activeControl = document.activeElement
      const activeControlIsTabbable = focusableControls.includes(activeControl)

      if (event.shiftKey && (!activeControlIsTabbable || activeControl === firstControl)) {
        event.preventDefault()
        lastControl.focus()
      } else if (
        !event.shiftKey &&
        (!activeControlIsTabbable || activeControl === lastControl)
      ) {
        event.preventDefault()
        firstControl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = previousOverflow

      // The opening row may have been removed after deletion. Restore focus to
      // it only while connected; otherwise use the table/empty-state fallback.
      window.requestAnimationFrame(() => {
        const restorationTarget = getFocusRestorationTarget(
          openingControl,
          fallbackFocusRef,
        )
        restorationTarget?.focus({ preventScroll: true })
      })
    }
  }, [
    canDismiss,
    dialogRef,
    fallbackFocusRef,
    initialFocusRef,
    isOpen,
    onRequestClose,
    openerRef,
  ])
}

export default useModalDialog
