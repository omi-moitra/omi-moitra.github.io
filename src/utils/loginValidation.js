// =============================================================================
// src/utils/loginValidation.js — pure administrator credential validation
// -----------------------------------------------------------------------------
// 1. State contracts       empty values, errors, and approved validation copy
// 2. normalizeLoginValues  trim email only while preserving password exactly
// 3. validateLoginValues   required and browser-compatible email validation
// =============================================================================

export const initialLoginValues = {
  email: '',
  password: '',
}

export const initialLoginErrors = {
  email: '',
  password: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeLoginValues(values) {
  // Password whitespace may be intentional credential data and must never be
  // trimmed, normalized, or lowercased with the email candidate.
  return {
    email: values.email.trim(),
    password: values.password,
  }
}

export function validateLoginValues(values) {
  const errors = { ...initialLoginErrors }

  if (!values.email) {
    errors.email = 'Enter the administrator email address.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Enter the administrator password.'
  }

  return errors
}
