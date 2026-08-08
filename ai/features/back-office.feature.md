# Feature Specification — Protected Back Office

## Table of Contents

- [Goal](#goal)
- [Route Protection](#route-protection)
- [Authentication Events](#authentication-events)
- [Message Query](#message-query)
- [Page States](#page-states)
- [Message Inspection](#message-inspection)
- [Deletion](#deletion)
- [Logout](#logout)
- [Security and Privacy](#security-and-privacy)
- [Accessibility and Responsive Behavior](#accessibility-and-responsive-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Give the authenticated administrator a private, accessible interface for reviewing and
deleting Contact submissions. Route protection and database RLS operate independently so
neither a hidden URL nor client presentation can expose private rows.

## Route Protection

`/back-office` is nested beneath `RequireSession` and absent from public navigation,
Footer links, calls to action, metadata discovery, and public content.

Before mounting `BackOfficePage`, the guard:

1. verifies Supabase configuration;
2. calls `auth.getSession()`;
3. redirects to Login when no session exists;
4. calls server-backed `auth.getUser()` for an existing session; and
5. renders the nested route only when a valid user is returned.

Checking, configuration, verification-error, unauthenticated, and authenticated states
are explicit. A verification error offers Try Again and Sign Out without requesting
private messages. Stale async checks are invalidated through version and mounted guards.

## Authentication Events

The guard subscribes to `onAuthStateChange`:

- `SIGNED_OUT` immediately removes private UI and replaces the route with `/login`;
- `SIGNED_IN` re-runs verification when the guard is not already authenticated; and
- token refreshes do not trigger redundant message requests.

Cleanup unsubscribes on unmount. Persisted client storage is treated as a session hint,
not sufficient proof without `getUser()`.

## Message Query

After protected mounting, Back Office requests only:

```text
id, name, email, message, created_at
```

Rows are ordered by `created_at` descending so the newest message appears first. Query
success normalizes only records with the expected ID, string fields, and timestamp shape.
The page never requests unrelated auth metadata, hidden columns, or update permission.

## Page States

The route includes:

- loading status while the first query is pending;
- retryable generic error state;
- empty state when no valid messages exist;
- populated responsive table/collection;
- full-message dialog;
- delete-confirmation dialog;
- deletion-pending state; and
- logout-pending state.

The page header identifies the private Back Office and exposes Sign out. Summary copy
reports the number of messages without revealing private content to route metadata or
external logs.

## Message Inspection

Each row shows enough information to identify a message and offers a native control to
open the full record. The message dialog presents name, email, received date/time, and
complete message text using semantic terms/descriptions.

The dialog:

- has a unique accessible title;
- receives initial focus on its message heading, followed by a visible Close control;
- traps focus;
- closes with Close, Escape, or safe backdrop interaction;
- locks body scroll; and
- restores focus to the opening row when it remains, otherwise to a connected fallback.

Long messages and addresses wrap, dialog content scrolls internally, and private text is
rendered as text rather than HTML.

## Deletion

Delete is deliberate and separate from opening a message. Confirmation names the sender
or record context, explains permanence, and requires an explicit destructive button.
Cancel, Escape, or backdrop closes before the request begins.

The request deletes by the selected message’s validated ID. While pending, duplicate
events are blocked, destructive controls are disabled, and dismissal cannot create an
ambiguous state. Success removes the row immediately from local state, closes dialogs,
and returns focus to the next safe target. Failure preserves the row and shows a generic
retryable alert.

## Logout

Sign out is guarded against duplicates and calls `supabase.auth.signOut()`. Success
replaces history with `/login`; the auth subscription also removes private UI. Failure
keeps the administrator in a recoverable signed-in state with a generic error and
re-enabled control.

Browser Back or refresh after successful sign-out must not restore private content. The
route guard re-verifies before every protected mount.

## Security and Privacy

- RLS permits authenticated selection/deletion and denies anonymous reads.
- Route hiding is not authorization.
- Message content, credentials, session objects, tokens, user records, and raw errors are
  never logged or copied into URLs/storage owned by the UI.
- Text is not inserted through `dangerouslySetInnerHTML`.
- The administrator cannot edit messages because update is outside the schema grants and
  interface scope.
- Public signup remains disabled; the administrator account is provisioned through the
  Supabase dashboard.
- Missing configuration requests no private data.

## Accessibility and Responsive Behavior

- One page heading and semantic table/collection labels identify the data.
- Buttons have specific action names rather than icon-only ambiguity.
- Dates use readable formatting while preserving machine-understandable values where
  appropriate.
- Loading uses status; request and deletion failures use alerts.
- Modal focus, dismissal, restoration, scroll locking, and inertness are keyboard-safe.
- The private layout works at 320px, tablet, desktop, 200% zoom, touch, keyboard, reduced
  motion, and forced colors.
- Long private content remains contained without forcing page-level horizontal overflow.

## Acceptance Contract

- Signed-out direct load and refresh never mount `BackOfficePage` or query messages.
- A valid session plus valid server user is required before the message request.
- Messages load newest first with only approved fields.
- Loading, error, retry, empty, and populated states are distinct.
- Full-message and confirmation dialogs meet focus and dismissal requirements.
- Delete requires confirmation, blocks duplicates, and updates local state only after
  successful Supabase deletion.
- Sign-out removes private UI and replaces history with Login.
- Anonymous select/update/delete remain denied independently by RLS.
- No private message appears in public UI, metadata, logs, or source fixtures.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Protected Back Office
- **Related Area:** Fullstack / Private Administration

## Feature Goal

Allow only a server-verified authenticated administrator to review, inspect, delete, and
sign out from the private contact-message interface.

## Feature Scope

### In Scope (Included)

- Protected route verification, Auth event handling, newest-first message query, explicit
  states, full-message dialog, delete confirmation, exact-ID deletion, and logout.

### Out of Scope (Excluded)

- Public discovery, anonymous reads, message editing, bulk deletion, user management,
  analytics, exports, and storage of private messages outside component memory.

## Sub-Requirements (Feature Breakdown)

- Require both a stored session and server-backed user before mounting private UI.
- Query only approved columns and validate returned record shape.
- Support loading, retryable error, empty, ready, view, delete, and logout states.
- Delete only the confirmed immutable UUID and clear private state on exit.

## User Flow / Logic (High Level)

1. The route guard checks configuration, session, and server user.
2. An authenticated mount loads messages newest first.
3. The administrator views a complete record or confirms deletion of one record.
4. Logout clears private state, removes the session, and replaces the route with Login.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`RequireSession`, `BackOfficePage`, `MessageDialog`, `DeleteMessageDialog`, and the
protected `/back-office` route.

### Backend / API

Supabase Auth session/user/sign-out methods and Data API select/delete operations on
`public.messages` under authenticated RLS policies.

## Data Used or Modified

Approved message fields (`id`, `name`, `email`, `message`, `created_at`), verification
phase, dialog selection, deletion phase, and logout state.

## Tech Constraints (Feature-Level)

Use server-backed verification, explicit columns, descending server order, exact UUID
filters, duplicate guards, generic errors, accessible dialogs, and RLS.

## Acceptance Criteria

- [ ] Signed-out users never mount private UI or query messages.
- [ ] Verified users see approved fields newest first.
- [ ] View and delete dialogs meet keyboard/focus requirements.
- [ ] Successful deletion removes only the confirmed row.
- [ ] Logout clears private state and prevents Back/refresh restoration.

## Notes for the AI

Never weaken `.eq('id', selectedId)`, add update/bulk-delete behavior, expose raw data or
errors, trust route hiding, or treat local session storage as sufficient verification.
