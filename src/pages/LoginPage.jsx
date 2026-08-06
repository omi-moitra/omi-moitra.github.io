// =============================================================================
// src/pages/LoginPage.jsx — hidden-route administrator Supabase authentication
// -----------------------------------------------------------------------------
// 1. Imports & constants       route gesture, shared client, validation, copy
// 2. Login state & lifecycle   close phrase, session check, retry, stale guards
// 3. Form behavior             correction, validation, guarded authentication
// 4. Login rendering           portal, service states, credentials, and feedback
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKeySequence from '../hooks/useKeySequence.js'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import {
  initialLoginErrors,
  initialLoginValues,
  normalizeLoginValues,
  validateLoginValues,
} from '../utils/loginValidation.js'
import { reportDevelopmentError } from '../utils/reportDevelopmentError.js'
import './LoginPage.css'

const LOGIN_CLOSE_SEQUENCE = 'flaws'
const credentialFailureMessage = 'Unable to sign in with those credentials.'
const serviceFailureMessage =
  'Administrator sign-in is temporarily unavailable. Please try again.'

function LoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialLoginValues)
  const [errors, setErrors] = useState(initialLoginErrors)
  const [phase, setPhase] = useState(
    isSupabaseConfigured ? 'checking' : 'configuration',
  )
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [sessionAttempt, setSessionAttempt] = useState(0)
  const formRef = useRef(null)
  const passwordRef = useRef(null)
  const submissionGuard = useRef(false)
  const isMounted = useRef(true)

  const closeLogin = useCallback(() => {
    navigate('/', { replace: true })
  }, [navigate])

  useKeySequence({ sequence: LOGIN_CLOSE_SEQUENCE, onMatch: closeLogin })

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return undefined
    }

    let isCurrentCheck = true

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (!isCurrentCheck) return

        if (error) {
          reportDevelopmentError('Administrator session check failed.', error)
          setPhase('session-error')
          setFeedbackMessage(serviceFailureMessage)
          return
        }

        if (data.session) {
          // :warning: This redirect improves authenticated UX but does not guard
          // private data; Back Office must independently validate the session.
          navigate('/back-office', { replace: true })
          return
        }

        setPhase('ready')
      } catch (error) {
        reportDevelopmentError('Administrator session check was interrupted.', error)
        if (isCurrentCheck) {
          setPhase('session-error')
          setFeedbackMessage(serviceFailureMessage)
        }
      }
    }

    checkSession()
    return () => {
      isCurrentCheck = false
    }
  }, [navigate, sessionAttempt])

  function handleFieldChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    }

    if (phase === 'auth-error') {
      setPhase('ready')
      setFeedbackMessage('')
    }
  }

  function retrySessionCheck() {
    setPhase('checking')
    setFeedbackMessage('')
    setSessionAttempt((attempt) => attempt + 1)
  }

  function showAuthenticationFailure(message) {
    setValues((currentValues) => ({ ...currentValues, password: '' }))
    setPhase('auth-error')
    setFeedbackMessage(message)
    passwordRef.current?.focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // :warning: The ref closes the duplicate-event window before a pending
    // render can disable the button; both protections must remain together.
    if (submissionGuard.current || phase === 'pending') return

    const normalizedValues = normalizeLoginValues(values)
    const validationErrors = validateLoginValues(normalizedValues)
    const firstInvalidField = ['email', 'password'].find(
      (field) => validationErrors[field],
    )

    setErrors(validationErrors)

    if (firstInvalidField) {
      formRef.current?.elements.namedItem(firstInvalidField)?.focus()
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setPhase('configuration')
      return
    }

    submissionGuard.current = true
    setPhase('pending')
    setFeedbackMessage('')

    // Credentials remain component-local and are passed only to Supabase Auth.
    // They are never persisted manually, rendered in feedback, or logged.
    const credentials = {
      email: normalizedValues.email,
      password: normalizedValues.password,
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials)
      if (!isMounted.current) return

      if (error || !data.session) {
        if (error) reportDevelopmentError('Administrator sign-in failed.', error)
        showAuthenticationFailure(credentialFailureMessage)
        return
      }

      navigate('/back-office', { replace: true })
    } catch (error) {
      reportDevelopmentError('Administrator sign-in was interrupted.', error)
      if (isMounted.current) showAuthenticationFailure(serviceFailureMessage)
    } finally {
      submissionGuard.current = false
      if (isMounted.current) {
        setPhase((currentPhase) =>
          currentPhase === 'pending' ? 'ready' : currentPhase,
        )
      }
    }
  }

  const formIsVisible = ['ready', 'pending', 'auth-error'].includes(phase)
  const isPending = phase === 'pending'

  return (
    <article className="login-page">
      <div className="login-portal" aria-hidden="true">
        <span className="login-portal__ring login-portal__ring--outer" />
        <span className="login-portal__ring login-portal__ring--inner" />
        <span className="login-portal__flame">✦</span>
      </div>

      <section className="login-panel" aria-labelledby="login-title">
        <header className="login-panel__heading">
          <p>Private administration</p>
          <h1 id="login-title">Administrator Sign In</h1>
          <p>Sign in with the administrator account to manage portfolio messages.</p>
        </header>

        {phase === 'checking' && (
          <div className="login-status login-status--checking" role="status" aria-live="polite">
            <span className="login-status__mark" aria-hidden="true">…</span>
            <span>
              <strong>Checking session</strong>
              <span>Checking administrator session…</span>
            </span>
          </div>
        )}

        {phase === 'configuration' && (
          <div className="login-status login-status--configuration" role="status">
            <span className="login-status__mark" aria-hidden="true">!</span>
            <span>
              <strong>Sign-in unavailable</strong>
              <span>{serviceFailureMessage}</span>
            </span>
          </div>
        )}

        {phase === 'session-error' && (
          <div className="login-status login-status--error" role="alert">
            <span className="login-status__mark" aria-hidden="true">!</span>
            <span>
              <strong>Session check failed</strong>
              <span>{feedbackMessage}</span>
              <button type="button" onClick={retrySessionCheck}>Try again</button>
            </span>
          </div>
        )}

        {formIsVisible && (
          <>
            {phase === 'auth-error' && (
              <div className="login-status login-status--error" role="alert">
                <span className="login-status__mark" aria-hidden="true">!</span>
                <span>
                  <strong>Sign-in failed</strong>
                  <span>{feedbackMessage}</span>
                </span>
              </div>
            )}

            {isPending && (
              <div className="login-status login-status--checking" role="status">
                <span className="login-status__mark" aria-hidden="true">…</span>
                <span>
                  <strong>Signing in</strong>
                  <span>Checking the submitted credentials.</span>
                </span>
              </div>
            )}

            <form
              ref={formRef}
              className="login-form"
              aria-busy={isPending}
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="login-form__field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={values.email}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                  aria-invalid={errors.email ? 'true' : undefined}
                  onChange={handleFieldChange}
                />
                {errors.email && (
                  <p id="login-email-error" className="login-form__error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="login-form__field">
                <label htmlFor="login-password">Password</label>
                <input
                  ref={passwordRef}
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={values.password}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  aria-invalid={errors.password ? 'true' : undefined}
                  onChange={handleFieldChange}
                />
                {errors.password && (
                  <p id="login-password-error" className="login-form__error">
                    {errors.password}
                  </p>
                )}
              </div>

              <button className="login-form__submit" type="submit" disabled={isPending}>
                {isPending ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </>
        )}
      </section>
    </article>
  )
}

export default LoginPage
