# Feature Specification — Back Office

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
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

- **Feature name:** Back Office
- **Related area:** Protected administrator route, Supabase message retrieval, responsive table, accessible modal, confirmed deletion, logout, privacy, and security
- **Specification path:** `ai/features/back-office.feature.md`
- **Required branch:** `feature/backoffice`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing and shared layout from `ai/features/setup-deploy.feature.md` and `ai/features/header-footer.feature.md`, the `messages` schema/RLS contract from `ai/features/contact-page.feature.md`, Login/session behavior from `ai/features/login-page.feature.md`, and `src/lib/supabaseClient.js`
- **Primary user:** The authenticated site administrator

## Feature Goal

Create a protected Back Office where the authenticated administrator can review all contact messages newest first, open the full contents of a message in an accessible modal, deliberately delete a message, and fully sign out. Authentication must be verified before any private interface or message data renders, and every data operation must remain protected by Supabase Row Level Security.

After this feature is complete:

- authenticated navigation to `/#/back-office` renders the Back Office;
- the grading-path alias `/#/backoffice` replaces itself with the canonical route;
- unauthenticated access redirects to `/#/login` without flashing private content or issuing a message query;
- every returned message appears newest first in a table with Name, Email, Date, and Actions columns;
- loading, empty, fetch-error, deletion-error, authentication-error, and missing-configuration states are explicit and accessible;
- View opens a focus-managed modal containing sender name, email, date/time, and full message;
- the modal closes by its button, backdrop click, or Escape and restores focus;
- confirmed deletion removes the matching row immediately after Supabase confirms success; and
- Logout calls `supabase.auth.signOut()`, clears the session, and returns to Login.

## Feature Scope

### In Scope — Included

- Canonical React Router path `/back-office` and deployed hash URL `/#/back-office`.
- A compatibility alias from rubric path `/backoffice` to canonical `/back-office`.
- A protected-route component that withholds private UI until authentication is verified.
- Safe redirect to `/login` when no stored session exists.
- Server-backed user verification before rendering Back Office.
- Subscription to relevant Supabase authentication state changes with cleanup.
- Controlled missing-configuration and verification-error states.
- Fetching explicit `messages` columns through the shared Supabase client.
- Ordering by `created_at` descending at the database query.
- Loading, empty, success, fetch-error, deletion-error, and logout-error states.
- A semantic table with Name, Email, Date, and Actions columns.
- One row per returned message.
- A View button for each message.
- A Delete button for each message.
- An accessible full-message modal/dialog.
- Modal close button, backdrop-click close, Escape close, focus containment, and focus restoration.
- A deliberate deletion confirmation step.
- Supabase deletion filtered by the selected message's unique `id`.
- Immediate local row removal after confirmed server deletion.
- Visible Logout action using `supabase.auth.signOut()`.
- Responsive table containment, keyboard scrolling, long-content wrapping, readable dates, and 200% zoom support.
- Canonical `phoenixCodexPalette` with restrained administrative styling.
- Privacy safeguards for names, email addresses, message contents, sessions, and errors.

### Out of Scope — Excluded

- Adding Back Office or Login to Header, Footer, desktop navigation, mobile navigation, Home content, or any public link collection.
- Treating route obscurity, Login's secret phrase, React state, or navigation history as authorization.
- Rendering the table shell, message count, sender metadata, stale cached messages, or modal content before authentication verification completes.
- Public or anonymous message selection, update, or deletion.
- Message editing, replies, email sending, forwarding, archiving, marking read/unread, tagging, search, filtering, sorting controls, bulk actions, export, or analytics.
- Realtime subscriptions or automatic polling.
- Optimistic deletion before Supabase confirms success.
- Delete-by-name, delete-by-email, delete-by-date, or unfiltered deletion.
- Rendering message HTML or Markdown.
- Storing messages in local storage, session storage, IndexedDB, URLs, logs, analytics, or a second database.
- Public sign-up, multiple administrators, role-management UI, password reset, or administrator creation.
- A custom server, service-role key, secret key, Edge Function, or second backend service.
- Changes to Contact validation or the authoritative `messages` schema except a documented correction needed for this contract.
- A new table, modal, focus-trap, date, state-management, notification, or icon dependency.
- Back Office-specific AI-generated imagery; the rubric does not require it.

## Requirements Breakdown

### Requirement 1 — Canonical Route and Rubric Alias

- Replace the `/back-office` setup placeholder with the protected Back Office route.
- Treat `/back-office` as the canonical React Router path defined by `ai/ai-spec.md`.
- Add `/backoffice` only as a compatibility alias because the grading checklist uses that spelling.
- Implement the alias as `<Navigate to="/back-office" replace />`; do not mount a second Back Office instance.
- Ensure deployed URLs use `/#/back-office` and `/#/backoffice` under `HashRouter`.
- Direct loading and refreshing of both URLs must work on GitHub Pages.
- Keep both route spellings absent from all public navigation and visible discovery content.
- The alias must pass through the same authentication guard after replacement and must never reveal private content.

### Requirement 2 — Protected Route Gate

- Place an authentication gate around the canonical Back Office page.
- The gate owns these states:

  - `checking` — configuration and session verification are unresolved;
  - `authenticated` — a server-verified Supabase user exists;
  - `unauthenticated` — no stored session exists or sign-out occurs;
  - `error` — a stored session exists but verification cannot complete safely; and
  - `configuration` — the shared Supabase client is unavailable.

- Render only a non-sensitive checking state before resolution.
- Do not mount `BackOfficePage`, fetch messages, render the table, disclose message count, or preserve earlier message data while the gate is unresolved.
- Redirect unauthenticated access to `/login` with `{ replace: true }`.
- Keep verification and configuration errors inside a non-private gate screen with Retry and Sign out/return controls as appropriate.
- Never assume authentication from navigation state, a route flag, Login's secret phrase, or a previous React render.

