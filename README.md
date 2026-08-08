# Oishieka Moitra — Phoenix Codex Portfolio

A responsive full stack developer portfolio built as an accessible, fantasy-inspired React experience.

**Live site:** [omi-moitra.github.io](https://omi-moitra.github.io/)

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation / Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Author / Contributors](#author--contributors)

## Project Description

Phoenix Codex is Oishieka Moitra's personal portfolio for recruiters, collaborators, and other developers. It brings her profile, technical skills, professional journey, selected projects, learning resources, résumé, and contact options into one responsive site.

The visual design combines cozy fantasy, street-art linework, a restrained cyberpunk glow, and a phoenix journey motif. The site is a React single-page application with progressively enhanced Three.js scenes and static fallbacks. Supabase provides contact-message storage and authentication for a private administration area.

Key features include:

- Responsive desktop and mobile navigation with light, dark, and system themes.
- A professional timeline covering education and work experience.
- Project cards and individual, shareable case-study pages.
- A searchable collection of web-development resources and professional links.
- A validated contact form backed by Supabase.
- A hidden, session-protected back office for viewing and deleting messages.
- Keyboard navigation, visible focus states, reduced-motion support, semantic HTML, and WebGL fallbacks.

## Tech Stack

- **Frontend:** React 19, React Router 7, JavaScript, semantic HTML, and CSS.
- **Build tooling:** Vite 8 and the Vite React plugin.
- **3D graphics:** Three.js, loaded as a progressive enhancement.
- **Backend and database:** Supabase Auth, Postgres, and Row Level Security.
- **Code quality:** ESLint with React Hooks and React Refresh plugins.
- **DevOps:** GitHub Actions and GitHub Pages.

## Project Structure

```text
omi-moitra.github.io/
├── .github/workflows/       # GitHub Pages deployment workflow
├── ai/                      # Product specifications and feature requirements
├── public/                  # Static images, icons, résumé, SEO, and site files
├── src/
│   ├── assets/              # Images imported by the React application
│   ├── components/          # Shared UI, navigation, dialogs, and visual scenes
│   ├── data/                # Portfolio content, routes, projects, and resources
│   ├── hooks/               # Reusable interaction and accessibility hooks
│   ├── layouts/             # Shared application layout
│   ├── lib/                 # Supabase client configuration
│   ├── pages/               # Route-level page components and styles
│   ├── theme/               # Theme provider and context
│   ├── utils/               # Validation and error-reporting helpers
│   ├── App.jsx              # Application routes
│   └── main.jsx             # React and HashRouter entry point
├── supabase/messages.sql    # Message table, grants, and RLS policies
├── .env.example             # Safe public environment-variable template
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite and GitHub Pages configuration
```

## Installation / Setup

### Prerequisites

- Git.
- Node.js `20.19+`, `22.13+`, or `24+` (as required by the current Vite dependencies).
- npm, which is included with Node.js.
- A Supabase project if you want to use the contact form and administrator features.

### Run locally

```bash
# Clone the repository
git clone https://github.com/omi-moitra/omi-moitra.github.io.git

# Enter the project directory
cd omi-moitra.github.io

# Install the exact locked dependencies
npm ci

# Create a local environment file
cp .env.example .env

# Start the development server
npm run dev
```

Vite prints the local URL when it starts; it is typically `http://localhost:5173`.

To check and preview a production build:

```bash
npm run lint
npm run build
npm run preview
```

## Environment Variables

Add the following values to the root `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | The base URL of the Supabase project. Do not use a URL ending in `/rest/v1`. |
| `VITE_SUPABASE_ANON_KEY` | The project's low-privilege anonymous or publishable browser key. |

All variables prefixed with `VITE_` are embedded in the browser bundle and must be treated as public. Never use a Supabase service-role key, administrator password, or other secret here. If these variables are missing, the public portfolio remains available while Supabase-dependent features show a controlled unavailable state.

For a new Supabase project, run [`supabase/messages.sql`](supabase/messages.sql) in the Supabase SQL editor to create the `messages` table, permissions, and Row Level Security policies. Create the administrator account through Supabase Auth rather than storing credentials in this repository.

## Usage

The application uses `HashRouter`, so routes appear after `/#/` when deployed.

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Introduction, skills, strengths, and selected work. |
| `/journey` | Public | Education, experience, and downloadable résumé. |
| `/projects` | Public | Project gallery and case studies. |
| `/projects/:projectSlug` | Public | An individual project case study. |
| `/links` | Public | Searchable developer resources and professional profiles. |
| `/contact` | Public | Validated contact-message form. |
| `/login` | Hidden public route | Administrator authentication. |
| `/back-office` | Authenticated | Private message administration. |

The login and back-office routes are intentionally excluded from navigation. Route hiding is not the security boundary; Supabase authentication and Row Level Security protect private message data.

## API Documentation

This project does not expose a custom REST API. The browser uses the official Supabase JavaScript client for these operations:

| Operation | Access | Behavior |
| --- | --- | --- |
| Insert a `messages` row | Anonymous or authenticated | Submits validated `name`, `email`, and `message` values from the contact form. |
| Select `messages` rows | Authenticated only | Loads messages in the protected back office. |
| Delete a `messages` row by ID | Authenticated only | Removes a selected message after administrator confirmation. |
| Authenticate or sign out | Supabase Auth user | Creates or clears the administrator session. |

Database constraints repeat the client-side length and email checks. The full schema and access policy definitions are in [`supabase/messages.sql`](supabase/messages.sql).

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow installs locked dependencies with `npm ci`, builds the Vite application, uploads `dist/`, and deploys it to GitHub Pages.

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as GitHub Actions repository secrets before deploying Supabase-enabled features. Vite's `base` remains `/` because this repository is deployed as the root `omi-moitra.github.io` site.

## Author / Contributors

**Oishieka Moitra** — Full Stack Developer

- Portfolio: [omi-moitra.github.io](https://omi-moitra.github.io/)
- GitHub: [@omi-moitra](https://github.com/omi-moitra)
- LinkedIn: [Oishieka Moitra](https://www.linkedin.com/in/oishieka-moitra-6300181b7)
- Email: [omoitra@gmail.com](mailto:omoitra@gmail.com)
