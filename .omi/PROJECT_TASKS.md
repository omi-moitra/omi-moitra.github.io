# Module 16 Portfolio — Project Task Breakdown

This plan is based on the Module 16 business document, slides, and grading checklist in `.omi/src`. The grading checklist is the source of truth when the documents differ.

## Status legend

- [x] Present in the repository
- [ ] Required work
- **Checkpoint**: do not merge the feature until every checkpoint item passes

## Current baseline

- [x] React application scaffolded with Vite and JavaScript
- [x] `vite.config.js` uses the required root `base: '/'`
- [x] GitHub Pages deployment workflow exists and runs on pushes to `main`
- [x] Workflow installs with `npm ci`, builds, and deploys `dist/`
- [x] Workflow exposes the two required Supabase build-time variables
- [x] `.env` and `.env.*` are ignored, while `.env.example` can be committed
- [x] Local production build and lint currently pass
- [ ] Replace the Vite starter screen with the portfolio application
- [x] `@supabase/supabase-js` is present in the current working tree and lockfile
- [ ] Add `react-router-dom` for the required React Router implementation
- [x] The current `feature/supabase-setup` branch follows the required `feature/*` pattern
- [ ] Confirm the repository is public, coaches are collaborators, and GitHub Pages uses GitHub Actions

## Global rules for every feature

- Create each `feature/*` branch from `dev`, merge it back into `dev`, and merge `dev` into `main` only for a stable release.
- Do not commit directly to `main`; only `main` will be graded.
- Read `ai/ai-spec.md` and the relevant feature specification before implementation.
- Use `.omi/plan/home-page.md`, `.omi/plan/resume-switch.md`, and `.omi/plan/splashscreen.md` as design extensions only. This task list and the grading checklist take precedence if they conflict.
- Keep the application static and client-side. Supabase is the only backend service.
- Never commit `.env`, private keys, service-role keys, admin passwords, or the submission summary.
- Use only Vite-prefixed client variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Meet accessibility basics: semantic landmarks, labels, keyboard operation, focus visibility, useful alt text, and adequate contrast.
- At every feature checkpoint, run `npm run lint` and `npm run build`, then test desktop and mobile behavior.
- Post at least two progress updates each week, reply to coaches within 24 hours, and schedule one coach review before Friday.

---

## Phase 0 — Personal content and project inputs

Suggested branch: `feature/project-content`

- [ ] Define the personal brand: name, professional title, short introduction, visual direction, colors, and tone.
- [ ] Prepare at least three technical skills with an icon and supporting description for each.
- [ ] Prepare at least three soft skills or talents with an icon and supporting description for each.
- [ ] Gather education entries: institution, program/degree, and dates, newest first.
- [ ] Gather work entries: role, organization, dates, responsibilities, and achievements, newest first.
- [ ] Gather at least one portfolio project: name, technology, purpose, description, image, live link, and source link where applicable.
- [ ] Choose at least three useful external resources for the Links page, each with a title, URL, image, and 1–3 sentence description.
- [ ] Finalize a public contact email and professional social/profile links.
- [ ] Improve the resume based on received feedback and export the final downloadable PDF.
- [ ] Review and update LinkedIn; send the final LinkedIn profile and resume to Asche Binger on Slack for approval.
- [ ] Record the LinkedIn changes and profile URL for the README Author section.

**Checkpoint 0 — Content ready**

- [ ] No placeholder Vite, React, or lorem ipsum content remains in the content inventory.
- [ ] Dates, names, URLs, spelling, and resume details are verified.
- [ ] Private information is excluded from public website content.
- [ ] Resume and LinkedIn approval has been requested.

## Phase 1 — AI specifications before implementation

Suggested branch: `feature/ai-specifications`

