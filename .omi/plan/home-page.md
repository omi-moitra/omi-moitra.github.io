# Fantasy Portfolio — Product and Design Plan

This document extends `.omi/PROJECT_TASKS.md` with the approved creative direction. The project task list and grading checklist remain authoritative. If this document conflicts with either one, follow the project task list and grading checklist.

## Product goal

Create a memorable portfolio and resume site for Oishieka Moitra that:

- presents verified skills, experience, education, projects, and contact information;
- meets every Module 16 grading requirement;
- uses a polished fantasy identity built around soft pastels, mythical creatures, and storytelling;
- works accessibly and responsively on mobile, tablet, and desktop; and
- remains a static client-side application deployable through GitHub Pages.

## Required architecture

| Area | Decision |
| --- | --- |
| Application | React with Vite and JavaScript |
| Routing | `react-router-dom` with `HashRouter` |
| Styling | Existing CSS files and CSS custom properties; do not assume Tailwind or Styled Components |
| Backend service | Supabase only |
| Database | Supabase Postgres table named `messages` |
| Authentication | Supabase email/password authentication for the hidden administrator workflow |
| Hosting | GitHub Pages through the existing GitHub Actions workflow |
| Environment | `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only |

Do not add Express, MongoDB, Mongoose, a custom Node server, Vercel, Railway, or Render. Do not create separate `client/` and `server/` applications.

## Route map

Production URLs use a hash because GitHub Pages does not provide SPA path fallback handling.

| URL | Page | Navigation |
| --- | --- | --- |
| `/#/` | Home | Public |
| `/#/portfolio` | Portfolio, education, work history, projects, and resume | Public |
| `/#/links` | Curated external resources | Public |
| `/#/contact` | Contact form | Public |
| `/#/login` | Administrator login | Hidden; never shown in public navigation |
| `/#/back-office` | Message administration | Protected; never shown in public navigation |

There is no required standalone Resume route. Resume content and PDF controls belong on Portfolio. An additional route should be added only if its feature specification explicitly approves it and every required route still works.

## Information architecture

### Shared layout

- Use a `Main` layout around every public page.
- Show a sticky or fixed header with the logo and public links above 768px.
- At 768px and below, replace the desktop links with an icon-based bottom navigation.
- Show a footer on every public page with contact details, professional links, and copyright.
- Keep Login and Back Office out of the header, footer, mobile navigation, sitemap-style content, and visible calls to action.
- Provide visible keyboard focus, active navigation states, adequate contrast, and no horizontal overflow.

### Home

Use at least three visually distinct sections:

1. **Hero / introduction** — name, professional title, short introduction, a relevant AI-created fantasy image, and calls to action for Portfolio and Contact.
2. **Technical skills** — at least three verified technical skills, each with an icon and a meaningful supporting description.
3. **Soft skills / talents** — at least three verified soft skills, each with an icon and a meaningful supporting description.

The Home page must contain at least two relevant AI-created images in total. Optimize them for the web, provide useful alt text, and document the image tool and purpose. Decorative flourishes should use empty alt text or CSS rather than repetitive descriptions.

### Portfolio

Use at least three visually distinct sections:

1. **Education** — institution, program or degree, and dates, newest first.
2. **Work experience** — role, organization, dates, responsibilities, and achievements, newest first.
3. **Projects** — at least one project with name, technology, purpose, description, image, live link, and source link where applicable.

Treat Education and Work as the creative HTML resume. Add the approved standard resume PDF as the primary download. The PDF selector and optional creative PDF are specified in `.omi/plan/resume-switch.md`.

Portfolio needs at least two portfolio-specific AI-created images with useful alt text.

### Links

- Present at least three useful external resources as cards or structured items.
- Give every item an image, title, verified URL, and a 1–3 sentence description.
- Open external destinations in a new tab with `rel="noopener noreferrer"`.
- Include at least one relevant AI-created image with useful alt text.

### Contact

- Provide labeled Name, Email, and Message fields.
- Require every field and validate the email format before submission.
- Insert one valid submission into the Supabase `messages` table through `src/lib/supabaseClient.js`.
- Disable repeat submission while a request is pending.
- Show accessible validation, success, failure, and missing-configuration feedback.
- Reset the form only after a successful insert.
- Never expose message reads or deletes to anonymous visitors.

Friendly fantasy language such as “Send a raven” may accompany the form, but labels and feedback must remain immediately understandable.

### Hidden Login and Back Office

Follow the Login and Back Office phases in `.omi/PROJECT_TASKS.md` exactly:

