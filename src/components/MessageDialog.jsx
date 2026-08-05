// =============================================================================
// src/components/MessageDialog.jsx — complete private-message modal
// -----------------------------------------------------------------------------
// 1. Imports                    shared modal interaction behavior
// 2. MessageDialog              escaped sender metadata and complete message
// =============================================================================

import { useRef } from 'react'
import useModalDialog from '../hooks/useModalDialog.js'

function MessageDialog({
  message,
  formattedDate,
  openerRef,
  fallbackFocusRef,
  onClose,
}) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)

  useModalDialog({
    isOpen: Boolean(message),
    dialogRef,
    initialFocusRef: headingRef,
    openerRef,
    fallbackFocusRef,
    onRequestClose: onClose,
  })

  if (!message) return null

  return (
    <div
      className="back-office-dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        className="back-office-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-dialog-title"
        aria-describedby="message-dialog-description"
        tabIndex="-1"
      >
        <div className="back-office-dialog__heading">
          <div>
            <p className="back-office-dialog__eyebrow">Contact message</p>
            <h2 ref={headingRef} id="message-dialog-title" tabIndex="-1">
              Message from {message.name}
            </h2>
          </div>
          <button type="button" className="back-office-button" onClick={onClose}>
            Close
          </button>
        </div>

        <dl className="back-office-dialog__metadata">
          <div>
            <dt>Email</dt>
            <dd>{message.email}</dd>
          </div>
          <div>
            <dt>Received</dt>
            <dd>
              {formattedDate.isValid ? (
                <time dateTime={message.created_at}>{formattedDate.full}</time>
              ) : (
                'Date unavailable'
              )}
            </dd>
          </div>
        </dl>

        <div id="message-dialog-description" className="back-office-dialog__message">
          <h3>Message</h3>
          {/* :warning: React text interpolation is intentional. Contact content
              is untrusted and must never enter raw HTML or Markdown rendering. */}
          <p>{message.message}</p>
        </div>
      </section>
    </div>
  )
}

export default MessageDialog