### Requirement 3 — Session and User Verification

- Import `supabase` and `isSupabaseConfigured` from `src/lib/supabaseClient.js`.
- When configuration exists, call `supabase.auth.getSession()` to determine whether a stored session is present.
- If no session exists, redirect to `/login` before mounting Back Office.
- If a session exists, call `supabase.auth.getUser()` to verify the current user with Supabase Auth.
- Enter `authenticated` only when `getUser()` returns a user without an error.
- If a stored session exists but user verification fails, show a private-data-free retry state rather than rendering messages or entering a Login↔Back Office redirect loop.
- Provide a way to clear the unusable local session through `signOut()` and return to Login.
- Ignore stale promise results after the gate unmounts or a newer verification attempt begins.
- Do not log session objects, tokens, user IDs, email addresses, or raw authentication errors.

### Requirement 4 — Authentication State Changes

- Subscribe to `supabase.auth.onAuthStateChange()` only when configured.
- Keep the callback synchronous; do not await other Supabase operations inside it.
- On `SIGNED_OUT`, clear authenticated state and replace the route with `/login`.
- On a valid `SIGNED_IN`, `INITIAL_SESSION`, or refreshed session event, do not expose data unless the gate's verification contract has passed.
- Do not re-fetch messages unnecessarily for every token refresh.
- Unsubscribe during cleanup so repeated route visits do not accumulate listeners.
- Clear Back Office message state when authentication is lost or the component unmounts.

### Requirement 5 — Missing Configuration and Verification Failure

- Check `isSupabaseConfigured` before dereferencing the shared client.
- Render a controlled, non-sensitive unavailable state when either approved environment variable is absent.
- Do not reveal which value, URL, project, or key is missing.
- Do not issue authentication or message queries without configuration.
- Keep public navigation and a return-to-Home action usable.
- Do not fall back to mock data, local messages, hard-coded credentials, a service-role key, or fake authentication.
- When network verification fails with a stored session, show Retry and Sign out rather than private content.
- A Retry action must rerun verification without reloading the whole application.

### Requirement 6 — Message Query

- Fetch messages only after the gate enters `authenticated`.
- Use the shared authenticated Supabase client.
- Query exactly the required columns:

  ```javascript
  supabase
    .from('messages')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })
  ```

- Do not use `select('*')`.
- Treat a returned Supabase `error` as fetch failure.
- Treat a thrown request exception or non-array result as failure.
- Never mix mock, cached, or stale rows into a failed response.
- Keep the previous successful collection out of view during a full authentication loss.
- Provide a visible Retry action for fetch failure.
- Do not log complete returned rows or message contents.

### Requirement 7 — Loading, Empty, and Fetch-Error States

- Enter a loading state before the first authenticated query.
- Expose loading through visible text and an appropriate polite status region.
- Do not show an empty-state message until a successful query returns an empty array.
- Use clear empty copy such as “No messages yet.”
- Use safe fetch-error copy such as “Messages could not be loaded. Try again.”
- Make error state visually distinct without relying on color alone.
- Provide a keyboard-accessible Retry button.
- Keep Logout available when an authenticated fetch fails.
- Do not reveal raw Supabase error details, policy names, SQL, URLs, request identifiers, or tokens.
- Replace stale loading/error feedback when a retry begins or succeeds.

### Requirement 8 — Messages Table

- Render a semantic `<table>` only after a successful non-empty fetch.
- Provide a `<caption>` such as “Contact messages, newest first.”
- Render these visible column headers in this order:

  1. Name;
  2. Email;
  3. Date;
  4. Actions.

- Render one `<tr>` per message using `message.id` as the stable React key.
- Preserve the Supabase newest-first ordering in DOM and visual order.
- Render sender name and email as text; an optional `mailto:` link must not be the only way to read the email.
- Format `created_at` as a human-readable local date/time while retaining the original ISO value in `<time dateTime>` when valid.
- Render “Date unavailable” if a malformed value reaches the client; do not crash the table.
- Render View and Delete as real `<button type="button">` controls in Actions.
- Use visible action text, optionally accompanied by decorative icons.
- Do not make the entire table row clickable; explicit buttons preserve predictable table and keyboard behavior.

### Requirement 9 — Responsive Table Behavior

- Place the semantic table inside a horizontally scrollable container at narrow widths.
- Keep horizontal scrolling inside the table region so the page itself does not overflow.
- Give the scroll region an accessible name and keyboard focus when horizontal scrolling is required.
- Provide a short visible or screen-reader instruction when columns extend beyond the viewport.
- Keep table headers available and preserve table semantics.
- Allow long names and email addresses to wrap where practical without overlapping actions.
- Keep View and Delete targets usable at 320px, 768px, 769px, desktop widths, and 200% zoom.
- Do not hide required columns on mobile.
- Do not visually reorder rows or columns away from their semantic order.
- Reserve enough page space for shared mobile navigation at 768px and below.

### Requirement 10 — View Message Modal

- Open the modal from the row's explicit View button.
- Store the selected message by stable `id` or object reference from the current message collection.
- Render a modal with `role="dialog"`, `aria-modal="true"`, and programmatic label/description relationships, or use a native `<dialog>` with equivalent tested behavior.
- Display:

  - sender name;
  - sender email;
  - full date and time;
  - full message text; and
  - a visible Close button.

- Render message content as escaped text; never use `dangerouslySetInnerHTML`.
- Preserve user-authored line breaks with CSS such as `white-space: pre-wrap`.
- Wrap long unbroken content so it cannot force viewport overflow.
- Do not truncate the full message inside the modal.
- Do not add reply, edit, or delete controls inside this modal unless separately approved.

