// =============================================================================
// src/pages/ContactPage.jsx — validated public Supabase contact form
// -----------------------------------------------------------------------------
// 1. Imports & feedback copy    React state, shared client, validation, styles
// 2. ContactPage state          controlled values, errors, guards, and lifecycle
// 3. Event handlers             correction, local validation, and safe insertion
// 4. Contact page rendering     parchment dispatch, privacy notice, and feedback
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import {
  CONTACT_LIMITS,
  initialContactErrors,
  initialContactValues,
  normalizeContactValues,
  validateContactValues,
} from '../utils/contactValidation.js'
import { reportDevelopmentError } from '../utils/reportDevelopmentError.js'
import './ContactPage.css'

const feedbackCopy = {
  idle: { label: '', message: '' },
  validation: {
    label: 'Check the form',
    message: 'Please correct the highlighted fields before sending your message.',
  },
  pending: {
    label: 'Sending',
    message: 'Your message is being sent. Please wait.',
  },
  success: {
    label: 'Message sent',
    message: 'Your message was sent successfully.',
  },
  error: {
    label: 'Unable to send',
    message: 'Your message could not be sent. Please try again.',
  },
  configuration: {
    label: 'Form unavailable',
    message: 'The contact form is temporarily unavailable. Please try again later.',
  },
}

const fieldOrder = ['name', 'email', 'message']