- [ ] Create `ai/ai-spec.md` with identity, scope in/out, architecture, repository structure, allowed technology, constraints, coding conventions, cross-feature rules, and the global Definition of Done.
- [ ] Create `ai/features/setup-deploy.feature.md`.
- [ ] Create `ai/features/header-footer.feature.md`.
- [ ] Create `ai/features/home-page.feature.md`.
- [ ] Create `ai/features/portfolio-page.feature.md`.
- [ ] Create `ai/features/link-page.feature.md`.
- [ ] Create `ai/features/contact-page.feature.md`.
- [ ] Create `ai/features/login-page.feature.md`.
- [ ] Create `ai/features/back-office.feature.md`.
- [ ] In every feature specification, document the goal, scope in/out, requirement breakdown, user flow, interfaces, data, validation, expected behavior, and testable acceptance criteria.
- [ ] Keep Supabase setup out of the Setup & Deploy feature specification as explicitly directed by the rubric; cover its feature-specific behavior in the Contact, Login, and Back Office specifications.

**Checkpoint 1 — Specifications approved**

- [ ] All nine specification documents exist at the exact required paths.
- [ ] Every rubric requirement maps to at least one acceptance criterion.
- [ ] Routing, Supabase security, fallback behavior, responsiveness, accessibility, and error/empty/loading states are defined before feature code begins.
- [ ] Commit and merge the specification branch into `dev`.

## Phase 2 — Foundation, routing, Supabase, and deployment

Suggested branch: `feature/setup-deploy`

- [ ] Add `react-router-dom` as a runtime dependency and commit the updated lockfile.
- [x] Add `@supabase/supabase-js` as a runtime dependency and update the lockfile.
- [ ] Configure `HashRouter` for GitHub Pages and define routes for Home, Portfolio, Links, Contact, a hidden Login page, and protected Back Office.
- [ ] Keep public navigation on the root GitHub Pages site without server-dependent path routing.
- [ ] Create `src/lib/supabaseClient.js` using only the two `VITE_*` variables.
- [ ] Provide a safe, user-friendly fallback when Supabase variables are absent so the site still renders.
- [ ] Create and document `.env.example` with placeholder values only.
- [ ] Add local `submission-summary.*` patterns to `.gitignore` before creating the submission summary.
- [ ] Confirm the existing workflow triggers only on `main`, uses supported Node/Vite versions, passes Supabase variables to the build, and deploys `dist/`.
- [ ] Create the Supabase project and the authoritative rubric table name: `messages`.
- [ ] Create `messages` fields for an identifier, `name`, `email`, `message`, and `created_at`.
- [ ] Enable Row Level Security.
- [ ] Add an anonymous INSERT policy; do not permit anonymous SELECT or DELETE.
- [ ] Add authenticated admin SELECT and DELETE policies.
- [ ] Enable email/password authentication and manually create the required admin account using the rubric credentials. Do not put its password in tracked files.
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to GitHub Actions secrets.
- [ ] Configure GitHub Pages to deploy from GitHub Actions.

**Checkpoint 2 — Foundation deploys**

- [ ] `npm ci`, `npm run lint`, and `npm run build` pass from a clean install.
- [ ] Refreshing every public hash route works on the deployed Pages site.
- [ ] Missing Supabase configuration does not crash the UI or leak secrets.
- [ ] Anonymous users can insert a test message but cannot select or delete messages.
- [ ] Authenticated admin access can select and delete test messages.
- [ ] Merge the feature into `dev`; deploy through `dev` → `main`; verify the public URL.

## Phase 3 — Shared layout and responsive navigation

Suggested branch: `feature/header-footer`

- [ ] Build a `Main` layout that wraps every public page between the Header and Footer.
- [ ] Build a sticky or fixed Header with the public page links and consistent styling.
- [ ] Build a Footer shown on every public page with contact details, social links, and copyright.
- [ ] Generate a personal logo with an AI image tool, document the tool used, add meaningful alt text, and link the logo to Home.
- [ ] On desktop widths above 768px, show horizontal navigation at the top.
- [ ] At 768px and below, replace the desktop links with an icon-based bottom navigation.
- [ ] Ensure the hidden Login and Back Office routes never appear in the Header, Footer, or mobile navigation.
- [ ] Add shared design tokens, typography, spacing, buttons, cards, feedback styles, and responsive containers.
- [ ] Apply the pastel fantasy visual direction from `.omi/plan/home-page.md` without weakening contrast, readability, performance, or professional tone.
- [ ] Ensure the logo and images scale, text stays readable, sections stack, and no horizontal overflow occurs.