### Requirement 11 — Modal Focus and Close Behavior

- Record the View button that opened the modal.
- On open, move focus to the modal heading, Close button, or another deliberate initial target.
- Keep Tab and Shift+Tab within the modal while it is open.
- Prevent pointer and keyboard interaction with background content while modal.
- Close when the visible Close button is activated.
- Close when Escape is pressed.
- Close when the backdrop itself is clicked.
- Do not close when content inside the dialog is clicked; require `event.target === event.currentTarget` or equivalent backdrop detection.
- On close, restore focus to the original View button when it still exists, otherwise choose a logical nearby fallback.
- Lock background scrolling while open and restore the prior overflow state during close/unmount.
- Remove all modal listeners and effects during cleanup.

### Requirement 12 — Deliberate Delete Flow

- Open a separate confirmation dialog from the row's Delete button.
- Identify the selected message by sender name and/or date without displaying its entire private body unnecessarily.
- Use clear copy asking whether the administrator wants to permanently delete the message.
- Provide distinct Cancel and “Delete message” buttons.
- Default focus to Cancel or another non-destructive action.
- Support Escape, backdrop click, focus containment, and opener-focus restoration consistently with the message modal.
- Do not delete when the initial row button is pressed, when Cancel is pressed, or when the confirmation backdrop closes.
- Do not use ambiguous labels such as “OK.”
- Allow only one deletion request at a time.

### Requirement 13 — Supabase Delete Operation

- Delete only after explicit confirmation.
- Filter by the exact selected message UUID:

  ```javascript
  supabase
    .from('messages')
    .delete()
    .eq('id', selectedMessage.id)
    .select('id')
    .single()
  ```

- Never issue an unfiltered delete.
- Request the deleted `id` so the client can distinguish a confirmed deletion from a zero-row result.
- Treat a returned error, thrown exception, missing returned row, or mismatched returned `id` as failure.
- Disable confirmation controls and show “Deleting…” while pending.
- Prevent repeated click, Enter, touch, or same-render events from issuing duplicate delete calls.
- Keep the row and confirmation context when deletion fails.
- Show safe retryable error copy without exposing raw database information.
- After confirmed success, filter that `id` from local message state immediately and close the confirmation dialog.
- If the final message is deleted, render the empty state without issuing a required refetch.

### Requirement 14 — Logout

- Render a visible Logout button in the Back Office heading/action area.
- Use `<button type="button">`; Logout is an action, not a route link.
- On activation, enter a pending state and call `supabase.auth.signOut()` exactly once.
- Disable repeated logout attempts while pending and show “Signing out…” text.
- On success, clear selected-message/dialog state and replace the route with `/login`.
- Confirm no Supabase session remains through integration testing.
- Authentication-state handling must also prevent any private UI from remaining after sign-out.
- If sign-out returns an error or throws, remain on the protected page, restore the button, and show safe retryable feedback.
- Do not manually delete arbitrary local-storage keys, because the shared Supabase client owns its session storage contract.
- Do not render or log tokens, session objects, raw errors, or administrator credentials.

### Requirement 15 — Data Privacy and Rendering Safety

- Treat sender names, email addresses, message bodies, timestamps, and administrator identity as private data.
- Never render any of them before authentication verification.
- Never place private data in route state, query strings, document titles, metadata, logs, analytics, screenshots intended for public sharing, or persistent browser storage.
- Render all database text through normal React text interpolation.
- Do not use raw HTML insertion, Markdown parsing, URL auto-linking, or code execution for message bodies.
- Clear private state on sign-out and unmount.
- Keep service failures generic in the UI.
- Use only the low-privilege public Supabase client; RLS decides which authenticated operations are permitted.

### Requirement 16 — RLS and Authorization Alignment

- Keep the Contact-owned `public.messages` schema unchanged:

  - `id` UUID primary key;
  - `name` text;
  - `email` text;
  - `message` text; and
  - `created_at` timestamp with time zone.

- Keep Row Level Security enabled.
- Keep anonymous access limited to valid `INSERT`.
- Keep anonymous `SELECT`, `UPDATE`, and `DELETE` unavailable.
- Keep authenticated `SELECT` and `DELETE` policies aligned with this Back Office workflow.
- Keep public signup disabled so arbitrary visitors cannot acquire the `authenticated` role.
- Do not add browser-visible service-role or secret credentials to bypass policies.
- Verify authorization using both signed-out and signed-in clients before release.
- Route checks and RLS must both pass; neither substitutes for the other.

### Requirement 17 — Visual Design and Accessibility

- Use the exact canonical `phoenixCodexPalette` tokens and shared CSS custom properties from `ai/ai-spec.md`.
- Use warm-ivory/parchment surfaces, ink text, and quiet portal-blue framing. Magical
  accents remain decorative and never carry destructive, success, or error meaning.
- Use explicit text and icons for success, error, empty, delete, and logout states; do not rely on color alone.
- Keep table text, modal text, buttons, status copy, and focus indicators on surfaces with verified contrast.
- Use one page-level `<h1>` and logical modal headings.
- Make every action keyboard operable with visible focus.
- Use live regions intentionally for loading, fetch error, deletion error, and logout status.
- Respect `prefers-reduced-motion` for modal entrances, row removal, and button effects.
- Keep private content readable and operable without decorative motion.

### Requirement 18 — File Documentation and Handoff

- Every created or modified Markdown file must have a linked Table of Contents near the top.
- Every created or modified comment-capable source file must open with an accurate comments-based TOC.
- Add why-comments for authentication gates, explicit columns, sorting, private rendering, delete confirmation, focus restoration, and logout handling.
- Use `// :warning:` for material security limitations and cross-system invariants, including RLS, route gating, unfiltered deletes, and message privacy.
- Keep comments current when route, schema, modal, or session behavior changes.
- At implementation handoff, report verification and provide exact staging commands and ready-to-run commit messages for only the files changed.

