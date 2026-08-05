# Feature Specification — Portfolio Page

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
- [Approved Draft Content](#approved-draft-content)
- [User Flow and Expected Behavior](#user-flow-and-expected-behavior)
- [Interfaces](#interfaces)
- [Data and Validation](#data-and-validation)
- [Technical Constraints](#technical-constraints)
- [Implementation Decisions](#implementation-decisions)
- [Acceptance Criteria](#acceptance-criteria)
- [Verification Plan](#verification-plan)
- [Warnings and Known Limitations](#warnings-and-known-limitations)
- [Notes for AI and Contributors](#notes-for-ai-and-contributors)

## Feature Identity

- **Feature name:** Portfolio Page
- **Related area:** Education, professional experience, project work, downloadable résumé, visual storytelling, responsive layout, and accessibility
- **Specification path:** `ai/features/portfolio-page.feature.md`
- **Required branch:** `feature/portfolio-page`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing foundation from `ai/features/setup-deploy.feature.md` and shared layout from `ai/features/header-footer.feature.md`
- **Primary users:** Recruiters, hiring managers, collaborators, coaches, and other public visitors

## Feature Goal

Create a public Portfolio page that combines the plan's “The Phoenix Path” journey and
“Crafted Worlds” projects in the rubric-required Portfolio route. Verified education,
professional experience, and projects remain readable semantic HTML, supported by an
approved downloadable résumé. Three.js progressively enhances the existing full-page
phoenix-journey illustration with image depth, mist, golden particles, and restrained
scroll movement without replacing the source artwork or blocking the static experience.

After this feature is complete:

- `/#/portfolio` renders the Portfolio page through React Router;
- Education, Work Experience, and Projects appear as three clearly separated sections;
- Education and work entries are displayed newest first;
- the phoenix-journey artwork fills the Portfolio canvas behind readable content surfaces;
- education and work entries share one curved résumé trail derived from `.omi/Untitled.png`, with milestone tooltips branching left or right on wide screens and a left-aligned trail on narrow screens;
- scrolling moves the visitor forward through a rendered Three.js environment with subtle pointer parallax;
- the page title appears directly over the upper-left of the phoenix image in pale gold without a surrounding hero card;
- résumé years remain visible as trail points whose anchored detail tooltips open through hover, focus, click, or tap;
- a settled editorial media wall presents at least three complete, truthful project
  case studies once their content and URLs are verified;
- visitors can open or download an approved PDF résumé;
- visitors can download clearly labeled Standard and Creative résumé files once each
  has passed its separate publication review;
- at least two Portfolio-specific AI-created images complement the résumé content; and
- the page remains readable, operable, and visually intentional from 320px through desktop widths.

## Feature Scope

### In Scope — Included

- Portfolio at React Router path `/portfolio` and deployed hash URL `/#/portfolio`.
- A concise page introduction that explains the relationship between software development and Oishieka's professional background.
- A pale-gold upper-left page title and lightweight introduction placed directly over the image without a hero card.
- An Education section with at least one complete entry.
- A Work Experience section with at least one complete entry and responsibility descriptions.
- A Projects section targeting at least three complete verified project cards and case-study detail panels.
- Reverse-chronological ordering for Education and Work Experience.
- A full-page `portfolio-phoenix-journey.jpg` background that establishes the Portfolio journey motif.
- A single wireframe-derived curved path descending from the upper-right phoenix toward the lower-left page edge.
- Education and Work Experience milestones positioned together along that glowing responsive phoenix trail.
- A decorative Three.js WebGL canvas that renders the existing journey image itself.
- Scroll-driven image depth, restrained pointer parallax, mist, golden particles, and a glow registered to the painted phoenix trail.
- Progressive milestone reveals that never hide content when JavaScript, WebGL, or Intersection Observer support is unavailable.
- Interactive year points with anchored résumé tooltips, click/tap pinning, keyboard operation, and Escape dismissal.
- One shared coordinate set for the curve, moving particle stroke, and tooltip anchors so every milestone sits directly on the illuminated path.
- The current Oishieka Moitra Fantasy Portfolio as a concrete project entry.
- A controlled media-wall entrance in which varied frames settle into a stable
  responsive grid; project cards never drift continuously.
- Accessible in-page case-study panels containing overview, objective, role,
  technologies, architecture, decisions, challenges, solutions, media, outcome,
  repository/demo links, and honest next steps where verified.
- A project preview image that represents the actual rendered website.
- A working link for the approved public résumé at `public/assets/resume-standard.pdf`.
- At least two relevant Portfolio-specific images created with an AI image tool.
- Documentation of each AI image's generation tool, purpose, filename, optimization, placement, and alt-text decision.
- Semantic headings, lists or articles, meaningful link text, keyboard support, visible focus, image alternatives, adequate contrast, and reduced-motion behavior.
- Responsive timelines, grids, cards, and calls to action.
- Data-driven rendering for repeated education, work, and project entries.
- Phoenix Codex parchment, ink, pastel, magical-accent, and Portfolio-gradient tokens.
- Graceful behavior when optional artwork or a project preview fails to load.

### Out of Scope — Excluded

- Header, Footer, personal logo, desktop navigation, or mobile bottom-navigation implementation.
- Home skills and introduction content.
- Links-page resources.
- Contact form fields, validation, Supabase insertion, or submission feedback.
- Login, Back Office, authentication, message data, deletion, or logout.
- Any Supabase query or backend operation.
- A standalone `/resume`, `/education`, `/experience`, or `/projects` route.
- Public top-level Journey or Projects routes and unverified project filters/categories.
- A PDF viewer dependency or embedded third-party document service.
- Skill percentages, invented metrics, unverified achievements, or unsupported proficiency claims.
- Publishing the source PDF directly from `.omi`.
- Publishing the résumé phone number, detailed residential information, credentials, or private data without explicit approval.
- Treating the Header logo or Home images as either of the two required Portfolio AI images.
- Treating a website screenshot as AI-created unless it was actually generated with an AI image tool.
- A new UI framework, icon library, animation library, timeline package, or PDF package solely for Portfolio.
- Timed prompts, personality sorting, branching decisions, animal outcomes, quizzes, or result-calculation logic.
- Automatically playing audio or audio required to understand the résumé.
- Any sound design at initial launch; the plan explicitly defers sound until after launch.

## Requirements Breakdown

### Requirement 1 — Portfolio Route and Page Introduction

- Replace the setup placeholder at React Router path `/portfolio` with the Portfolio page component.
- Render the page at deployed hash URL `/#/portfolio` inside the shared `Main` layout.
- Direct loading and refreshing of `/#/portfolio` must work on GitHub Pages.
- Use one page-level `<h1>` such as “Portfolio & Experience.”
- Place the `<h1>` in the upper-left of the image canvas using a pale-gold token-derived color, readable text shadow, and no card surface, border, or backdrop panel.
- Add a short introduction that frames the page accurately and avoids unsupported claims.
- Keep the introduction in HTML so it remains readable without downloading the résumé.
- Do not create nested Portfolio routes or use imperative location changes for normal navigation.

### Requirement 2 — Education Section

- Use a section-level `<h2>` such as “Education.”
- Render at least one educational institution.
- Every education entry includes:

  - a unique stable identifier;
  - institution name;
  - degree or program;
  - display dates; and
  - optional location only when approved.

- Order entries by starting date descending, with the most recently started program first.
- Present each entry as a visible year point on the phoenix trail.
- Open the complete semantic education entry in an anchored tooltip panel when its point is hovered, focused, clicked, tapped, or keyboard-activated.
- Display dates as human-readable content rather than relying on JavaScript locale output.
- Preserve “Present” only after Oishieka verifies that current enrollment is accurate.
- Do not add grades, honors, concentrations, activities, or graduation dates that do not appear in an approved source.

### Requirement 3 — Work Experience Section

- Use a section-level `<h2>` such as “Professional Experience.”
- Render at least one work experience entry.
- Every work entry includes:

  - a unique stable identifier;
  - role or title;
  - organization;
  - display dates;
  - optional approved location; and
  - one or more responsibility or achievement statements.

- Order entries by starting date descending, with the most recently started role first.
- Continue the same interactive year-point and anchored-tooltip treatment used by Education so the résumé reads as one professional journey.
- Use semantic lists for multiple responsibility statements.
- Present responsibilities accurately and concisely without turning them into invented outcomes.
- Add quantified achievements only when Oishieka supplies a verifiable source.
- Avoid implying that legal or insurance roles were software-development positions.

### Requirement 4 — Project Section

- Use a section-level `<h2>` such as “Projects” with the optional thematic subtitle “Crafted Worlds.”
- Render at least three projects as articles or accessible cards before claiming the
  Phoenix Codex MVP complete. The grading minimum remains one complete project, but
  empty or invented cards never count toward either threshold.
- Every project entry includes:

  - a unique stable identifier;
  - project name;
  - technology list;
  - concise purpose;
  - description explaining what the project is about;
  - representative image with an appropriate alt-text decision;
  - verified live URL; and
  - verified source URL when a public repository exists.

- Use the current portfolio website as the initial project entry because it is real, verifiable, and directly represented by this repository.
- Open external live and source links in a new tab with `rel="noopener noreferrer"`.
- Label the links clearly, such as “Visit live site” and “View source on GitHub.”
- Do not present a future feature as already complete; describe only behavior that exists when the project card is published.
- Use a real screenshot or representative capture of the implemented site for the project image.
- Let cards enter with slight rotation, varied scale, and paper/photo/poster framing,
  then settle into a stable editorial grid. Do not continue floating or drifting.
- Each verified project opens an in-page case-study panel or dialog with: overview,
  problem/objective, role, technologies, architecture, design decisions, challenges,
  solutions, screenshots/video, outcome, repository, live demo, and honest next steps.
- Omit an unavailable case-study field instead of filling it with generic copy.

### Requirement 5 — Downloadable PDF Résumés

- Publish only an approved public résumé at `public/assets/resume-standard.pdf`.
- Provide a clearly labeled download link using the browser's native `download` behavior.
- Provide an open/view link if useful, but do not require an embedded PDF viewer.
- Use link text that identifies the file and action, such as “Download résumé (PDF).”
- Ensure the link remains keyboard accessible and receives visible focus.
- Verify the deployed response is a valid PDF rather than the SPA HTML fallback.
- Verify the filename is meaningful when downloaded.
- Keep Education, Work Experience, and Projects in HTML; the PDF supplements rather than replaces page content.
- Do not copy `.omi/Oishieka_Moitra_-_Full_Stack_Developer.pdf` into `public` until Oishieka approves its content for public distribution.
- When a separately reviewed creative version exists, publish it at
  `public/assets/resume-creative.pdf` and label the actions explicitly “Download
  Standard Résumé” and “Download Creative Résumé.”
- Keep the Standard résumé action available independently; a missing creative file
  must not hide or break the required standard download.
- Place résumé actions near the top of the Portfolio content and repeat them near the
  end when both remain unambiguous and do not create a misleading selector.

### Requirement 6 — Three Distinct Visual Sections

- Portfolio contains at least these three primary sections:

  1. Education;
  2. Professional Experience; and
  3. Projects.

- Treat the page introduction and résumé call to action as supporting content, not replacements for the three required sections.
- Separate sections with intentional spacing, surface changes, borders, approved gradients, or decorative dividers.
- Maintain a clear narrative from learning → applied professional experience → built work.
- Use a consistent maximum-width container while allowing non-essential decorative backgrounds to extend farther when they do not cause overflow.
- Avoid presenting all content as one undifferentiated card or continuous text block.

### Requirement 7 — Two Portfolio-Specific AI-Created Images

- Include at least two images generated using an AI image tool specifically for Portfolio.
- The Header logo, Home images, favicon, project screenshot, and unmodified stock images do not count toward this two-image minimum.
- Both images must complement résumé content or the phoenix/code professional journey.
- Required image roles:

  1. `portfolio-phoenix-journey.jpg` — the full-page visual canvas connecting education, professional analysis, and software development; and
  2. `portfolio-code-scroll.jpg` — a supporting illustration combining precise documentation with modern code motifs.

- Do not place required dates, organizations, degrees, job titles, project details, or calls to action only inside image pixels.
- Optimize images for their rendered dimensions before committing.
- Provide intrinsic dimensions or CSS aspect ratios to reduce layout shift.
- Lazy-load below-the-fold images where appropriate.
- Give informative images concise, useful alt text.
- Use empty alt text when an image is purely decorative and nearby HTML communicates the same meaning.
- Record the actual generation tool and final asset details before marking the feature complete.

### Requirement 8 — Phoenix Visual Direction

- Use the exact canonical `phoenixCodexPalette` token names and values from `ai/ai-spec.md`.
- Reuse the shared kebab-case CSS custom properties instead of redefining competing colors.
- Use the approved Portfolio gradient current in this exact order: `radiantGold` →
  `phoenixCoral` → `plasmaPink` → `arcaneViolet`.
- Keep parchment/cream content surfaces and ink text dominant; use street-art framing
  around projects and cyberpunk glow chiefly for trail, focus, and selected states.
- Use `portfolio-phoenix-journey.jpg` as the full Portfolio-page background; do not repeat it as a separate hero image.
- Place a restrained radiant-gold/phoenix-coral trail glow over the background so résumé milestones visually follow the illustrated trail.
- Use Three.js to render the existing phoenix image as a responsive plane between the static fallback background and HTML content.
- Register the generated glow curve to normalized coordinates along the golden trail already painted into the image so it stays aligned through viewport resizing and cover crops.
- Add only image-depth movement, mist, and golden particles; do not generate a replacement forest or a second visual environment.
- Move the Three.js camera forward according to document scroll progress and add restrained pointer parallax without making pointer input necessary.
- Keep the WebGL environment decorative and non-interactive in the accessibility tree; all résumé information remains semantic HTML.
- Place primary text on stable solid surfaces when contrast cannot be guaranteed across a gradient.
- Treat the page title as the intentional exception: place it directly over the dark upper-left image area in pale gold with a strong token-based text shadow instead of a card.
- Use a restrained timeline, path, scroll, or chapter motif only when it preserves scanning and reading order.
- Keep professional content dominant; fantasy terminology may support visual character but must not replace clear section labels.

### Requirement 9 — Responsive Layout

- At desktop widths, position year controls at explicit points along the curved wireframe trail and anchor each tooltip on its approved left or right branch while preserving newest-first DOM order within each semantic group.
- At narrow widths, keep year controls on a left-aligned trail and open every tooltip panel in the single content column to their right.
- Let the journey background cover the Portfolio canvas on wide screens; use a stable scroll-positioned treatment on mobile where fixed backgrounds are unreliable.
- Keep the page within the viewport at 320px, 768px, 769px, and desktop widths.
- Ensure dates, organization names, degree names, technology labels, and URLs wrap without clipping.
- Scale images while preserving aspect ratio.
- Keep résumé and project links usable when wrapped or stacked.
- Reserve enough bottom space for the shared mobile navigation at 768px and below.
- Do not use fixed heights that clip responsibility lists or enlarged text.
- Preserve readable line lengths and spacing at 200% zoom.
- Do not rely on visual left/right alternation to establish chronological order.
- Cap renderer pixel density to protect performance on high-density displays.

### Requirement 10 — Accessibility and Semantics

- Use one page-level `<h1>` and logical `<h2>` and `<h3>` descendants.
- Use `<section>` for major content areas and `<article>` or list structures for repeated entries.
- Use `<time>` with valid `datetime` values only when the source dates are sufficiently precise; otherwise render verified display text without false machine precision.
- Ensure all links are keyboard operable and have visible focus treatment.
- Implement each trail point as a native `<button>` with an accessible milestone label, `aria-controls`, and accurate `aria-expanded` state.
- Let Enter, Space, click, and tap pin or unpin a tooltip; let focus and hover preview it; let Escape close it.
- Keep full résumé content in the tooltip region and never require hover as the only way to access it.
- Make external-link behavior clear in accessible names or nearby text when needed.
- Give project screenshots useful alt text that describes the represented interface rather than repeating the project title alone.
- Mark decorative AI art with empty alt text when it adds no unique content.
- Do not rely on color, timeline position, icon, image, motion, or gradient alone to communicate chronology or section meaning.
- Respect `prefers-reduced-motion` for reveal, hover, timeline, or decorative effects.
- Render a static Three.js frame and skip pointer/camera animation when reduced motion is requested.
- Maintain contrast for body text, dates, metadata, technology tags, borders, focus rings, and controls.
- Preserve comprehension when CSS images fail or are disabled.

### Requirement 11 — Performance and Resilience

- Do not ship multi-megabyte artwork or screenshots at small rendered dimensions.
- Prefer appropriately compressed JPEG, PNG, WebP, or AVIF based on the asset's visual needs and browser support decision.
- Avoid loading all full-resolution images eagerly.
- Render all text content and links without waiting for optional media.
- Preserve project name, purpose, technologies, and links if its image fails.
- Do not make page rendering depend on Supabase, a remote CMS, or an external résumé service.
- Use stable dimensions to prevent media from moving surrounding content during load.
- Avoid unnecessary JavaScript for visual-only timeline behavior that CSS can provide.
- Treat WebGL as progressive enhancement: the existing image, content, links, and CSS trail remain usable if renderer creation fails.
- Dispose Three.js geometries, materials, textures, animation frames, and listeners when the Portfolio route unmounts.
- Use deterministic particle and mist placement so Strict Mode remounts do not produce a visibly different effect.

### Requirement 12 — File Documentation and Handoff

- Every created or modified Markdown file must have a linked Table of Contents near the top.
- Every created or modified comment-capable source file must open with an accurate comments-based TOC.
- Add why-comments for non-obvious data, ordering, privacy, asset, and link decisions.
- Use `// :warning:` for material limitations and cross-system invariants, including résumé approval and external-link validation.
- Keep comments current when content structures or behavior change.
- At implementation handoff, report verification and provide exact staging commands and ready-to-run commit messages for only the files changed.

## Approved Draft Content

The following content is derived from `.omi/Oishieka_Moitra_-_Full_Stack_Developer.pdf`, `.omi/plan/project-content.md`, the active application, and the repository's verified Git remote. Resume-derived dates and descriptions still require Oishieka's publication approval before implementation is considered complete.

### Page Introduction

> My path to full stack development brings together hands-on application building with experience in legal research, risk analysis, precise documentation, and cross-functional communication. Explore the education, professional experience, and project work that shape how I approach requirements and build maintainable software.

### Education

Display these entries by starting date descending:

1. **University of Colorado Law School**
   - Program: Juris Doctor (J.D.)
   - Location: Boulder, Colorado
   - Dates shown in the source résumé: 2024–Present
2. **University of South Florida**
   - Program: Bachelor of Science (B.S.), Biomedical Sciences
   - Location: Tampa, Florida
   - Dates shown in the source résumé: 2019–Present

Both “Present” values must be confirmed before publication.

### Professional Experience

Display these entries by starting date descending:

1. **Law Clerk — Bay Area Legal Services**
   - Location: Tampa, Florida
   - Dates shown in the source résumé: 2025–2026
   - Drafted, reviewed, and edited complex legal documents with close attention to accuracy, clause interpretation, and compliance.
   - Identified risks, inconsistencies, and missing terms, then escalated issues and recommended corrective action.
   - Conducted structured research into statutes, regulations, and policy requirements relevant to procurement and contract compliance.
   - Coordinated with internal teams and external parties to gather information, clarify requirements, and finalize documentation.
   - Maintained organized electronic records and prepared written summaries supporting decision-making.
2. **Summer Associate — Wells, Anderson & Race, LLC**
   - Location: Denver, Colorado
   - Dates shown in the source résumé: 2021
   - Reviewed multiple sources for accuracy and consistency.
   - Drafted precise written analyses.
3. **Life Insurance Agent — Liberty National Life Insurance Company**
   - Location: Tampa, Florida
   - Dates shown in the source résumé: 2019–2020
   - Explained policy terms and contractual obligations to clients.
   - Ensured regulatory compliance and maintained accurate transaction documentation.
4. **Independent Contractor Tutor — Varsity Tutors**
   - Location: Tampa, Florida
   - Dates shown in the source résumé: 2018–2020
   - Developed structured plans and maintained detailed records, demonstrating strong organization and documentation.
   - Communicated complex concepts clearly and adapted explanations to diverse audiences.

These descriptions state responsibilities rather than measurable results. Do not invent metrics to make them sound more impressive.

### Initial Project Entry

- **Name:** Oishieka Moitra Fantasy Portfolio
- **Technology:** React, Vite, JavaScript, React Router, CSS, and Supabase
- **Purpose:** Give recruiters and professional contacts one responsive place to review Oishieka's skills, education, experience, project work, resources, résumé, and contact options.
- **Description:** A phoenix-inspired portfolio built as a static React single-page application for GitHub Pages. It combines accessible, responsive presentation with reusable components, hash-based routing, and a planned Supabase-backed contact and administration workflow.
- **Live URL:** `https://omi-moitra.github.io`
- **Source URL:** `https://github.com/omi-moitra/omi-moitra.github.io`
- **Image:** A current screenshot captured after the Portfolio page is implemented, cropped and optimized as `src/assets/portfolio-site-preview.png`.

Before publishing this card, update its wording to describe only features actually present in the deployed build. Supabase behavior must not be described as complete until Contact, Login, and Back Office have passed their own acceptance criteria.

### Résumé Action

- **Visible label:** Download résumé (PDF)
- **Public asset:** `public/assets/resume-standard.pdf`
- **Browser URL:** `/assets/resume-standard.pdf`
- **Requirement:** The public file must be an approved résumé prepared for unrestricted distribution.

### Portfolio AI Image Inventory

| Intended filename | Role | Initial alt-text decision | Completion evidence |
| --- | --- | --- | --- |
| `src/assets/portfolio-phoenix-journey.jpg` | Full-page visual canvas connecting education, professional analysis, and code | Decorative CSS background with no accessibility announcement because the complete journey is present in semantic HTML | OpenAI built-in image generation tool; generated 2026-08-05 at 1536×1024 PNG (2,453,139 bytes); optimized to 1200×800 JPEG (297,543 bytes, 87.9% reduction); placed behind the complete Portfolio page and résumé trail |
| `src/assets/portfolio-code-scroll.jpg` | Supporting documentation-and-code illustration near Experience | Decorative `alt=""` because the adjacent HTML communicates the documentation-and-systems relationship | OpenAI built-in image generation tool; generated 2026-08-05 at 1536×1024 PNG (2,596,946 bytes); optimized to 1200×800 JPEG (268,908 bytes, 89.6% reduction); placed after Professional Experience |

Both files are Portfolio-specific generated assets. The project preview remains a separate requirement and is not counted toward this pair.

## User Flow and Expected Behavior

### First-Visit Flow

1. A visitor selects Portfolio from the shared navigation or opens `/#/portfolio` directly.
2. The Portfolio page renders inside the shared Header, Main, and Footer layout.
3. The phoenix-journey background establishes a continuous visual path behind stable, readable content surfaces.
4. The page heading and introduction explain what the visitor can review.
5. The visitor follows résumé milestones along the trail through Education and Professional Experience, then reaches Projects in logical document order.
6. The visitor can open the live project, inspect its public source, or download the approved résumé.

### Education and Experience Review Flow

1. The visitor reaches a clearly labeled section.
2. Entries appear newest first in both visual layout and DOM order.
3. On wide screens, year points follow the curved upper-right-to-lower-left trail and tooltips branch toward their assigned side without changing DOM sequence.
4. Each entry exposes its required title, organization or institution, date, and supporting details without requiring hover or interaction.
5. On a narrow screen or with enlarged text, the same DOM order remains intact in a single column beside a left-aligned trail.

### Project Exploration Flow

1. The visitor sees the project name, purpose, description, technology list, and representative image.
2. The visitor activates the live-site or source link.
3. The external destination opens in a new tab without giving the destination access to the originating window.
4. If the preview image fails, the textual project content and links remain available.

### Résumé Download Flow

1. The visitor activates “Download résumé (PDF).”
2. The browser requests `/assets/resume-standard.pdf` from the deployed origin.
3. The browser downloads the valid PDF using a meaningful filename.
4. If a separate view link is supplied, it opens the same approved PDF without replacing the required download action.

### Narrow-Screen Flow

1. Sections render in one logical column.
2. Timeline decoration becomes secondary and does not reorder entries.
3. Long names, dates, tags, and links wrap within the viewport.
4. Calls to action remain large enough to operate and clear the fixed mobile navigation.

### Image-Failure Flow

1. Reserved media space prevents a large layout jump where practical.
2. Essential content remains in HTML and continues rendering.
3. Informative images expose useful alternative text.
4. Decorative images disappear without leaving repeated or misleading announcements.

## Interfaces

### React Page

- `src/pages/PortfolioPage.jsx`
  - Owns page composition, the full-page journey-background reference, page-level heading, introduction, primary sections, résumé action, and Portfolio-specific media.
  - Replaces the `/portfolio` setup-route definition in `src/App.jsx`.

### Reusable Components

- `src/components/PortfolioExperience.jsx`
  - Renders the existing phoenix image, registered golden trail, mist and particles; it also owns scroll/pointer movement, cleanup, and reveals.
- `src/components/TimelineMilestone.jsx`
  - Renders a visible year point with hover/focus preview, click/tap pinning, Escape dismissal, accessible state, and an anchored résumé tooltip.
- `src/components/ResumeEntry.jsx`
  - Renders the shared semantic structure for education or work entries without forcing both data types into identical content.
- `src/components/ProjectCard.jsx`
  - Renders the project name, purpose, description, technologies, image, and verified external links.

Component filenames may be consolidated when the rendered structures are too small to justify separate abstractions. Do not create components whose only purpose is wrapping one static element.

### Static Data

- `src/data/portfolioContent.js`
  - Exports page copy, education, work experience, projects, résumé metadata, and Portfolio asset metadata.
  - Keeps chronological sort values separate from reader-facing date labels.
  - Keeps external URLs centralized for validation.

### Styling

- `src/pages/PortfolioPage.css`
  - Owns the full-page phoenix canvas, wireframe-derived curved trail, positioned year points, anchored tooltips, project presentation, résumé actions, and responsive behavior.
  - Reuses global design tokens and shared primitives rather than redefining the palette.

### Assets

- `src/assets/portfolio-phoenix-journey.jpg` — Portfolio-specific AI-created full-page background and résumé-trail canvas.
- `src/assets/portfolio-code-scroll.jpg` — Portfolio-specific AI-created documentation/code art.
- `src/assets/portfolio-site-preview.png` — screenshot of the implemented website; not counted as AI-created by default.
- `public/assets/resume-standard.pdf` — approved public résumé download.

### Routing

- `src/App.jsx`
  - Imports `PortfolioPage`.
  - Registers `<Route path="/portfolio" element={<PortfolioPage />} />` within `Main`.
  - Removes only the obsolete `/portfolio` setup-route definition.

### Endpoints and Services

- No API endpoint, Supabase table, authentication state, or environment variable is used by this feature.
- External project URLs and the résumé asset are ordinary links, not data-service integrations.
- Three.js rendering runs entirely in the browser; no quiz service, outcome engine,
  audio system, or media stream is used.

## Data and Validation

### Education Data Shape

```javascript
{
  id: 'colorado-law-jd',
  institution: 'University of Colorado Law School',
  program: 'Juris Doctor (J.D.)',
  location: 'Boulder, Colorado',
  dates: '2024–Present',
  startYear: 2024,
  trail: { x: '61%', y: '39%', side: 'left' },
}
```

Validation rules:

- `id`, `institution`, `program`, `dates`, and numeric `startYear` are required.
- `id` values are unique and stable.
- `location` is optional and must be approved for publication.
- `startYear` controls ordering but is not rendered as a substitute for `dates`.
- Entries sort by `startYear` descending.
- `trail.x`, `trail.y`, and `trail.side` control wireframe placement only and never determine chronological or DOM order.
- An ongoing status is not inferred from an absent end year.

### Work Experience Data Shape

```javascript
{
  id: 'bay-area-legal-services-law-clerk',
  role: 'Law Clerk',
  organization: 'Bay Area Legal Services',
  location: 'Tampa, Florida',
  dates: '2025–2026',
  startYear: 2025,
  trail: { x: '68%', y: '27%', side: 'right' },
  responsibilities: [
    'Drafted, reviewed, and edited complex legal documents with close attention to accuracy.',
  ],
}
```

Validation rules:

- `id`, `role`, `organization`, `dates`, numeric `startYear`, and at least one responsibility are required.
- Responsibility values must be non-empty, verified strings.
- `id` values are unique and stable.
- Entries sort by `startYear` descending.
- Every entry has explicit percentage coordinates and a `left` or `right` tooltip side derived from the wireframe.
- Array order preserves the intended reading order of responsibility statements.
- Achievement metrics are omitted unless a verified source supports them.

### Project Data Shape

```javascript
{
  id: 'oishieka-fantasy-portfolio',
  name: 'Oishieka Moitra Fantasy Portfolio',
  technologies: ['React', 'Vite', 'JavaScript', 'React Router', 'CSS'],
  purpose: 'Present verified professional work through one accessible portfolio.',
  description: 'A responsive phoenix-inspired portfolio built for GitHub Pages.',
  image: portfolioSitePreview,
  imageAlt: 'Home page of Oishieka Moitra’s phoenix-inspired developer portfolio.',
  liveUrl: 'https://omi-moitra.github.io',
  sourceUrl: 'https://github.com/omi-moitra/omi-moitra.github.io',
}
```

Validation rules:

- `id`, `name`, at least one technology, `purpose`, `description`, `image`, `imageAlt`, and a valid HTTPS `liveUrl` are required.
- `sourceUrl` is optional only when no public source repository applies.
- `id` values are unique and stable.
- External URLs must use `https:` and be manually checked before release.
- Technology labels must describe the published project truthfully.
- A screenshot's alt text describes useful visible context without listing every decorative detail.

### Résumé Data Shape

```javascript
{
  href: '/assets/resume-standard.pdf',
  downloadName: 'Oishieka-Moitra-Resume.pdf',
  label: 'Download résumé (PDF)',
}
```

Validation rules:

- `href` points to the approved file in `public/assets`.
- `downloadName` ends in `.pdf` and contains no unsafe path characters.
- `label` identifies both the action and file type.
- The asset must begin with a valid PDF signature and open successfully.
- The deployed response must have a successful status and represent the PDF rather than `index.html`.

### AI Image Data Shape

```javascript
{
  id: 'portfolio-phoenix-journey',
  src: portfolioPhoenixJourney,
  alt: '',
  width: 1200,
  height: 800,
  generatedWith: 'OpenAI built-in image generation tool',
  purpose: 'Connect education, professional analysis, and software development.',
  placement: 'Full Portfolio page background behind the résumé trail',
}
```

Validation rules:

- Exactly recording the actual generation tool is mandatory before release.
- `width` and `height` match the optimized file.
- `alt` is empty only when the image is decorative.
- Each asset is specific to Portfolio and is not reused to satisfy another page's image count.
- Both assets render at the deployed URL and have documented provenance.
- The journey image is decorative in its CSS-background role; semantic headings, dates, and responsibilities provide the complete accessible narrative.

### Expected Rendering

- Render Education, Professional Experience, and Projects from arrays rather than duplicating card markup.
- Render Education and Professional Experience in newest-first DOM order before using independent trail metadata to position each point along the curve.
- Use stable `id` values as React keys.
- Sort copied arrays or keep source arrays intentionally ordered; do not mutate imported shared data during render.
- Do not render empty metadata wrappers, empty responsibility lists, broken anchors, or false “Present” labels.
- Do not expose private source notes or verification flags as polished public claims.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, and project CSS.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Keep Portfolio under the existing shared `Main` layout.
- Do not add a dependency for timelines, cards, icons, image loading, or PDF viewing.
- Use `three` for the decorative WebGL environment; do not introduce an additional animation or 3D framework.
- Do not query Supabase or another backend for static résumé data.
- Import build-managed Portfolio images from `src/assets`.
- Serve the approved résumé from `public/assets` so its stable public URL is not content-hashed.
- Use `/assets/resume-standard.pdf` because the repository deploys at the GitHub Pages root with Vite `base: '/'`.
- Preserve the canonical `phoenixCodexPalette` values and approved Portfolio gradient stop order.
- Keep private `.omi` sources ignored and outside the production bundle.
- Do not place private contact details, credentials, or unapproved content in source, rendered HTML, images, PDF metadata, or committed documentation.
- Preserve lint and production build success.

## Implementation Decisions

### Use This Website as the Initial Project

The source résumé contains no named software project, while the rubric requires at least one. This portfolio is a real project with a verifiable repository, technology stack, purpose, live destination, and interface image, so it satisfies the requirement without inventing unrelated work. Its description must be revised at implementation time to avoid claiming unfinished features.

### Keep Chronology Separate From Display Dates

Human-readable date strings may contain ranges or “Present,” which are poor sort keys. A numeric `startYear` supports deterministic newest-first ordering while preserving the exact approved display wording.

### Keep Essential Résumé Content in HTML

Recruiters should be able to scan education, work, and projects without downloading a file, and semantic HTML is more accessible and responsive than an embedded document. The PDF remains a portable supplement.

### Require a Separate Public Résumé

The source file in `.omi` is a private planning input and may contain details not approved for broad publication. A separately reviewed `resume-standard.pdf` creates an explicit publication boundary and a stable download URL.

### Separate the Project Screenshot From AI Art

A screenshot proves what the project looks like, while the two required AI images provide thematic storytelling. Counting these independently keeps the rubric evidence honest and makes the project card more useful.

### Prefer Simple CSS Structure

The phoenix trail is built with semantic ordered lists, native buttons, and a decorative SVG curve based on `.omi/Untitled.png`. Wide screens distribute year points from the upper-right toward the lower-left and open tooltips on their assigned branch; narrow screens replace the curve with a left-side path and one tooltip column. Avoiding a timeline package reduces bundle size and preserves control over DOM order, zoom behavior, focus, and responsive presentation.

### Treat the Wireframe as Layout Authority

The Portfolio title occupies the upper-left of one continuous scene, while the phoenix remains visually dominant toward the upper-right. A curved path descends from the phoenix, bends through the middle, and travels diagonally to the lower-left. All six sourced résumé entries use explicit percentage coordinates along this curve; the wireframe's placeholder labels do not replace or reduce the approved content inventory.

### Keep Milestones Registered to the Particle Trail

The source image supplies the only solid golden trail. Animated SVG dashes, Three.js particles, and HTML year controls share its curve geometry and milestone coordinates; no generated solid line or glow tube is drawn over the artwork. A tooltip point must never be positioned beside a visually separate timeline. Viewport adaptations may replace the desktop curve with the mobile left rail, but the control centers remain on the visible illuminated path in either layout.

### Use Trail Points as Résumé Tooltips

Dates remain scannable as visible year controls even while details are closed. Hover and focus provide a temporary preview, while click, tap, Enter, or Space pins the anchored panel. Escape dismisses it. Each panel contains the same semantic `ResumeEntry` HTML, so the visual tooltip treatment does not reduce content quality or keyboard access.

### Use the Journey Artwork as the Page Canvas

The journey illustration is the full Portfolio narrative canvas. A full-bleed background layer preserves one continuous visual metaphor, while translucent, high-contrast surfaces keep all professional content readable and independent of the artwork. It is not repeated as a separate hero figure.

### Add Progressive WebGL Depth Without Turning Portfolio Into a Quiz

Three.js supplies atmosphere and movement rather than a replacement scene or application logic. The existing phoenix image is mapped onto a responsive plane; document scroll changes its camera depth and framing, pointer movement adds small optional parallax, and a normalized glow curve follows the image's painted golden trail. Deterministic mist and ember particles add depth without introducing another environment. The Portfolio does not collect choices, sort visitors, impose timers, or calculate an outcome.

### Defer Sound Until After Launch

The creative plan explicitly places sound design after the first complete version.
Keeping audio out of the launch scope reduces distraction, browser-policy edge cases,
and accessibility/performance work while the journey and project content are finished.

## Acceptance Criteria

### Route and Introduction

- [x] `/#/portfolio` renders `PortfolioPage` inside the shared layout.
- [ ] Direct loading and refresh work in local preview and deployed GitHub Pages.
- [x] The setup placeholder no longer renders at `/portfolio`.
- [x] The page has exactly one descriptive `<h1>` and a concise professional introduction.
- [x] The `<h1>` appears in pale gold over the upper-left image area without a surrounding hero card.
- [x] No separate top-level Journey or Projects route is added.

### Education

- [x] The page contains a clearly labeled Education section.
- [x] At least one education entry renders.
- [ ] Every entry includes institution, degree/program, and approved dates.
- [x] Entries appear by starting date descending in the DOM and visual presentation.
- [x] University of Colorado Law School precedes University of South Florida when both approved entries are used.
- [ ] “Present,” location, and program details match owner-approved source content.

### Professional Experience

- [x] The page contains a clearly labeled Professional Experience section.
- [x] At least one work entry renders.
- [ ] Every entry includes role, organization, approved dates, and at least one responsibility or achievement description.
- [x] Entries appear by starting date descending in the DOM and visual presentation.
- [x] Bay Area Legal Services appears before the 2021, 2019, and 2018 starting-date entries when all approved roles are used.
- [x] No invented metrics, achievements, or software-development implications appear.

### Projects

- [x] The page contains a clearly labeled Projects section.
- [ ] At least three complete, verified projects render for the Phoenix Codex MVP; at least one complete project renders for the grading minimum.
- [ ] The initial portfolio project includes name, technology, purpose, description, and representative image.
- [ ] The project wording describes only behavior present in the published build.
- [ ] The live URL resolves to `https://omi-moitra.github.io`.
- [ ] The source URL resolves to the public GitHub repository.
- [x] External links open in a new tab with `rel="noopener noreferrer"`.
- [x] Project content and links remain available if the preview image fails.
- [ ] Project cards settle into a stable editorial grid after any entrance motion.
- [ ] Every project exposes an accessible case-study detail panel containing only verified fields.

### Résumé

- [ ] An approved public PDF exists at `public/assets/resume-standard.pdf`.
- [ ] A visible, keyboard-accessible “Download résumé (PDF)” link is present.
- [ ] Activating the link downloads a valid, readable PDF with a meaningful filename.
- [ ] The deployed asset request returns the PDF rather than the application shell.
- [x] Essential Education, Work, and Project content remains available in HTML.
- [ ] The published PDF and its metadata contain no unapproved private information.
- [ ] If an approved creative résumé exists, it is explicitly labeled and the Standard résumé remains independently available.

### Visual Sections and AI Images

- [x] Three.js renders the existing phoenix image itself with depth, mist, golden particles, and a glow registered to its painted trail.
- [x] No replacement forest, copied visual environment, or newly generated background is introduced.
- [x] Document scroll moves the rendered camera forward through the scene.
- [x] Pointer movement adds restrained parallax without being required for navigation or comprehension.
- [x] The WebGL scene falls back to the existing background and semantic content if renderer creation fails.
- [x] No launch-scope sound system or ambience control is included.
- [x] No timer, branching questionnaire, visitor sorting, or outcome algorithm is included.
- [x] `portfolio-phoenix-journey.jpg` fills the Portfolio-page canvas behind the content.
- [x] The desktop trail follows the wireframe's upper-right curve and lower-left diagonal path.
- [x] Education and Professional Experience points share the same continuous visual trail.
- [x] Tooltip panels branch left or right from their assigned wireframe-aligned points.
- [x] Every desktop year control is centered directly on the same curve used by the animated glowing particles.
- [x] No redundant SVG core line or Three.js tube is drawn over the source image's solid golden trail.
- [x] The résumé trail collapses to a left-aligned, single-column layout at narrow widths.
- [x] Every résumé entry is represented by a visible year point on the trail.
- [x] Each point opens its complete entry in an anchored tooltip panel.
- [x] Tooltips preview on hover/focus, pin on activation, report expanded state, and close with Escape.
- [x] Mobile tooltip panels open to the right of the left-aligned trail without leaving the viewport.
- [x] Education, Professional Experience, and Projects are three visibly distinct sections.
- [x] Section separation remains clear without relying only on color.
- [x] Two Portfolio-specific AI-created images render on the Portfolio page.
- [x] Neither required image is borrowed from Header, Home, Links, or stock-only inventory.
- [x] Each image complements résumé, professional-journey, documentation, or code content.
- [x] Each image has an appropriate informative or decorative alt-text decision.
- [x] The actual AI tool, purpose, filename, dimensions, optimization, placement, and alt-text decision are documented for both images.
- [x] The project screenshot is not counted as AI-created unless its origin truthfully supports that claim.

### Responsive, Accessible, and Quality

- [x] Content follows a logical heading and DOM order.
- [x] All actionable elements work by keyboard and have visible focus.
- [ ] Text, controls, dates, tags, borders, and focus states meet project contrast requirements.
- [x] Content does not depend on hover, motion, color, image, or timeline position alone.
- [x] Motion is removed or reduced when `prefers-reduced-motion: reduce` is active.
- [ ] No horizontal overflow, clipped text, overlapping content, or hidden controls appear at 320px, 768px, 769px, desktop widths, or 200% zoom.
- [x] Content clears the fixed mobile navigation at 768px and below.
- [x] Images preserve aspect ratio, reserve stable space, and are optimized for their rendered sizes.
- [x] Optional image failures do not hide essential content.
- [x] Every changed file has its required format-appropriate TOC and current decision comments.
- [x] `npm run lint` succeeds.
- [x] `npm run build` succeeds.

## Verification Plan

### Automated Checks

Run at the completed feature checkpoint:

```bash
npm run lint
npm run build
```

Also inspect the production output to confirm the résumé asset is copied into `dist/assets/resume-standard.pdf` and the Portfolio images are emitted successfully.

### Content Count Matrix

| Requirement | Minimum | Verification |
| --- | ---: | --- |
| Education institutions | 1 | Count rendered entries and inspect required fields |
| Work experiences | 1 | Count rendered entries and inspect required fields |
| Projects | 1 | Count rendered cards and inspect name, tech, purpose, description, and image |
| Distinct primary sections | 3 | Confirm Education, Professional Experience, and Projects are visually separated |
| Portfolio-specific AI images | 2 | Inspect rendered assets and provenance records |
| Downloadable résumé | 1 | Download and open the deployed PDF |

### Route and Interaction Checks

- Open `/#/portfolio` directly and refresh it.
- Navigate to Portfolio from desktop navigation and mobile bottom navigation.
- Confirm shared active-link treatment identifies Portfolio correctly.
- Tab through résumé, project-live, and project-source links in logical order.
- Tab through every trail point, open each tooltip with Enter or Space, and close it with Escape.
- Confirm pointer hover previews a tooltip and click pins it after the pointer leaves.
- Activate each external link and inspect its destination and opener protections.
- Activate the résumé download and confirm a PDF is saved.
- Temporarily break each optional image path and confirm text and links remain usable.

### Chronology and Content Checks

- Compare all education and work values against the approved public résumé.
- Confirm entries appear by starting date descending in the source data, DOM, and visible layout.
- Confirm no resume entries, dates, organizations, locations, or descriptions changed during rendering.
- Confirm every project technology and claim matches the deployed project.
- Confirm no Vite starter text, lorem ipsum, unsupported metric, phone number, detailed address, credential, or private note is present.

### Viewport and Zoom Matrix

- Test at 320px width.
- Test at 768px width.
- Test at 769px width.
- Test at a representative desktop width such as 1440px.
- Test at 200% browser zoom.
- Check long institution, organization, role, and technology values for wrapping.
- Confirm the last actionable content clears mobile bottom navigation.
- Confirm the full-page journey background does not introduce horizontal overflow.
- Confirm year points follow the wireframe-derived curve on wide screens while each semantic group remains newest first in the DOM.
- Confirm the trail moves left and tooltips open in one right-hand content column at 768px and below.
- Confirm scroll advances the WebGL camera smoothly and pointer movement causes only subtle parallax.
- Confirm reduced-motion mode renders a static scene with immediately visible résumé milestones.
- Confirm the page remains complete after WebGL renderer creation is intentionally blocked.
- Confirm no audio starts, no ambience control is exposed, and no audio resources load.
- Confirm navigating away disposes the renderer and stops any active AudioContext.

### Accessibility Checks

- Navigate the complete page with a keyboard only.
- Inspect heading order, section labels, list semantics, articles, links, images, and accessible names.
- Confirm focus indicators remain visible on every surface and gradient.
- Verify informative image alt text and empty alt text for decorative images.
- Verify external-link labels communicate their destination or purpose.
- Test reduced-motion preference.
- Check representative text, metadata, tag, border, and focus color pairs for contrast.
- Confirm reading order remains logical when timeline or grid CSS is disabled.

### Résumé Checks

- Confirm the public PDF has received Oishieka's publication approval.
- Open the built PDF locally and after deployment.
- Confirm the document is readable, current, and not corrupted.
- Inspect visible content and document metadata for unapproved personal information.
- Confirm the response is the PDF, not `index.html` or a 404 document.
- Confirm the download filename is `Oishieka-Moitra-Resume.pdf` or another approved meaningful name.

### AI Image Verification

For each of the two Portfolio images, record and inspect:

- actual AI generation tool;
- generation date;
- purpose and page placement;
- committed filename and file type;
- pixel dimensions and optimized file size;
- whether it is informative or decorative;
- final alt text; and
- rendered behavior at narrow and wide viewports.
- journey-background coverage across the complete Portfolio page; and
- readable content contrast over every visible part of the background.

## Warnings and Known Limitations

> **:warning: Résumé publication boundary:** The ignored PDF in `.omi` is a source document, not automatically an approved public asset. Do not copy or commit it as `resume-standard.pdf` until Oishieka approves its visible content and metadata for unrestricted distribution.

> **:warning: Unverified education status:** Both education entries currently use “Present.” Confirm those statuses and date ranges before publishing them.

> **:warning: Responsibility-only résumé content:** The source résumé primarily describes responsibilities and does not provide measurable work outcomes. Do not invent achievements or metrics.

> **:warning: Project claim accuracy:** The initial project card describes this website. Update it to reflect only features that are actually implemented and deployed when Portfolio ships.

> **:warning: Project preview:** The required real browser screenshot was not captured. The project card intentionally omits media instead of substituting thematic artwork and misrepresenting it as the implemented interface.

> **:warning: External destinations:** GitHub and live-site links can change independently of the application. Verify both immediately before release.

> **:warning: Progressive WebGL:** GPU capability, WebGL support, reduced-motion settings, and device power vary. The rendered environment must remain an optional enhancement over the complete static image and HTML experience.

> **:warning: Project inventory:** Only the portfolio itself is currently verified as a
> software project. Two additional complete projects and their case-study facts must be
> supplied and verified before claiming the plan's three-project MVP; never fabricate
> entries to satisfy the target.

> **:warning: PDF asset path:** A missing public résumé may appear to return the SPA shell depending on hosting behavior. Verify content, response, and file signature rather than accepting a successful navigation alone.

> **:warning: Chronology:** Wireframe coordinates and tooltip branch sides are decorative placement metadata. Source-array order and DOM order must remain newest first regardless of visual position.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` and this specification before implementing or modifying Portfolio.
- Treat the Module 16 grading CSV as final authority when requirements conflict.
- Use `.omi/plan/project-content.md` as draft content context, not as proof of owner approval.
- Preserve `HashRouter`; React Router paths omit the hash while deployed browser URLs include it.
- Keep the three required primary sections immediately recognizable with plain-language headings.
- Keep essential résumé information in semantic HTML.
- Keep the `.omi` source PDF ignored and private unless the user explicitly approves a specific publication action.
- Keep repeated content in data arrays and use stable identifiers.
- Add no dependencies unless a separately approved requirement makes one necessary.
- Do not introduce Supabase behavior into this static public page.
- Do not count assets from another page toward the Portfolio-specific AI-image minimum.
- Record actual asset provenance after image creation; never claim an unspecified or unverified tool.
- Update the project entry as implementation progresses so it never advertises unfinished features as complete.
- Preserve existing user work and keep unrelated edits out of this feature.
- End implementation handoffs with verification results, exact staging commands, and ready-to-run commit messages for only the relevant files.
