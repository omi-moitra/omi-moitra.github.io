# AI Specification — Oishieka Moitra Fantasy Portfolio

## Table of Contents

- [Authority and Purpose](#authority-and-purpose)
- [Project Identity](#project-identity)
- [Goal and Scope](#goal-and-scope)
- [Users and Use Cases](#users-and-use-cases)
- [Feature Index](#feature-index--links-only)
- [Pages, Screens, and Routes](#pages-screens-and-routes)
- [Content Requirements](#content-requirements)
- [Data and Models](#data-and-models)
- [Tech Stack and Tools](#tech-stack-and-tools)
- [Visual and Interaction Direction](#visual-and-interaction-direction)
- [Repository Structure](#repository-structure)
- [Coding Conventions](#coding-conventions)
- [Code Quality Requirements](#code-quality-requirements)
- [Implementation Handoff Requirements](#implementation-handoff-requirements)
- [Cross-Feature Accessibility and Responsive Rules](#cross-feature-accessibility-and-responsive-rules)
- [Rules for AI and Contributors](#rules-for-ai-and-contributors)
- [Branching and Delivery Workflow](#branching-and-delivery-workflow)
- [How to Run and Test the Project](#how-to-run-and-test-the-project)
- [Deployment](#deployment)
- [Global Definition of Done](#global-definition-of-done)

## Authority and Purpose

This file is the main implementation specification for the portfolio. It gives developers and AI tools the project-wide context, boundaries, architecture, conventions, and completion criteria that apply to every feature.

Use sources in this order when instructions differ:

1. The Module 16 grading checklist in `.omi/src`.
2. `.omi/PROJECT_TASKS.md`.
3. This main specification and the relevant file in `ai/features/`.
4. The content and design extensions in `.omi/plan/`.

Do not use this file as a progress tracker. Current task status belongs in `.omi/PROJECT_TASKS.md`.

## Project Identity

- **Project name:** Oishieka Moitra Fantasy Portfolio
- **Owner:** Oishieka Moitra
- **Professional title:** Full Stack Developer
- **Short description:** A responsive portfolio and resume website that presents Oishieka Moitra’s verified skills, education, professional experience, projects, resources, and contact options through an accessible phoenix-inspired fantasy and code visual identity. Public visitors can submit contact messages, while an authenticated administrator can privately review and delete them.
- **Project type:** Static client-side React single-page application with Supabase as its only external backend service
- **Primary audience:** Recruiters, hiring managers, collaborators, coaches, and professional contacts
- **Brand qualities:** Precise, thoughtful, dependable, imaginative, polished, and recruiter-friendly

## Goal and Scope

### Goal

Build and deploy a professional portfolio that satisfies every Module 16 rubric requirement, accurately represents Oishieka’s background, and remains usable across mobile, tablet, and desktop devices. Fantasy styling should make the portfolio memorable without obscuring content, reducing accessibility, or weakening professional credibility.

### In Scope — Build Now

- A root-level React and Vite application written in JavaScript.
- React Router with `HashRouter` for GitHub Pages-compatible client-side routing.
- Public Home, Portfolio, Links, and Contact pages.
- A shared public layout with a logo, desktop header navigation, mobile bottom navigation, and footer.
- A hidden Login page that is reachable directly but absent from public navigation.
- A protected Back Office page for authenticated message administration.
- A Supabase client with safe behavior when environment variables are missing.
- A Supabase Postgres `messages` table protected by Row Level Security.
- Anonymous contact-message insertion without anonymous read or delete access.
- Authenticated administrator login, session persistence, message reading, message viewing, message deletion, and logout.
- Verified personal content derived from the resume and other approved sources.
- Education, work experience, projects, and a downloadable approved resume on Portfolio.
- At least three technical skills and three soft skills with icons and supporting descriptions on Home.
- At least three external resource cards on Links.
- Required AI-created logo and page-specific images, with generation details and accessibility decisions documented.
- Responsive layouts, semantic HTML, keyboard support, visible focus, useful alternative text, adequate contrast, reduced-motion support, and accessible feedback states.
- GitHub Pages deployment through GitHub Actions on pushes to `main`.
- Required README, pitch documents, concept documentation, challenge screenshots, videos, QA, and submission artifacts listed in `.omi/PROJECT_TASKS.md`.

### Out of Scope — Do Not Build Now

- Express, MongoDB, Mongoose, or any custom Node server.
- Vercel, Railway, Render, or a second production hosting target.
- Server-rendered routes or routing that depends on server rewrite rules.
- A separate `client/` and `server/` application structure.
- Public user registration, password reset, multiple administrator roles, or an administrator-creation UI.
- Anonymous message listing, viewing, updating, or deleting.
- A custom CMS, public blog, ecommerce, payments, or unrelated CRUD features.
- Email notifications for contact submissions unless separately approved after required work passes.
- A standalone Resume route; the required resume experience belongs on Portfolio.
- Skill percentages or proficiency claims not supported by verified content.
- Publication of a phone number, postal code, home address, private credential, or unapproved personal information.
- Dark mode, multiple languages, the dual-PDF selector, or the bird-and-paint splash until all required checkpoints pass and the enhancement has its own approved specification.
- Animation or visual effects that make content harder to read, operate, or load.

## Users and Use Cases

- **Public visitor:** Browse Oishieka’s introduction, skills, education, experience, projects, resume, curated resources, contact details, and professional profile links.
- **Recruiter or hiring manager:** Quickly understand Oishieka’s professional positioning, verify relevant experience, inspect project work, and open or download the approved resume.
- **Contact-form sender:** Submit a name, valid email address, and message; receive clear validation, pending, success, failure, or missing-configuration feedback.
- **Authenticated administrator:** Sign in through the hidden Login route, retain a valid session across refreshes, view messages newest first, open a full message, delete a message deliberately, and log out.
- **Unauthenticated administrator visitor:** Be redirected from Back Office to Login without seeing private message data.
- **Developer or maintainer:** Run, lint, build, test, document, and deploy the project without needing a separate backend repository.

## Feature Index — Links Only

- [`ai/features/setup-deploy.feature.md`](features/setup-deploy.feature.md)
- [`ai/features/header-footer.feature.md`](features/header-footer.feature.md)
- [`ai/features/home-page.feature.md`](features/home-page.feature.md)
- [`ai/features/portfolio-page.feature.md`](features/portfolio-page.feature.md)
- [`ai/features/link-page.feature.md`](features/link-page.feature.md)
- [`ai/features/contact-page.feature.md`](features/contact-page.feature.md)
- [`ai/features/login-page.feature.md`](features/login-page.feature.md)
- [`ai/features/back-office.feature.md`](features/back-office.feature.md)

All eight feature files plus this main file form the nine required AI specification documents. Do not keep the placeholder `ai/features/feature-name.feature.md` after the required specifications are created.

The Setup & Deploy feature specification must not contain Supabase setup details, as directed by the rubric. Project-wide architecture may identify Supabase here, but feature-specific Supabase behavior and acceptance criteria belong in Contact, Login, and Back Office specifications.

## Pages, Screens, and Routes

The router must use `HashRouter`. Route paths inside React Router omit the hash, while deployed URLs include it.

| React Router path | Deployed URL | Access | Purpose |
| --- | --- | --- | --- |
| `/` | `/#/` | Public | Introduction, technical skills, and soft skills/talents |
| `/portfolio` | `/#/portfolio` | Public | Education, work experience, projects, creative HTML resume content, and approved resume download |
| `/links` | `/#/links` | Public | At least three curated external resources |
| `/contact` | `/#/contact` | Public | Validated Supabase-backed contact form |
| `/login` | `/#/login` | Hidden public route | Administrator authentication; absent from all public navigation |
| `/back-office` | `/#/back-office` | Authenticated only | Private message list, message modal, deletion, and logout |

### Navigation Rules

- Home is the default route.
- Public navigation contains Home, Portfolio, Links, and Contact only.
- Login and Back Office must never appear in the header, footer, mobile navigation, public page content, or other visible discovery links.
- Above 768px, show horizontal navigation in the header.
- At 768px and below, replace desktop links with an icon-based bottom navigation.
- Every public page renders inside the shared `Main` layout between Header and Footer.
- Directly loading or refreshing any public hash URL must work on the deployed GitHub Pages site.
- Successful login navigates to Back Office.
- Unauthenticated Back Office access redirects to Login without flashing message data.
- Logout clears the session and redirects to Home or Login.

## Content Requirements

Use real, verified content rather than Vite starter text, lorem ipsum, generic claims, or invented metrics. Resume-derived draft content and its verification gaps are documented in `.omi/plan/project-content.md`.

### Home

- Show Oishieka Moitra’s name, Full Stack Developer title, and a concise professional introduction.
- Include clear calls to action for Portfolio and Contact.
- Present at least three technical skills with icons and meaningful descriptions.
- Present at least three soft skills or talents with icons and meaningful descriptions.
- Use at least three clearly separated visual sections.
- Include at least two relevant AI-created images.

### Portfolio

- Show Education with institution, program or degree, and verified dates, newest first.
- Show Work Experience with role, organization, verified dates, responsibilities, and verifiable achievements where available, newest first.
- Show at least one project with name, technology, purpose, description, image, live link, and source link where applicable.
- Keep essential resume information in semantic HTML rather than only inside a PDF.
- Provide a working open/download link for the approved `public/assets/resume-standard.pdf`.
- Include at least two portfolio-specific AI-created images.

### Links

- Show at least three complete resource cards.
- Give each resource an image, title, verified URL, and 1–3 sentence description.
- Open external links in a new tab using `rel="noopener noreferrer"`.
- Include at least one relevant AI-created image.

### Public Contact Information

- Publish only explicitly approved contact details and professional profile URLs.
- The candidate public email from the resume is `omoitra@gmail.com`; confirm it before publication.
- A general Tampa, Florida location may be used if approved.
- Do not publish the resume’s phone number or detailed residential information by default.

## Data and Models

### Static Portfolio Data

Portfolio content may be represented as JavaScript objects or arrays and should include only verified values:

- `profile`: name, title, introduction, approved email, general location, and professional links.
- `technicalSkills`: name, icon reference, and supporting description.
- `softSkills`: name, icon reference, and supporting description.
- `education`: institution, program or degree, start/end display dates, and optional approved location.
- `workExperience`: role, organization, dates, responsibilities, and verified achievements.
- `projects`: name, technology, purpose, description, image, live URL, and optional source URL.
- `resources`: title, URL, image, and 1–3 sentence description.

Keep repeated content in data arrays and render it with reusable components. Do not fabricate missing project details, links, achievements, dates, or proficiency levels.

### Supabase Database

- **Database:** Supabase Postgres
- **Authoritative table name:** `messages`
- **Required fields:** identifier, `name`, `email`, `message`, and `created_at`
- **Ordering:** Back Office fetches messages by `created_at` descending

### Security Model

- Enable Row Level Security on `messages`.
- Anonymous visitors may insert valid messages.
- Anonymous visitors may not select or delete messages.
- The authenticated administrator workflow may select and delete messages.
- Do not expose a service-role key or any private server credential in client code, environment examples, GitHub, logs, documentation, or screenshots.
- Route hiding is a usability choice, not a security boundary; authentication checks and RLS protect private data.
- Do not render or briefly flash private message data before authentication has been confirmed.

### Authentication Data

- Supabase manages the administrator account and session.
- The site supports sign-in and sign-out only; it does not expose public sign-up.
- The administrator password and submission credentials must never be committed.
- A valid session should persist after refresh until logout or expiration.

## Tech Stack and Tools

### Frontend

- React 19
- Vite 8
- JavaScript with ECMAScript modules
- Semantic HTML
- Project CSS and CSS custom properties
- React Router through `react-router-dom`, using `HashRouter`

Do not assume Tailwind CSS, Styled Components, or a component framework is installed.

### Backend Service

- Supabase is the only backend service.
- The application has no custom Express, Node, Java, or other application server.
- All site code is built into static files for GitHub Pages.

### Database and Authentication

- Supabase Postgres
- Supabase Row Level Security
- Supabase email/password authentication
- `@supabase/supabase-js` through the shared `src/lib/supabaseClient.js`

### Hosting and Delivery

- GitHub repository
- GitHub Actions
- GitHub Pages
- Root Vite base path: `/`
- Production artifact: `dist/`
- Deployment trigger: pushes to `main`

### Environment Variables

Only these client variables are permitted:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

`.env.example` contains placeholders only. Local `.env` files remain ignored. Missing values must produce controlled user-facing fallback behavior rather than a crash.

### Dependency Rules

- Add a dependency only when a required or separately approved feature needs it.
- Commit `package.json` and `package-lock.json` together after dependency changes.
- Prefer browser APIs and CSS for small interactions before adding another library.
- Framer Motion, particle libraries, Lottie, GSAP, Tailwind, and similar tools are not part of required scope.
- If an optional feature later justifies one of these tools, document the decision in that feature’s approved specification and retest performance, accessibility, lint, and build.

## Visual and Interaction Direction

### Phoenix Palette

Use `phoenixPalette` as the canonical color vocabulary and preserve these token names and values:

```javascript
export const phoenixPalette = {
  // Core Brand
  phoenixRed:      '#D62828',
  obsidian:        '#0F1115',
  midnightBlue:    '#1E2A44',
  teal:            '#14B8A6',
  royalViolet:     '#7C3AED',

  // Creative Accents
  blazeOrange:     '#F97316',
  solarGold:       '#FACC15',
  emerald:         '#22C55E',
  sapphire:        '#3B82F6',
  magenta:         '#EC4899',

  // Neutrals
  graphite:        '#374151',
  coolGray:        '#64748B',
  silver:          '#E2E8F0',
  snow:            '#F8FAFC',
  white:           '#FFFFFF',
};
```

Implementation rules:

- Core brand colors establish primary surfaces, text, navigation, focus, and calls to action.
- Creative accents echo the multicolored phoenix logo and should be used deliberately rather than placing every accent in every component.
- Neutrals provide readable page, card, border, and text foundations.
- CSS custom properties must mirror the JavaScript names in kebab case, such as `--phoenix-red`, `--midnight-blue`, and `--cool-gray`.
- Use `obsidian`, `midnightBlue`, `graphite`, `snow`, and `white` as the first candidates for large surfaces and readable text relationships.
- Do not use bright accents such as `teal`, `blazeOrange`, `solarGold`, `emerald`, or `magenta` for small text without verifying contrast against the actual background.
- Active, hover, focus, success, warning, and error states must use more than color alone.
- Do not silently change a canonical hex value to solve contrast. Choose a different foreground/background pairing or add a documented derived state token.

The palette never overrides accessibility; every rendered color pair must still pass the project’s contrast requirements.

### Suggested Gradients

Use these approved color-stop sequences:

| Gradient | Token sequence | Suggested use |
| --- | --- | --- |
| Phoenix | `phoenixRed` → `blazeOrange` → `solarGold` | Hero energy, phoenix flourishes, primary brand moments |
| Code | `midnightBlue` → `sapphire` → `teal` | Technical sections, code motifs, interactive technology accents |
| Creative | `royalViolet` → `magenta` → `phoenixRed` | Creative work, section dividers, selected emphasis |

The default CSS custom properties are:

```css
:root {
  --gradient-phoenix: linear-gradient(
    135deg,
    var(--phoenix-red),
    var(--blaze-orange),
    var(--solar-gold)
  );
  --gradient-code: linear-gradient(
    135deg,
    var(--midnight-blue),
    var(--sapphire),
    var(--teal)
  );
  --gradient-creative: linear-gradient(
    135deg,
    var(--royal-violet),
    var(--magenta),
    var(--phoenix-red)
  );
}
```

Preserve each gradient’s token order. The angle may change when a component’s composition requires it, but document a non-obvious change. Use gradients selectively and verify text/icon contrast across the entire gradient, not just its darkest stop. When consistent contrast cannot be guaranteed, use the gradient decoratively and place content on a solid surface.

### Typography and Motifs

- Preferred heading direction: Cinzel or Playfair Display.
- Preferred body direction: Nunito or Lato with system fallbacks.
- Great Vibes may be used sparingly for decorative accents, never for instructions or long text.
- Use coherent fantasy motifs such as dragons, unicorns, phoenixes, constellations, scrolls, spell cards, and quest tomes.
- Keep labels and feedback immediately understandable; fantasy phrases may supplement but not replace plain language.
- Do not let decorations compete with resume content or calls to action.

### AI-Created Assets

The minimum inventory is:

- one personal logo linked to Home;
- two relevant Home images;
- two portfolio-specific images; and
- one relevant Links image.

For each AI-created asset, document the generation tool, purpose, filename, optimization, and alt-text decision in the relevant feature specification or research file. Use empty alt text for purely decorative images. A stock asset does not count as AI-created merely because it was downloaded from an image library.

### Motion

- Motion must not communicate information that is unavailable without animation.
- Respect `prefers-reduced-motion`.
- Avoid excessive blur, particles, autoplay effects, and animation work on mobile.
- The optional splash must not be implemented until required work passes and its specification is approved.

## Repository Structure

Keep one root-level Vite application. Create intended directories only when their feature needs them.

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── ai/
│   ├── ai-spec.md
│   └── features/
│       ├── setup-deploy.feature.md
│       ├── header-footer.feature.md
│       ├── home-page.feature.md
│       ├── portfolio-page.feature.md
│       ├── link-page.feature.md
│       ├── contact-page.feature.md
│       ├── login-page.feature.md
│       └── back-office.feature.md
├── docs/
│   ├── script-1.md
│   ├── pitch-feedback.md
│   └── script-2.md
├── LeetCode-Challenges/
├── public/
│   └── assets/
│       └── resume-standard.pdf
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   │   └── Main.jsx
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── CONCEPTS.md
├── README.md
├── package.json
├── package-lock.json
└── vite.config.js
```

### File Placement Rules

- Put reusable UI in `src/components/`.
- Put the shared public layout in `src/layouts/`.
- Put route-level components in `src/pages/`.
- Put repeated static content arrays in `src/data/` when doing so improves clarity.
- Access Supabase only through `src/lib/supabaseClient.js`.
- Put imported images in `src/assets/` so Vite can fingerprint them.
- Put files requiring stable public URLs, including the approved resume, in `public/assets/`.
- Do not create `client/`, `server/`, Express route, or MongoDB model directories.

## Coding Conventions

- Use JavaScript and JSX, not TypeScript, unless the project requirements are explicitly changed.
- Use functional React components and Hooks.
- Match the repository’s existing style: ECMAScript modules, single quotes, and no semicolons.
- Give components and variables descriptive names; avoid unexplained abbreviations.
- Keep components focused and extract repeated UI rather than duplicating markup.
- Prefer data-driven rendering for skills, experience, projects, resources, and messages.
- Use stable identifiers as React keys; do not use an array index when a stable ID exists.
- Keep reusable visual styling in CSS rather than large repeated inline-style objects.
- Use CSS custom properties for shared colors, spacing, type, focus, and feedback tokens.
- Do not swallow errors. Convert expected failures into useful, non-sensitive UI feedback.
- Preserve user-entered contact values after a failed submission and clear them only after success.
- Prevent duplicate contact submissions while a request is pending.
- Do not log passwords, tokens, complete private messages, or environment values.
- Keep changes scoped to the active feature and avoid unrelated refactors.

## Code Quality Requirements

Every generated or modified file must begin with an appropriate, maintained overview of its structure so a reader can understand the file at a glance.

### Required File Overview

- **Markdown:** Place a visible Markdown Table of Contents after the document title and any required front matter. Link to the document’s meaningful sections.
- **JavaScript and JSX:** Open with a comments-based Table of Contents using the banner format below.
- **CSS:** Open with a comments-based Table of Contents using the CSS banner format below.
- **Other comment-capable formats:** Use the file format’s native comment syntax to provide the same filename, purpose, and numbered section map.
- **Formats that cannot contain comments:** Do not add invalid syntax to JSON, lockfiles, generated assets, binaries, images, PDFs, or other schema-controlled/generated files. Their owning source file or nearest appropriate Markdown documentation must describe any important structure or implementation decision. Never hand-edit a generated lockfile solely to simulate a TOC.

The overview must:

- identify the file and its responsibility;
- list its meaningful sections, components, functions, selectors, or workflows in file order;
- be updated whenever the file structure changes; and
- remain concise enough to scan quickly.

Do not add empty or misleading TOC entries merely to satisfy the format. Very small comment-capable source files still need a short banner that states their purpose and lists their one meaningful section.

### JavaScript and JSX Comments TOC

Use this style for JavaScript and JSX files, adapted to the actual filename and contents:

```javascript
// =============================================================================
// src/pages/ContactPage.jsx — validated public contact form
// -----------------------------------------------------------------------------
// 1. Imports & constants       shared dependencies and validation rules
// 2. ContactPage               form state, validation, and submission flow
// 3. Feedback rendering        pending, success, failure, and fallback states
// =============================================================================
```

### CSS Comments TOC

Use this style for CSS files, adapted to the actual component and selectors:

```css
/* ==========================================================================
   ContactForm — public form layout and feedback states
   --------------------------------------------------------------------------
   1. Variables & Layout       .contact-form, .contact-form__field
   2. States                   .contact-form--pending, .feedback--error
   3. Responsive               @media (max-width: 768px)
   ========================================================================== */
```

### Markdown TOC

Use a visible linked list near the top of Markdown documents:

```markdown
## Table of Contents

- [Purpose](#purpose)
- [Requirements](#requirements)
- [Acceptance Criteria](#acceptance-criteria)
```

### Inline Comment Style

Inline comments must explain **why** a decision exists: constraints, invariants, security boundaries, accessibility behavior, cross-component relationships, or non-obvious tradeoffs. Do not narrate obvious syntax or restate the next line of code.

```javascript
// Preserve the visitor's values after a failed insert so a temporary network
// problem does not force them to reconstruct the message.
setFeedback({ type: 'error', message: safeErrorMessage })

// Read authentication from Supabase instead of route state because a visitor
// can enter the Back Office URL directly or refresh the protected page.
const { data } = await supabase.auth.getSession()
```

### Implementation Notes

- Add a nearby note when a choice would otherwise be surprising to a future maintainer.
- Explain why a browser API, dependency, data shape, fallback, or accessibility technique was selected when the reason is not self-evident.
- Keep notes close to the relevant code or selector.
- Do not use comments to excuse unclear code; improve naming and structure first, then document the remaining non-obvious decision.
- Remove or update stale comments whenever behavior changes.

### Warning Comments

Use `// :warning:` for important JavaScript/JSX limitations, security rules, and cross-system invariants. In other file types, preserve the `:warning:` marker inside the format’s valid comment syntax.

```javascript
// :warning: The browser may use only the anonymous Supabase key. Never import
// a service-role key or expose administrator credentials in client code.

// :warning: Route hiding does not secure message data. The authentication guard
// and Supabase RLS policies must remain in sync.
```

```css
/* :warning: Do not remove the visible focus treatment; color alone is not
   sufficient to identify the currently focused navigation control. */
```

Warnings are reserved for material risks or invariants. Do not mark routine explanations as warnings.

## Implementation Handoff Requirements

At the end of every implementation performed under this specification, the final response must provide ready-to-run staging commands and commit messages for the files changed by that implementation.

### Required Handoff Content

- Summarize the completed implementation and verification results.
- List any tests, lint checks, builds, or manual checks that were run and disclose failures or checks that could not be performed.
- Provide explicit `git add` commands containing only the files relevant to the completed implementation.
- Provide a ready-to-run `git commit` command with a concise Conventional Commit-style subject and, when useful, a short explanatory body.
- Use separate staging and commit blocks when the implementation contains independently reviewable concerns that should be committed separately.
- State clearly when no files changed and therefore no staging or commit command is needed.

### Staging Safety Rules

- Inspect the working tree before recommending staging commands.
- Never recommend `git add .`, `git add -A`, or another broad staging command when unrelated or private files may be present.
- Name exact files or narrowly scoped directories in every staging command.
- Do not stage user changes that were not part of the implementation.
- Do not stage `.env`, private keys, administrator credentials, submission summaries, `.omi/.secret`, ignored resume sources, or other private/ignored artifacts.
- Do not use `git add -f` for ignored files unless the user explicitly asks to track those exact files and understands the consequence.
- If relevant files are intentionally ignored, explain that they will remain local rather than silently suggesting force-add.

### Commit Message Format

Prefer a Conventional Commit-style subject that describes the completed outcome:

```bash
git add src/pages/ContactPage.jsx src/components/ContactForm.jsx src/App.css
git commit -m "feat: add validated contact form" \
  -m "Submit messages through Supabase and provide accessible pending, success, failure, and configuration feedback."
```

Use an appropriate type such as `feat`, `fix`, `docs`, `refactor`, `test`, `style`, `build`, `ci`, or `chore`. Do not claim tests passed, behavior was fixed, or a feature was completed unless verification supports that claim.

The handoff supplies commands for the user; it must not stage or commit automatically unless the user explicitly requests those Git actions.

## Cross-Feature Accessibility and Responsive Rules

- Use semantic landmarks such as `header`, `nav`, `main`, and `footer`.
- Maintain a logical heading hierarchy with one clear page-level heading.
- Associate every form control with a visible label.
- Make all interactive behavior operable by keyboard.
- Provide clearly visible focus states and meaningful active navigation states.
- Use useful alternative text for informative images and empty alt text for decorative images.
- Verify adequate color contrast in every normal, hover, focus, disabled, success, and error state.
- Do not rely on color, motion, hover, or icon shape alone to communicate meaning.
- Provide accessible loading, validation, error, success, and empty states.
- Manage focus in the Back Office message modal; close it with its button, outside click, and Escape.
- Restore focus appropriately after closing a modal.
- Keep text readable, media responsive, and layouts free of horizontal overflow.
- Test at 320px, 768px, and at least one desktop width.
- Make the Back Office table usable on small screens.
- Respect the operating system’s reduced-motion preference.

## Rules for AI and Contributors

- Read this file and the relevant feature specification before changing feature code.
- Treat the grading checklist as the final authority.
- Do not invent missing personal content, projects, links, achievements, dates, or proficiency levels.
- Do not publish resume content until its verification gaps are resolved.
- Never expose Login or Back Office in public navigation.
- Never rely on a hidden URL as the security mechanism for Back Office.
- Never commit `.env`, private keys, service-role keys, administrator passwords, submission credentials, or the submission summary.
- Use only the two approved `VITE_*` environment variables in browser code.
- Do not replace Supabase with another backend or bypass RLS.
- Do not add optional features before required checkpoints pass.
- Do not introduce a dependency, route, page, data model, or external service that is not required or separately approved.
- Reuse the established design tokens and components.
- Add and maintain the required format-appropriate TOC whenever creating or modifying a file.
- Write comments that explain decisions and invariants rather than narrating obvious code.
- Use `:warning:` comments for known limitations, security constraints, and cross-system invariants.
- End every implementation handoff with exact staging commands and ready-to-run commit messages for only the relevant files.
- Preserve existing user changes and avoid unrelated file edits.
- Run lint and build at every feature checkpoint and report any remaining failures accurately.
- Explain material implementation decisions briefly in the relevant documentation.

## Branching and Delivery Workflow

- Create every feature branch from `dev` using the `feature/*` naming pattern.
- Commit focused work with clear messages.
- Merge completed feature branches into `dev` only after their checkpoint passes.
- Do not commit directly to `main`.
- Merge reviewed, stable `dev` into `main` for release.
- Only `main` is graded and deployed.
- The GitHub Pages workflow must continue to trigger only on pushes to `main` and deploy `dist/`.
- Post at least two progress updates each week, reply to coaches within 24 hours, and schedule the required coach review.

## How to Run and Test the Project

### Local Setup

1. Use a Node version supported by the installed Vite and Supabase packages. The deployment workflow currently selects Node 20; verify dependency engine compatibility before the Foundation checkpoint.
2. Install the exact locked dependencies:

   ```bash
   npm ci
   ```

3. Copy the placeholder variable names from `.env.example` into an ignored local environment file and supply the project’s public Supabase URL and anonymous key. Never put real values in `.env.example`.
4. Start the development server:

   ```bash
   npm run dev
   ```

### Automated Checks

Run both checks before every merge:

```bash
npm run lint
npm run build
```

Test the production bundle locally when needed:

```bash
npm run preview
```

For a clean checkpoint, run `npm ci`, lint, and build from a clean dependency installation without deleting source files or user work.

### Required Manual Checks

- Load and refresh every public hash route.
- Confirm Login and Back Office are absent from public navigation.
- Confirm direct unauthenticated Back Office access redirects without flashing data.
- Test valid, empty, and malformed contact submissions.
- Confirm pending contact submission prevents duplicates.
- Confirm success clears the form and failure preserves input.
- Test configured and missing-Supabase states.
- Verify anonymous users can insert but cannot select or delete messages.
- Verify the authenticated administrator can read newest-first messages, open the modal, delete deliberately, and log out.
- Verify session persistence after refresh.
- Test keyboard navigation, focus order, modal focus, Escape behavior, labels, alt text, contrast, and reduced motion.
- Test at mobile, tablet, and desktop sizes in current Chrome and at least one other browser.
- Verify all external links and the approved resume download.
- Smoke-test the deployed GitHub Pages URL while signed out.

## Deployment

- The site builds to `dist/`.
- GitHub Actions installs with `npm ci` and builds with `npm run build`.
- The build receives `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` through GitHub Actions secrets.
- GitHub Pages deploys only from the successful `main` workflow.
- The application must still render a controlled fallback if those variables are absent.
- After deployment, test the public URL, all hash routes, contact insertion, administrator access, RLS restrictions, links, and resume download.

## Global Definition of Done

The project is complete only when every item below is true or has documented coach approval:

- [ ] This main specification and all eight required feature specifications exist at their exact paths, contain no template instructions, and map rubric requirements to testable acceptance criteria.
- [ ] Every modified comment-capable source file has an accurate TOC banner, every Markdown document has an appropriate linked TOC, and important decisions or limitations use current why-comments and `:warning:` annotations.
- [ ] The implementation handoff reports verification and provides safe, exact staging commands and truthful ready-to-run commit messages for the relevant changes.
- [ ] All public content is verified, proofread, professional, and free of Vite starter text, lorem ipsum, unsupported claims, invented metrics, and unapproved private information.
- [ ] Home, Portfolio, Links, Contact, hidden Login, and protected Back Office routes work through `HashRouter` locally and on GitHub Pages.
- [ ] Header, footer, desktop navigation, mobile bottom navigation, logo link, focus states, and active states work consistently across public pages.
- [ ] Home includes the required introduction, three technical skills, three soft skills, three visual sections, and two relevant AI-created images.
- [ ] Portfolio includes complete reverse-chronological Education, Work, and Projects sections, two portfolio-specific AI-created images, and a valid approved resume download.
- [ ] Links contains at least three complete, responsive, accessible resource items and one relevant AI-created image.
- [ ] Contact rejects invalid input, prevents duplicates, inserts exactly one valid message, reports failures safely, preserves failed input, and resets after success.
- [ ] Missing Supabase configuration never crashes the application or exposes secrets.
- [ ] Login remains hidden, rejects invalid credentials safely, establishes a persistent valid session, and redirects correctly.
- [ ] Back Office protects private data, loads messages newest first, handles loading/error/empty states, opens an accessible full-message modal, deletes deliberately, updates immediately, and logs out fully.
- [ ] RLS allows anonymous insert only and restricts message selection/deletion to the authenticated administrator workflow.
- [ ] Required AI-created assets are documented, optimized, responsive, relevant, and accessible.
- [ ] The site passes keyboard, focus, labels, alt text, contrast, reduced-motion, overflow, modal, mobile, tablet, desktop, and cross-browser checks.
- [ ] `npm ci`, `npm run lint`, and `npm run build` pass from a clean installation.
- [ ] The README, pitch scripts, pitch feedback, CONCEPTS, approved resume, five challenge screenshots, reasoning notes, and required videos are complete and proofread.
- [ ] No secret, `.env`, administrator password, service-role key, or submission summary is tracked or present in Git history.
- [ ] Required feature branches have passed their checkpoints and followed the `feature/*` → `dev` → `main` workflow.
- [ ] The `main` GitHub Actions workflow succeeds and the deployed site passes the final signed-out smoke test.
- [ ] The untracked submission summary contains every required link and credential, all videos are Unlisted and viewable while signed out, and final coach review is complete.

Optional enhancements begin only after this required Definition of Done is satisfied.