**Checkpoint 3 — Layout complete**

- [ ] Header, Footer, and navigation render consistently on all public pages.
- [ ] Logo navigation, public links, keyboard focus, and active states work.
- [ ] Test at 320px, 768px, and a desktop width with no overflow.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 4 — Home page

Suggested branch: `feature/home-page`

- [ ] Make Home the default route at `/` within the hash router.
- [ ] Create a fantasy-styled introduction section with name, role/title, a short professional introduction, and clear Portfolio and Contact calls to action.
- [ ] Create a visually organized technical-skills section with at least three skills, icons, and supporting descriptions.
- [ ] Create a visually organized soft-skills/talents section with at least three items, icons, and supporting descriptions.
- [ ] Ensure the page has at least three clearly separated visual sections.
- [ ] Generate and integrate at least two relevant AI-created images with useful alt text.
- [ ] Document the AI image tool and asset purpose in a specification or research document.

**Checkpoint 4 — Home accepted**

- [ ] All minimum item counts and supporting descriptions are present.
- [ ] Images are optimized, relevant, responsive, and accessible.
- [ ] Home is polished on mobile and desktop and contains no starter content.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 5 — Portfolio page

Suggested branch: `feature/portfolio-page`

- [ ] Create an Education section with institution, program/degree, and dates in reverse chronological order.
- [ ] Create a Work section with role, organization, dates, and responsibility/achievement descriptions in reverse chronological order.
- [ ] Create a Projects section with at least one project including name, technology, purpose, description, and image.
- [ ] Treat the Education and Work sections as the semantic creative HTML resume; essential resume information must not exist only inside a PDF.
- [ ] Add the approved standard resume PDF at `public/assets/resume-standard.pdf` and provide working open/download links.
- [ ] Organize Education, Work, and Projects as at least three visually distinct sections.
- [ ] Generate and integrate at least two portfolio-specific AI images with useful alt text.

**Checkpoint 5 — Portfolio accepted**

- [ ] All entries contain every rubric field and use accurate reverse chronological ordering.
- [ ] Project and external links work, and the resume downloads as a valid PDF.
- [ ] Layout and media work on mobile and desktop.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 6 — Links page

Suggested branch: `feature/links-page`

- [ ] Render at least three resource links as cards or structured items.
- [ ] Include an image, title, 1–3 sentence description, and clickable URL in every item.
- [ ] Open external URLs in a new tab with safe `rel` attributes.
- [ ] Integrate at least one relevant AI-generated image with useful alt text.

**Checkpoint 6 — Links accepted**

- [ ] Three or more complete cards render from verified content.
- [ ] Every URL works and opens safely in a new tab.
- [ ] Cards and images are responsive and accessible.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 7 — Contact form and public database access

Suggested branch: `feature/contact-page`

- [ ] Build labeled Name, Email, and Message fields with suitable input types.
- [ ] Require all fields and validate email format before submission.
- [ ] Show clear field or form validation errors and prevent invalid submission.
- [ ] Insert valid payloads into the Supabase `messages` table through `src/lib/supabaseClient.js`.
- [ ] Add pending state and prevent duplicate submissions while a request is running.
- [ ] Show visually distinct success and failure feedback.
- [ ] Reset fields after success and dismiss success feedback after a few seconds or on the next interaction.
- [ ] Show useful fallback feedback when Supabase is not configured.

**Checkpoint 7 — Contact accepted**

- [ ] Empty and malformed input is rejected with accessible messages.
- [ ] A valid production submission creates exactly one database row with all three values.
- [ ] Success resets the form; simulated or real failures preserve input and explain the error.
- [ ] Anonymous SELECT and DELETE remain blocked by RLS.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 8 — Hidden admin login

