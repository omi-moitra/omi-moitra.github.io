# Phoenix Codex Portfolio — Product and Engineering Specification

## Table of Contents

- [Product Identity](#product-identity)
- [Experience Direction](#experience-direction)
- [Audience and Goals](#audience-and-goals)
- [Information Architecture](#information-architecture)
- [Public Content](#public-content)
- [Visual System](#visual-system)
- [Application Architecture](#application-architecture)
- [Core Workflows](#core-workflows)
- [Data and Security](#data-and-security)
- [Accessibility and Responsive Behavior](#accessibility-and-responsive-behavior)
- [Performance and Progressive Enhancement](#performance-and-progressive-enhancement)
- [Quality and Release Contract](#quality-and-release-contract)

## Product Identity

The site is Oishieka Moitra’s professional full stack developer portfolio. Its working
title is **The Phoenix Codex**: a living illustrated manuscript rebuilt as a modern web
application. It presents professional identity, technical skills, education, work
experience, projects, professional profile links, contact options, and a private contact-message
workflow in one responsive application.

The product balances an expressive personal identity with immediate recruiter-friendly
clarity. Standard labels such as Home, Journey, Projects, Links, and Contact remain
visible even when thematic subtitles are used.

## Experience Direction

The experience follows four coordinated visual roles:

1. **Cozy fantasy is the world.** Parchment, cream, illustrated cards, soft light,
   manuscript framing, maps, and magical-studio details establish the foundation.
2. **Street art is the energy.** Brush strokes, ink splashes, hand-drawn lines, arrows,
   and expressive framing add movement without replacing the fantasy atmosphere.
3. **Cyberpunk is the accent.** Portal blue, violet, cyan, gold, and route-specific glow
   appear in active states, trails, page currents, and small technical details.
4. **Code is the magic system.** Monospace annotations, circuit-like paths, structured
   interfaces, and progressive WebGL effects connect the story to software engineering.

The phoenix represents growth and reinvention. The dragon represents ambition and major
technical challenges. The vortex represents curiosity and entry into the portfolio. The
glowing path represents education, work, and continued development.

## Audience and Goals

Primary audiences are recruiters, hiring managers, collaborators, and professional
contacts. The site must let them:

- identify Oishieka as a Full Stack Developer quickly;
- understand her technical and transferable strengths;
- review education and professional experience;
- inspect verified project work and implementation decisions;
- open GitHub and LinkedIn profiles safely;
- download the approved résumé;
- submit a professional inquiry; and
- use the complete public experience without WebGL, sound, or pointer input.

The authenticated administrator must be able to sign in, retain a valid session, read
messages newest first, inspect full message content, delete deliberately, and sign out.

## Information Architecture

The application uses `HashRouter` so every deployed route remains compatible with
GitHub Pages.

| React route | Deployed URL | Access | Purpose |
| --- | --- | --- | --- |
| `/` | `/#/` | Public | Home and Phoenix Codex introduction |
| `/journey` | `/#/journey` | Public | Education, experience, and résumé |
| `/projects` | `/#/projects` | Public | Verified project collection |
| `/projects/:projectSlug` | `/#/projects/:projectSlug` | Public | Project case study |
| `/links` | `/#/links` | Public | Curated resources and professional profiles |
| `/contact` | `/#/contact` | Public | Validated message form |
| `/login` | `/#/login` | Hidden public route | Administrator authentication |
| `/back-office` | `/#/back-office` | Authenticated | Private message administration |

Compatibility redirects preserve `/portfolio` and `/about` to Journey, `/work` to
Projects, `/playground` to Links, and `/admin` or `/backoffice` to Back Office. Unknown
routes render a dedicated Not Found page.

Public navigation contains Home, Journey, Projects, Links, and Contact only. Login and
Back Office are absent from the Header, mobile drawer, Footer, resource lists, sitemap,
and public calls to action.

## Public Content

### Identity

- **Name:** Oishieka Moitra
- **Role:** Full Stack Developer
- **Public email:** `omoitra@gmail.com`
- **GitHub:** `https://github.com/omi-moitra`
- **LinkedIn:** `https://www.linkedin.com/in/oishieka-moitra-6300181b7`

The core positioning is: creating maintainable web applications with careful attention
to requirements, edge cases, and the people who use them. The professional narrative
connects JavaScript, React, Node.js, Express, MongoDB, SQL, RESTful APIs, role-based
authentication, testing, legal research, risk analysis, documentation, and clear
cross-functional communication. Unsupported metrics and unverified claims are not used.

### Skills

Home presents three technical groups:

- React and JavaScript;
- Node.js and Express; and
- databases, including MongoDB, SQL, MySQL, and DBeaver.

It presents three transferable strengths:

- problem solving and risk assessment;
- documentation and attention to detail; and
- cross-functional communication.

### Education and Experience

Journey presents education and work in deterministic reverse chronology while visual
trail coordinates remain independent from source order.

Education:

- University of Colorado Law School — Juris Doctor, 2024–Present;
- University of South Florida — B.S. Biomedical Sciences, 2019–Present.

Professional experience:

- Bay Area Legal Services — Law Clerk, 2025–2026;
- Wells, Anderson & Race, LLC — Summer Associate, 2021;
- Liberty National Life Insurance Company — Life Insurance Agent, 2019–2020;
- Varsity Tutors — Independent Contractor Tutor, 2018–2020.

The approved résumé is available at `/Oishieka-Moitra-Resume.pdf` with the download name
`Oishieka-Moitra-Resume.pdf`.

### Projects and Professional Links

The project inventory begins with the published Oishieka Moitra Fantasy Portfolio. Its
case study explains responsive React composition, `HashRouter`, semantic progressive
enhancement, Supabase contact storage and authentication, accessibility, and GitHub
Pages deployment. The data model supports additional verified projects without changing
page composition.

Links presents GitHub and LinkedIn as verified professional portals with visible names,
descriptions, and safe external-link behavior. The Footer repeats those destinations as
icon-only links alongside email.

## Visual System

The canonical palette has three groups:

- foundations: parchment, soft cream, warm ivory, aged paper, ink black, charcoal, and
  warm brown;
- pastels: blush pink, peach glow, lavender mist, sky blue, mint light, and butter gold;
- magical accents: phoenix coral, solar orange, radiant gold, plasma pink, arcane violet,
  portal blue, spirit cyan, and renewal green.

Warm foundation colors dominate major surfaces. Pastels create section identity.
Magical accents are reserved for focus, route currents, portal effects, timeline energy,
and small emphasis.

Typography uses WindSong for rare decorative display moments, Playfair Display for
editorial headings, Nunito/Lato/system sans-serif for body and controls, and a system
monospace stack for technical annotations. Remote font failure must leave readable text.

The theme system supports Light, Dark, and System choices. The choice persists under
`omi-portfolio-theme`, System follows `prefers-color-scheme`, and the resolved theme
updates `color-scheme` plus the browser theme-color metadata.

## Application Architecture

- React 19 and Vite 8 provide the application and build system.
- React Router supplies the single `HashRouter` boundary and nested route layout.
- Route-level lazy loading keeps Journey, Projects, Links, Contact, Login, Back Office,
  and Not Found code outside the initial Home route where practical.
- Three.js is limited to route-scoped atmospheric experiences. Semantic HTML contains
  all essential information and controls.
- CSS files own page-specific presentation and consume shared custom properties.
- Shared data modules own profile, navigation, resources, skills, résumé, and project
  records.
- One Supabase browser client owns environment parsing, Auth persistence, Postgres
  access, and configuration fallback behavior.

## Core Workflows

### Shared Navigation

The sticky Header contains a branded Home link, desktop navigation, theme controls, and
a small-screen Menu trigger. At widths below `64rem`, the Menu opens a modal drawer with
focus trapping, Escape/backdrop dismissal, background inertness, route links, and theme
controls. A route-specific animated gradient marks the active public section.

The Footer contains icon links for email, GitHub, and LinkedIn followed by the current
copyright line. The email icon uses `mailto:omoitra@gmail.com`; external profiles open in
a new tab with `noopener noreferrer`. Every icon link has an accessible name.

### Home and Journey

Home loads readable identity and skill content before the lazy Three.js vortex. A static
SVG/image composition remains available while WebGL loads or is unavailable. A glowing
journey spine, lotus markers, keyboard-scroll hint, project preview, and contact callout
guide visitors through the page.

Journey combines a decorative phoenix scene with semantic Education and Experience
lists. Selecting or focusing a milestone moves a lotus marker along the SVG path, opens
the associated details, scrolls/focuses deliberately, and adjusts the optional scene
camera. Arrow-key navigation and a reset path are available without making animation
essential.

### Hidden Lotus Gate and Login

Typing `lotus` on Home while focus is outside editable controls opens a full-screen
musical lotus dialog. Eight petals map clockwise to C4 (Sa), D4 (Re), E4 (Ga), F4 (Ma),
G4 (Pa), A4 (Dha), B4 (Ni), and C5 (Higher Sa). The accepted tap sequence is
`1 → 4 → 1 → 4 → 5 → 4 → 1`, producing C4, F4, C4, F4, G4, F4, C4.

Correct steps remain illuminated, an incorrect step fades and resets the flower, and a
complete melody opens a gold mandala and portal before navigating to `/login`. Ambient
sound and petal chimes use Web Audio, begin only after the typed interaction, and stop on
close, navigation, or unmount. The dialog traps focus, supports Escape and a close
button, exposes accessible petal names and progress, and respects reduced motion.

The gate controls discovery only. Direct `/login` access remains valid. Login checks for
an existing Supabase session before presenting visibly labeled email and password
controls. Valid credentials call `signInWithPassword` and navigate to Back Office.
Typing `flaws` outside credential controls returns to Home. No phrase, route, animation,
or sound grants authorization.

### Contact and Administration

Contact validates name, email, and message locally, uses a honeypot, prevents duplicate
submission through a synchronous ref guard, inserts only allowlisted fields, and reports
pending, validation, success, failure, and missing-configuration states accessibly.

Back Office mounts only after a persisted session and server-backed user check succeed.
It loads `id`, `name`, `email`, `message`, and `created_at` newest first, provides loading,
error, empty, table, full-message dialog, deletion confirmation, and sign-out states, and
never exposes raw provider errors or tokens.

## Data and Security

The browser receives only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Vite
variables are public bundle configuration and may never contain a service-role key,
administrator password, or another secret.

`public.messages` contains:

| Column | Contract |
| --- | --- |
| `id` | UUID primary key generated by Postgres |
| `name` | trimmed length 2–100 |
| `email` | trimmed length 3–254 and basic email format |
| `message` | trimmed length 10–2000 |
| `created_at` | timezone-aware timestamp defaulting to `now()` |

RLS is enabled. Anonymous and authenticated users may insert. Only authenticated users
may select or delete. Updates are not granted. Public signup remains disabled, and the
administrator is provisioned outside the public application.

Route hiding is never described as security. The protected route guard and RLS are
independent boundaries. Credentials, session tokens, private messages, raw service
errors, detailed residential information, and phone numbers are never published or
logged.

## Accessibility and Responsive Behavior

- Semantic landmarks, heading order, visible labels, native controls, and descriptive
  links form the baseline.
- A skip link moves focus to the main landmark without corrupting the route hash.
- Focus is visible, unclipped, and restored after modal dismissal where possible.
- Modal drawers, message dialogs, confirmation dialogs, and the lotus gate trap focus,
  support Escape when dismissal is safe, and prevent background interaction.
- Decorative canvas, particles, icons, and generated backgrounds are hidden from
  assistive technology; meaningful images have concise alt text.
- Status and error feedback uses live regions or alerts and never relies on color alone.
- Layouts support 320px phones, tablets, desktop widths, keyboard use, touch, and 200%
  zoom without horizontal page overflow.
- `prefers-reduced-motion` removes or settles nonessential animation. Essential content
  and controls never depend on pointer tracking, WebGL, audio, or motion.
- Forced-colors mode retains controls, focus, links, and selected state.

## Performance and Progressive Enhancement

Readable HTML renders before atmospheric canvases. Home and Journey scenes load lazily,
use reduced particle budgets on compact screens, pause or settle when the document is
hidden, and dispose Three.js resources on unmount. Responsive image variants reserve
dimensions and avoid loading desktop assets when a smaller source is suitable.

Failed fonts, generated images, WebGL, sound, Supabase configuration, or network access
must degrade to a readable and recoverable interface. Scene code cannot own navigation,
copy, forms, authentication, or private data.

## Quality and Release Contract

Before release:

- `npm ci`, `npm run lint`, and `npm run build` pass;
- all defined hash routes load and refresh through GitHub Pages;
- keyboard, focus, screen-reader naming, reduced motion, forced colors, zoom, and common
  viewport checks pass;
- WebGL-disabled and sound-blocked checks preserve complete workflows;
- Contact, Login, Back Office, sign-out, and RLS behavior are verified against the
  production Supabase project;
- public copy, résumé content, profile URLs, screenshots, and project claims are owner
  approved;
- external links use HTTPS and safe new-tab attributes;
- no `.env`, password, token, private message, service-role key, or submission credential
  is tracked; and
- the `main` GitHub Actions workflow publishes `dist` successfully.
