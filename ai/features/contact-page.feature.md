# Feature Specification — Contact Page

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
- [Approved Draft Content](#approved-draft-content)
- [User Flow and Expected Behavior](#user-flow-and-expected-behavior)
- [Interfaces](#interfaces)
- [Data and Validation](#data-and-validation)
- [Supabase Schema and Security Contract](#supabase-schema-and-security-contract)
- [Technical Constraints](#technical-constraints)
- [Implementation Decisions](#implementation-decisions)
- [Acceptance Criteria](#acceptance-criteria)
- [Verification Plan](#verification-plan)
- [Warnings and Known Limitations](#warnings-and-known-limitations)
- [Notes for AI and Contributors](#notes-for-ai-and-contributors)

## Feature Identity

- **Feature name:** Contact Page
- **Related area:** Public contact form, client-side validation, Supabase message insertion, feedback states, security, responsive layout, and accessibility
- **Specification path:** `ai/features/contact-page.feature.md`
- **Required branch:** `feature/contact`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing foundation from `ai/features/setup-deploy.feature.md`, shared layout from `ai/features/header-footer.feature.md`, and the shared client in `src/lib/supabaseClient.js`
- **Primary users:** Recruiters, hiring managers, collaborators, and other public visitors who want to contact Oishieka

## Feature Goal

Create a public Contact page where a visitor can submit a name, email address, and message to the Supabase `messages` table. The form must reject invalid input before any network request, prevent duplicate submissions while a request is pending, provide accessible pending/success/failure feedback, preserve entered values after failure, clear them only after success, and fail safely when Supabase is not configured.

After this feature is complete:

- `/#/contact` renders the Contact page through React Router;
- the form contains visibly labeled name, email, and message fields;
- invalid values never trigger a Supabase insert;
- one valid submission produces exactly one insert containing only `name`, `email`, and `message`;
- pending, success, failure, and missing-configuration states are clear and accessible;
- anonymous visitors can insert messages but cannot read, update, or delete them; and
- the page remains usable from 320px through desktop widths and at 200% zoom.

## Feature Scope

### In Scope — Included

- Contact at React Router path `/contact` and deployed hash URL `/#/contact`.
- A concise page introduction and clearly labeled contact form.
- Text input for sender name.
- Email input for sender email address.
- Textarea for the message.
- Required-field, length, and email-format validation before submission.
- Field-level validation messages and an accessible validation summary when submission fails.
- Controlled form state so values can be preserved after errors and cleared after success.
- One Supabase `INSERT` into the authoritative `messages` table per accepted submission.
- Payload allowlisting so only `name`, `email`, and `message` are submitted from the browser.
- Pending state and duplicate-submit prevention.
- Visually and semantically distinct success and failure feedback.
- Success feedback that clears after five seconds or on the visitor's next form interaction.
- Safe, non-sensitive error messages.
- Controlled fallback behavior when Supabase environment variables are missing.
- A reproducible `messages` schema and Row Level Security policy contract.
- Anonymous insert access without anonymous select, update, or delete access.
- Semantic form structure, autocomplete metadata, keyboard access, focus management, live feedback, visible focus, sufficient contrast, and reduced-motion behavior.
- Responsive form layout using the canonical `phoenixPalette` and approved gradients.

### Out of Scope — Excluded

- Header, Footer, personal logo, desktop navigation, or mobile bottom-navigation implementation.
- Home, Portfolio, or Links content.
- Login form, administrator session management, protected routes, Back Office table, message modal, deletion, or logout UI.
- Public message reading, editing, deletion, or confirmation pages.
- Public registration, password reset, or administrator creation.
- A custom Express, Node, Java, or other application server.
- MongoDB, Mongoose, Firebase, email delivery, transactional notifications, webhooks, or a second backend service.
- File attachments, rich text, Markdown, HTML messages, contact categories, subject fields, phone fields, or mailing-list consent.
- CAPTCHA, rate-limiting service, IP storage, analytics, tracking, or fingerprinting unless separately approved.
- Optimistic success before Supabase confirms the insert.
- Returning the inserted message row to the anonymous browser.
- Exposing raw Supabase errors, table details, credentials, or environment values to visitors.
- A service-role or secret key in browser code.
- Contact-specific AI-generated imagery; the Contact rubric does not require it.
- A new form, validation, state-management, notification, or animation dependency solely for Contact.

## Requirements Breakdown

### Requirement 1 — Contact Route and Introduction

- Replace the setup placeholder at React Router path `/contact` with the Contact page component.
- Render the page at deployed hash URL `/#/contact` inside the shared `Main` layout.
- Direct loading and refreshing of `/#/contact` must work on GitHub Pages.
- Use one page-level `<h1>` such as “Contact Me.”
- Add a short invitation explaining that visitors can use the form for professional inquiries.
- Do not promise a specific response time unless Oishieka explicitly approves that claim.
- Do not publish a phone number, detailed location, or unapproved social profile.
- The public email `omoitra@gmail.com` may appear only after Oishieka confirms it for publication; it is not required for form operation.

### Requirement 2 — Required Form Fields

- Use a semantic `<form>` with a submit action handled by React.
- Include these controls:

  1. a text `<input>` for `name`;
  2. an email `<input type="email">` for `email`; and
  3. a `<textarea>` for `message`.

- Give every control a persistent visible `<label>` connected with `htmlFor` and `id`.
- Placeholders may provide examples but must not replace visible labels.
- Give controls stable `name` attributes matching the payload fields.
- Use `autoComplete="name"` for name and `autoComplete="email"` for email.
- Allow normal spelling assistance for name and message content.
- Identify required fields in text and programmatically, not by color or an asterisk alone.
- Use one clear submit button such as “Send message.”

### Requirement 3 — Normalization and Validation

- Normalize a submission candidate without changing the visible form values prematurely:

  - trim leading and trailing whitespace from `name`;
  - trim leading and trailing whitespace from `email`;
  - trim leading and trailing whitespace from `message`; and
  - do not lowercase or otherwise rewrite the visitor's email address.

- Validate all three normalized values before any Supabase call.
- Apply these rules:

  - `name` is required and contains 2–100 characters after trimming;
  - `email` is required, contains no more than 254 characters, and passes browser-compatible email-format validation;
  - `message` is required and contains 10–2,000 characters after trimming.

- Reject whitespace-only values.
- Do not accept values beyond their maximum lengths.
- Use matching `required`, `minLength`, and `maxLength` attributes for progressive browser guidance while retaining explicit React validation.
- Do not rely only on native validation bubbles because they are inconsistent and difficult to test accessibly.
- Do not make a network request while any validation error exists.

### Requirement 4 — Validation Feedback

- Show a specific field-level error beside each invalid control.
- Associate every field error with its control through `aria-describedby`.
- Set `aria-invalid="true"` only while a field is invalid.
- On a rejected submission, display a concise validation summary and focus the first invalid field.
- Keep all visitor-entered values after validation failure.
- Clear a field's stale validation error when the visitor meaningfully edits that field or on the next validation pass.
- Do not erase all errors on every keystroke if doing so hides unresolved problems.
- Keep error text understandable without icons or color.
- Do not announce the same error repeatedly on every keypress.

### Requirement 5 — Supabase Submission

- Import `supabase` and `isSupabaseConfigured` from `src/lib/supabaseClient.js`.
- Submit only after validation succeeds and configuration is available.
- Construct a new allowlisted payload object containing exactly:

  - `name`;
  - `email`; and
  - `message`.

- Insert one object into `supabase.from('messages').insert(payload)`.
- Do not chain `.select()` because the anonymous sender does not need the stored row and must not receive message-table data.
- Treat a returned Supabase `error` as failure even when the promise resolves normally.
- Treat a thrown network or client exception as failure.
- Do not send a client-provided identifier, timestamp, status, owner, role, or authorization field.
- Let the database create `id` and `created_at`.

### Requirement 6 — Pending State and Duplicate Prevention

- Set a synchronous submission guard before awaiting Supabase.
- Reject any subsequent submit event while a request is already pending.
- Disable the submit button while pending.
- Change the visible button label to “Sending…” or an equally clear status.
- Mark the form or relevant status region as busy with `aria-busy="true"`.
- Preserve all form values while the request is pending.
- Do not allow Enter, rapid click, touch, or repeated event delivery to issue a second insert.
- Restore the button and pending state after both success and failure.
- Do not interpret a disabled button alone as sufficient feedback; expose a textual pending state.

### Requirement 7 — Success Feedback

- Show success only after Supabase returns without an error.
- Use a concise message such as “Your message was sent successfully.”
- Make success visually distinct with an icon or label and an accessible success treatment.
- Do not rely on green color alone.
- Announce success through a polite live region or `role="status"`.
- Clear all three form fields only after confirmed success.
- Clear field-level validation errors after success.
- Move focus to the success feedback or ensure it is announced without unexpectedly moving the visitor.
- Remove success feedback after five seconds or when the visitor next interacts with a form field.
- Clean up any dismissal timer when the component unmounts or before replacing it.

### Requirement 8 — Failure Feedback

- Show failure after a returned Supabase error or thrown request exception.
- Use a safe message such as “Your message could not be sent. Please try again.”
- Make failure visually distinct with an icon or label and an accessible error treatment.
- Do not rely on red color alone.
- Announce failure assertively using `role="alert"` when appropriate.
- Preserve every form value so the visitor can retry without rewriting the message.
- Do not reveal raw error text, status details, database policy names, table schema, URLs, keys, tokens, or stack traces.
- Clear or replace stale failure feedback on the visitor's next edit or retry.
- Log no complete message body, credentials, or environment values to the browser console.

### Requirement 9 — Missing-Configuration Fallback

- Check `isSupabaseConfigured` without attempting to dereference a null client.
- Render the Contact page and form without crashing when either approved environment variable is absent.
- Show a non-sensitive message such as “The contact form is temporarily unavailable. Please try again later.”
- Disable submission while configuration is missing.
- Keep the reason generic; do not reveal which variable, URL, project, or key is absent.
- Keep navigation and all other public page content operable.
- Do not fall back to mailto submission, local storage, another service, or fake success.
- Restore normal operation when a correctly configured build is deployed.

### Requirement 10 — Supabase Security Boundary

- Use only the low-privilege browser key supplied through `VITE_SUPABASE_ANON_KEY` and the project URL from `VITE_SUPABASE_URL`.
- The approved environment-variable name remains `VITE_SUPABASE_ANON_KEY`; its value may be a current Supabase publishable key or a legacy anonymous key, but never a secret or service-role key.
- Enable Row Level Security on `public.messages`.
- Permit `INSERT` for the `anon` role and, so the public form still works during an administrator session, the `authenticated` role.
- Deny anonymous `SELECT`, `UPDATE`, and `DELETE` by withholding grants and policies.
- Permit authenticated message reading and deletion only according to the Login and Back Office security contract.
- Do not grant client roles schema-changing privileges.
- Do not treat a public browser key as a secret; RLS and least-privilege grants are the actual data boundary.
- Do not expose any key that bypasses RLS.

### Requirement 11 — Responsive Visual Design

- Use the exact canonical `phoenixPalette` tokens and shared CSS custom properties from `ai/ai-spec.md`.
- Use the Phoenix gradient (`phoenixRed` → `blazeOrange` → `solarGold`) selectively for the page's welcoming brand moment.
- Use the Code gradient (`midnightBlue` → `sapphire` → `teal`) for restrained form or technical accents.
- Use the Creative gradient (`royalViolet` → `magenta` → `phoenixRed`) only where it does not compete with validation and feedback states.
- Preserve every approved gradient's token order.
- Keep field text, labels, instructions, errors, and feedback on solid surfaces with verified contrast.
- At narrow widths, use one column and full-width form controls.
- Keep the page inside the viewport at 320px, 768px, 769px, and desktop widths.
- Ensure long validation and failure text wraps without clipping.
- Reserve enough bottom space for the shared mobile navigation at 768px and below.
- Keep controls and feedback readable and operable at 200% zoom.

### Requirement 12 — Accessibility and Semantics

- Use one page-level `<h1>` and a logical form heading or description relationship.
- Use `<fieldset>` and `<legend>` only when they add a meaningful group relationship; do not add empty or redundant grouping.
- Keep labels visible at all times.
- Give instructions and constraints before or beside the relevant controls.
- Make all controls and the submit action keyboard operable.
- Maintain a clear, visible focus indicator on fields and the button.
- Provide at least a 44-by-44 CSS-pixel target for the submit action where practical.
- Associate validation text programmatically with its field.
- Use live regions intentionally so pending, validation, success, failure, and configuration messages are announced without excessive repetition.
- Do not rely on color, icon, motion, placeholder, or position alone to communicate form state.
- Respect `prefers-reduced-motion` for feedback entrances, button effects, and decorative motion.
- Preserve logical tab order and source order at every viewport.

### Requirement 13 — File Documentation and Handoff

- Every created or modified Markdown file must have a linked Table of Contents near the top.
- Every created or modified comment-capable source file must open with an accurate comments-based TOC.
- Add why-comments for non-obvious validation, normalization, privacy, pending-state, timer, and Supabase decisions.
- Use `// :warning:` for material security limitations and cross-system invariants, including RLS, public-key use, and duplicate prevention.
- Keep comments current when the form or data contract changes.
- At implementation handoff, report verification and provide exact staging commands and ready-to-run commit messages for only the files changed.

## Approved Draft Content

### Page Heading

> Contact Me

### Introduction

> Have a project, role, or collaboration in mind? Send me a message and share what you would like to discuss.

This invitation makes no response-time promise and does not publish private résumé details.

### Form Labels and Guidance

| Field | Visible label | Supporting guidance | Autocomplete |
| --- | --- | --- | --- |
| Name | Name | How should I address you? | `name` |
| Email | Email address | Where can I reply? | `email` |
| Message | Message | What would you like to discuss? Use 10–2,000 characters. | none |

### Submit and Status Copy

- **Idle button:** Send message
- **Pending button:** Sending…
- **Validation summary:** Please correct the highlighted fields before sending your message.
- **Success:** Your message was sent successfully.
- **General failure:** Your message could not be sent. Please try again.
- **Missing configuration:** The contact form is temporarily unavailable. Please try again later.

### Field-Level Error Copy

- **Name empty:** Enter your name.
- **Name too short:** Name must contain at least 2 characters.
- **Name too long:** Name must contain no more than 100 characters.
- **Email empty:** Enter your email address.
- **Email invalid:** Enter a valid email address.
- **Email too long:** Email must contain no more than 254 characters.
- **Message empty:** Enter a message.
- **Message too short:** Message must contain at least 10 characters.
- **Message too long:** Message must contain no more than 2,000 characters.

## User Flow and Expected Behavior

### Successful Submission Flow

1. A visitor opens `/#/contact` directly or through public navigation.
2. The page and visibly labeled form render inside the shared layout.
3. The visitor enters a valid name, email address, and message.
4. The visitor submits the form.
5. The handler creates trimmed candidate values and validates them.
6. The handler enters pending state before the asynchronous request.
7. Exactly one `INSERT` sends only `name`, `email`, and `message` to `messages`.
8. Supabase returns without an error.
9. The form clears, pending ends, and success feedback is announced.
10. Success feedback disappears after five seconds or the next form interaction.

### Validation-Failure Flow

1. The visitor submits one or more invalid values.
2. Validation completes locally without a Supabase request.
3. The form shows a summary plus specific field errors.
4. The first invalid field receives focus.
5. All entered values remain present.
6. The visitor corrects the affected fields and resubmits.

### Request-Failure Flow

1. Valid input enters pending state and triggers one insert.
2. Supabase returns an error or the request throws.
3. Pending state ends and the button becomes operable again.
4. A safe failure message is announced.
5. Name, email, and message values remain intact.
6. The visitor may retry without recreating the message.

### Rapid-Resubmission Flow

1. A valid submission sets the synchronous pending guard.
2. Additional clicks, Enter presses, touch events, or submit events occur before completion.
3. Every additional event exits without calling Supabase.
4. The original request alone controls the final success or failure state.

### Missing-Configuration Flow

1. The application loads without one or both approved Supabase values.
2. `supabaseClient.js` exports `isSupabaseConfigured === false` and `supabase === null`.
3. Contact renders normally with a generic unavailable message.
4. Submission remains disabled and no client method is called.
5. The page does not reveal environment details or show fake success.

### Success-Dismissal Flow

1. Confirmed success schedules one five-second dismissal timer.
2. New form interaction clears the success state and cancels that timer.
3. A later submission does not inherit an older timer.
4. Component unmount cancels any active timer.

## Interfaces

### React Page

- `src/pages/ContactPage.jsx`
  - Owns the page heading, introduction, form state, validation, submission state machine, focus behavior, Supabase insert, and feedback lifecycle.
  - Replaces the `/contact` setup-route definition in `src/App.jsx`.

### Optional Reusable Component

- `src/components/FormField.jsx`
  - May render the repeated label/control/error relationship only if it improves clarity without hiding native input semantics.

Keep the fields directly in `ContactPage.jsx` if extraction would make focus refs, control types, or accessibility relationships harder to follow. Do not add a form abstraction solely to reduce line count.

### Validation Utility

- `src/utils/contactValidation.js`
  - May export pure normalization and validation helpers when this keeps `ContactPage.jsx` focused and makes edge-case verification practical.
  - Must not import React or Supabase.

Keep small validation logic inside the page when a separate utility would not improve testing or understanding.

### Supabase Client

- `src/lib/supabaseClient.js`
  - Remains the only module that reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  - Exports `supabase` and `isSupabaseConfigured`.
  - Must remain safe when configuration is absent.

### Database Definition

- `supabase/messages.sql`
  - Provides a reproducible schema, constraints, grants, and RLS policies for the `messages` table.
  - Contains no project URL, API key, password, user email, or private identifier.
  - Is applied through the Supabase SQL editor or an approved migration workflow.

### Styling

- `src/pages/ContactPage.css`
  - Owns Contact layout, fields, instructions, validation, disabled/pending states, status feedback, responsive behavior, and reduced-motion handling.
  - Reuses global tokens and shared primitives rather than redefining the palette.

### Routing

- `src/App.jsx`
  - Imports `ContactPage`.
  - Registers `<Route path="/contact" element={<ContactPage />} />` within `Main`.
  - Removes only the obsolete `/contact` setup-route definition.

### Supabase Operation

```javascript
const { error } = await supabase.from('messages').insert({
  name: normalizedName,
  email: normalizedEmail,
  message: normalizedMessage,
})
```

Do not append `.select()`, because anonymous visitors need insertion confirmation but must not receive stored message data.

## Data and Validation

### Form State Shape

```javascript
const initialValues = {
  name: '',
  email: '',
  message: '',
}

const initialErrors = {
  name: '',
  email: '',
  message: '',
}
```

- Keep field values as strings.
- Keep one current error string per field.
- Do not store raw Supabase errors in renderable state.
- Reset values and errors only after confirmed success.

### Feedback State Shape

```javascript
{
  type: 'idle' | 'validation' | 'pending' | 'success' | 'error' | 'configuration',
  message: '',
}
```

- Only one top-level feedback state is active at a time.
- Field errors remain separate so controls can reference them directly.
- `pending` is also protected by a synchronous ref or equivalent guard to cover same-render rapid events.
- Messages shown to visitors come from approved application copy, never raw service errors.

### Normalized Submission Shape

```javascript
{
  name: values.name.trim(),
  email: values.email.trim(),
  message: values.message.trim(),
}
```

- Build a fresh object instead of spreading form state.
- Do not include UI state, honeypots, timestamps, IDs, or metadata in the database payload.
- Preserve the original visible values until Supabase confirms success.

### Validation Contract

| Field | Required | Minimum | Maximum | Additional rule |
| --- | --- | ---: | ---: | --- |
| `name` | Yes | 2 | 100 | Reject whitespace-only input |
| `email` | Yes | 3 practical characters | 254 | Must satisfy a browser-compatible email format |
| `message` | Yes | 10 | 2,000 | Reject whitespace-only input |

- Return at most one clear error per field per validation pass.
- Validate all fields together so the visitor can correct all known problems.
- Focus the first invalid control according to form order: name → email → message.
- Use character counts only if they help the visitor and remain accessible; they are not required.

### Submission State Machine

| Current state | Event | Next state | Side effect |
| --- | --- | --- | --- |
| Idle/error/success | Submit invalid values | Validation | Show errors; focus first invalid field; no request |
| Idle/error/success | Submit valid values without configuration | Configuration | Show safe unavailable message; no request |
| Idle/error/success | Submit valid configured values | Pending | Lock submission and issue exactly one insert |
| Pending | Additional submit | Pending | Ignore event; issue no request |
| Pending | Insert succeeds | Success | Clear values/errors; announce success; schedule dismissal |
| Pending | Insert fails or throws | Error | Preserve values; announce safe failure; unlock submission |
| Success | Five seconds elapse | Idle | Remove stale success feedback |
| Success | Visitor edits a field | Idle | Cancel timer and remove stale success feedback |

### Expected Insert

- **Table:** `messages`
- **Operation:** `INSERT`
- **Browser-supplied columns:** `name`, `email`, `message`
- **Database-supplied columns:** `id`, `created_at`
- **Expected successful inserts:** exactly one per accepted form submission
- **Returned row:** none required

## Supabase Schema and Security Contract

### Required Schema

```sql
-- =============================================================================
-- supabase/messages.sql — contact message schema and access policies
-- -----------------------------------------------------------------------------
-- 1. messages table        validated public contact-message storage
-- 2. Role grants           least-privilege Data API permissions
-- 3. RLS policies          public insert and authenticated administration
-- =============================================================================

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null
    constraint messages_name_length
      check (char_length(btrim(name)) between 2 and 100),
  email text not null
    constraint messages_email_format
      check (
        char_length(btrim(email)) between 3 and 254
        and btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
      ),
  message text not null
    constraint messages_message_length
      check (char_length(btrim(message)) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

revoke all on table public.messages from anon, authenticated;
grant insert on table public.messages to anon, authenticated;
grant select, delete on table public.messages to authenticated;

drop policy if exists "Public visitors can submit messages" on public.messages;
drop policy if exists "Authenticated administrator can read messages" on public.messages;
drop policy if exists "Authenticated administrator can delete messages" on public.messages;

create policy "Public visitors can submit messages"
on public.messages
for insert
to anon, authenticated
with check (true);

create policy "Authenticated administrator can read messages"
on public.messages
for select
to authenticated
using (true);

create policy "Authenticated administrator can delete messages"
on public.messages
for delete
to authenticated
using (true);
```

### Security Invariants

- RLS remains enabled at all times.
- The `anon` role receives `INSERT` only.
- No anonymous `SELECT`, `UPDATE`, or `DELETE` grant or policy exists.
- The `authenticated` role receives only the access required by Contact and Back Office: `INSERT`, `SELECT`, and `DELETE`; it receives no `UPDATE` grant.
- Public signup remains disabled, so authenticated administrative policies do not become general public access.
- Database constraints independently limit accepted field lengths and reject basic malformed email values.
- Browser validation improves user experience but is not the database security boundary.
- The browser never receives a service-role or secret key.
- Apply and inspect this SQL in the intended Supabase project before testing the form.

### Policy Verification Queries

Use the Supabase dashboard or an authorized SQL session to inspect—not bypass—the policy state:

```sql
select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname = 'public' and tablename = 'messages'
order by policyname;
```

The expected policy operations are anonymous/authenticated `INSERT`, authenticated `SELECT`, and authenticated `DELETE`; no `UPDATE` policy exists.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, project CSS, and the installed `@supabase/supabase-js` v2 client.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Keep Contact under the existing shared `Main` layout.
- Access Supabase only through `src/lib/supabaseClient.js`.
- Use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in browser code.
- Keep `.env` files ignored and `.env.example` limited to non-secret examples.
- Never commit a real secret, service-role key, administrator password, submission credential, or project-private value.
- Do not add a server, serverless function, Edge Function, or second backend for this feature.
- Do not add a dependency for form state, validation, feedback, timers, or icons.
- Do not call `.select()` after anonymous insertion.
- Preserve the canonical `phoenixPalette` values and approved gradient stop orders.
- Do not store form values in local storage, session storage, query parameters, logs, analytics, or URLs.
- Preserve lint and production build success.

## Implementation Decisions

### Use Controlled Inputs

Controlled values make the success/failure invariant explicit: submitted content remains available through any failure and is cleared only after confirmed success. They also support predictable validation and accessible error relationships without reading mutable DOM state after an asynchronous request.

### Validate Trimmed Candidates Without Prematurely Rewriting Fields

Whitespace should not satisfy required or length rules, but changing visible text as soon as the visitor submits can feel destructive. The request uses normalized copies while the displayed values remain intact until success.

### Use Explicit Validation Alongside Native Attributes

Native `required`, input types, and length attributes provide useful browser semantics, but explicit validation produces consistent inline messages, predictable focus behavior, and testable no-request guarantees across browsers.

### Do Not Request the Inserted Row

The sender needs confirmation that the insert succeeded, not a copy of the stored record. Omitting `.select()` reduces returned personal data and avoids requiring anonymous read access.

### Use Both State and a Synchronous Submission Guard

React state updates may not protect against multiple events delivered before a rerender. A ref or equivalent immediate guard closes that short duplicate-insert window while rendered state communicates pending status to the visitor.

### Keep Service Errors Private

Raw Supabase errors can reveal schema names, policy details, request identifiers, or implementation internals without helping the visitor recover. Public copy remains safe and actionable while maintainers diagnose configuration through controlled development tooling.

### Mirror Validation in the Database

Anyone can call a public Data API without using this React form. Database constraints enforce basic length and format limits even when client validation is bypassed, while RLS restricts which operations the public role may perform.

### Keep the Existing Environment Variable Name

The Global AI Spec authorizes `VITE_SUPABASE_ANON_KEY`. Supabase may supply a newer low-privilege publishable key, but changing the variable name would create a cross-feature deployment mismatch. The invariant is the key's low privilege, not whether the approved variable name contains the legacy term “ANON.”

## Acceptance Criteria

### Route and Form Structure

- [x] `/#/contact` renders `ContactPage` inside the shared layout.
- [ ] Direct loading and refresh work in local preview and deployed GitHub Pages.
- [x] The setup placeholder no longer renders at `/contact`.
- [x] The page has exactly one descriptive `<h1>` and a concise invitation.
- [x] A semantic form contains name, email, message, and one submit button.
- [x] Every field has a persistent, programmatically associated visible label.
- [x] Name and email use appropriate autocomplete metadata.

### Validation

- [x] Empty and whitespace-only fields are rejected before any network request.
- [x] Name accepts 2–100 trimmed characters and rejects values outside that range.
- [x] Email is required, no longer than 254 characters, and rejects malformed values.
- [x] Message accepts 10–2,000 trimmed characters and rejects values outside that range.
- [x] Every invalid field receives a specific visible error and `aria-invalid="true"`.
- [x] Every field error is associated through `aria-describedby`.
- [x] Invalid submission shows a summary and focuses the first invalid field.
- [x] Entered values remain after validation failure.

### Submission and Duplicate Prevention

- [x] A valid configured submission calls the shared Supabase client exactly once.
- [x] The insert targets the exact `messages` table.
- [x] The payload contains exactly `name`, `email`, and `message` using trimmed values.
- [x] The request does not include `id`, `created_at`, UI state, or hidden metadata.
- [x] The request does not append `.select()` or return stored message data.
- [x] Pending begins before the asynchronous request can be duplicated.
- [x] Button click, Enter, touch, or repeated submit events cannot create a second insert while pending.
- [x] The pending button is disabled, visibly labeled, and exposed accessibly.

### Success and Failure Feedback

- [x] Success appears only after Supabase confirms insertion without an error.
- [x] Success is visually and semantically distinct without relying only on green or an icon.
- [x] Fields and validation errors clear only after confirmed success.
- [x] Success feedback dismisses after five seconds or the next form interaction.
- [x] Success timers are cancelled on replacement, interaction, and unmount.
- [x] Returned errors and thrown exceptions produce safe, accessible failure feedback.
- [x] Failure is visually and semantically distinct without relying only on red or an icon.
- [x] All entered values remain after request failure.
- [x] Raw service errors, message content, credentials, and environment data are not rendered or logged.

### Configuration and Security

- [x] Missing Supabase configuration renders a controlled unavailable state without crashing.
- [x] Missing configuration issues no client request and never shows fake success.
- [x] Only the approved low-privilege browser variables are read.
- [ ] `public.messages` contains `id`, `name`, `email`, `message`, and `created_at` with required constraints.
- [ ] RLS is enabled on `public.messages`.
- [ ] Anonymous access can insert valid rows.
- [ ] Anonymous access cannot select, update, or delete rows.
- [ ] Authenticated access required by Back Office can select and delete but cannot update rows.
- [ ] Public signup is disabled before authenticated read/delete policies are considered production-safe.
- [x] No secret or service-role key appears in the browser bundle, repository, screenshots, or logs.

### Responsive, Accessible, and Quality

- [x] Keyboard tab order follows the visual form order.
- [x] All controls have visible focus against their actual surfaces.
- [x] Status regions announce validation, pending, success, failure, and unavailable states without excessive repetition.
- [x] Text, labels, inputs, borders, errors, success, disabled state, and focus indicators meet project contrast requirements.
- [x] State meaning does not depend on color, icon, placeholder, position, or motion alone.
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

Run the production build once with both approved Supabase variables and once without them. Inspect the built client to confirm no secret or service-role value was introduced.

### Validation and Request Matrix

| Scenario | Expected request count | Expected result |
| --- | ---: | --- |
| All fields empty | 0 | Three field errors, validation summary, focus on name |
| Whitespace-only values | 0 | Required/length errors using trimmed candidates |
| Malformed email | 0 | Email error; other valid values preserved |
| Name longer than 100 characters | 0 | Name length error |
| Message shorter than 10 characters | 0 | Message length error |
| Message longer than 2,000 characters | 0 | Message length error |
| Missing Supabase configuration | 0 | Generic unavailable feedback; no crash |
| One valid submission | 1 | Pending then success; fields clear |
| Rapid repeated valid submission | 1 | One pending request and one final outcome |
| Supabase returns an error | 1 | Safe failure; all values preserved |
| Supabase request throws | 1 | Safe failure; all values preserved |

### Supabase Integration Checks

- Use a dedicated non-production test message.
- Record the `messages` row count before submission.
- Submit one valid form.
- Confirm the row count increases by exactly one.
- Confirm stored `name`, `email`, and `message` equal the trimmed submitted values.
- Confirm the database supplied a valid `id` and `created_at`.
- Confirm no unexpected browser-supplied column is stored.
- Delete the test row through an authorized administrative method after verification.
- Attempt anonymous `SELECT`, `UPDATE`, and `DELETE`; confirm each is denied or returns no accessible data according to RLS behavior.
- Confirm an anonymous valid `INSERT` is allowed.
- Confirm invalid direct inserts outside database constraints fail.

### Feedback Lifecycle Checks

- Inspect pending text, disabled behavior, and `aria-busy` during a deliberately delayed request.
- Confirm duplicate submit events do not issue duplicate network requests.
- Confirm success clears fields and is announced.
- Wait five seconds and confirm success disappears.
- Submit successfully again, interact with a field immediately, and confirm success plus its timer are cleared.
- Trigger a request error and confirm all values remain.
- Confirm a later successful retry clears the old error.
- Navigate away during a success timer and confirm no stale update warning occurs.

### Route and Responsive Checks

- Open `/#/contact` directly and refresh it.
- Navigate to Contact from desktop navigation and mobile bottom navigation.
- Confirm shared active-link treatment identifies Contact correctly.
- Test at 320px, 768px, 769px, and a representative desktop width such as 1440px.
- Test at 200% browser zoom.
- Check the longest field error and configuration message for wrapping.
- Confirm the submit action and final feedback clear mobile bottom navigation.

### Accessibility Checks

- Complete validation, correction, submission, failure, and retry flows with a keyboard only.
- Inspect the page heading, form landmark, labels, descriptions, required states, errors, status regions, and button accessible name.
- Confirm first-invalid-field focus after rejected submission.
- Confirm live feedback is announced once at an appropriate priority.
- Confirm disabled and pending behavior remains understandable without color.
- Check representative label, input, placeholder, border, error, success, disabled, and focus color pairs for contrast.
- Test reduced-motion preference.
- Confirm form order remains logical when CSS is disabled.

### Configuration and Secret Checks

- Start the application without `VITE_SUPABASE_URL`; confirm controlled fallback.
- Start the application without `VITE_SUPABASE_ANON_KEY`; confirm controlled fallback.
- Start without both; confirm controlled fallback.
- Build with valid public values and confirm submission works.
- Search tracked files and production output for service-role, secret-key, administrator-password, and real `.env` content.
- Confirm `.env` remains ignored and `.env.example` contains examples only.

## Warnings and Known Limitations

> **:warning: Public-form abuse:** Anonymous insert access can be abused even with RLS and field constraints. CAPTCHA, throttling, and server-side rate limiting are outside the required scope; monitor the table and add an approved abuse-control design if needed.

> **:warning: RLS is mandatory:** The public browser key is recoverable from the built application. `messages` remains private only when grants and Row Level Security policies enforce the documented operation boundary.

> **:warning: No privileged browser key:** Never place a Supabase secret key, legacy service-role key, administrator password, or other RLS-bypassing credential in any `VITE_*` value or client file.

> **:warning: Authenticated-policy scope:** The schema permits authenticated reading and deletion for the future Back Office. Public signup must remain disabled, and Login/Back Office acceptance criteria must pass before relying on this as the administration boundary.

> **:warning: Client validation is bypassable:** Browser validation exists for usability, not security. Keep database constraints and RLS synchronized with accepted payload rules.

> **:warning: Duplicate-insert window:** Disabling a rendered button alone may not stop multiple submit events before React rerenders. Keep the synchronous guard and pending state together.

> **:warning: Personal data:** Contact messages contain names, email addresses, and private correspondence. Do not expose them through anonymous reads, logs, analytics, screenshots, or public error output.

> **:warning: Delivery semantics:** A successful database insert confirms storage only. It does not mean an email was sent, a notification was delivered, or Oishieka has read the message.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` and this specification before implementing or modifying Contact.
- Treat the Module 16 grading CSV as final authority when requirements conflict.
- Preserve `HashRouter`; React Router paths omit the hash while deployed browser URLs include it.
- Use only the shared client from `src/lib/supabaseClient.js`.
- Keep the exact `messages` table and `name`, `email`, `message`, `id`, and `created_at` column contract synchronized with Back Office.
- Keep anonymous access insert-only and never add anonymous read, update, or delete behavior.
- Preserve input after every failure and clear it only after confirmed success.
- Keep both the synchronous duplicate guard and rendered pending state.
- Never render or log raw Supabase errors or complete private messages.
- Keep `.env` ignored and use only low-privilege public Supabase values in the browser.
- Add no dependencies unless a separately approved requirement makes one necessary.
- Do not introduce optional email notifications, CAPTCHA, attachments, analytics, or a second backend during this feature.
- Preserve existing user work and keep unrelated edits out of this feature.
- End implementation handoffs with verification results, exact staging commands, and ready-to-run commit messages for only the relevant files.