Suggested branch: `feature/admin-login`

- [ ] Add a hidden Login route reachable only by manually entering its hash URL or by an intentionally documented secret keyboard shortcut.
- [ ] Do not expose Login in any public navigation or page content.
- [ ] Build email and password inputs plus a login button.
- [ ] Authenticate with `supabase.auth.signInWithPassword()` through the shared client.
- [ ] Show a distinct error for invalid credentials without revealing sensitive authentication details.
- [ ] Navigate successful logins to Back Office.
- [ ] Detect an existing valid session and redirect authenticated users from Login to Back Office.
- [ ] Confirm the Supabase session persists after refresh.

**Checkpoint 8 — Login accepted**

- [ ] The hidden route is absent from all navigation but works when entered directly.
- [ ] Incorrect credentials fail safely; correct admin credentials establish a persistent session.
- [ ] Missing Supabase configuration produces a controlled error rather than a crash.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 9 — Protected Back Office

Suggested branch: `feature/back-office`

- [ ] Protect the Back Office route by checking authentication before rendering.
- [ ] Redirect unauthenticated users to Login.
- [ ] Fetch all `messages` rows ordered by `created_at` descending.
- [ ] Show loading, fetch-error, and “No messages yet” states.
- [ ] Render a table with Name, Email, Date, and Actions columns.
- [ ] Add a View action or clickable row that opens the full message in a modal.
- [ ] Include sender name/email, date/time, and full message in the modal.
- [ ] Close the modal with its button, outside click, and Escape; manage focus accessibly.
- [ ] Add a per-row Delete action with deliberate confirmation/error handling.
- [ ] Remove a successfully deleted message from the UI immediately.
- [ ] Add Logout using `supabase.auth.signOut()`, fully clear the session, and redirect to Home or Login.
- [ ] Keep Back Office absent from public navigation.

**Checkpoint 9 — Back Office accepted**

- [ ] Direct unauthenticated access redirects and never flashes private message data.
- [ ] Authenticated refresh retains access and loads newest messages first.
- [ ] Empty, error, view-modal, delete, and logout paths all work.
- [ ] RLS prevents anonymous reads/deletes and allows only the authenticated admin workflow.
- [ ] Table remains usable on small screens without breaking the page.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 10 — Documentation and professional artifacts

Suggested branch: `feature/documentation`

- [ ] Replace the starter `README.md` with a non-technical-friendly project description.
- [ ] Document the title, purpose, audience, problem solved, complete tech stack, actual project structure, clone/install/setup/run instructions, environment variables, API/Supabase usage, and Author details.
- [ ] State explicitly when a requested README section does not apply.
- [ ] In the README Author section, summarize the LinkedIn improvements and include the LinkedIn profile URL.
- [ ] Create `docs/script-1.md` for the first 30–60 second elevator pitch.
- [ ] Record Elevator Pitch Video 1 and upload it to YouTube as Unlisted.
- [ ] Gather feedback and document strengths, weaknesses, and improvements in `docs/pitch-feedback.md`.
- [ ] Create the improved `docs/script-2.md`.
- [ ] Record Elevator Pitch Video 2 and upload it to YouTube as Unlisted.
- [ ] Create `CONCEPTS.md` with three challenging project concepts; for each, explain its name, purpose, why it was challenging, and exact usage location where applicable.
- [ ] Record a 5–10 minute Concepts explanation and upload it to YouTube as Unlisted.

**Checkpoint 10 — Documentation accepted**

- [ ] A new developer can run the project from the README alone.
- [ ] All documented paths and commands match the repository.
- [ ] No credentials or submission-summary file is tracked.
- [ ] Pitch scripts, feedback, final resume, README, and CONCEPTS are complete and proofread.
- [ ] `npm run lint` and `npm run build` pass; merge into `dev`.

## Phase 11 — Technical interview deliverables

Suggested branch: `feature/technical-interview`

