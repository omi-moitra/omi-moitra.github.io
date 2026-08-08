# Feature Specification — Journey and Projects

## Table of Contents

- [Goal](#goal)
- [Route Separation](#route-separation)
- [Journey Content](#journey-content)
- [Journey Interaction](#journey-interaction)
- [Journey Scene and Artwork](#journey-scene-and-artwork)
- [Résumé Download](#résumé-download)
- [Projects Content](#projects-content)
- [Project Collection and Detail](#project-collection-and-detail)
- [Responsive and Accessible Behavior](#responsive-and-accessible-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Present professional history and software work as related but distinct stories. Journey
explains the education and experience that shape Oishieka’s approach. Projects gives
verified software work its own focused collection and case-study routes.

## Route Separation

- `/journey` owns the Phoenix Path, Education, Experience, and résumé.
- `/projects` owns Crafted Worlds and the project collection.
- `/projects/:projectSlug` owns one project case study.
- `/portfolio` and `/about` redirect to Journey.
- `/work` redirects to Projects.

Journey and Projects have distinct Header currents, metadata, page headings, visual
treatments, and lazy route bundles. They share verified project data but do not merge
into a combined Portfolio page.

## Journey Content

The introduction connects full stack development with legal research, risk analysis,
precise documentation, and cross-functional communication.

### Education

| Institution | Program | Location | Dates |
| --- | --- | --- | --- |
| University of Colorado Law School | Juris Doctor (J.D.) | Boulder, Colorado | 2024–Present |
| University of South Florida | B.S., Biomedical Sciences | Tampa, Florida | 2019–Present |

### Professional experience

| Organization | Role | Location | Dates |
| --- | --- | --- | --- |
| Bay Area Legal Services | Law Clerk | Tampa, Florida | 2025–2026 |
| Wells, Anderson & Race, LLC | Summer Associate | Denver, Colorado | 2021 |
| Liberty National Life Insurance Company | Life Insurance Agent | Tampa, Florida | 2019–2020 |
| Varsity Tutors | Independent Contractor Tutor | Tampa, Florida | 2018–2020 |

Responsibilities emphasize document drafting/review, risk identification, structured
research, requirement clarification, accurate records, compliance, planning, and clear
explanation. Claims remain qualitative and owner-approved; no invented metrics appear.

Education and experience exports are sorted newest first without mutating their source
records. Visual trail coordinates control presentation only and never determine semantic
chronology.

## Journey Interaction

A curved SVG path runs through the Journey artwork. Each semantic timeline entry has a
native button milestone and associated detail content. Selecting a milestone:

1. sets the selected entry;
2. focuses and scrolls its trigger into view;
3. animates the lotus marker to the nearest point on the SVG path;
4. opens the corresponding details; and
5. gives the optional Three.js camera a route-specific focus point.

The nearest path point is calculated by sampling the path length. Travel uses an eased
900-millisecond animation unless reduced motion requests an immediate update. Preview
and selected states are distinct so pointer hover/focus never removes a pinned choice.

Arrow-key controls move through timeline entries while ignoring editable controls and
modified shortcuts. Reset clears the selection, returns the lotus/camera to the intended
resting view, and preserves semantic content.

## Journey Scene and Artwork

Journey layers a generated phoenix illustration, a semantic timeline, SVG path/lotus,
and a lazy decorative `PortfolioExperience` canvas. The Three.js scene uses an image
plane, registered gold trail, particles, scroll progress, pointer parallax, selected
milestone camera focus, visibility handling, compact particle counts, and complete
resource disposal.

The generated phoenix background is decorative because every professional fact exists in
HTML. If Three.js fails, the background and complete timeline remain.

## Résumé Download

Journey includes a visible native download link:

```text
href: /Oishieka-Moitra-Resume.pdf
download: Oishieka-Moitra-Resume.pdf
label: Download Resume
```

The public PDF is the approved standard résumé. Its URL and filename remain stable so
external bookmarks and recruiter downloads survive content updates. A second creative
résumé is not required.

## Projects Content

The verified inventory begins with:

### Oishieka Moitra Fantasy Portfolio

- **Status/year:** Published, 2026
- **Roles:** Portfolio Owner, Designer, Full Stack Developer
- **Technologies:** React, Vite, JavaScript, React Router, CSS
- **Categories:** Portfolio, Frontend, Accessibility
- **Live URL:** `https://omi-moitra.github.io`
- **Repository:** `https://github.com/omi-moitra/omi-moitra.github.io`

The case study describes a responsive Phoenix Codex, static GitHub Pages constraints,
semantic progressive Three.js enhancement, separate Journey and project routes, the
validated Supabase contact workflow, hidden Login, protected administration, and
accessibility decisions. Empty metrics and galleries do not render. No screenshot is
claimed until a verified cover image is supplied.

The inventory is data-driven and supports additional owner-verified projects later. A
single complete verified project is preferable to placeholder cards or invented work.

## Project Collection and Detail

`/projects` renders a stable card collection with title, thematic subtitle, summary,
technologies, case-study route, and available live/source actions. The code-scroll
generated illustration supports the page atmosphere but is decorative where the same
ideas exist in copy.

Each card links to `/projects/:projectSlug`. The detail route resolves by slug, presents
overview, challenge, solution, outcome, process, lessons, roles, technologies, and safe
external links, and returns Not Found behavior for an unknown slug. External links open
safely and make their destination clear.

## Responsive and Accessible Behavior

- Journey and project headings follow one logical hierarchy per page.
- Timeline controls are native buttons with selected/expanded relationships.
- Tooltip/detail content is available through focus and click, not hover alone.
- Desktop branches and compact single-column timeline layouts preserve DOM order.
- Project cards settle into stable readable positions after any entrance effect.
- Generated decoration and canvas are silent to assistive technology.
- Focus, selected state, dates, tags, links, and borders remain distinguishable in both
  themes and forced colors.
- Both routes support 320px, tablet, desktop, 200% zoom, reduced motion, keyboard, touch,
  WebGL-disabled browsing, and direct hash-route refresh.

## Acceptance Contract

- Journey and Projects remain separate canonical routes.
- Every listed education/experience entry renders with its approved dates and details.
- Selecting a milestone moves the lotus and reveals the matching semantic content.
- Reduced motion makes lotus/camera updates immediate.
- The approved résumé downloads from the stable public URL.
- Projects renders exactly the verified inventory and no placeholders.
- The fantasy portfolio case study and external destinations resolve correctly.
- Unknown project slugs fail safely.
- Neither scene nor generated artwork is required to read, navigate, download, or open a
  case study.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Journey and Projects
- **Related Area:** Frontend / Professional Portfolio

## Feature Goal

Present verified education, experience, résumé, and project evidence through separate
but related Journey, Projects, and project-detail routes.

## Feature Scope

### In Scope (Included)

- Journey timeline/content, milestone interaction, optional phoenix scene, résumé
  download, project collection, slug-based case studies, verified external links, and
  compatibility redirects.

### Out of Scope (Excluded)

- Invented work, placeholder cards, unsupported metrics, editable résumé content,
  unverified galleries, and required Three.js interaction.

## Sub-Requirements (Feature Breakdown)

- Keep Journey and Projects as separate canonical routes and bundles.
- Render approved education/experience newest first with accessible selection behavior.
- Provide the stable approved résumé download.
- Render only verified project records and resolve detail pages safely by slug.
- Preserve full content without canvas or generated art.

## User Flow / Logic (High Level)

1. A visitor opens Journey to review chronological education and experience.
2. Optional milestone selection coordinates details, lotus position, and scene focus.
3. The visitor downloads the résumé or opens Projects.
4. A project card opens its case study and verified live/source destinations.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`JourneyPage`, `ProjectsPage`, `ProjectPage`, timeline and résumé components,
`PortfolioExperience`, `ProjectCard`, and shared portfolio/project data.

### Backend / API

None. The routes read approved static content and public files only.

## Data Used or Modified

Education, experience, project records, route slug, selected milestone, visual path
position, and scene focus. Source records remain immutable.

## Tech Constraints (Feature-Level)

Use semantic chronological content, native buttons/links, stable public résumé URL,
safe external anchors, lazy scenes, reduced-motion handling, and Not Found fallback.

## Acceptance Criteria

- [ ] Journey and Projects remain distinct and refreshable.
- [ ] Approved history and résumé download are complete and correctly ordered.
- [ ] Timeline selection works with keyboard, touch, and reduced motion.
- [ ] Only verified projects render and valid case-study slugs resolve.
- [ ] Unknown slugs and optional-scene failures remain safe.

## Notes for the AI

Do not merge the routes, infer chronology from visual coordinates, invent portfolio
claims, change the résumé URL casually, or make scene state the only source of content.
