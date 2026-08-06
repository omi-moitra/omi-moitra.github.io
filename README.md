# Oishieka Moitra — Phoenix Codex Portfolio

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Routes](#routes)
- [Technology](#technology)
- [Local Development](#local-development)
- [Environment](#environment)
- [Quality Checks](#quality-checks)
- [Deployment](#deployment)
- [Content and Privacy](#content-and-privacy)

## Overview

This repository contains Oishieka Moitra’s responsive full stack developer portfolio.
The Phoenix Codex visual direction uses cozy fantasy as its foundation, street-art
linework for energy, restrained cyberpunk glow for interaction, and a phoenix journey
to connect education, professional experience, and software work.

The application is a static React single-page application. Supabase is its only
external backend service and supports public contact submissions plus the protected
administrator message workflow.

## Features

- Accessible shared Header, Footer, desktop navigation, and mobile bottom navigation.
- Home introduction, technical skills, professional strengths, verified project
  previews, and a progressively loaded Three.js vortex over a static fallback.
- A separate Journey page with a selectable résumé timeline and progressive Three.js
  atmosphere, plus a focused Projects page with settled cards and accessible case studies.
- Curated developer resources plus separately labeled verified professional portals.
- Validated Supabase contact form with pending, success, error, configuration, and
  privacy feedback.
- Hidden administrator Login and session-protected Back Office for viewing and deleting
  messages.
- Keyboard support, visible focus, semantic HTML, responsive layouts, static WebGL
  fallbacks, and `prefers-reduced-motion` support.

## Routes

The deployed application uses `HashRouter`, so route state appears after `/#/`.

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home — Enter the Codex |
| `/journey` | Public | The Phoenix Path — education, experience, and résumé |
| `/projects` | Public | Crafted Worlds — verified projects and case studies |
| `/links` | Public | Resources and verified Portals |
| `/contact` | Public | Contact form — Send a Message |
| `/login` | Hidden public route | Administrator authentication |
| `/back-office` | Authenticated | Private contact-message administration |

Login and Back Office are intentionally absent from public navigation. Route hiding is
not a security boundary; Supabase authentication and Row Level Security protect private
message data.

## Technology

- React 19 and Vite 8
- React Router with `HashRouter`
- JavaScript, semantic HTML, and project CSS
- Three.js as a lazy-loaded progressive enhancement
- Supabase Postgres, Auth, and Row Level Security
- GitHub Actions and GitHub Pages

## Local Development

Requirements: a Node.js version compatible with the committed dependencies. The
deployment workflow uses Node 20.

```bash
npm ci
npm run dev
```

For a production-mode local preview:

```bash
npm run build
npm run preview
```

## Environment

Copy the variable names from `.env.example` into an ignored local `.env` file:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

`VITE_SUPABASE_URL` must be the project base URL (for example,
`https://your-project-id.supabase.co`), not a REST endpoint ending in `/rest/v1`.

Use only the low-privilege browser key. Never add a Supabase service-role key,
administrator password, or another secret to client code, `.env.example`, screenshots,
logs, or Git history. When configuration is absent, the app displays controlled
unavailable states instead of crashing.

## Quality Checks

```bash
npm run lint
npm run build
```

Before release, manually verify keyboard navigation, focus visibility, reduced motion,
WebGL-disabled fallbacks, 320px/768px/desktop layouts, safe external links, Contact
validation, authenticated route protection, and Supabase RLS behavior.

## Deployment

Pushes to `main` trigger the GitHub Pages workflow. The workflow installs locked
dependencies with `npm ci`, builds the application, and publishes `dist/`. Vite uses
`base: '/'` because this is a root `username.github.io` site.

## Content and Privacy

Publish only owner-approved résumé details, project claims, email, and professional
profile URLs. Phone numbers, detailed residential information, credentials, and private
contact submissions must remain unpublished. Additional projects and résumé files are
rendered only after their content and public assets have been verified.
