# Feature Specification — Contact Page

## Table of Contents

- [Goal](#goal)
- [Route and Copy](#route-and-copy)
- [Form Contract](#form-contract)
- [Validation](#validation)
- [Submission Workflow](#submission-workflow)
- [Feedback and Recovery](#feedback-and-recovery)
- [Database and RLS](#database-and-rls)
- [Privacy and Security](#privacy-and-security)
- [Accessibility and Responsive Behavior](#accessibility-and-responsive-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Let recruiters, collaborators, and professional contacts send Oishieka a message through
a concise, accessible form. The page validates before requesting Supabase, prevents
duplicate inserts, preserves useful input after failure, reports every state safely, and
never grants public read access to submitted messages.

## Route and Copy

`/contact` is a public lazy route labeled Contact / Send a Message in navigation and uses
the Contact peach, blush, lavender, and butter-gold current.

The introduction reads:

> Have a project, role, or collaboration in mind? Send me a message and share what you
> would like to discuss.

The form is labeled “Send a message,” “Professional inquiries,” and “All fields are
required.” A concise data-use notice explains that name, email, message, and submission
time are stored so Oishieka can review and respond.

## Form Contract

The controlled form contains:

| Field | HTML behavior | Limits |
| --- | --- | --- |
| Name | text, `autocomplete="name"` | trimmed 2–100 characters |
| Email address | email, `autocomplete="email"` | trimmed 3–254 characters and valid format |
| Message | textarea | trimmed 10–2000 characters |

Each control has a visible label, required indicator, persistent hint, associated error,
and appropriate `required`, minimum, and maximum attributes. A visually hidden Website
honeypot is removed from tab order and assistive-technology interaction.

## Validation

Submission normalizes only the values intended for normalization: name and message are
trimmed, and email whitespace is trimmed without inventing an address. Validation checks
required state, length, and email shape before any Supabase call.

On invalid input:

- errors render beside their fields;
- `aria-invalid` and `aria-describedby` connect state to controls;
- an alert asks the visitor to correct highlighted fields;
- the first invalid field receives focus; and
- no insert occurs.

Editing a field clears its stale field error. Whitespace-only input is invalid after
normalization.

## Submission Workflow

The handler prevents the browser submit, then applies a synchronous ref guard before
awaiting any operation. This guard and the disabled pending control jointly prevent
click, Enter, touch, and same-render events from creating duplicate inserts.

A filled honeypot receives a no-op success response, clears the form, and sends no
request. A valid human submission sends exactly this allowlisted payload:

```javascript
{
  name: normalizedValues.name,
  email: normalizedValues.email,
  message: normalizedValues.message,
}
```

The request is `supabase.from('messages').insert(payload)` with no appended `select()`.
UI state, IDs, timestamps, honeypot values, and metadata are not sent.

## Feedback and Recovery

The page supports:

- idle;
- validation alert;
- pending status and `aria-busy` form;
- success status;
- generic insertion/network error; and
- missing-configuration unavailable status.

Success clears values/errors and remains visible for five seconds unless a new form focus
dismisses it sooner. Request failure preserves the entered fields for correction or
retry. Editing dismisses stale request success/error feedback. Unmount cleanup prevents
old timers or async responses from mutating a later route.

Raw Supabase messages, table names beyond approved public copy, stack traces, project
configuration, or policy detail never render to visitors.

## Database and RLS

`public.messages` is defined as:

| Column | Type and constraint |
| --- | --- |
| `id` | UUID primary key, `gen_random_uuid()` |
| `name` | text, trimmed length 2–100 |
| `email` | text, trimmed length 3–254 and basic email regex |
| `message` | text, trimmed length 10–2000 |
| `created_at` | non-null `timestamptz`, default `now()` |

RLS is enabled. Table privileges and policies permit anonymous/authenticated insert and
authenticated select/delete. Update is not granted. The public insert policy checks only
the row constraints; private read/delete policies require the authenticated role.

## Privacy and Security

- Contact submissions are private correspondence, not public content.
- Anonymous users cannot select, update, or delete rows.
- The client uses only the low-privilege browser key.
- Missing configuration never falls back to fake success or local credential storage.
- Development diagnostics omit payloads and are silent in production.
- The page does not request phone number, address, subject profiling, file attachments,
  marketing consent, or unrelated metadata.

## Accessibility and Responsive Behavior

- One page `<h1>` and one form `<h2>` create a clear hierarchy.
- Tab order is Name → Email → Message → Submit; the honeypot is excluded.
- Feedback uses alert/status semantics and visible text, not color alone.
- Labels and hints remain visible at 320px and 200% zoom.
- Pending state is announced and the button communicates its disabled action.
- All copy and controls use solid high-contrast surfaces in both themes.
- The one-column layout remains usable with touch, keyboard, reduced motion, forced
  colors, and mobile browser keyboards.

## Acceptance Contract

- Direct `/#/contact` loading and refresh work.
- Empty, malformed, short, and over-limit values fail locally and focus the first error.
- A valid submit sends exactly one allowlisted insert.
- A bot honeypot submission sends no insert.
- Success clears the form; failure preserves human input.
- Missing Supabase configuration issues no request and does not crash.
- Anonymous select/update/delete remain impossible under RLS.
- No sensitive service detail or submitted content appears outside the protected
  administrator workflow.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Contact Page
- **Related Area:** Fullstack / Public Form

## Feature Goal

Allow a visitor to submit a valid professional inquiry while preventing duplicate
requests, protecting private correspondence, and reporting every outcome accessibly.

## Feature Scope

### In Scope (Included)

- Contact route, controlled form, normalization, validation, honeypot, guarded Supabase
  insert, feedback states, database constraints, and public-insert RLS behavior.

### Out of Scope (Excluded)

- Public message reading, updates, attachments, phone/address collection, marketing,
  service-role access, and administrator message management.

## Sub-Requirements (Feature Breakdown)

- Collect only name, email, and message with visible labels and approved limits.
- Reject invalid input before any request and focus the first invalid control.
- Send exactly one allowlisted insert for valid human input.
- Preserve useful input after failure and clear it after success.
- Keep anonymous select, update, and delete unavailable.

## User Flow / Logic (High Level)

1. The visitor opens Contact and enters the three required values.
2. The page normalizes and validates locally.
3. A valid non-honeypot submission inserts through the shared Supabase client.
4. The page announces pending, success, failure, or unavailable state and recovers safely.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`ContactPage`, `contactValidation.js`, Contact route styles, and the shared
`supabaseClient.js` boundary.

### Backend / API

Supabase Data API insert into `public.messages`; no custom endpoint and no anonymous
read request.

## Data Used or Modified

The form sends trimmed `name`, `email`, and `message`. PostgreSQL generates `id` and
`created_at`; no UI metadata or honeypot value is stored.

## Tech Constraints (Feature-Level)

Use the shared low-privilege client, pure validation, synchronous duplicate guards,
allowlisted payloads, safe feedback, PostgreSQL constraints, and RLS.

## Acceptance Criteria

- [ ] Invalid values fail locally and focus the first field error.
- [ ] A valid human action creates exactly one message row.
- [ ] Honeypot input creates no request.
- [ ] Success resets the form; failure preserves its values.
- [ ] Missing configuration is safe and anonymous reads remain denied.

## Notes for the AI

Never append `select()` to the public insert, expose raw provider errors, broaden the
payload, weaken validation/RLS, or place privileged keys in browser code.