## Approved Interface Copy

### Page and Status Copy

- **Page heading:** Message Back Office
- **Supporting text:** Review and manage messages submitted through the portfolio contact form.
- **Authentication check:** Verifying administrator access…
- **Authentication error:** Administrator access could not be verified. Try again or sign out.
- **Configuration error:** The Back Office is temporarily unavailable.
- **Loading messages:** Loading messages…
- **Empty state:** No messages yet.
- **Fetch error:** Messages could not be loaded. Try again.
- **Delete error:** This message could not be deleted. Try again.
- **Logout error:** Sign out could not be completed. Try again.

### Table Copy

- **Caption:** Contact messages, newest first
- **Headers:** Name, Email, Date, Actions
- **View action:** View
- **Delete action:** Delete
- **Narrow-table instruction:** Scroll horizontally to review every message column.
- **Invalid date fallback:** Date unavailable

### Message Modal Copy

- **Heading:** Message from {sender name}
- **Email label:** Email
- **Date label:** Received
- **Message label:** Message
- **Close action:** Close

The sender name is database content and must be rendered as text, never HTML.

### Delete Confirmation Copy

- **Heading:** Delete message?
- **Prompt:** Permanently delete the message from {sender name}? This action cannot be undone.
- **Cancel action:** Cancel
- **Confirm action:** Delete message
- **Pending action:** Deleting…

### Logout Copy

- **Idle action:** Log out
- **Pending action:** Signing out…

## User Flow and Expected Behavior

### Authenticated Entry Flow

1. The administrator opens `/#/back-office` or arrives after successful Login.
2. The protected gate renders only “Verifying administrator access…”
3. The shared client confirms a stored session and verifies the current user.
4. The gate enters authenticated state and mounts Back Office.
5. Back Office enters message-loading state and runs the ordered query.
6. A non-empty result renders the semantic message table newest first.

### Rubric Alias Flow

1. The administrator or grader opens `/#/backoffice`.
2. React Router replaces the alias with `/#/back-office`.
3. The canonical authentication gate runs normally.
4. No second page instance, duplicate query, or private-content flash occurs.

### Unauthenticated Entry Flow

1. A signed-out visitor opens either Back Office URL.
2. The gate checks configuration and session state.
3. No session exists.
4. The route is replaced with `/#/login`.
5. Back Office never mounts and no `messages` request occurs.

### Verification-Failure Flow

1. A stored session exists but server-backed user verification fails.
2. The gate renders no Back Office component or private content.
3. A safe error offers Retry and Sign out.
4. Retry starts a new verification attempt.
5. Sign out clears the unusable session and returns to Login.

### Empty Collection Flow

1. Authentication passes and the messages query succeeds with `[]`.
2. Loading ends.
3. “No messages yet.” appears in a status/empty region.
4. The table is not rendered with an empty body.
5. Logout remains available.

### Fetch-Failure Flow

1. Authentication passes but the query returns an error or throws.
2. Loading ends and no stale/private rows render.
3. Safe error feedback and Retry appear.
4. Logout remains available.
5. Retry reruns the exact ordered explicit-column query.

### View Message Flow

1. The administrator activates a row's View button.
2. The application records the opener and selected message.
3. The modal opens and moves focus inside.
4. Name, email, full date/time, and complete message text render.
5. Tab and Shift+Tab stay within the dialog.
6. Close, Escape, or backdrop click closes it.
7. Focus returns to the originating View button.

### Confirmed Delete Flow

1. The administrator activates a row's Delete button.
2. A confirmation dialog opens with Cancel focused.
3. The administrator activates “Delete message.”
4. The dialog enters pending state and exactly one ID-filtered delete runs.
5. Supabase returns the matching deleted ID without error.
6. The application filters that ID from local state immediately.
7. The dialog closes and focus moves to a logical neighboring action or table heading because the opener row no longer exists.
8. If no rows remain, the empty state appears.

### Delete-Failure Flow

1. The confirmed delete returns an error, throws, or does not return the selected ID.
2. The dialog exits pending state but remains open.
3. The original row remains in the table.
4. Safe error feedback is announced.
5. The administrator may Cancel or retry.

### Logout Flow

1. The administrator activates Log out.
2. The action enters pending state and calls `supabase.auth.signOut()` once.
3. Supabase clears the session and emits signed-out state.
4. Private selection and message state clear.
5. The route is replaced with `/#/login`.
6. Browser Back cannot restore an authenticated Back Office view.

## Interfaces

### Protected Route

- `src/components/RequireSession.jsx`
  - Owns configuration checks, stored-session detection, server-backed user verification, auth-state subscription, non-private checking/error states, cleanup, and unauthenticated redirect.
  - Renders an `<Outlet />` only after verification succeeds.

### Back Office Page

- `src/pages/BackOfficePage.jsx`
  - Owns page composition, ordered message fetch, loading/error/empty/table states, selected message, delete confirmation, immediate post-delete state update, and logout.
  - Does not render unless nested under `RequireSession`.

### Message Dialog

- `src/components/MessageDialog.jsx`
  - Renders sender name, email, full date/time, full message, and Close.
  - Owns dialog semantics, focus containment, Escape/backdrop behavior, scroll locking, and opener-focus restoration.

### Delete Confirmation Dialog

- `src/components/DeleteMessageDialog.jsx`
  - Renders deliberate confirmation, pending/error state, Cancel, and Delete message controls.
  - Reuses the same tested dialog focus and dismissal principles without exposing the full message body.

### Optional Dialog Hook

- `src/hooks/useModalDialog.js`
  - May centralize focus containment, Escape handling, backdrop coordination, scroll restoration, and opener-focus restoration when doing so prevents duplicated security/accessibility logic.