- authenticate with Supabase, persist a valid session, and redirect correctly;
- protect message data before rendering the Back Office;
- provide loading, empty, failure, view, delete, and logout behavior; and
- rely on Row Level Security, not route obscurity, to secure private data.

## Visual system

### Light palette

| Token | Value | Primary use |
| --- | --- | --- |
| Lavender Mist | `#E8DCFF` | Main background |
| Peach Glow | `#FFD6C0` | Section accents |
| Mint Whisper | `#C5F0E0` | Cards and tags |
| Rose Quartz | `#FFB7C5` | Highlights and calls to action |
| Sky Soft | `#BFE3FF` | Hover states and links |
| Deep Amethyst | `#6B3FA0` | Headings and strong text |
| Body Ink | `#2A133F` | Body text where contrast passes |

Confirm contrast with the actual foreground/background pair. Adjust these values when necessary; the palette is not an exemption from accessibility requirements.

### Typography

- Headings: Cinzel or Playfair Display.
- Body: Nunito or Lato.
- Decorative accent: Great Vibes, used sparingly and never for essential instructions or long passages.
- Prefer locally hosted or carefully loaded web fonts with sensible system fallbacks.

### Motifs and interaction

- Use dragons, unicorns, phoenixes, constellations, scrolls, spell cards, and quest-tome motifs consistently rather than placing unrelated decorations everywhere.
- Keep body copy professional and recruiter-friendly even when labels contain light fantasy flavor.
- Motion must never be necessary to understand or operate the site.
- Respect `prefers-reduced-motion` and keep animation/blur costs reasonable on mobile.
- Do not add `tsparticles`, GSAP, Lottie, or Framer Motion merely because they appear in an idea. Add a library only when an approved feature needs it and CSS cannot meet the requirement cleanly.

### Dark mode

Dark mode is optional and begins only after every required feature passes its checkpoint. If implemented, follow the optional task in `.omi/PROJECT_TASKS.md` and use:

| Token | Value |
| --- | --- |
| Midnight Deep | `#0D0D2B` |
| Nebula Purple | `#1A0A3D` |
| Stardust Lavender | `#C8AAFF` |
| Moonbeam White | `#EDE8FF` |
| Ember Gold | `#FFD580` |
| Phoenix Glow | `#FF8C69` |
| Dragon Teal | `#5CF0D0` |

Persist the selection in `localStorage`, use the operating-system preference on the first visit, cover every component and feedback state, and recheck contrast in both themes. Prefer a lightweight CSS star field before adding a particle library.

## AI-created asset inventory

Minimum required inventory:

- one personal logo for the shared header;
- two relevant Home images;
- two portfolio-specific images; and
- one Links image.

The same asset should not be counted repeatedly where the rubric expects page-specific work. Record the generation tool, purpose, filename, and alt-text decision in the relevant specification or research document. Assets from stock SVG sites do not count as AI-created images unless they were actually generated for this project.

## Repository structure

Keep the existing root-level Vite structure:

```text
.
├── .github/workflows/deploy.yml
├── ai/
│   ├── ai-spec.md
│   └── features/
├── docs/
├── public/
│   └── assets/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

Use `public/assets/` for PDFs that need stable public URLs. Use `src/assets/` for images imported by React so Vite can fingerprint them.

## Delivery order

1. Verify personal content and obtain resume/LinkedIn approval.
2. Replace the AI specification templates with the nine required completed specifications.
3. Complete routing, Supabase, security, environment fallback, and GitHub Pages deployment.
4. Build the shared layout and responsive navigation.
5. Build Home, Portfolio, Links, and Contact against their acceptance criteria.
6. Build and secure Login and Back Office.
7. Finish documentation, videos, interview artifacts, final QA, and submission.
8. Only then consider the creative PDF selector, splash animation, dark mode, or other optional polish.

Every feature follows the required `feature/*` → `dev` → `main` workflow and must pass lint, build, responsive, and accessibility checks at its checkpoint.

## Definition of done

This design plan is fulfilled only when:

- all required content is real, verified, and free of starter placeholders;
- the fantasy treatment supports rather than obscures professional information;
- every required route and Supabase workflow meets `.omi/PROJECT_TASKS.md`;
- required AI-created assets are documented, optimized, responsive, and accessible;
- keyboard, reduced-motion, small-screen, failure, empty, and loading behavior has been tested;
- `npm run lint` and `npm run build` pass; and
- optional visuals have not displaced required grading work.
