# Feature Specification — Login Page

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
- [Secret Phrase Contract](#secret-phrase-contract)
- [Approved Interface Copy](#approved-interface-copy)
- [User Flow and Expected Behavior](#user-flow-and-expected-behavior)
- [Interfaces](#interfaces)
- [Data and Validation](#data-and-validation)
- [Authentication and Security Contract](#authentication-and-security-contract)
- [Technical Constraints](#technical-constraints)
- [Implementation Decisions](#implementation-decisions)
- [Acceptance Criteria](#acceptance-criteria)
- [Verification Plan](#verification-plan)
- [Warnings and Known Limitations](#warnings-and-known-limitations)
- [Notes for AI and Contributors](#notes-for-ai-and-contributors)

## Feature Identity

- **Feature name:** Login Page
- **Related area:** Hidden route discovery, keyboard-sequence handling, administrator authentication, persistent Supabase sessions, responsive form design, and accessibility
- **Specification path:** `ai/features/login-page.feature.md`
- **Required branch:** `feature/login-page`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing foundation from `ai/features/setup-deploy.feature.md`, shared layout from `ai/features/header-footer.feature.md`, Home from `ai/features/home-page.feature.md`, and the shared client in `src/lib/supabaseClient.js`
- **Primary user:** The pre-authorized site administrator

## Feature Goal

Create a hidden administrator Login page that is discoverable from Home only by typing the phrase `heaven's library` directly on the page, without a trigger input, visible control, hint, or navigation link. While Login is open, typing `flaws` directly on the page closes it by returning to Home. The Login form must authenticate the pre-created administrator through Supabase Auth, persist a valid session, redirect authenticated users to Back Office, and report failures safely.

The phrase controls route discovery only. It does not protect administrator data; Supabase authentication, the Back Office route guard, and Row Level Security remain the security boundaries.

After this feature is complete:

- typing `heaven's library` on Home navigates to `/#/login`;
- there is no visible or focusable input, button, link, instruction, or hint for the secret trigger;
- typing `flaws` on Login while focus is outside a credential control navigates to Home;
- Login remains absent from desktop navigation, mobile navigation, Footer, and public content;
- the Login form contains visibly labeled email and password fields plus a submit button;
- valid credentials establish a persistent Supabase session and navigate to `/#/back-office`;
- an existing valid session bypasses Login and navigates to Back Office;
- invalid credentials receive a safe, accessible failure message; and
- missing Supabase configuration renders a controlled fallback without crashing.

## Feature Scope

### In Scope — Included

- Login at React Router path `/login` and deployed hash URL `/#/login`.
- Direct URL access as required by the rubric, while keeping the route absent from public discovery UI.
- A Home-only `heaven's library` keyboard sequence that navigates to Login.
- A Login-only `flaws` keyboard sequence that navigates back to Home.
- Case-insensitive sequence matching with straight or curly apostrophe normalization.
- A rolling in-memory key buffer with no rendered or persisted trigger field.
- Guardrails that ignore key sequences originating from inputs, textareas, selects, buttons, or editable content.
- Listener registration and cleanup scoped to the active route component.
- An initial Supabase session check before showing the login form.
- Email input, password input, and submit button.
- Required-field and email-format validation before authentication.
- Supabase `auth.signInWithPassword()` through the shared client.
- Pending state and duplicate-submit prevention.
- Safe success navigation and generic authentication failure feedback.
- Session persistence through the existing browser Supabase client configuration.
- Controlled missing-configuration and session-check failure states.
- A pre-created administrator account managed only in the Supabase dashboard.
- Semantic form structure, password-manager metadata, keyboard access, visible focus, live feedback, sufficient contrast, and responsive layout.
- Canonical `phoenixPalette` and approved gradient use.

### Out of Scope — Excluded

- A visible trigger input, hidden HTML form field, modal prompt, button, link, menu item, instruction, riddle, tooltip, or displayed clue for either phrase.
- Adding Login or Back Office to the Header, Footer, desktop navigation, mobile navigation, Home calls to action, sitemap, or public resource list.
- Treating either keyboard phrase or the route URL as authentication or authorization.
- Blocking direct `/#/login` access; the rubric explicitly permits manual URL access.
- A close button added solely for the `flaws` behavior.
- Detecting secret phrases while the visitor types in form controls or editable content.
- Global secret-sequence detection on Portfolio, Links, Contact, Back Office, or unrelated routes.
- Public registration, administrator creation, invitations, password reset, magic links, OAuth, social login, multifactor authentication, or multiple administrator roles.
- Hard-coded email addresses, passwords, access tokens, user IDs, or session values.
- Storing credentials in React context, local storage, session storage, URLs, logs, analytics, or custom cookies.
- Custom token parsing or manual session persistence.
- Back Office message loading, viewing, deletion, modal behavior, or logout implementation.
- Changes to the `messages` schema or RLS policies owned by Contact and Back Office.
- A custom server, serverless function, Edge Function, or second authentication service.
- A new form, validation, keyboard-shortcut, state-management, notification, or animation dependency.

## Requirements Breakdown

### Requirement 1 — Hidden Route and Public Navigation

- Replace the `/login` setup placeholder with the Login page component.
- Render Login at deployed hash URL `/#/login` inside the shared `Main` layout.
- Direct loading and refreshing of `/#/login` must work on GitHub Pages.
- Keep `/login` out of `publicNavigation` and every visible public link collection.
- Keep `/back-office` out of public navigation and Login explanatory copy.
- Do not add a canonical metadata link, visible breadcrumb, Footer link, or Home control that advertises Login.
- The route may remain visible in application source and browser history; hiding it is a discoverability choice, not security.
- Browser Back, standard public navigation already provided by `Main`, and manual URLs continue working normally.

### Requirement 2 — Home Open Phrase

- Listen for `keydown` events only while `HomePage` is mounted.
- Match the normalized sequence `heaven's library`.
- Require the apostrophe and space in the correct order.
- Treat uppercase and lowercase letters as equivalent.
- Normalize a curly apostrophe (`’`) to a straight apostrophe (`'`) before matching.
- Keep only the most recent characters needed to match the phrase.
- Allow unrelated earlier characters to fall out of the rolling buffer.
- On a complete match, clear the buffer and navigate to React Router path `/login`.
- Do not render, focus, or programmatically create an input to collect the phrase.
- Do not display a progress indicator, clue, success toast, or announcement before navigation.
- Do not persist typed characters in React state, browser storage, URLs, analytics, or logs.

### Requirement 3 — Login Close Phrase

- Listen for `keydown` events only while `LoginPage` is mounted.
- Match the normalized sequence `flaws` case-insensitively.
- On a complete match, clear the buffer and navigate to `/` with `{ replace: true }`.
- Replacing history prevents the browser Back action from immediately reopening the page that was intentionally closed.
- Do not render a trigger input, close button, hint, progress indicator, or confirmation dialog for this behavior.
- Do not call Supabase sign-out when `flaws` is typed; Login should already redirect a valid authenticated session to Back Office.
- Do not erase browser-managed sessions or unrelated application state.
- Remove the Login listener immediately when the route unmounts.

### Requirement 4 — Keyboard Sequence Safety

- Ignore events when `event.isComposing` is true.
- Ignore events with `metaKey`, `ctrlKey`, or `altKey` so browser and assistive-technology shortcuts never contribute characters.
- Ignore repeated keydown events caused by holding a key.
- Ignore non-character keys such as Shift, Tab, Enter, Escape, arrows, and function keys.
- Ignore and clear the rolling buffer when the event target is:

  - an `<input>`;
  - a `<textarea>`;
  - a `<select>`;
  - a `<button>`; or
  - an element with `contenteditable` enabled.

- Credential entry must never trigger `flaws`, even if those letters appear inside an email address or password.
- Do not call `preventDefault()` for ordinary character keys; typing the phrase must not disable standard browser behavior.
- Reset the buffer when the component unmounts.
- Attach only one listener for each active page instance and remove it during effect cleanup.

### Requirement 5 — Login Form Fields

- Use a semantic `<form>` with React-managed submission.
- Include:

  1. `<input type="email">` for administrator email;
  2. `<input type="password">` for administrator password; and
  3. one submit button.

- Give both inputs persistent visible labels associated through `htmlFor` and `id`.
- Do not use placeholders as the only labels.
- Use `name="email"`, `autoComplete="username"`, and appropriate email input behavior.
- Use `name="password"` and `autoComplete="current-password"`.
- Do not render credentials in page copy, initial values, placeholders, examples, comments, screenshots, or test fixtures committed to Git.
- Do not add password reveal, remember-me, recovery, registration, or alternative-authentication controls without separate approval.

### Requirement 6 — Login Validation

- Validate locally before calling Supabase.
- Trim leading and trailing whitespace from the email candidate.
- Do not trim, lowercase, normalize, or rewrite the password.
- Require a non-empty email that passes browser-compatible email-format validation.
- Require a non-empty password.
- Reject whitespace-only email values.
- Display field-specific validation text and associate it using `aria-describedby`.
- Set `aria-invalid="true"` only while the corresponding field is invalid.
- Focus the first invalid control after a rejected submit.
- Issue no authentication request while validation errors exist.
- Keep the email value after validation or authentication failure.
- Clear the password after a completed authentication failure and return focus to the password field.

### Requirement 7 — Initial Session Check

- Before rendering an operable login form, check the shared Supabase client for an existing session.
- Call `supabase.auth.getSession()` only when Supabase is configured.
- Show a non-sensitive checking state while the initial session result is unresolved.
- If a valid session exists, navigate to `/back-office` with `{ replace: true }`.
- If no session exists, render the Login form.
- If session checking fails, render a safe retryable authentication-service message rather than assuming the visitor is authenticated.
- Do not flash the login form before redirecting a known authenticated administrator.
- Ignore or cancel stale state updates after unmount.
- The Back Office route must perform its own authentication guard; the Login check does not protect private data.

### Requirement 8 — Supabase Password Authentication

- Import `supabase` and `isSupabaseConfigured` from `src/lib/supabaseClient.js`.
- Submit only after validation passes, no request is pending, and configuration is available.
- Call exactly:

  ```javascript
  supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  })
  ```

- Use the entered values; never substitute committed or environment-stored administrator credentials.
- Treat a returned Supabase `error` as authentication failure.
- Treat a missing returned session as failure even if no explicit error is present.
- Treat thrown client or network exceptions as failure.
- Do not inspect error details to reveal whether an account exists.
- Do not log the credentials, returned access token, refresh token, session, or complete authentication error.

### Requirement 9 — Pending State and Duplicate Prevention

- Set an immediate submission guard before awaiting Supabase.
- Reject repeated submit events while authentication is pending.
- Disable the submit button during the request.
- Change its label to “Signing in…” or equally clear pending text.
- Expose pending state with text and `aria-busy="true"`; a disabled button alone is insufficient.
- Keep email and password values stable while the request is unresolved.
- Prevent clicks, Enter, touch, and same-render repeated events from producing duplicate authentication calls.
- Restore the operable state after authentication failure.
- Navigation after success may unmount the form without resetting visible state first.

### Requirement 10 — Successful Login

- Require a returned valid session before treating authentication as successful.
- Navigate to `/back-office` with `{ replace: true }`.
- Do not display a long-lived success message that delays protected-route navigation.
- Let the shared Supabase client persist and refresh the session using its existing `persistSession: true` and `autoRefreshToken: true` configuration.
- Do not manually copy access or refresh tokens into application storage.
- Refreshing `/#/back-office` must retain the session until Supabase expires it or the administrator logs out.
- Revisiting `/#/login` with a valid session must redirect back to Back Office.
- Back Office independently confirms session state before rendering private messages.

### Requirement 11 — Failed Login

- Display a generic message such as “Unable to sign in with those credentials.” for invalid credentials.
- Use a generic service-unavailable message for network, client, or configuration failures.
- Make failure visually and semantically distinct without relying on red alone.
- Announce failure through `role="alert"` when appropriate.
- Do not reveal whether the email exists, whether the password alone was incorrect, account identifiers, provider configuration, URLs, keys, tokens, stack traces, or raw Supabase error text.
- Keep the email value so the administrator can correct a likely password error efficiently.
- Clear the password after the failed attempt.
- Return focus to the password field after announcing or rendering the failure.
- Clear stale failure feedback on the administrator's next meaningful edit or retry.

### Requirement 12 — Missing-Configuration Fallback

- Check `isSupabaseConfigured` before dereferencing the shared client.
- Render Login without crashing when either approved environment variable is absent.
- Show a non-sensitive message such as “Administrator sign-in is temporarily unavailable.”
- Keep credential fields disabled or unavailable while configuration is missing.
- Issue no session or sign-in request.
- Do not reveal which variable, project URL, or key is absent.
- Do not fall back to hard-coded credentials, local-only authentication, another service, or fake success.
- Keep the `flaws` close phrase available so the page can still return Home.

### Requirement 13 — Administrator Account Provisioning

- Create the administrator user in the Supabase dashboard before testing Login.
- Keep public signup disabled.
- Do not expose an administrator-creation interface in the application.
- Do not commit or document the real administrator password in this specification, source files, `.env.example`, README, test fixtures, screenshots, logs, or Git history.
- Store required submission credentials only in the approved untracked submission artifact or another explicitly approved secure channel.
- Verify the account can authenticate with `signInWithPassword` before the feature checkpoint.
- Use only the low-privilege publishable/anonymous browser key; never use a secret or service-role key for sign-in.

### Requirement 14 — Responsive Visual Design

- Use the exact canonical `phoenixPalette` tokens and shared CSS custom properties from `ai/ai-spec.md`.
- Use the Phoenix gradient (`phoenixRed` → `blazeOrange` → `solarGold`) for a restrained threshold or portal accent.
- Use the Code gradient (`midnightBlue` → `sapphire` → `teal`) for authentication-form framing or technical accents.
- Use the Creative gradient (`royalViolet` → `magenta` → `phoenixRed`) sparingly.
- Preserve every approved gradient's token order.
- Keep labels, input text, status text, and errors on solid surfaces with verified contrast.
- Use professional labels such as “Administrator Sign In”; fantasy styling must not obscure authentication meaning.
- Use one column at narrow widths and keep controls within the viewport.
- Keep the page usable at 320px, 768px, 769px, desktop widths, and 200% zoom.
- Reserve enough bottom space for shared mobile navigation at 768px and below.

### Requirement 15 — Accessibility and Semantics

- Use one page-level `<h1>` and a concise explanation of the administrator sign-in form.
- Give each form control a visible, programmatically associated label.
- Make all controls keyboard operable with visible focus.
- Keep tab order logical: email → password → submit.
- Use live status for initial checking and pending authentication.
- Associate validation text with its field and use an alert for authentication failure.
- Do not rely on color, icon, placeholder, fantasy terminology, or motion alone to communicate state.
- Respect `prefers-reduced-motion` for portal, feedback, and button effects.
- Do not announce or expose partial secret-phrase progress to assistive technology.
- Keep the phrase listener passive with respect to standard browser behavior.
- The hidden gesture is an administrator convenience, not the only technically possible route access.

### Requirement 16 — File Documentation and Handoff

- Every created or modified Markdown file must have a linked Table of Contents near the top.
- Every created or modified comment-capable source file must open with an accurate comments-based TOC.
- Add why-comments for sequence scope, input exclusion, session checks, password handling, pending guards, error privacy, and navigation replacement.
- Use `// :warning:` for material security limitations and cross-system invariants, including hidden-route discoverability and Back Office authorization.
- Keep comments current when phrases, routes, or authentication behavior change.
- At implementation handoff, report verification and provide exact staging commands and ready-to-run commit messages for only the files changed.

## Secret Phrase Contract

### Open Login From Home

| Property | Required behavior |
| --- | --- |
| Active route | Home only (`/`) |
| Canonical phrase | `heaven's library` |
| Comparison | Case-insensitive |
| Apostrophe handling | Treat `'` and `’` as the canonical `'` |
| Spaces | Required in their exact position |
| Collection UI | None |
| Storage | In-memory rolling buffer only |
| Match result | `navigate('/login')` |
| Public hint | None |

### Close Login From Login

| Property | Required behavior |
| --- | --- |
| Active route | Login only (`/login`) |
| Canonical phrase | `flaws` |
| Comparison | Case-insensitive |
| Collection UI | None |
| Storage | In-memory rolling buffer only |
| Match result | `navigate('/', { replace: true })` |
| Supabase effect | None; do not call `signOut()` |
| Public hint | None |

### Event Eligibility

A key contributes to a phrase only when all conditions are true:

- the relevant route component is mounted;
- the event is not part of IME composition;
- Meta, Control, and Alt are not pressed;
- the event is not an automatic repeat;
- `event.key` is one printable character after apostrophe normalization; and
- the event target is not an input, textarea, select, button, or editable element.

### Rolling Buffer Behavior

For the active canonical phrase:

1. normalize the eligible key to lowercase;
2. normalize `’` to `'`;
3. append it to the current buffer;
4. retain only the final `phrase.length` characters;
5. compare the buffer with the full phrase;
6. clear the buffer before invoking the match callback; and
7. clear the buffer during component cleanup.

Do not use a timing deadline. The rare full phrase provides enough specificity, and removing a timer makes the gesture reliable for administrators who type slowly or use assistive input.

## Approved Interface Copy

### Page Heading

> Administrator Sign In

### Supporting Text

> Sign in with the administrator account to manage portfolio messages.

This text does not explain how the hidden route was opened and does not display the Back Office URL.

### Form Copy

- **Email label:** Email address
- **Password label:** Password
- **Idle button:** Sign in
- **Pending button:** Signing in…
- **Email empty:** Enter the administrator email address.
- **Email invalid:** Enter a valid email address.
- **Password empty:** Enter the administrator password.
- **Credential failure:** Unable to sign in with those credentials.
- **Service failure:** Administrator sign-in is temporarily unavailable. Please try again.
- **Initial status:** Checking administrator session…

Do not place the actual administrator email or password in visible copy or placeholders.

## User Flow and Expected Behavior

### Secret Open Flow

1. A visitor is on Home with focus outside an interactive or editable control.
2. The visitor types `heaven's library` directly on the page.
3. No typed characters or progress appear visually.
4. The rolling buffer reaches a complete normalized match.
5. Home clears its buffer and navigates to `/login`.
6. Home unmounts and removes its listener.
7. Login begins its configuration and session check.

### Secret Close Flow

1. The administrator is on Login with focus outside the email, password, submit button, or editable content.
2. The administrator types `flaws`.
3. No typed characters or progress appear visually.
4. Login clears its buffer and navigates to Home with history replacement.
5. Login unmounts and removes its listener.
6. Supabase session state is not changed by this navigation.

### Direct Login Flow

1. The administrator manually enters `/#/login` or refreshes that URL.
2. Login renders a checking state without appearing in public navigation.
3. If no session exists, the form becomes available.
4. If a session exists, Login redirects to Back Office without flashing the form.

### Successful Authentication Flow

1. The administrator enters a valid email and password.
2. Local validation passes.
3. The synchronous guard enters pending state.
4. Exactly one `signInWithPassword` request is issued.
5. Supabase returns a valid session without an error.
6. Login navigates to `/back-office` with history replacement.
7. Refreshing Back Office retains the session through the shared client.

### Validation-Failure Flow

1. The administrator submits an empty or malformed field.
2. Local errors render and the first invalid field receives focus.
3. No Supabase request is issued.
4. The email remains available for correction.
5. Typing `flaws` inside either credential input is ignored by the route listener.

### Authentication-Failure Flow

1. Valid-looking credentials trigger one request.
2. Supabase returns an authentication error or no valid session.
3. Pending state ends.
4. Generic failure feedback is announced.
5. The email remains, the password clears, and password focus is restored.
6. The message does not confirm whether the account exists.

### Missing-Configuration Flow

1. Login loads without one or both approved Supabase values.
2. The page renders a generic unavailable state without calling the null client.
3. Credential submission is unavailable.
4. Typing `flaws` outside controls still returns Home.
5. No variable names, URLs, keys, or fake success appear.

## Interfaces

### Reusable Key-Sequence Hook

- `src/hooks/useKeySequence.js`
  - Owns normalized route-scoped key collection, target filtering, rolling-buffer matching, and listener cleanup.
  - Accepts a canonical sequence, enabled state, and match callback.
  - Stores the buffer in a ref so partial phrases never render or trigger rerenders.
  - Keeps the current callback in a ref or requires a stable callback so listeners are not duplicated unnecessarily.

### Home Page

- `src/pages/HomePage.jsx`
  - Invokes `useKeySequence` with `heaven's library`.
  - Navigates to `/login` after a complete match.
  - Adds no visible trigger element, input, hint, or changed public copy.

### Login Page

- `src/pages/LoginPage.jsx`
  - Owns the `flaws` close sequence invocation, initial session check, login form, validation, pending guard, Supabase authentication, feedback, focus behavior, and navigation.
  - Replaces the `/login` setup-route definition in `src/App.jsx`.

### Supabase Client

- `src/lib/supabaseClient.js`
  - Remains the only module that reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  - Keeps `persistSession: true` and `autoRefreshToken: true`.
  - Exports a safe null client and configuration flag when values are missing.

### Styling

- `src/pages/LoginPage.css`
  - Owns Login layout, form fields, checking/pending states, disabled state, validation and authentication feedback, responsive behavior, focus styling, and reduced-motion handling.
  - Reuses global tokens and shared primitives rather than redefining the palette.

### Routing

- `src/App.jsx`
  - Imports `LoginPage`.
  - Registers `<Route path="/login" element={<LoginPage />} />` within `Main`.
  - Removes only the obsolete `/login` setup-route definition.
  - Retains `/back-office` until the Back Office feature replaces its placeholder.

### Public Navigation

- `src/data/navigation.js`
  - Remains unchanged unless verification discovers an accidental Login or Back Office entry.
  - Must continue exporting Home, Portfolio, Links, and Contact only.

### Supabase Operation

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: normalizedEmail,
  password,
})
```

Authentication succeeds only when `error` is absent and `data.session` exists.

## Data and Validation

### Phrase Constants

```javascript
const LOGIN_OPEN_SEQUENCE = "heaven's library"
const LOGIN_CLOSE_SEQUENCE = 'flaws'
```

- Keep these constants close to the route components or export them from a narrowly scoped module only when shared verification requires it.
- Do not expose them in rendered markup, DOM attributes, CSS generated content, storage, or telemetry.
- Their presence in public JavaScript source is expected and is not a security concern because they do not authorize access.

### Key-Sequence Hook Contract

```javascript
useKeySequence({
  sequence,
  enabled: true,
  onMatch,
})
```

Validation rules:

- `sequence` is a non-empty normalized string.
- `enabled` controls listener registration or event handling.
- `onMatch` is invoked once per full match.
- The internal buffer never exceeds `sequence.length`.
- A successful match clears the buffer before navigation.
- Ineligible targets and component cleanup clear the buffer.
- No listener or buffer survives route unmount.

### Login Form State

```javascript
const initialValues = {
  email: '',
  password: '',
}

const initialErrors = {
  email: '',
  password: '',
}
```

- Keep values only in component memory while Login is mounted.
- Never prefill committed credentials.
- Password managers may supply values through standard autocomplete behavior.
- Clear password state after failed authentication and component unmount.
- Never copy password state into feedback, logs, storage, URLs, or analytics.

### Login Status State

```javascript
{
  phase: 'checking' | 'ready' | 'pending' | 'error' | 'configuration',
  message: '',
}
```

- `checking` prevents form flash while resolving a stored session.
- `ready` exposes the operable form.
- `pending` locks duplicate authentication.
- `error` contains approved generic copy only.
- `configuration` exposes no environment details.

### Normalized Authentication Payload

```javascript
{
  email: values.email.trim(),
  password: values.password,
}
```

- Build a fresh object rather than spreading all component state.
- Do not lowercase the email or transform the password.
- Do not include remember-me, role, user ID, redirect, or metadata fields.

### Validation Contract

| Field | Required | Format | Normalization |
| --- | --- | --- | --- |
| `email` | Yes | Browser-compatible email address | Trim outer whitespace only |
| `password` | Yes | Non-empty string | None |

- Return at most one clear error per field per validation pass.
- Validate both fields together.
- Focus errors in form order: email → password.
- Issue no authentication call for invalid values.

### Authentication State Machine

| Current state | Event | Next state | Side effect |
| --- | --- | --- | --- |
| Checking | Valid stored session | Redirecting | Replace route with `/back-office` |
| Checking | No stored session | Ready | Render operable form |
| Checking | Session check fails | Error | Show safe service feedback and retry path |
| Ready/error | Submit invalid values | Error | Show field errors; no auth request |
| Ready/error | Submit valid values without configuration | Configuration | Show safe unavailable state; no request |
| Ready/error | Submit valid configured values | Pending | Lock form and issue exactly one auth request |
| Pending | Additional submit | Pending | Ignore event; issue no request |
| Pending | Valid returned session | Redirecting | Replace route with `/back-office` |
| Pending | Auth fails, throws, or lacks session | Error | Retain email, clear password, focus password |
| Any Login state | Eligible `flaws` match | Closed | Replace route with Home; do not change session |

## Authentication and Security Contract

### Session Rules

- Supabase Auth is the source of truth for administrator session state.
- The shared client persists and refreshes the session in browser-managed storage.
- Login checks for an existing session before presenting the form.
- Back Office checks session state independently before rendering private content.
- Successful password authentication must return a valid session.
- Logout is owned by Back Office and must call `supabase.auth.signOut()`.
- The `flaws` close phrase is navigation only and does not log out.

### Credential Rules

- The administrator account is pre-created in the Supabase dashboard.
- Public sign-up remains disabled.
- Real credentials never appear in tracked files or Git history.
- The password is not trimmed, transformed, logged, persisted manually, or rendered.
- Error feedback does not distinguish a nonexistent account from an incorrect password.
- The browser uses only the low-privilege public Supabase key.
- No service-role or secret key may appear in a `VITE_*` variable.

### Route Rules

- `/login` is absent from public navigation and public discovery content.
- Direct `/login` access remains technically possible and supported.
- `/back-office` is protected by authentication, not by obscurity or navigation state.
- Successful and already-authenticated Login flows use history replacement to avoid returning to the form through Back.
- Unauthenticated direct Back Office access redirects to Login without flashing private data; that behavior is completed in the Back Office feature.

### Secret Phrase Rules

- Secret phrases are discoverability gestures, not credentials.
- Anyone who reads the shipped JavaScript can discover them.
- Matching a phrase grants no Supabase role, token, session, or database permission.
- Phrase buffers remain ephemeral and route-scoped.
- Input-target exclusion prevents credential text from being interpreted as navigation commands.
- No typed phrase content is logged or transmitted.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, project CSS, and the installed `@supabase/supabase-js` v2 client.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Use React Router `useNavigate`; do not assign `window.location` for internal routes.
- Keep Login under the existing shared `Main` layout.
- Access Supabase only through `src/lib/supabaseClient.js`.
- Use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in browser code.
- Keep `.env` ignored and `.env.example` free of real values.
- Never commit a real administrator email/password combination, token, session, secret key, or service-role key.
- Use one reusable key-sequence hook for both phrases rather than duplicating document-listener logic.
- Use `event.key`, not deprecated numeric key codes.
- Store rolling buffers in refs, not rendered state.
- Do not add a dependency for keyboard sequences, authentication forms, validation, or notifications.
- Do not add public navigation entries or visible phrase hints.
- Preserve the canonical `phoenixPalette` values and approved gradient stop orders.
- Preserve lint and production build success.

## Implementation Decisions

### Interpret “No Input Box” as the Trigger Contract

The user explicitly prohibited an input box for opening and closing the hidden page, while the grading rubric requires email and password inputs for authentication. Therefore, no secret-phrase collection UI exists; the only inputs on Login are the required credential fields.

### Keep Direct URL Access

The route is “findable” through the Home phrase because it is absent from all public navigation and hints. The rubric separately requires manual URL or keyboard access, so direct `/#/login` loading remains supported.

### Use a Rolling Buffer Without a Timeout

Retaining only the final phrase-length characters allows normal prior keystrokes to fall away without storing a typing history. Omitting a timer makes the gesture reliable for slow typing and assistive input while the full phrase remains sufficiently specific.

### Ignore Credential and Interactive Targets

If Login interpreted characters typed into email or password, an ordinary credential could unexpectedly close the page. Excluding controls protects authentication entry and prevents the hidden listener from competing with standard keyboard interactions.

### Replace History When Closing or Authenticating

Closing Login with `flaws` should not leave a Back-stack entry that immediately reopens it. The same principle applies after authentication: Back should not return an authenticated administrator to the login form.

### Check Session Before Rendering the Form

The shared Supabase client persists sessions. Checking that source on mount prevents an already authenticated administrator from seeing or resubmitting the Login form and satisfies the refresh-persistence requirement.

### Keep Failures Generic

Supabase intentionally may not distinguish several password-login failure cases. Generic feedback avoids account enumeration and keeps infrastructure details out of the public interface.

### Clear Password After Failure

Retaining the email supports efficient retry, while clearing the password limits how long a failed credential remains in component memory and makes the retry action explicit.

## Acceptance Criteria

### Hidden Discovery and Routing

- [x] `/#/login` renders `LoginPage` inside the shared layout.
- [ ] Direct loading and refresh work on GitHub Pages.
- [x] Login and Back Office are absent from Header, Footer, desktop navigation, mobile navigation, Home actions, and other public links.
- [x] Home contains no trigger input, button, link, clue, tooltip, progress, or visible instruction.
- [x] Typing exact `heaven's library` on Home navigates to Login.
- [x] Matching is case-insensitive and accepts a straight or curly apostrophe.
- [x] Incomplete, misspelled, or out-of-order phrases do not navigate.
- [x] Unrelated preceding characters fall out of the rolling buffer without preventing a later complete match.
- [x] The phrase is not rendered, persisted, transmitted, or logged.

### Close Phrase

- [x] Typing `flaws` on Login with focus outside controls navigates to Home.
- [x] Matching is case-insensitive.
- [x] The close action replaces Login in browser history.
- [x] Closing does not call Supabase sign-out or modify a session.
- [x] Login has no phrase input, close button, visible clue, progress, or confirmation dialog.
- [x] Typing `flaws` inside email, password, button, or editable content does not navigate.

### Keyboard Listener Safety

- [x] Listeners exist only while their owning Home or Login component is mounted.
- [x] Cleanup removes listeners and clears buffers.
- [x] IME composition, modified shortcuts, held-key repeats, and non-character keys do not contribute.
- [x] Inputs, textareas, selects, buttons, and editable elements are excluded.
- [x] Standard browser key behavior is not prevented.
- [x] Repeated route visits do not accumulate duplicate listeners or duplicate navigation.

### Login Form and Validation

- [x] Login contains a semantic form with email, password, and one submit button.
- [x] Email uses `type="email"` and `autoComplete="username"`.
- [x] Password uses `type="password"` and `autoComplete="current-password"`.
- [x] Both fields have persistent, associated visible labels.
- [x] Empty or malformed values produce associated field errors and no auth request.
- [x] The first invalid field receives focus.
- [x] Email is trimmed; password is never trimmed or transformed.
- [x] No credentials are hard-coded, displayed, logged, or committed.

### Authentication and Session Persistence

- [x] A valid configured submission calls `supabase.auth.signInWithPassword()` exactly once.
- [x] The payload contains only the entered normalized email and unchanged password.
- [x] Pending state prevents duplicate clicks, Enter presses, touch events, and same-render submits.
- [x] A returned error or missing session is treated as failure.
- [x] A valid returned session navigates to `/#/back-office` with history replacement.
- [ ] Refreshing Back Office retains the valid session.
- [x] Visiting Login with a valid stored session redirects to Back Office without flashing the form.
- [ ] The administrator account is pre-created in Supabase and public signup is disabled.
- [x] The shared client remains responsible for session persistence and refresh.

### Failure and Configuration States

- [x] Invalid credentials show a generic, visually distinct, accessible error.
- [x] Failure copy does not reveal account existence, raw service text, URLs, keys, or tokens.
- [x] Email remains and password clears after authentication failure.
- [x] Password focus is restored for retry.
- [x] Missing Supabase configuration renders a controlled unavailable state without crashing.
- [x] Missing configuration issues no session or sign-in request and never fakes success.
- [x] `flaws` remains available during configuration and service errors.
- [x] No secret or service-role key appears in source, bundle, logs, screenshots, or Git history.

### Responsive, Accessible, and Quality

- [x] Keyboard tab order is email → password → submit.
- [x] Every control has visible focus against its actual surface.
- [x] Checking, pending, validation, error, and unavailable states are announced appropriately.
- [x] Text, labels, fields, borders, errors, disabled states, and focus indicators meet project contrast requirements.
- [x] State meaning does not depend on color, icon, fantasy terminology, or motion alone.
- [x] Motion is removed or reduced when `prefers-reduced-motion: reduce` is active.
- [ ] No horizontal overflow, clipped labels, overlapping feedback, or hidden controls appear at 320px, 768px, 769px, desktop widths, or 200% zoom.
- [x] Content clears the fixed mobile navigation at 768px and below.
- [x] Every changed file has its required format-appropriate TOC and current decision comments.
- [x] `npm run lint` succeeds.
- [x] `npm run build` succeeds with and without Supabase variables.

## Verification Plan

### Automated Checks

Run at the completed feature checkpoint:

```bash
npm run lint
npm run build
```

Run the production build once with both approved public Supabase variables and once without them. Inspect the built application for route behavior and confirm no credential or privileged key is present.

### Open-Phrase Matrix

| Home key sequence | Focus target | Expected result |
| --- | --- | --- |
| `heaven's library` | Page body | Navigate to Login |
| `HEAVEN'S LIBRARY` | Page body | Navigate to Login |
| `heaven’s library` | Page body | Navigate to Login |
| `xheaven's library` | Page body | Navigate when the rolling suffix completes |
| `heavens library` | Page body | Stay on Home |
| `heaven'slibrary` | Page body | Stay on Home |
| incomplete phrase | Page body | Stay on Home |
| canonical phrase | Input/editable target | Stay on Home |
| canonical phrase with Control/Meta/Alt | Any | Stay on Home |

### Close-Phrase Matrix

| Login key sequence | Focus target | Expected result |
| --- | --- | --- |
| `flaws` | Page body | Replace route with Home |
| `FLAWS` | Page body | Replace route with Home |
| incomplete or misspelled phrase | Page body | Stay on Login |
| `flaws` | Email input | Stay on Login; value receives text normally |
| `flaws` | Password input | Stay on Login; value receives text normally |
| `flaws` | Submit button | Stay on Login |
| `flaws` with Control/Meta/Alt | Any | Stay on Login |

### Listener Lifecycle Checks

- Visit and leave Home repeatedly; confirm one phrase produces one navigation.
- Visit and leave Login repeatedly; confirm one phrase produces one navigation.
- Confirm route unmount removes document listeners.
- Confirm an eligible phrase cannot complete across a route unmount/remount boundary.
- Confirm key buffers never appear in React DevTools state, DOM, storage, URL, console, or network traffic.
- Confirm held keys and IME composition do not create false matches.

### Validation and Authentication Matrix

| Scenario | Expected auth calls | Expected result |
| --- | ---: | --- |
| Both fields empty | 0 | Two field errors; focus email |
| Malformed email | 0 | Email error; password value remains before an auth attempt |
| Password empty | 0 | Password error; focus password |
| Missing Supabase configuration | 0 | Generic unavailable state; no crash |
| Valid credentials | 1 | Pending then redirect to Back Office |
| Invalid credentials | 1 | Generic error; email retained; password cleared |
| Rapid repeated submit | 1 | One pending request and one outcome |
| Supabase throws | 1 | Generic service error; password cleared |
| Supabase returns no error and no session | 1 | Treat as failure; do not enter Back Office |
| Existing valid session | 0 sign-in calls | Initial check redirects to Back Office |

### Session Checks

- Sign in using the pre-created administrator account through local preview.
- Confirm Back Office receives an active session.
- Refresh `/#/back-office` and confirm the session remains active.
- Navigate manually to `/#/login` and confirm redirect to Back Office.
- Close and reopen the browser according to the expected Supabase persistence policy and confirm behavior.
- Sign out through the completed Back Office feature and confirm Login no longer redirects as authenticated.
- Never record real credentials, tokens, or session contents in test notes or screenshots.

### Route and Navigation Checks

- Confirm `publicNavigation` contains Home, Portfolio, Links, and Contact only.
- Search rendered Header, Footer, mobile navigation, Home, sitemap-like content, and accessible link lists for Login or Back Office.
- Open `/#/login` directly and refresh it.
- Use browser Back after `flaws`; confirm Login does not immediately reopen.
- Use browser Back after successful sign-in; confirm Login does not reappear.
- Confirm standard public navigation remains usable from Login without advertising the route elsewhere.

### Responsive and Accessibility Checks

- Test at 320px, 768px, 769px, and a representative desktop width such as 1440px.
- Test at 200% browser zoom.
- Complete validation, failure, correction, and login flows using a keyboard only.
- Inspect heading, form, labels, autocomplete, descriptions, errors, status regions, and submit-button accessible name.
- Confirm initial checking prevents form flash for an authenticated session.
- Confirm credential typing never participates in phrase matching.
- Check representative label, input, border, error, disabled, pending, and focus color pairs for contrast.
- Test reduced-motion preference.
- Confirm the form remains logical when CSS is disabled.

### Configuration and Secret Checks

- Start without `VITE_SUPABASE_URL`; confirm controlled fallback and working `flaws` navigation.
- Start without `VITE_SUPABASE_ANON_KEY`; confirm controlled fallback and working `flaws` navigation.
- Start without both values; confirm controlled fallback.
- Build with valid low-privilege public values and test authentication.
- Search tracked files and production output for administrator passwords, access tokens, refresh tokens, secret keys, and service-role keys.
- Confirm `.env` remains ignored and `.env.example` contains examples only.
- Confirm public signup is disabled in the Supabase dashboard.

## Warnings and Known Limitations

> **:warning: Discoverability is not security:** Both phrases and `/login` are present in shipped client code and can be discovered. Only Supabase authentication, the Back Office guard, and RLS protect private messages.

> **:warning: Required direct access:** The user-facing discovery mechanism is `heaven's library`, but the grading rubric permits and requires manual URL access. Do not block `/#/login` behind phrase state or browser storage.

> **:warning: Credential-input invariant:** Secret-sequence listeners must ignore credential and editable controls. Otherwise an email or password containing `flaws` could unexpectedly close Login.

> **:warning: No visible trigger UI:** Do not add an input, button, link, hint, riddle, tooltip, progress indicator, or accessibility-only phrase instruction. The user explicitly requires direct page typing with no input box.

> **:warning: Keyboard availability:** A page-level key sequence depends on hardware-keyboard events. Touch-only visitors may not be able to discover it, but the direct hash URL remains available to the administrator and satisfies the rubric fallback.

> **:warning: Session privacy:** Supabase stores persistent session material for the browser client. Never log, copy, render, or manually persist access or refresh tokens.

> **:warning: No privileged browser key:** Never place a Supabase secret key, legacy service-role key, administrator password, or other RLS-bypassing credential in any `VITE_*` value or client file.

> **:warning: Back Office independence:** A Login redirect does not authorize private rendering by itself. Back Office must validate the active Supabase session before loading or displaying messages.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` and this specification before implementing or modifying Login.
- Treat the Module 16 grading CSV and the user's exact phrase requirements as authoritative.
- Preserve the exact canonical sequences `heaven's library` and `flaws` unless the user explicitly changes them.
- Preserve `HashRouter`; React Router paths omit the hash while deployed browser URLs include it.
- Keep Login and Back Office absent from every public navigation surface.
- Add no phrase input, visible hint, close button, or persisted unlock state.
- Keep sequence handling route-scoped, ephemeral, case-insensitive, and excluded from form controls.
- Use only the shared client from `src/lib/supabaseClient.js`.
- Never commit administrator credentials or manually persist session tokens.
- Keep password transformation and logging prohibited.
- Treat hidden-route behavior as discoverability only and preserve the independent Back Office guard.
- Add no dependencies unless a separately approved requirement makes one necessary.
- Preserve existing user work and keep unrelated edits out of this feature.
- End implementation handoffs with verification results, exact staging commands, and ready-to-run commit messages for only the files changed.