Do not extract a generic hook if it obscures ownership or makes the two dialog behaviors harder to verify.

### Supabase Client

- `src/lib/supabaseClient.js`
  - Remains the only module that reads the approved public environment variables.
  - Supplies persistent authentication and authenticated PostgREST requests.
  - Must remain safely nullable when configuration is absent.

### Styling

- `src/pages/BackOfficePage.css`
  - Owns protected-state layout, page actions, status states, responsive table region, table hierarchy, modal/backdrop, confirmation state, focus treatments, reduced-motion handling, and mobile behavior.
  - Reuses global tokens and shared primitives rather than redefining the palette.

### Routing

- `src/App.jsx`
  - Imports `RequireSession`, `BackOfficePage`, and `Navigate`.
  - Registers canonical Back Office beneath the authentication gate.
  - Registers `/backoffice` as a replacement alias only.
  - Removes the obsolete `/back-office` setup-route definition.

Recommended route shape:

```jsx
<Route element={<RequireSession />}>
  <Route path="/back-office" element={<BackOfficePage />} />
</Route>
<Route path="/backoffice" element={<Navigate to="/back-office" replace />} />
```

### Public Navigation

- `src/data/navigation.js`
  - Remains Home, Portfolio, Links, and Contact only.
  - Must not add Login, Back Office, or the alias.

## Data and Validation

### Message Record Shape

```javascript
{
  id: '2f6bf8d9-75b7-41f3-8451-3a28daf79579',
  name: 'Example Sender',
  email: 'sender@example.com',
  message: 'Full message text stored by the Contact form.',
  created_at: '2026-08-05T14:30:00.000Z',
}
```

Validation and rendering rules:

- `id` is the stable React key and only deletion filter.
- `name`, `email`, and `message` render as escaped text.
- `created_at` is preserved as received and formatted for display.
- A malformed date renders the approved fallback instead of throwing.
- Missing required fields indicate a data-contract failure; do not invent replacements that could target the wrong row.
- Never use an array index, sender email, or timestamp as the React key.

### Page State Shape

```javascript
{
  phase: 'loading' | 'ready' | 'empty' | 'error',
  messages: [],
  selectedMessage: null,
  pendingDeleteMessage: null,
  deletingId: null,
  deleteError: '',
  isSigningOut: false,
  logoutError: '',
}
```

- Keep private message data only in mounted component memory.
- `selectedMessage` controls the full-message modal.
- `pendingDeleteMessage` controls confirmation independently.
- `deletingId` is both a rendered pending state and paired with a synchronous guard.
- Clear private state on sign-out and unmount.
- Keep raw Supabase errors out of renderable state.

### Authentication Gate State

```javascript
{
  phase: 'checking' | 'authenticated' | 'unauthenticated' | 'error' | 'configuration',
  message: '',
}
```

- Only `authenticated` mounts the nested route.
- Other phases contain no message rows or sender metadata.
- `error` allows verification retry without trusting the stored session.
- `unauthenticated` replaces the route with Login.

### Message Query Contract

```javascript
const { data, error } = await supabase
  .from('messages')
  .select('id, name, email, message, created_at')
  .order('created_at', { ascending: false })
```

- Table name and column spelling are exact.
- Server ordering is authoritative.
- A successful empty array maps to empty state.
- Errors and non-array results map to fetch-error state.
- No query starts before authentication verification.

### Delete Contract

```javascript
const { data, error } = await supabase
  .from('messages')
  .delete()
  .eq('id', pendingDeleteMessage.id)
  .select('id')
  .single()
```

Deletion succeeds only when:

- `error` is absent;
- `data` exists;
- `data.id` equals `pendingDeleteMessage.id`; and
- the active deletion guard still refers to that same ID.

After success:

```javascript
setMessages((currentMessages) =>
  currentMessages.filter((message) => message.id !== data.id),
)
```

Never remove the row before these success conditions pass.

### Date Formatting Contract

- Parse `created_at` into a `Date` only for display.
- Confirm `Number.isNaN(date.getTime()) === false` before formatting.
- Use one stable `Intl.DateTimeFormat` configuration for table and modal.
- The table may use a concise local date/time.
- The modal uses a complete local date and time, including time-zone name when practical.
- Keep the original ISO value in the `<time dateTime>` attribute.
- Do not claim the displayed time is in the sender's time zone.

### Page State Machine

| Current state | Event | Next state | Side effect |
| --- | --- | --- | --- |
| Gate checking | No stored session | Redirecting | Replace route with Login; no message query |
| Gate checking | Verified user | Loading | Mount page and issue ordered message query |
| Gate checking | Verification fails | Gate error | Render Retry/Sign out; no private data |
| Loading | Query returns rows | Ready | Render newest-first table |
| Loading | Query returns `[]` | Empty | Render “No messages yet.” |
| Loading | Query fails | Error | Render safe error and Retry |
| Ready | View selected | Ready + modal | Open full-message modal |
| Ready | Delete selected | Ready + confirmation | Open non-destructive confirmation |
| Confirmation | Cancel/Escape/backdrop | Ready | Close without request |
| Confirmation | Confirm delete | Deleting | Lock deletion and issue ID-filtered request |
| Deleting | Confirmed matching ID | Ready/Empty | Filter row and close dialog |
| Deleting | Delete fails | Confirmation error | Preserve row and dialog; allow retry/cancel |
| Authenticated | Logout | Signing out | Lock button and call `signOut()` once |
| Signing out | Success/SIGNED_OUT | Redirecting | Clear private state and replace with Login |
| Signing out | Failure | Prior page state | Preserve access, show safe retryable error |

## Authentication and Security Contract

### Route Gate Invariants

