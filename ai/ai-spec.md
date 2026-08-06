# AI Specification — Oishieka Moitra Fantasy Portfolio

## Table of Contents

- [Authority and Purpose](#authority-and-purpose)
- [Project Identity](#project-identity)
- [Goal and Scope](#goal-and-scope)
- [Users and Use Cases](#users-and-use-cases)
- [Phoenix Codex Plan Integration](#phoenix-codex-plan-integration)
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
4. The content and design extensions in `.omi/plan/`, especially `.omi/plan/PLAN.md`.

The current user request to implement the Phoenix Codex plan is represented by the
integration contract below. Where the plan proposes an alternate route or component
that conflicts with the grading checklist, preserve the rubric-required information
architecture and adapt the planned experience to it.

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
- Public Home, Journey, Projects, Links, and Contact pages.
- A shared public layout with a logo, desktop header navigation, mobile bottom navigation, and footer.
- The Phoenix Codex visual system: cozy fantasy as the primary world, street-art marks as secondary energy, cyberpunk glow as a restrained accent, and code as the underlying magic-system metaphor.
- A progressively enhanced Home vortex with a phoenix focal animation, a lightweight mobile composition, a static non-WebGL fallback, and a complete semantic HTML layer that loads first.
- Separate Journey and Projects experiences matching the plan's Phoenix Path and Crafted Worlds destinations.
- A glowing, selectable résumé timeline and a settled editorial project-media grid whose motion never blocks reading or interaction.
- Page-specific gradient currents, warm parchment surfaces, responsive performance budgets, and reduced-motion variants derived from the Phoenix Codex plan.
- A hidden Login page that is reachable directly but absent from public navigation.
- A protected Back Office page for authenticated message administration.
- A Supabase client with safe behavior when environment variables are missing.
- A Supabase Postgres `messages` table protected by Row Level Security.
- Anonymous contact-message insertion without anonymous read or delete access.
- Authenticated administrator login, session persistence, message reading, message viewing, message deletion, and logout.
- Verified personal content derived from the resume and other approved sources.
- Education, work experience, and a downloadable approved résumé on Journey, with verified project work on Projects.
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
- A standalone Resume route; the required résumé experience belongs on Journey.
- Skill percentages or proficiency claims not supported by verified content.
- Publication of a phone number, postal code, home address, private credential, or unapproved personal information.
- Dark mode, multiple languages, or multiple selectable themes until all required checkpoints pass and the enhancement has its own approved specification.
- Sound design, device-tilt controls, several simultaneous dragons, a content-management dashboard, and highly elaborate page-to-page 3D transitions for the initial launch.
- Animation or visual effects that make content harder to read, operate, or load.

## Users and Use Cases

- **Public visitor:** Browse Oishieka’s introduction, skills, education, experience, projects, resume, curated resources, contact details, and professional profile links.
- **Recruiter or hiring manager:** Quickly understand Oishieka’s professional positioning, verify relevant experience, inspect project work, and open or download the approved resume.
- **Contact-form sender:** Submit a name, valid email address, and message; receive clear validation, pending, success, failure, or missing-configuration feedback.
- **Authenticated administrator:** Sign in through the hidden Login route, retain a valid session across refreshes, view messages newest first, open a full message, delete a message deliberately, and log out.
- **Unauthenticated administrator visitor:** Be redirected from Back Office to Login without seeing private message data.
- **Developer or maintainer:** Run, lint, build, test, document, and deploy the project without needing a separate backend repository.

## Phoenix Codex Plan Integration

`.omi/plan/PLAN.md` is the creative source for the site's experience. Its guiding
statement is implemented as a hierarchy, not as a collection of equally loud styles:

1. **Cozy fantasy is the world.** Parchment, cream, ink, illustrated journals, maps,
   soft light, cards, and decorative borders define the persistent interface.
2. **Street art is secondary energy.** Brush strokes, ink splashes, arrows, energetic
   linework, and occasional oversized annotations add personality around content.
3. **Cyberpunk is an accent.** Glow appears on active states, timeline paths, code
   motifs, route gradients, particles, and small indicators; it does not become the
   page's dominant surface treatment.
4. **The phoenix is the guide and code is the magic system.** The phoenix represents
   growth and reinvention, the glowing path represents learning and career progress,
   crafted worlds represent projects, and code/rune motifs connect fantasy with the
   developer story.

### Required Route Model

The plan's thematic names are subtitles, never replacements for clear navigation
labels. Journey and Projects remain separate public routes:

| Clear public label | Thematic subtitle | Implementation destination |
| --- | --- | --- |
| Home | Enter the Codex | `/` |
| Journey | The Phoenix Path | `/journey` |
| Projects | Crafted Worlds | `/projects` |
| Links | Portals | `/links` |
| Contact | Send a Message | `/contact` |

Add both Journey and Projects to the primary navigation. Deep-linked project case
studies may be added later under `/projects/:slug` only after the core Projects route,
verified project data, and GitHub Pages refresh behavior pass. Until then, case-study
details belong in accessible in-page panels or dialogs.

### Progressive Delivery Contract

Implement the plan in layers so the professional content is never coupled to an
expensive visual effect:

1. **Foundation:** routing, shared shell, design tokens, typography, cards, buttons,
   gradient current, responsive behavior, focus states, and reduced-motion utilities.
2. **Content:** verified Home, Journey, Projects, Links, Contact, authentication, and Back
   Office behavior rendered as complete semantic HTML with optimized static images.
3. **Signature scenes:** Home vortex and phoenix, Journey depth and trail, and the
   Projects media-wall entrance, each loaded progressively with static fallbacks.
4. **Polish:** performance, keyboard and screen-reader checks, metadata, social image,
   favicon, cross-browser checks, and deployed-route verification.
5. **Post-launch only:** theme chooser, sound, device tilt, advanced 3D transitions,
   multiple dragons, and CMS-style project editing.

The readable interface must render before background texture, poster image, WebGL,
models, or particles. A failure at any enhancement layer must leave navigation,
content, forms, résumé actions, links, and authentication workflows usable.

## Feature Index — Links Only

- [`ai/features/setup-deploy.feature.md`](features/setup-deploy.feature.md)
- [`ai/features/styling.feature.md`](features/styling.feature.md) — supporting cross-feature visual-system contract
- [`ai/features/header-footer.feature.md`](features/header-footer.feature.md)
- [`ai/features/home-page.feature.md`](features/home-page.feature.md)
- [`ai/features/portfolio-page.feature.md`](features/portfolio-page.feature.md)
- [`ai/features/link-page.feature.md`](features/link-page.feature.md)
- [`ai/features/contact-page.feature.md`](features/contact-page.feature.md)
- [`ai/features/login-page.feature.md`](features/login-page.feature.md)
- [`ai/features/back-office.feature.md`](features/back-office.feature.md)

The eight rubric-required feature files plus this main file remain the nine required AI specification documents. `styling.feature.md` is an additional supporting contract that translates the Phoenix Codex plan into shared implementation rules; it does not replace any rubric-required feature file. Do not keep the placeholder `ai/features/feature-name.feature.md` after the required specifications are created.

The Setup & Deploy feature specification must not contain Supabase setup details, as directed by the rubric. Project-wide architecture may identify Supabase here, but feature-specific Supabase behavior and acceptance criteria belong in Contact, Login, and Back Office specifications.

## Pages, Screens, and Routes

The router must use `HashRouter`. Route paths inside React Router omit the hash, while deployed URLs include it.

| React Router path | Deployed URL | Access | Purpose |
| --- | --- | --- | --- |
| `/` | `/#/` | Public | Introduction, technical skills, and soft skills/talents |
| `/journey` | `/#/journey` | Public | Education, work experience, creative HTML résumé content, and approved résumé download |
| `/projects` | `/#/projects` | Public | Verified project grid and accessible case-study experiences |
| `/links` | `/#/links` | Public | At least three curated external resources |
| `/contact` | `/#/contact` | Public | Validated Supabase-backed contact form |
| `/login` | `/#/login` | Hidden public route | Administrator authentication; absent from all public navigation |
| `/back-office` | `/#/back-office` | Authenticated only | Private message list, message modal, deletion, and logout |

### Navigation Rules

- Home is the default route.
- Public navigation contains Home, Journey, Projects, Links, and Contact only.
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
- Include clear calls to action for Journey, Projects, and Contact.
- Present at least three technical skills with icons and meaningful descriptions.
- Present at least three soft skills or talents with icons and meaningful descriptions.
- Use at least three clearly separated visual sections.
- Include at least two relevant AI-created images.
- Progressively enhance the hero with the Enter the Codex vortex and a simplified
  mobile/static fallback while keeping all identity and actions in HTML.
- After required skills, include up to three verified featured projects, a Phoenix
  Path preview, and a final Contact invitation.

### Journey

- Show Education with institution, program or degree, and verified dates, newest first.
- Show Work Experience with role, organization, verified dates, responsibilities, and verifiable achievements where available, newest first.
- Keep essential resume information in semantic HTML rather than only inside a PDF.
- Provide a working open/download link for the approved `public/assets/resume-standard.pdf`.
- Use an accessible glowing timeline for education and work experience.
- Include Journey-specific visual assets required by its owning feature specification.

### Projects

- Show at least one project with name, technology, purpose, description, image, live link, and source link where applicable.
- Use a settled editorial media wall for verified project case studies.
- Include Projects-specific visual assets required by its owning feature specification.
- Treat three complete projects as the Phoenix Codex MVP target. Until three are
  supplied, render only verified entries and report the content gap openly.
- Journey may offer a separately approved creative résumé in addition to the required standard
  résumé; never let the optional file break the standard download.

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
- Optional verified project case-study fields: objective, role, architecture, design
  decisions, challenges, solutions, media, outcome, and next steps.
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
- `three` is permitted only for the approved Home vortex, Journey trail, and Projects
  media enhancements. Keep scene code route-scoped and lazy-loaded; do not make Three.js a
  prerequisite for first paint or semantic content.
- Framer Motion, particle libraries, Lottie, GSAP, Tailwind, and similar tools are not part of required scope.
- If an optional feature later justifies one of these tools, document the decision in that feature’s approved specification and retest performance, accessibility, lint, and build.

## Visual and Interaction Direction

### Phoenix Codex Palette

Use the plan's warm palette as the canonical color vocabulary. Keep the three groups
separate so foundation surfaces, quiet pastels, and bright magical accents cannot be
confused in implementation:

```javascript
export const phoenixCodexPalette = {
  foundation: {
    parchment: '#F5EBD8',
    softCream: '#FFF9ED',
    warmIvory: '#FFFDF6',
    agedPaper: '#E7D5B7',
    inkBlack: '#232126',
    charcoal: '#37323B',
    warmBrown: '#725E50',
  },
  pastels: {
    blushPink: '#F5B9C8',
    peachGlow: '#F6BE96',
    lavenderMist: '#C9B9F4',
    skyBlue: '#AFCFF2',
    mintLight: '#AEE3CE',
    butterGold: '#F4D889',
  },
  magic: {
    phoenixCoral: '#FF6559',
    solarOrange: '#FF963D',
    radiantGold: '#FFD34E',
    plasmaPink: '#F34DA0',
    arcaneViolet: '#8757E8',
    portalBlue: '#428BFF',
    spiritCyan: '#35D5DC',
    renewalGreen: '#43C98A',
  },
};
```

Implementation rules:

- Aim for approximately 65% cream/parchment/ivory, 20% ink/charcoal/brown,
  10% pastel color, and 5% bright magical glow.
- CSS custom properties mirror the JavaScript names in kebab case, such as
  `--parchment`, `--ink-black`, and `--phoenix-coral`.
- Use foundation colors first for large surfaces and readable text relationships.
- Use pastels for quiet section identity, framing, and illustration support.
- Do not use bright magical accents for small text without verifying contrast against
  the actual background.
- Active, hover, focus, success, warning, and error states must use more than color alone.
- Do not silently change a canonical hex value to solve contrast. Choose a different foreground/background pairing or add a documented derived state token.
- Existing source may still import the retired `phoenixPalette` vocabulary. Migrate the
  token module, CSS variables, imports, and tests together during the Foundation phase;
  do not maintain two competing canonical palettes or silently alias mismatched colors.

The palette never overrides accessibility; every rendered color pair must still pass the project’s contrast requirements.

### Suggested Gradients

Use these approved route color-stop sequences for the shared gradient current:

| Route | Token sequence | Suggested use |
| --- | --- | --- |
| Home | `softCream` → `phoenixCoral` → `blushPink` → `radiantGold` → `arcaneViolet` | Welcoming Codex energy |
| Journey | `radiantGold` → `phoenixCoral` → `plasmaPink` → `arcaneViolet` | Phoenix Path energy |
| Projects | `spiritCyan` → `arcaneViolet` → `plasmaPink` → `solarOrange` | Crafted Worlds energy |
| Links | `mintLight` → `spiritCyan` → `portalBlue` → `arcaneViolet` | Portal/resource energy |
| Contact | `peachGlow` → `blushPink` → `lavenderMist` → `butterGold` | Calm dispatch energy |

The default CSS custom properties are route-specific:

```css
:root {
  --gradient-home: linear-gradient(90deg, var(--soft-cream), var(--phoenix-coral), var(--blush-pink), var(--radiant-gold), var(--arcane-violet));
  --gradient-journey: linear-gradient(90deg, var(--radiant-gold), var(--phoenix-coral), var(--plasma-pink), var(--arcane-violet));
  --gradient-projects: linear-gradient(90deg, var(--spirit-cyan), var(--arcane-violet), var(--plasma-pink), var(--solar-orange));
  --gradient-links: linear-gradient(90deg, var(--mint-light), var(--spirit-cyan), var(--portal-blue), var(--arcane-violet));
  --gradient-contact: linear-gradient(90deg, var(--peach-glow), var(--blush-pink), var(--lavender-mist), var(--butter-gold));
}
```

Preserve each gradient’s token order. The angle may change when a component’s composition requires it, but document a non-obvious change. Use gradients selectively and verify text/icon contrast across the entire gradient, not just its darkest stop. When consistent contrast cannot be guaranteed, use the gradient decoratively and place content on a solid surface.

### Typography and Motifs

- Preferred heading direction: Cinzel or Playfair Display.
- Preferred body direction: Nunito or Lato with system fallbacks.
- Great Vibes may be used sparingly for decorative accents, never for instructions or long text.
- Use one readable literary display serif, one modern interface sans serif, and one
  sparingly applied monospace face for dates, technologies, and code annotations.
- Use coherent motifs such as phoenixes, restrained dragons, vortexes, maps, paths,
  codices, runes mixed with code, scrolls, and illustrated studio materials.
- Keep labels and feedback immediately understandable; fantasy phrases may supplement but not replace plain language.
- Do not let decorations compete with resume content or calls to action.

### AI-Created Assets

The minimum inventory is:

- one personal logo linked to Home;
- two relevant Home images;
- the Journey- and Projects-specific images required by their owning feature specifications; and
- one relevant Links image.

For each AI-created asset, document the generation tool, purpose, filename, optimization, and alt-text decision in the relevant feature specification or research file. Use empty alt text for purely decorative images. A stock asset does not count as AI-created merely because it was downloaded from an image library.

Assets generated before the Phoenix Codex palette migration remain valid provenance,
but must be visually reviewed against the warm hierarchy. Regenerate or recolor only
when an asset materially fights the cozy-fantasy direction; never rewrite historical
generation notes to imply a tool or prompt that was not actually used.

### Motion

- Motion must not communicate information that is unavailable without animation.
- Respect `prefers-reduced-motion`.
- Avoid excessive blur, particles, autoplay effects, and animation work on mobile.
- Desktop pointer movement may gently influence decorative scenes, but no content or
  control may require pointer tracking.
- Mobile scenes use at most half the desktop particle count, lower-resolution assets,
  no unrequested device-tilt access, and a static or lightly animated composition.
- Pause continuous scene work while it is outside the viewport and dispose renderer,
  texture, geometry, animation-frame, and listener resources on route unmount.
- Project cards may enter with slight rotation and varied frames, but must settle into
  a stable readable layout rather than drift continuously.
- Sound and the full-screen splash remain post-launch enhancements.

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
│   │   ├── layout/
│   │   ├── motion/
│   │   ├── three/
│   │   └── ui/
│   ├── data/
│   │   ├── navigation.js
│   │   ├── phoenixCodexPalette.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── timeline.js
│   ├── features/
│   │   ├── journey/
│   │   ├── projects/
│   │   └── contact/
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
- Keep route-scoped WebGL components in `src/components/three/` and small reusable
  motion/fallback utilities in `src/components/motion/`; lazy-load scene entry points.
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
- [ ] Home, Journey, Projects, Links, Contact, hidden Login, and protected Back Office routes work through `HashRouter` locally and on GitHub Pages.
- [ ] Header, footer, desktop navigation, mobile bottom navigation, logo link, focus states, and active states work consistently across public pages.
- [ ] Home includes the required introduction, three technical skills, three soft skills, three visual sections, and two relevant AI-created images.
- [ ] Home's Enter the Codex scene loads progressively, simplifies on mobile, pauses
  out of view, respects reduced motion, cleans up fully, and falls back to a poster.
- [ ] Journey includes complete reverse-chronological Education and Work sections plus a valid approved résumé download.
- [ ] Projects includes complete verified project entries and its required project-specific visual assets.
- [ ] Journey presents the accessible Phoenix Path timeline, and Projects presents a
  stable Crafted Worlds media grid with accessible case-study detail; neither route
  invents content to appear complete.
- [ ] Links contains at least three complete, responsive, accessible resource items and one relevant AI-created image.
- [ ] Contact rejects invalid input, prevents duplicates, inserts exactly one valid message, reports failures safely, preserves failed input, and resets after success.
- [ ] Missing Supabase configuration never crashes the application or exposes secrets.
- [ ] Login remains hidden, rejects invalid credentials safely, establishes a persistent valid session, and redirects correctly.
- [ ] Back Office protects private data, loads messages newest first, handles loading/error/empty states, opens an accessible full-message modal, deletes deliberately, updates immediately, and logs out fully.
- [ ] RLS allows anonymous insert only and restricts message selection/deletion to the authenticated administrator workflow.
- [ ] Required AI-created assets are documented, optimized, responsive, relevant, and accessible.
- [ ] The site passes keyboard, focus, labels, alt text, contrast, reduced-motion, overflow, modal, mobile, tablet, desktop, and cross-browser checks.
- [ ] The readable interface loads before scene enhancements; WebGL-disabled and
  reduced-motion checks preserve every required route, action, and workflow.
- [ ] No sound, device-tilt request, theme chooser, or continuously drifting project
  card ships in the initial release.
- [ ] `npm ci`, `npm run lint`, and `npm run build` pass from a clean installation.
- [ ] The README, pitch scripts, pitch feedback, CONCEPTS, approved resume, five challenge screenshots, reasoning notes, and required videos are complete and proofread.
- [ ] No secret, `.env`, administrator password, service-role key, or submission summary is tracked or present in Git history.
- [ ] Required feature branches have passed their checkpoints and followed the `feature/*` → `dev` → `main` workflow.
- [ ] The `main` GitHub Actions workflow succeeds and the deployed site passes the final signed-out smoke test.
- [ ] The untracked submission summary contains every required link and credential, all videos are Unlisted and viewable while signed out, and final coach review is complete.

Optional enhancements begin only after this required Definition of Done is satisfied.
