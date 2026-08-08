# Feature Specification — Hidden Lotus Gate and Login

## Table of Contents

- [Goal](#goal)
- [Security Boundary](#security-boundary)
- [Home Trigger](#home-trigger)
- [Lotus Gate](#lotus-gate)
- [Petal Scale and Melody](#petal-scale-and-melody)
- [Gate States and Audio](#gate-states-and-audio)
- [Login Route](#login-route)
- [Validation and Authentication](#validation-and-authentication)
- [Session and Failure States](#session-and-failure-states)
- [Accessibility and Responsive Behavior](#accessibility-and-responsive-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Create a memorable hidden path from Home to administrator authentication. Typing a
route-scoped word summons a musical eight-petal lotus. Playing the accepted petal melody
opens a mandala and portal that lead to Login. Direct Login access remains valid, and
Supabase authentication—not discovery of the interaction—controls administrator access.

## Security Boundary

The typed word, melody, animation, sound, route URL, and source-code constants are
discoverability devices only. They are not secrets and grant no data permission.

Private data requires all of the following:

1. valid Supabase email/password authentication;
2. a persisted session confirmed by the protected route;
3. a server-backed `getUser()` result; and
4. Postgres Row Level Security permitting authenticated selection or deletion.

Login and Back Office remain absent from public navigation and the Footer. No
administrator credential, user ID, token, or private URL hint appears in public copy.

## Home Trigger

`LotusGate` listens for the case-insensitive sequence `lotus` only while Home is mounted
and the gate is closed. Collection is an in-memory rolling buffer; no input, hint, clue,
storage entry, URL parameter, analytics event, or rendered progress is created.

An eligible key event:

- is not composing;
- has no Meta, Control, or Alt modifier;
- is not an automatic repeat;
- represents exactly one character; and
- does not originate from an input, textarea, select, button, or editable element.

Matching does not call `preventDefault`. The listener cleans up and clears its buffer on
unmount.

## Lotus Gate

The trigger opens a fixed full-screen modal threshold that darkens and softly blurs the
page. The dialog contains:

- eight golden petals arranged clockwise;
- a glowing flower heart;
- particle-like hover/focus sparks;
- a gold mandala and blue-gold portal held behind the flower until completion;
- an icon-only close button; and
- screen-reader instructions and live progress.

Focus moves to Close, Tab remains inside, Escape or Close dismisses the gate while it is
safe to do so, body scrolling locks, and focus/background state is restored during
cleanup. Completion temporarily prevents dismissal so the transition cannot enter a
half-authenticated visual state.

## Petal Scale and Melody

Petals retain the value names from the Phoenix Codex philosophy and map clockwise to a
C-major octave:

| Petal | Value | Western note | Indian solfège | Frequency |
| --- | --- | --- | --- | --- |
| 1 | Curiosity | C4 | Sa | 261.63 Hz |
| 2 | Creativity | D4 | Re | 293.66 Hz |
| 3 | Logic | E4 | Ga | 329.63 Hz |
| 4 | Kindness | F4 | Ma | 349.23 Hz |
| 5 | Perseverance | G4 | Pa | 392.00 Hz |
| 6 | Wonder | A4 | Dha | 440.00 Hz |
| 7 | Balance | B4 | Ni | 493.88 Hz |
| 8 | Growth | C5 | Higher Sa | 523.25 Hz |

The accepted seven-tap combination is:

```text
1 → 4 → 1 → 4 → 5 → 4 → 1
C4  F4  C4  F4  G4  F4  C4
```

Repeated petals count as distinct melody steps even though the visual petal remains
illuminated. Progress is based on completed melody steps, not the number of unique
illuminated petals.

## Gate States and Audio

### Opening

The backdrop arrives, the flower blooms, petals enter with restrained staggering, and
ambient sound fades in. Audio is synthesized through Web Audio; no media file or network
request is required. If Web Audio is unavailable or blocked, visual and accessible state
still supports completion.

### Correct input

Each selected petal plays its mapped sine-wave chime. A correct step remains illuminated
and advances live progress. The final C4 adds a resolving chord.

### Incorrect input

The selected note still sounds, then the flower gently fades. After 900 milliseconds,
all melody progress and illumination reset and the gate becomes operable again. Closing
during reset cancels the pending timer so the gate cannot reopen itself.

### Completion

All accepted petals brighten, the flower fully blooms, the heart opens, the mandala
rotates into view, and the portal expands. After 1.8 seconds, audio fades/stops and React
Router navigates to `/login`. Timers, oscillators, context, listeners, scroll locks, and
focus behavior clean up on close, completion, navigation, and unmount.

`prefers-reduced-motion` shortens staged visual timing to an effectively immediate final
state; it does not change the required tap order.

## Login Route

`/login` is a directly loadable hidden public route within the shared layout. On mount it
keeps the form unavailable until `supabase.auth.getSession()` resolves.

- An existing session redirects to `/back-office` with history replacement.
- No session reveals the credential form.
- Missing configuration reveals a safe unavailable state and makes no request.
- Session lookup failure reveals an alert with a Try Again control.

Typing `flaws` outside credential inputs/buttons returns Home with history replacement.
The close phrase never signs out, clears a session, or runs while the visitor types a
credential.

## Validation and Authentication

The semantic form contains visible Email address and Password labels plus one Sign in
button. Email uses `type="email"`, `name="email"`, and `autocomplete="username"`.
Password uses `type="password"`, `name="password"`, and
`autocomplete="current-password"`.

Before authentication:

- email is trimmed, required, and checked against a browser-compatible email pattern;
- password is required and is never trimmed, normalized, or lowercased;
- errors are associated through `aria-describedby` and `aria-invalid`;
- the first invalid field receives focus; and
- validation failure sends no request.

A synchronous ref guard closes the duplicate-submit window before pending state renders.
The valid request is exactly:

```javascript
supabase.auth.signInWithPassword({
  email: normalizedEmail,
  password,
})
```

The button becomes disabled and reads “Signing in…” while the form exposes
`aria-busy="true"`. Authentication succeeds only when no error is returned and
`data.session` exists, then navigates to `/back-office` with replacement.

## Session and Failure States

- Credential rejection uses “Unable to sign in with those credentials.” without
  confirming whether the account exists.
- Network/client failure uses a generic temporary-unavailable message.
- Failure preserves email, clears password, and returns focus to Password.
- Raw errors, account identifiers, provider configuration, URLs, keys, and tokens never
  render or enter production logs.
- Pending guards reset after failure but successful navigation may unmount directly.
- Supabase owns session persistence and refresh; tokens are never copied manually.

## Accessibility and Responsive Behavior

- The gate and Login each have one clear accessible name/heading.
- Petal buttons expose value, note, solfège, pressed state, tooltip, and live step count.
- Every gate action is keyboard and touch operable; sound is never the sole feedback.
- Login focus order is email → password → submit.
- Checking and pending use polite status; failures use alerts.
- Portal, rings, mandala, particles, and flower marks are decorative.
- Gate and form remain within 320px, tablet, desktop, and 200%-zoom viewports.
- Reduced motion preserves immediate final visual states and authentication behavior.

## Acceptance Contract

- Typing `lotus` on Home opens one gate and creates no visible trigger beforehand.
- The seven accepted taps are `1, 4, 1, 4, 5, 4, 1`.
- Any incorrect next tap fades and resets the melody.
- Final completion opens the mandala/portal and routes to Login.
- Audio is user-initiated, optional, synthesized, and cleaned up reliably.
- Direct `/#/login` load and refresh work independently of the gate.
- Login never flashes an operable form before its initial session result.
- Local validation and duplicate prevention precede Supabase authentication.
- Valid authentication redirects to protected Back Office; invalid authentication remains
  generic and recoverable.
- The hidden experience never substitutes for the route guard or RLS.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Hidden Lotus Gate and Login
- **Related Area:** Fullstack / Authentication

## Feature Goal

Provide a memorable optional path to a directly accessible administrator Login while
ensuring Supabase Auth—not discovery of the gate—establishes identity.

## Feature Scope

### In Scope (Included)

- Home key-sequence trigger, accessible musical lotus dialog, optional synthesized
  audio, portal transition, Login form, validation, session lookup, password sign-in,
  redirects, and safe failure states.

### Out of Scope (Excluded)

- Authorization by phrase or melody, public signup, password recovery, credential
  storage, public navigation links, and access to private message rows.

## Sub-Requirements (Feature Breakdown)

- Detect `lotus` only in eligible Home key events and clean up the listener.
- Enforce the documented seven-petal sequence with accessible visual progress.
- Keep `/login` directly loadable and check existing session state before showing form.
- Validate credentials locally and guard duplicate `signInWithPassword` calls.
- Keep credential, network, and configuration failure states generic and recoverable.

## User Flow / Logic (High Level)

1. A visitor opens Login directly or completes the optional Home lotus sequence.
2. Login checks for an existing session and redirects an authenticated user.
3. A signed-out user submits locally valid credentials to Supabase Auth.
4. Success routes to protected Back Office; failure clears only the password and retries.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`LotusGate`, `useKeySequence`, `LoginPage`, `loginValidation.js`, the `/login` route, and
the shared Supabase client.

### Backend / API

Supabase Auth `getSession()` and `signInWithPassword()`; no public signup or custom auth
endpoint.

## Data Used or Modified

Transient melody progress, dialog/audio state, email, password, feedback phase, and the
Supabase-managed session. Credentials are never persisted by application code.

## Tech Constraints (Feature-Level)

Use native controls, focus trapping, optional Web Audio, reduced-motion fallbacks,
generic auth errors, synchronous submit guards, and Supabase-managed sessions.

## Acceptance Criteria

- [ ] Home’s accepted sequence opens Login without granting authorization.
- [ ] Direct Login loading and existing-session redirect work.
- [ ] Invalid form data causes no Auth request.
- [ ] Valid credentials establish a session and route to Back Office.
- [ ] Gate, audio, timers, focus, and credentials clean up safely.

## Notes for the AI

Never publish credentials, treat hidden interactions as security, create public signup,
log auth payloads, or allow visual/audio effects to block direct accessible Login use.