- Back Office components never mount before verified authentication.
- No message query begins before the gate passes.
- No private content flashes during refresh, direct entry, alias replacement, sign-out, expiration, or verification error.
- Authentication comes from Supabase, not route location or Login history.
- `onAuthStateChange` cleanup prevents stale listeners.
- Back Office redirects use history replacement.

### RLS Invariants

- `public.messages` has RLS enabled.
- `anon` can insert valid messages only.
- `anon` cannot select, update, or delete messages.
- `authenticated` can select and delete according to the documented policies.
- `authenticated` cannot update messages.
- Public signup remains disabled so only the provisioned administrator receives authenticated access.
- A route guard and RLS are both mandatory.

### Privacy Invariants

- Names, emails, messages, timestamps, user identity, and session contents are private.
- Private values exist only in authenticated component memory and Supabase.
- No private values enter logs, analytics, URLs, document metadata, screenshots for public submission, or browser persistence outside Supabase-owned session storage.
- Message bodies render only as text.
- Raw service errors never render publicly.
- State clears on sign-out and unmount.

### Delete Invariants

- A delete always requires explicit confirmation.
- A delete always filters by one exact UUID.
- A delete never uses mutable sender fields as identity.
- A row disappears only after Supabase returns the matching deleted ID.
- Duplicate delete requests are blocked.
- Failed deletion preserves the row and context.

### Logout Invariants

- Logout calls the shared client's `supabase.auth.signOut()`.
- A successful logout clears the session and private in-memory state.
- Signed-out state cannot continue rendering Back Office.
- Browser Back does not restore a private authenticated screen.
- Failed logout does not falsely claim the session is cleared.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, project CSS, and the installed `@supabase/supabase-js` v2 client.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Use `/back-office` as canonical and `/backoffice` as a redirect alias only.
- Access Supabase only through `src/lib/supabaseClient.js`.
- Use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in browser code.
- Keep `.env` ignored and never commit real credentials or privileged keys.
- Use explicit column selection and server-side descending order.
- Use exact UUID equality for deletion and never issue an unfiltered delete.
- Use React text rendering; do not add an HTML sanitizer because HTML messages are prohibited.
- Do not add a table, modal, focus-trap, date, icon, or state-management dependency.
- Do not introduce Realtime, polling, caching, local persistence, or another backend.
- Keep Login and Back Office absent from public navigation.
- Preserve the Contact-owned schema and RLS contract.
- Preserve the canonical `phoenixCodexPalette` values and warm-surface hierarchy.
- Preserve lint and production build success.

## Implementation Decisions

### Support Both Route Spellings Without Duplication

The grading sheet names `/backoffice`, while the approved global architecture names `/back-office`. A replacement alias satisfies both sources while keeping one canonical URL, one protected component, and one data-fetch lifecycle.

### Verify the User Before Mounting Private UI

A stored session indicates likely authentication, but server-backed `getUser()` verification provides stronger confirmation. Keeping the gate outside `BackOfficePage` guarantees that neither the component nor its query can run during unresolved access.

### Show a Gate Error Instead of Redirecting on Verification Network Failure

Redirecting a stored session to Login can create a loop because Login may see the same persisted session and send the administrator back. A non-private Retry/Sign out state avoids both data exposure and redirect churn.

### Use Explicit View Buttons

The rubric permits row click or a View button. Explicit buttons preserve semantic table behavior, provide reliable focus restoration, and avoid making a complex table row act like an undocumented interactive control.

### Query Explicit Columns Newest First

Selecting only the required fields reduces accidental data exposure if the schema expands. Database ordering makes the rubric's newest-first rule explicit and avoids inconsistent client sorting of timestamp strings.

### Confirm Before Deleting

Deletion cannot be undone through this interface. A dedicated confirmation step makes intent explicit and prevents accidental activation from a densely packed table.

### Remove a Row Only After Confirmed Deletion

Optimistic removal would briefly claim success and require rollback if RLS or the network rejects the operation. Requesting the deleted ID and then filtering local state produces immediate UI update after authoritative confirmation.

### Render Message Bodies as Plain Text

Contact messages are untrusted user input. React's ordinary text escaping plus preserved line breaks displays the message faithfully without creating an HTML or script execution surface.

### Redirect Logout to Login

The rubric permits Home or Login. Login is the consistent unauthenticated destination for this protected route, and its existing `flaws` phrase still lets the administrator return Home without adding a Back Office navigation link.

## Acceptance Criteria

### Routes and Protection

- [x] `/#/back-office` resolves to the canonical protected Back Office route.
- [x] `/#/backoffice` replaces itself with `/#/back-office` and uses the same gate.
- [ ] Direct loading and refresh work locally and on GitHub Pages.
- [x] Login and both Back Office spellings are absent from all public navigation and visible discovery content.
- [x] No private page component, message count, table shell, row, modal, or query appears before authentication verification.
- [x] No stored session redirects to Login with history replacement.
- [x] A stored session plus verified user mounts Back Office.
- [x] Verification failure renders only a non-private Retry/Sign out state.
- [x] Repeated visits do not accumulate auth listeners.

### Message Fetch and States

- [x] Message fetching begins only after verified authentication.
- [x] The query targets `messages` and selects exactly `id, name, email, message, created_at`.
- [x] The query orders `created_at` descending.
- [x] A loading state appears while the request is unresolved.
- [x] A successful empty array shows “No messages yet.” and no empty table.
- [x] A failed or thrown query shows safe error feedback and Retry.
- [x] Retry reruns the exact ordered query.
- [x] Raw errors and private rows are not logged.

### Table

- [x] A successful non-empty response renders a semantic table.
- [x] The table has a descriptive caption.
- [x] Visible headers appear as Name, Email, Date, and Actions.
- [x] Each returned message produces exactly one row keyed by `id`.
- [x] DOM and visual order remain newest first.
- [x] Valid dates render readably with their source ISO value in `<time>`.
- [x] Invalid dates render “Date unavailable” without crashing.
- [x] Every row has visible View and Delete buttons.
- [x] The entire row is not made clickable.

