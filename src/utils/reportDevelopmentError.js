// =============================================================================
// src/utils/reportDevelopmentError.js — privacy-safe development diagnostics
// -----------------------------------------------------------------------------
// Production remains silent. Development logs only service metadata useful for
// debugging and deliberately excludes credentials, tokens, messages, and raw
// provider payloads, matching the ai-spec private-data boundary.
// =============================================================================

export function reportDevelopmentError(context, error) {
  if (!import.meta.env.DEV) return

  console.error(`[portfolio] ${context}`, {
    name: error?.name || 'ServiceError',
    code: error?.code || null,
    status: error?.status || null,
  })
}
