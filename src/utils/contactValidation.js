// =============================================================================
// src/utils/contactValidation.js — pure Contact normalization and validation
// -----------------------------------------------------------------------------
// 1. Contracts                  field limits, initial values, and error copy
// 2. normalizeContactValues     trimmed allowlisted submission candidate
// 3. validateContactValues      complete field validation without side effects
// =============================================================================

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
}

export const initialContactValues = {
  name: '',
  email: '',
  message: '',
}

export const initialContactErrors = {
  name: '',
  email: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeContactValues(values) {
  // Build a fresh allowlisted object so UI state or future form metadata can
  // never leak into the public database insert through object spreading.
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  }
}

export function validateContactValues(values) {
  const errors = { ...initialContactErrors }

  if (!values.name) {
    errors.name = 'Enter your name.'
  } else if (values.name.length < CONTACT_LIMITS.name.min) {
    errors.name = 'Name must contain at least 2 characters.'
  } else if (values.name.length > CONTACT_LIMITS.name.max) {
    errors.name = 'Name must contain no more than 100 characters.'
  }

  if (!values.email) {
    errors.email = 'Enter your email address.'
  } else if (values.email.length > CONTACT_LIMITS.email.max) {
    errors.email = 'Email must contain no more than 254 characters.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.message) {
    errors.message = 'Enter a message.'
  } else if (values.message.length < CONTACT_LIMITS.message.min) {
    errors.message = 'Message must contain at least 10 characters.'
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    errors.message = 'Message must contain no more than 2,000 characters.'
  }

  return errors
}