### Message Modal

- [x] View opens the selected message in a modal dialog.
- [x] The dialog displays sender name, email, full date/time, and complete message text.
- [x] Message content renders as escaped text with line breaks preserved.
- [x] The modal has a visible Close button.
- [x] Close button, Escape, and backdrop click close the modal.
- [x] Clicking inside dialog content does not close it.
- [x] Focus moves into the modal, remains contained, and returns to the opening View button.
- [x] Background interaction and scrolling are blocked while modal.

### Delete

- [x] Delete opens a confirmation dialog and performs no immediate data operation.
- [x] Cancel, Escape, and backdrop close confirmation without deletion.
- [x] Confirmation starts exactly one deletion request.
- [x] The request filters by the selected message's exact `id`.
- [x] No unfiltered or mutable-field delete path exists.
- [x] Pending state prevents duplicate delete events.
- [x] Failure preserves the row and shows safe retryable feedback.
- [x] Success requires the matching returned deleted ID.
- [x] Confirmed success removes the row from local state immediately and closes confirmation.
- [x] Deleting the final row transitions to the empty state.

### Logout and Session Loss

- [x] A visible Log out button appears on Back Office.
- [x] Activating it calls `supabase.auth.signOut()` exactly once.
- [x] Pending state prevents duplicate sign-out events.
- [x] Successful logout clears private state and replaces the route with Login.
- [ ] Refresh and browser Back cannot restore authenticated Back Office content after logout.
- [x] External session loss redirects to Login without private-data flash.
- [x] Sign-out failure preserves the protected page and shows safe retryable feedback.

### Security and RLS

- [x] Missing Supabase configuration renders a controlled non-private state and issues no request.
- [ ] RLS remains enabled on `public.messages`.
- [ ] Anonymous access can insert but cannot select, update, or delete messages.
- [ ] Authenticated administrator access can select and delete messages.
- [ ] Public signup is disabled.
- [x] No service-role key, secret key, administrator credential, token, session object, or complete message appears in tracked files, logs, screenshots, or public output.
- [x] Message text never enters raw HTML, Markdown, or code execution.
- [ ] Route gating and RLS both pass independently.

### Responsive, Accessible, and Quality

- [x] The table remains semantic and usable in a labeled horizontal scroll region at narrow widths.
- [x] Required columns remain available on mobile.
- [x] Dialogs expose correct labels, modal semantics, focus containment, and focus restoration.
- [x] All actions work by keyboard and have visible focus.
- [x] Loading, empty, error, pending-delete, delete-error, pending-logout, and logout-error states are announced appropriately.
- [x] Text, table borders, buttons, destructive states, errors, disabled states, overlays, and focus indicators meet project contrast requirements.
- [x] Meaning does not depend on color, icon, motion, hover, or position alone.
- [x] Motion is removed or reduced when `prefers-reduced-motion: reduce` is active.
- [ ] No page-level horizontal overflow, clipped controls, inaccessible table content, or modal overflow appears at 320px, 768px, 769px, desktop widths, or 200% zoom.
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

Run the production build once with valid low-privilege public Supabase values and once without them. Inspect built output and tracked files for private data or privileged credentials.

### Route and Gate Matrix

| Scenario | Expected message queries | Expected result |
| --- | ---: | --- |
| Signed out → `/#/back-office` | 0 | Replace with Login; no private flash |
| Signed out → `/#/backoffice` | 0 | Alias then Login; no private flash |
| Missing configuration | 0 | Non-private unavailable state |
| Stored session, verification pending | 0 | Checking state only |
| Stored session, verification network failure | 0 | Retry/Sign out gate error |
| Valid verified user → canonical route | 1 | Load Back Office messages |
| Valid verified user → alias | 1 | Canonicalize then load once |
| Auth state becomes signed out | 0 further | Clear private state and replace with Login |

### Message Query Matrix

| Query outcome | Expected display |
| --- | --- |
| Pending | “Loading messages…” status |
| Successful `[]` | “No messages yet.”; no table |
| One row | One newest-first table row |
| Multiple rows | One row each, descending `created_at` |
| Returned Supabase error | Safe fetch error and Retry |
| Thrown exception | Safe fetch error and Retry |
| Non-array data | Safe fetch error; no malformed table |
| Malformed `created_at` | Row remains with “Date unavailable” |

### Seeded Integration Dataset

Create at least three temporary messages through the Contact form or an authorized test workflow with distinct timestamps:

- an older short message;
- a newer multi-line message; and
- a newest message containing long unbroken text and characters that resemble HTML.

Then verify:

- all three appear;
- newest appears first;
- HTML-like characters render as text;
- line breaks remain in the full-message modal;
- long text wraps without page or modal overflow; and
- temporary rows are removed through the tested delete flow after verification.

Never use real private correspondence in screenshots or committed test artifacts.

### Modal Interaction Matrix

| Interaction | Expected result |
| --- | --- |
| Activate View | Correct message opens; focus moves inside |
| Tab past final focusable element | Focus wraps to first modal control |
| Shift+Tab before first control | Focus wraps to final modal control |
| Activate Close | Modal closes; focus returns to View |
| Press Escape | Modal closes; focus returns to View |
| Click backdrop | Modal closes; focus returns to View |
| Click dialog content | Modal remains open |
| Attempt background interaction | Background remains inert/unavailable |
| Open another message | Correct new content and opener are used |

### Delete Matrix

