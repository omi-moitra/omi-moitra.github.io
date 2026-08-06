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