function ContactPage() {
  const [values, setValues] = useState(initialContactValues)
  const [errors, setErrors] = useState(initialContactErrors)
  const [feedbackType, setFeedbackType] = useState(
    isSupabaseConfigured ? 'idle' : 'configuration',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)
  const submissionGuard = useRef(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (feedbackType !== 'success') return undefined

    // The effect cleanup cancels stale timers when feedback changes or the
    // visitor leaves the route, preventing an old success from clearing newer UI.
    const dismissalTimer = window.setTimeout(() => setFeedbackType('idle'), 5000)
    return () => window.clearTimeout(dismissalTimer)
  }, [feedbackType])

  function handleFieldChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    }

    // A new edit dismisses request feedback without repeatedly announcing
    // validation while the visitor is still correcting individual fields.
    setFeedbackType((currentType) =>
      currentType === 'success' || currentType === 'error' ? 'idle' : currentType,
    )
  }

  function handleFormFocus() {
    setFeedbackType((currentType) => (currentType === 'success' ? 'idle' : currentType))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // :warning: React state alone cannot close the same-render duplicate event
    // window. Set this synchronous guard before beginning any async operation.
    if (submissionGuard.current) return

    const honeypotValue = event.currentTarget.elements.namedItem('website')?.value
    if (honeypotValue) {
      setValues(initialContactValues)
      setErrors(initialContactErrors)
      setFeedbackType('success')
      return
    }

    const normalizedValues = normalizeContactValues(values)
    const validationErrors = validateContactValues(normalizedValues)
    const firstInvalidField = fieldOrder.find((field) => validationErrors[field])

    setErrors(validationErrors)

    if (firstInvalidField) {
      setFeedbackType('validation')
      formRef.current?.elements.namedItem(firstInvalidField)?.focus()
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setFeedbackType('configuration')
      return
    }

    submissionGuard.current = true
    setIsSubmitting(true)
    setFeedbackType('pending')

    // :warning: This payload is intentionally allowlisted and the insert must
    // not append select(), which would require anonymous read access.
    const payload = {
      name: normalizedValues.name,
      email: normalizedValues.email,
      message: normalizedValues.message,
    }

    try {
      const { error } = await supabase.from('messages').insert(payload)

      if (!isMounted.current) return

      if (error) {
        reportDevelopmentError('Contact submission failed.', error)
        setFeedbackType('error')
        return
      }

      setValues(initialContactValues)
      setErrors(initialContactErrors)
      setFeedbackType('success')
    } catch (error) {
      // Raw service errors can contain implementation details and are neither
      // rendered nor logged; the visitor receives stable recovery guidance.
      reportDevelopmentError('Contact submission was interrupted.', error)
      if (isMounted.current) setFeedbackType('error')
    } finally {
      submissionGuard.current = false
      if (isMounted.current) setIsSubmitting(false)
    }
  }

  const feedback = feedbackCopy[feedbackType]
  const feedbackRole =
    feedbackType === 'validation' || feedbackType === 'error' ? 'alert' : 'status'

  return (
    <article className="contact-page">
      <section className="contact-introduction" aria-labelledby="contact-title">
        <p className="contact-introduction__eyebrow">Start a conversation</p>
        <h1 id="contact-title">Contact Me</h1>
        <p className="contact-introduction__lead">
          Have a project, role, or collaboration in mind? Send me a message and share
          what you would like to discuss.
        </p>

        <div className="contact-introduction__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="contact-form-panel" aria-labelledby="contact-form-title">
        <div className="contact-form-panel__heading">
          <p>Professional inquiries</p>
          <h2 id="contact-form-title">Send a message</h2>
          <p>All fields are required.</p>
        </div>

        {feedbackType !== 'idle' && (
          <div
            className={`contact-feedback contact-feedback--${feedbackType}`}
            role={feedbackRole}
            aria-atomic="true"
          >
            <span className="contact-feedback__mark" aria-hidden="true">
              {feedbackType === 'success' ? '✓' : feedbackType === 'pending' ? '…' : '!'}
            </span>
            <span>
              <strong>{feedback.label}</strong>
              <span>{feedback.message}</span>
            </span>
          </div>
        )}

        <form
          ref={formRef}
          className="contact-form"
          aria-busy={isSubmitting}
          noValidate
          onFocusCapture={handleFormFocus}
          onSubmit={handleSubmit}
        >
          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              autoComplete="off"
              tabIndex="-1"
            />
          </div>

          <div className="contact-form__field">
            <div className="contact-form__label-row">
              <label htmlFor="contact-name">Name</label>
              <span>Required</span>
            </div>
            <p id="contact-name-hint" className="contact-form__hint">
              How should I address you?
            </p>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={CONTACT_LIMITS.name.min}
              maxLength={CONTACT_LIMITS.name.max}
              required
              value={values.name}
              aria-describedby={`contact-name-hint${errors.name ? ' contact-name-error' : ''}`}
              aria-invalid={errors.name ? 'true' : undefined}
              onChange={handleFieldChange}
            />
            {errors.name && (
              <p id="contact-name-error" className="contact-form__error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="contact-form__field">
            <div className="contact-form__label-row">
              <label htmlFor="contact-email">Email address</label>
              <span>Required</span>
            </div>
            <p id="contact-email-hint" className="contact-form__hint">
              Where can I reply?
            </p>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={CONTACT_LIMITS.email.max}
              required
              value={values.email}
              aria-describedby={`contact-email-hint${errors.email ? ' contact-email-error' : ''}`}
              aria-invalid={errors.email ? 'true' : undefined}
              onChange={handleFieldChange}
            />
            {errors.email && (
              <p id="contact-email-error" className="contact-form__error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="contact-form__field contact-form__field--message">
            <div className="contact-form__label-row">
              <label htmlFor="contact-message">Message</label>
              <span>Required</span>
            </div>
            <p id="contact-message-hint" className="contact-form__hint">
              What would you like to discuss? Use 10–2,000 characters.
            </p>
            <textarea
              id="contact-message"
              name="message"
              rows="7"
              minLength={CONTACT_LIMITS.message.min}
              maxLength={CONTACT_LIMITS.message.max}
              required
              value={values.message}
              aria-describedby={`contact-message-hint contact-message-count${
                errors.message ? ' contact-message-error' : ''
              }`}
              aria-invalid={errors.message ? 'true' : undefined}
              onChange={handleFieldChange}
            />
            <p id="contact-message-count" className="contact-form__count" aria-live="off">
              {values.message.length.toLocaleString()} / 2,000 characters
            </p>
            {errors.message && (
              <p id="contact-message-error" className="contact-form__error">
                {errors.message}
              </p>
            )}
          </div>

          <p className="contact-form__privacy">
            Your name, email address, message, and submission time are stored so
            Oishieka can review and respond to your inquiry. They are not displayed
            publicly by this website.
          </p>

          <button
            className="contact-form__submit"
            type="submit"
            disabled={isSubmitting || !isSupabaseConfigured}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </section>
    </article>
  )
}

export default ContactPage
