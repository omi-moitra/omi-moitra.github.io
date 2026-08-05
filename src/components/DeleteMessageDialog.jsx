// =============================================================================
// src/components/DeleteMessageDialog.jsx — deliberate message deletion dialog
// -----------------------------------------------------------------------------
// 1. Imports                    shared modal interaction behavior
// 2. DeleteMessageDialog       confirmation, pending, and safe failure states
// =============================================================================

import { useRef } from 'react'
import useModalDialog from '../hooks/useModalDialog.js'

function DeleteMessageDialog({
  message,
  isDeleting,
  deleteError,
  openerRef,
  fallbackFocusRef,
  onCancel,
  onConfirm,
}) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)

  useModalDialog({
    isOpen: Boolean(message),
    canDismiss: !isDeleting,
    dialogRef,
    initialFocusRef: isDeleting ? dialogRef : cancelRef,
    openerRef,
    fallbackFocusRef,
    onRequestClose: onCancel,
  })

  if (!message) return null

  return (
    <div
      className="back-office-dialog-backdrop"
      onClick={(event) => {
        if (
          event.target === event.currentTarget &&
          !isDeleting
        ) {
          onCancel()
        }
      }}
    >
      <section
        ref={dialogRef}
        className="back-office-dialog back-office-dialog--confirmation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        aria-busy={isDeleting}
        tabIndex="-1"
      >
        <p className="back-office-dialog__eyebrow">Permanent action</p>
        <h2 id="delete-dialog-title">Delete message?</h2>
        <p id="delete-dialog-description">
          Permanently delete the message from {message.name}? This action cannot
          be undone.
        </p>

        {deleteError && (
          <p className="back-office-feedback back-office-feedback--error" role="alert">
            <strong>Deletion failed.</strong> {deleteError}
          </p>
        )}

        {isDeleting && (
          <p className="back-office-feedback" role="status" aria-live="polite">
            Deleting…
          </p>
        )}

        <div className="back-office-dialog__actions">
          <button
            ref={cancelRef}
            type="button"
            className="back-office-button"
            disabled={isDeleting}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="back-office-button back-office-button--danger"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting ? 'Deleting…' : 'Delete message'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteMessageDialog
