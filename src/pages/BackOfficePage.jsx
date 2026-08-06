// =============================================================================
// src/pages/BackOfficePage.jsx — authenticated contact-message administration
// -----------------------------------------------------------------------------
// 1. Imports & data helpers     dialogs, client, message shape, date formatting
// 2. Message lifecycle         guarded ordered fetch and private-state cleanup
// 3. Message actions           view, confirmed exact-ID deletion, and logout
// 4. Page rendering            states, semantic table, and modal composition
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteMessageDialog from '../components/DeleteMessageDialog.jsx'
import MessageDialog from '../components/MessageDialog.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { reportDevelopmentError } from '../utils/reportDevelopmentError.js'
import './BackOfficePage.css'

const fetchErrorMessage = 'Messages could not be loaded. Try again.'
const deleteErrorMessage = 'This message could not be deleted. Try again.'
const logoutErrorMessage = 'Sign out could not be completed. Try again.'

const tableDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'full',
  timeStyle: 'long',
})

function hasValidMessageShape(message) {
  return (
    message &&
    typeof message.id === 'string' &&
    typeof message.name === 'string' &&
    typeof message.email === 'string' &&
    typeof message.message === 'string' &&
    typeof message.created_at === 'string'
  )
}

function formatMessageDate(createdAt) {
  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) {
    return { isValid: false, table: 'Date unavailable', full: 'Date unavailable' }
  }

  return {
    isValid: true,
    table: tableDateFormatter.format(date),
    full: fullDateFormatter.format(date),
  }
}

function BackOfficePage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('loading')
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [pendingDeleteMessage, setPendingDeleteMessage] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [logoutError, setLogoutError] = useState('')
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const requestVersion = useRef(0)
  const isMounted = useRef(true)
  const deleteGuard = useRef(false)
  const logoutGuard = useRef(false)
  const dialogOpener = useRef(null)
  const tableFocusRef = useRef(null)

  const clearPrivateState = useCallback(() => {
    requestVersion.current += 1
    setMessages([])
    setSelectedMessage(null)
    setPendingDeleteMessage(null)
    setDeleteError('')
  }, [])

  const requestMessages = useCallback(async () => {
    const currentVersion = ++requestVersion.current

    try {
      // Explicit columns reduce accidental private-data exposure if the schema
      // expands; server ordering is the authoritative newest-first sequence.
      const { data, error } = await supabase
        .from('messages')
        .select('id, name, email, message, created_at')
        .order('created_at', { ascending: false })

      if (!isMounted.current || currentVersion !== requestVersion.current) return

      if (error || !Array.isArray(data) || !data.every(hasValidMessageShape)) {
        if (error) reportDevelopmentError('Message list request failed.', error)
        setMessages([])
        setPhase('error')
        return
      }

      setMessages(data)
      setPhase(data.length === 0 ? 'empty' : 'ready')
    } catch (error) {
      reportDevelopmentError('Message list request was interrupted.', error)
      if (isMounted.current && currentVersion === requestVersion.current) {
        setMessages([])
        setPhase('error')
      }
    }
  }, [])

  useEffect(() => {
    isMounted.current = true
    const requestFrame = window.requestAnimationFrame(requestMessages)

    return () => {
      window.cancelAnimationFrame(requestFrame)
      isMounted.current = false
      requestVersion.current += 1
      // :warning: Message records are private and remain only in authenticated
      // component memory. Clear every reference as soon as this route unmounts.
      setMessages([])
      setSelectedMessage(null)
      setPendingDeleteMessage(null)
      dialogOpener.current = null
    }
  }, [requestMessages])

  function retryMessages() {
    setPhase('loading')
    setMessages([])
    requestMessages()
  }

  function openMessage(message, event) {
    dialogOpener.current = event.currentTarget
    setSelectedMessage(message)
  }

  const closeMessage = useCallback(() => {
    setSelectedMessage(null)
  }, [])

  function openDeleteConfirmation(message, event) {
    dialogOpener.current = event.currentTarget
    setDeleteError('')
    setPendingDeleteMessage(message)
  }

  const cancelDelete = useCallback(() => {
    if (deleteGuard.current) return
    setDeleteError('')
    setPendingDeleteMessage(null)
  }, [])

  async function confirmDelete() {
    if (
      deleteGuard.current ||
      !pendingDeleteMessage ||
      !hasValidMessageShape(pendingDeleteMessage)
    ) {
      return
    }

    const selectedId = pendingDeleteMessage.id
    deleteGuard.current = true
    setIsDeleting(true)
    setDeleteError('')

    try {
      // :warning: The exact immutable UUID filter is mandatory. Never weaken
      // this chain or allow a delete operation without `.eq('id', selectedId)`.
      const { data, error } = await supabase
        .from('messages')
        .delete()
        .eq('id', selectedId)
        .select('id')
        .single()

      if (!isMounted.current) return

      if (error || !data || data.id !== selectedId) {
        if (error) reportDevelopmentError('Message deletion failed.', error)
        setDeleteError(deleteErrorMessage)
        return
      }

      setMessages((currentMessages) => {
        return currentMessages.filter(
          (message) => message.id !== data.id,
        )
      })
      setPhase(messages.length === 1 ? 'empty' : 'ready')
      setPendingDeleteMessage(null)
    } catch (error) {
      reportDevelopmentError('Message deletion was interrupted.', error)
      if (isMounted.current) setDeleteError(deleteErrorMessage)
    } finally {
      deleteGuard.current = false
      if (isMounted.current) setIsDeleting(false)
    }
  }

  async function handleLogout() {
    if (logoutGuard.current) return

    logoutGuard.current = true
    setIsSigningOut(true)
    setLogoutError('')

    try {
      const { error } = await supabase.auth.signOut()
      if (!isMounted.current) return

      if (error) {
        reportDevelopmentError('Administrator sign-out failed.', error)
        setLogoutError(logoutErrorMessage)
        return
      }

      // Successful sign-out discards private state before history replacement;
      // the outer session gate independently prevents Back from restoring it.
      clearPrivateState()
      navigate('/login', { replace: true })
    } catch (error) {
      reportDevelopmentError('Administrator sign-out was interrupted.', error)
      if (isMounted.current) setLogoutError(logoutErrorMessage)
    } finally {
      logoutGuard.current = false
      if (isMounted.current) setIsSigningOut(false)
    }
  }

  const hasOpenDialog = Boolean(selectedMessage || pendingDeleteMessage)

  return (
    <article className="back-office-page" aria-labelledby="back-office-title">
      <div
        className="back-office-page__private-content"
        inert={hasOpenDialog ? true : undefined}
      >
        <header className="back-office-page__header">
          <div>
            <p className="back-office-page__eyebrow">Private administration</p>
            <h1 id="back-office-title">Message Back Office</h1>
            <p>
              Review and manage messages submitted through the portfolio contact
              form.
            </p>
          </div>
          <button
            type="button"
            className="back-office-button back-office-button--logout"
            disabled={isSigningOut}
            onClick={handleLogout}
          >
            {isSigningOut ? 'Signing out…' : 'Log out'}
          </button>
        </header>

        {logoutError && (
          <p className="back-office-feedback back-office-feedback--error" role="alert">
            <strong>Sign-out failed.</strong> {logoutError}
          </p>
        )}

        {isSigningOut && (
          <p className="back-office-feedback" role="status" aria-live="polite">
            Signing out…
          </p>
        )}

        <section className="back-office-page__messages" aria-labelledby="messages-title">
          <div className="back-office-page__section-heading">
            <div>
              <p className="back-office-page__eyebrow">Inbox</p>
              <h2 id="messages-title">Contact messages</h2>
            </div>
            {phase === 'ready' && (
              <p className="back-office-page__count" aria-label={`${messages.length} messages`}>
                {messages.length}
              </p>
            )}
          </div>

          {phase === 'loading' && (
            <div className="back-office-state" role="status" aria-live="polite">
              <span aria-hidden="true">…</span>
              <div>
                <strong>Loading messages…</strong>
                <p>The newest contact submissions will appear first.</p>
              </div>
            </div>
          )}

          {phase === 'empty' && (
            <div
              ref={tableFocusRef}
              className="back-office-state"
              role="status"
              tabIndex="-1"
            >
              <span aria-hidden="true">◇</span>
              <div>
                <strong>No messages yet.</strong>
                <p>New contact submissions will appear here.</p>
              </div>
            </div>
          )}

          {phase === 'error' && (
            <div className="back-office-state back-office-state--error" role="alert">
              <span aria-hidden="true">!</span>
              <div>
                <strong>Messages unavailable.</strong>
                <p>{fetchErrorMessage}</p>
                <button
                  type="button"
                  className="back-office-button back-office-button--primary"
                  onClick={retryMessages}
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {phase === 'ready' && (
            <>
              <p className="back-office-table-instruction">
                Scroll horizontally to review every message column.
              </p>
              <div
                ref={tableFocusRef}
                className="back-office-table-region"
                role="region"
                aria-label="Contact messages table"
                tabIndex="0"
              >
                <table>
                  <caption>Contact messages, newest first</caption>
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => {
                      const formattedDate = formatMessageDate(message.created_at)

                      return (
                        <tr key={message.id}>
                          <td>{message.name}</td>
                          <td>{message.email}</td>
                          <td>
                            {formattedDate.isValid ? (
                              <time dateTime={message.created_at}>
                                {formattedDate.table}
                              </time>
                            ) : (
                              'Date unavailable'
                            )}
                          </td>
                          <td>
                            <div className="back-office-table__actions">
                              <button
                                type="button"
                                className="back-office-button back-office-button--compact"
                                onClick={(event) => openMessage(message, event)}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="back-office-button back-office-button--compact back-office-button--danger"
                                onClick={(event) => openDeleteConfirmation(message, event)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>

      <MessageDialog
        message={selectedMessage}
        formattedDate={
          selectedMessage
            ? formatMessageDate(selectedMessage.created_at)
            : { isValid: false, table: '', full: '' }
        }
        openerRef={dialogOpener}
        fallbackFocusRef={tableFocusRef}
        onClose={closeMessage}
      />

      <DeleteMessageDialog
        message={pendingDeleteMessage}
        isDeleting={isDeleting}
        deleteError={deleteError}
        openerRef={dialogOpener}
        fallbackFocusRef={tableFocusRef}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </article>
  )
}

export default BackOfficePage