| Scenario | Expected delete calls | Expected result |
| --- | ---: | --- |
| Click row Delete | 0 | Confirmation opens with Cancel focused |
| Cancel/Escape/backdrop | 0 | Close confirmation; row remains |
| Confirm once | 1 | Pending state; ID-filtered request |
| Confirm rapidly | 1 | Duplicate events ignored |
| Supabase returns matching ID | 1 | Row disappears immediately; dialog closes |
| Supabase returns error | 1 | Row remains; safe error; retry available |
| Supabase returns no row/wrong ID | 1 | Treat as failure; row remains |
| Delete final row successfully | 1 | Empty state appears |

Inspect the network request or mocked client call to prove `.eq('id', selectedId)` exists. Test code must fail if deletion is unfiltered.

### Logout Matrix

| Scenario | Expected sign-out calls | Expected result |
| --- | ---: | --- |
| Activate Log out | 1 | Pending state then Login on success |
| Activate repeatedly while pending | 1 | Duplicate events ignored |
| `signOut()` returns error | 1 | Protected page remains; safe retry feedback |
| `signOut()` throws | 1 | Protected page remains; safe retry feedback |
| External `SIGNED_OUT` event | N/A | Private state clears and Login replaces route |
| Browser Back after success | 0 | No authenticated message content returns |

### RLS and Authorization Checks

- While signed out, attempt `SELECT`, `UPDATE`, and `DELETE` on `messages`; confirm denial or no accessible rows.
- While signed out, confirm Contact can still insert a valid message.
- While signed in as the administrator, confirm ordered `SELECT` succeeds.
- While signed in as the administrator, confirm one ID-filtered `DELETE` succeeds.
- Confirm authenticated `UPDATE` remains unavailable.
- Confirm public signup is disabled.
- Confirm no browser bundle contains a secret or service-role key.
- Sign out, refresh both Back Office routes, and confirm zero message requests and zero private-data flashes.

### Responsive and Accessibility Checks

- Test at 320px, 768px, 769px, and a representative desktop width such as 1440px.
- Test at 200% browser zoom.
- Verify table-region keyboard scrolling without page-level overflow.
- Complete View, modal close, Delete, Cancel, confirmed deletion, Retry, and Logout using a keyboard only.
- Inspect page heading, table caption/headers, buttons, status regions, dialogs, descriptions, destructive labels, and accessible names.
- Confirm both dialogs trap and restore focus correctly.
- Confirm long email, name, date, and message values wrap or scroll without overlap.
- Check representative table, button, modal, overlay, error, destructive, disabled, and focus color pairs for contrast.
- Test reduced-motion preference.
- Confirm source order remains logical when CSS is disabled.

### Configuration and Privacy Checks

- Start without `VITE_SUPABASE_URL`; confirm no private component or request.
- Start without `VITE_SUPABASE_ANON_KEY`; confirm no private component or request.
- Start without both; confirm controlled unavailable state.
- Search DOM, URLs, document title, console, local/session storage, logs, and network request metadata for unintended message copies.
- Confirm Supabase-owned session storage contains no manually duplicated application token.
- Search tracked files and production output for administrator passwords, secret keys, service-role keys, access tokens, refresh tokens, and real `.env` content.

## Warnings and Known Limitations

> **:warning: Route spelling discrepancy:** The rubric uses `/backoffice`, while the Global AI Spec uses `/back-office`. Preserve the canonical hyphenated route and its replacement alias until grading is complete.

> **:warning: Route hiding is not security:** Both URLs are discoverable in shipped code. Authentication verification and Supabase RLS—not route names or Login's secret phrase—protect messages.

> **:warning: No private-data flash:** Never mount Back Office or retain message state while authentication is checking, missing, failed, signed out, or expired.

> **:warning: RLS is mandatory:** The browser key is public. Anonymous message privacy depends on RLS and least-privilege grants remaining synchronized with Contact, Login, and Back Office.

> **:warning: Unfiltered delete prohibition:** Every delete must include `.eq('id', selectedMessage.id)`. Removing or weakening that filter can delete multiple private records.

> **:warning: Authenticated-policy scope:** The current schema grants authenticated users message read/delete access. Public signup must remain disabled so unapproved visitors cannot acquire that role.

> **:warning: Personal correspondence:** Names, emails, timestamps, and messages may contain sensitive data. Never log, cache, persist, or include them in public screenshots and submission artifacts.

> **:warning: Message volume:** A single Supabase select may be limited by the project's configured maximum returned rows. The required portfolio workload is expected to stay below that limit; if it does not, add an approved paginated all-messages design before claiming every row is displayed.

> **:warning: Logout success:** Do not navigate as though logout succeeded when `signOut()` returns an error. The protected gate must continue enforcing the actual session state.

## Notes for AI and Contributors

- Read `ai/ai-spec.md`, `ai/features/contact-page.feature.md`, `ai/features/login-page.feature.md`, and this specification before implementing or modifying Back Office.
- Treat the Module 16 grading CSV as final authority and preserve both route spellings as specified.
- Preserve `HashRouter`; React Router paths omit the hash while deployed browser URLs include it.
- Keep Login and Back Office absent from all public navigation.
- Never render or query private messages before verified authentication.
- Use only the shared client from `src/lib/supabaseClient.js`.
- Keep the exact `messages` schema synchronized with Contact.
- Preserve server-side newest-first ordering and explicit selected columns.
- Preserve modal focus containment, Escape/backdrop close, and opener-focus restoration.
- Preserve deliberate confirmation and exact-ID filtering for deletion.
- Render all message content as escaped text.
- Clear private state after authentication loss and logout.
- Never commit administrator credentials, private messages, tokens, secret keys, service-role keys, or real `.env` values.
- Add no dependencies unless a separately approved requirement makes one necessary.
- Preserve existing user work and keep unrelated edits out of this feature.
- End implementation handoffs with verification results, exact staging commands, and ready-to-run commit messages for only the files changed.