- [ ] Solve LeetCode: Word Search II.
- [ ] Solve LeetCode: Design Twitter.
- [ ] Solve LeetCode: Task Scheduler.
- [ ] Solve LeetCode: Course Schedule.
- [ ] Solve LeetCode: Serialize and Deserialize Binary Tree.
- [ ] Save a clear solution screenshot for each challenge at `LeetCode-Challenges/<challenge-name>.png`.
- [ ] Prepare reasoning notes that explain the approach, data structures, complexity, and key tradeoffs in your own words.
- [ ] Record the 5–10 minute problem-solving explanation video and upload it to YouTube as Unlisted.

**Checkpoint 11 — Interview package accepted**

- [ ] All five required problems are completed.
- [ ] Five readable screenshots exist with descriptive challenge-based filenames.
- [ ] The video explains reasoning rather than only reading code.
- [ ] Merge the screenshots into `dev`; keep private notes or credentials out of Git.

## Phase 12 — Final QA, demo, and submission

Suggested branch: `feature/final-qa`

- [ ] Audit every grading-checklist row against the deployed production site and repository.
- [ ] Test all public routes, hidden Login, protected Back Office, refresh behavior, links, resume download, form validation, database operations, modal behavior, delete, and logout.
- [ ] Test at mobile, tablet, and desktop sizes in current Chrome and at least one additional browser.
- [ ] Check keyboard navigation, focus order, labels, alt text, contrast, reduced overflow, and modal accessibility.
- [ ] Run a clean verification: remove only generated local dependencies/artifacts as appropriate, then `npm ci`, `npm run lint`, and `npm run build`.
- [ ] Confirm no secret, `.env`, admin password, or submission summary is present in tracked files or Git history.
- [ ] Record the 5–10 minute Technical Demo & Code Overview showing both working behavior and internal implementation.
- [ ] Upload the demo to YouTube as Unlisted.
- [ ] Create the submission summary outside tracked Git files with student name, module name, repository URL, all required video links, and required submission credentials.
- [ ] Verify every YouTube link is Unlisted and viewable while signed out.
- [ ] Verify the public site and repository URLs work while signed out.
- [ ] Merge all remaining `feature/*` branches into `dev`.
- [ ] Review `dev`, then merge `dev` into `main` with a clear feature → dev → main history.
- [ ] Confirm the `main` GitHub Actions deployment succeeds and smoke-test the final public URL.
- [ ] Submit through the platform no later than Friday at 11:59 PM in the assigned deadline week.

**Checkpoint 12 — Ready to submit**

- [ ] Every required checkbox in this plan is complete or has documented coach approval.
- [ ] `main` contains the stable graded version and the GitHub Pages workflow is green.
- [ ] Contact submission and authenticated Back Office behavior work against production Supabase.
- [ ] Submission summary contains every required link and credential but is not committed.
- [ ] A final coach review has been completed.

## Optional extra miles — only after all required work passes

- [ ] Create an approved specification for the Portfolio PDF selector, then add the optional creative PDF and accessible preview behavior described in `.omi/plan/resume-switch.md`; keep the approved Standard PDF as the default.
- [ ] Create an approved specification for the bird-and-paint splash, then implement the session-limited, reduced-motion-safe behavior in `.omi/plan/splashscreen.md` without delaying or obscuring access to the application.
- [ ] Create `ai/features/light-dark-mode.feature.md`, then implement an accessible site-wide theme toggle using CSS variables, `localStorage`, OS preference, smooth transitions, and complete component coverage.
- [ ] Create `ai/features/languages.feature.md`, then implement at least two languages, a site-wide language switcher, structured translation JSON, full UI translation, and persisted preference.

## Required video inventory

- [ ] Elevator Pitch Video 1
- [ ] Elevator Pitch Video 2
- [ ] Three Concepts explanation video
- [ ] Five LeetCode problems explanation video
- [ ] Technical Demo & Code Overview video

All five video links belong in the untracked submission summary.
