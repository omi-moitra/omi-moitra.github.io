// =============================================================================
// src/lib/supabaseClient.js — single low-privilege browser client boundary
// -----------------------------------------------------------------------------
// 1. Configuration      approved public environment-variable presence check
// 2. Supabase client    configured session-aware client or safe null fallback
// =============================================================================

import { createClient } from '@supabase/supabase-js'

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseUrl = configuredSupabaseUrl
  ?.replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '')
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey,
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

// :warning: VITE_* values are visible in the browser bundle. This client may
// receive only a low-privilege publishable/anonymous key; RLS protects data.
