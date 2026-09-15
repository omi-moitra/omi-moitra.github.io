// =============================================================================
// src/components/ResumePreviewDialog.jsx — accessible resume preview modal
// =============================================================================

import { useRef } from 'react'
import useModalDialog from '../hooks/useModalDialog.js'

function ResumePreviewDialog({ resume, isOpen, openerRef, onClose }) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)

  useModalDialog({
    isOpen,
    dialogRef,
    initialFocusRef: headingRef,
    openerRef,
    onRequestClose: onClose,
  })

  if (!isOpen) return null

  return (
    <div
      className="resume-preview-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        className="resume-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        tabIndex="-1"
      >
        <div className="resume-preview-dialog__heading">
          <div>
            <p className="portfolio-eyebrow">Resume</p>
            <h2 ref={headingRef} id="resume-preview-title" tabIndex="-1">
              {resume.downloadName}
            </h2>
          </div>
          <button type="button" className="portfolio-timeline-reset" onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close resume preview</span>
          </button>
        </div>

        <iframe
          className="resume-preview-dialog__document"
          src={resume.href}
          title="Resume preview"
        />

        <footer className="resume-preview-dialog__actions">
          <a href={resume.href} download={resume.downloadName}>
            Download resume
          </a>
          <button type="button" onClick={onClose}>
            Close preview
          </button>
        </footer>
      </section>
    </div>
  )
}

export default ResumePreviewDialog