// =============================================================================
// src/components/RequireSession.jsx — server-verified protected-route boundary
// -----------------------------------------------------------------------------
// 1. Imports & copy             shared authentication client and safe messages
// 2. Verification lifecycle    stored session, server user, and stale guards
// 3. Auth events & recovery     sign-out redirect, retry, and session clearing
// 4. Gate rendering             private Outlet only after verified access
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

const verificationErrorMessage =
  'Administrator access could not be verified. Try again or sign out.'

function RequireSession() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(
    isSupabaseConfigured ? 'checking' : 'configuration',
  )
  const [verificationAttempt, setVerificationAttempt] = useState(0)
  const [isClearingSession, setIsClearingSession] = useState(false)
  const verificationVersion = useRef(0)
  const signOutGuard = useRef(false)
  const phaseRef = useRef(phase)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined

    const currentVersion = ++verificationVersion.current
    let isActive = true

    async function verifyAdministrator() {
      try {
        // A persisted session is only the first gate. Server-backed getUser()
        // must succeed before the private route component is allowed to mount.
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()

        if (!isActive || currentVersion !== verificationVersion.current) return

        if (sessionError) {
          setPhase('error')
          return
        }

        if (!sessionData.session) {
          setPhase('unauthenticated')
          return
        }

        const { data: userData, error: userError } =
          await supabase.auth.getUser()

        if (!isActive || currentVersion !== verificationVersion.current) return

        if (userError || !userData.user) {
          setPhase('error')
          return
        }

        setPhase('authenticated')
      } catch {
        if (isActive && currentVersion === verificationVersion.current) {
          setPhase('error')
        }
      }
    }

    verifyAdministrator()

    return () => {
      isActive = false
    }
  }, [verificationAttempt])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined

    // Keep the callback synchronous: SIGNED_OUT removes private UI immediately,
    // while token refreshes do not trigger redundant message requests.
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        verificationVersion.current += 1
        phaseRef.current = 'unauthenticated'
        setPhase('unauthenticated')
        navigate('/login', { replace: true })
      } else if (event === 'SIGNED_IN' && phaseRef.current !== 'authenticated') {
        setPhase('checking')
        setVerificationAttempt((attempt) => attempt + 1)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [navigate])

  const retryVerification = useCallback(() => {
    setPhase('checking')
    setVerificationAttempt((attempt) => attempt + 1)
  }, [])

  async function clearUnusableSession() {
    if (signOutGuard.current || !supabase) return

    signOutGuard.current = true
    setIsClearingSession(true)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setIsClearingSession(false)
        signOutGuard.current = false
        return
      }

      navigate('/login', { replace: true })
    } catch {
      setIsClearingSession(false)
      signOutGuard.current = false
    }
  }

  // :warning: Route hiding is not authorization. Only this verified gate plus
  // Supabase RLS may permit message selection or deletion in the browser.
  if (phase === 'authenticated') return <Outlet />
  if (phase === 'unauthenticated') return <Navigate to="/login" replace />

  return (
    <article className="protected-gate" aria-labelledby="protected-gate-title">
      <div className="protected-gate__panel">
        {phase === 'checking' && (
          <>
            <p className="protected-gate__eyebrow">Private administration</p>
            <h1 id="protected-gate-title">Verifying administrator access…</h1>
            <p role="status" aria-live="polite">
              Checking the active session before loading private content.
            </p>
          </>
        )}

        {phase === 'configuration' && (
          <>
            <p className="protected-gate__eyebrow">Service unavailable</p>
            <h1 id="protected-gate-title">The Back Office is temporarily unavailable.</h1>
            <p>No private data has been requested.</p>
            <Link className="back-office-button" to="/">Return home</Link>
          </>
        )}

        {phase === 'error' && (
          <>
            <p className="protected-gate__eyebrow">Verification interrupted</p>
            <h1 id="protected-gate-title">Administrator access unavailable</h1>
            <p role="alert">{verificationErrorMessage}</p>
            <div className="protected-gate__actions">
              <button
                type="button"
                className="back-office-button back-office-button--primary"
                onClick={retryVerification}
              >
                Try again
              </button>
              <button
                type="button"
                className="back-office-button"
                disabled={isClearingSession}
                onClick={clearUnusableSession}
              >
                {isClearingSession ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export default RequireSession
