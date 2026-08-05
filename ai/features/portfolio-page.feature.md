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

Create a public Portfolio page that presents Oishieka Moitra's verified education, professional experience, and project work as readable semantic HTML, while also giving visitors access to an approved downloadable résumé. The page should connect Oishieka's legal, research, documentation, and software-development experience without exaggerating claims or hiding essential information inside a PDF.

After this feature is complete:

- `/#/portfolio` renders the Portfolio page through React Router;
- Education, Work Experience, and Projects appear as three clearly separated sections;
- Education and work entries are displayed newest first;
- at least one complete, truthful project entry includes its name, technology, purpose, description, and image;
- visitors can open or download an approved PDF résumé;
- at least two Portfolio-specific AI-created images complement the résumé content; and
- the page remains readable, operable, and visually intentional from 320px through desktop widths.

## Feature Scope

### In Scope — Included

- Portfolio at React Router path `/portfolio` and deployed hash URL `/#/portfolio`.
- A concise page introduction that explains the relationship between software development and Oishieka's professional background.
- An Education section with at least one complete entry.
- A Work Experience section with at least one complete entry and responsibility descriptions.
- A Projects section with at least one complete project card.
- Reverse-chronological ordering for Education and Work Experience.
- The current Oishieka Moitra Fantasy Portfolio as a concrete project entry.
- A project preview image that represents the actual rendered website.
- A working link for the approved public résumé at `public/assets/resume-standard.pdf`.
- At least two relevant Portfolio-specific images created with an AI image tool.
- Documentation of each AI image's generation tool, purpose, filename, optimization, placement, and alt-text decision.
- Semantic headings, lists or articles, meaningful link text, keyboard support, visible focus, image alternatives, adequate contrast, and reduced-motion behavior.
- Responsive timelines, grids, cards, and calls to action.
- Data-driven rendering for repeated education, work, and project entries.
- Phoenix, Code, and Creative gradient use derived from the canonical `phoenixPalette`.
- Graceful behavior when optional artwork or a project preview fails to load.

### Out of Scope — Excluded

- Header, Footer, personal logo, desktop navigation, or mobile bottom-navigation implementation.
- Home skills and introduction content.
- Links-page resources.
- Contact form fields, validation, Supabase insertion, or submission feedback.
- Login, Back Office, authentication, message data, deletion, or logout.
- Any Supabase query or backend operation.
- A standalone `/resume`, `/education`, `/experience`, or `/projects` route.
- Project-detail routes, case-study modals, filters, search, carousels, or category tabs.
- A PDF viewer dependency or embedded third-party document service.
- Skill percentages, invented metrics, unverified achievements, or unsupported proficiency claims.
- Publishing the source PDF directly from `.omi`.
- Publishing the résumé phone number, detailed residential information, credentials, or private data without explicit approval.
- Treating the Header logo or Home images as either of the two required Portfolio AI images.
- Treating a website screenshot as AI-created unless it was actually generated with an AI image tool.
- A new UI framework, icon library, animation library, timeline package, or PDF package solely for Portfolio.

## Requirements Breakdown

### Requirement 1 — Portfolio Route and Page Introduction

- Replace the setup placeholder at React Router path `/portfolio` with the Portfolio page component.
- Render the page at deployed hash URL `/#/portfolio` inside the shared `Main` layout.
- Direct loading and refreshing of `/#/portfolio` must work on GitHub Pages.
- Use one page-level `<h1>` such as “Portfolio & Experience.”
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
- Use semantic lists for multiple responsibility statements.
- Present responsibilities accurately and concisely without turning them into invented outcomes.
- Add quantified achievements only when Oishieka supplies a verifiable source.
- Avoid implying that legal or insurance roles were software-development positions.

### Requirement 4 — Project Section

- Use a section-level `<h2>` such as “Selected Project.”
- Render at least one project as an article or accessible card.
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

### Requirement 5 — Downloadable PDF Résumé

- Publish only an approved public résumé at `public/assets/resume-standard.pdf`.
- Provide a clearly labeled download link using the browser's native `download` behavior.
- Provide an open/view link if useful, but do not require an embedded PDF viewer.
- Use link text that identifies the file and action, such as “Download résumé (PDF).”
- Ensure the link remains keyboard accessible and receives visible focus.
- Verify the deployed response is a valid PDF rather than the SPA HTML fallback.
- Verify the filename is meaningful when downloaded.
- Keep Education, Work Experience, and Projects in HTML; the PDF supplements rather than replaces page content.
- Do not copy `.omi/Oishieka_Moitra_-_Full_Stack_Developer.pdf` into `public` until Oishieka approves its content for public distribution.

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
- Recommended image roles:

  1. `portfolio-phoenix-journey.jpg` — a wide journey illustration connecting education, professional analysis, and software development; and
  2. `portfolio-code-scroll.jpg` — a supporting illustration combining precise documentation with modern code motifs.

- Do not place required dates, organizations, degrees, job titles, project details, or calls to action only inside image pixels.
- Optimize images for their rendered dimensions before committing.
- Provide intrinsic dimensions or CSS aspect ratios to reduce layout shift.
- Lazy-load below-the-fold images where appropriate.
- Give informative images concise, useful alt text.
- Use empty alt text when an image is purely decorative and nearby HTML communicates the same meaning.
- Record the actual generation tool and final asset details before marking the feature complete.

### Requirement 8 — Phoenix Visual Direction

- Use the exact canonical `phoenixPalette` token names and values from `ai/ai-spec.md`.
- Reuse the shared kebab-case CSS custom properties instead of redefining competing colors.
- Use approved gradients selectively:

  - Phoenix: `phoenixRed` → `blazeOrange` → `solarGold` for the page introduction or journey motif;
  - Code: `midnightBlue` → `sapphire` → `teal` for project technology and code accents; and
  - Creative: `royalViolet` → `magenta` → `phoenixRed` for section dividers or selected highlights.

- Preserve each gradient's token order.
- Place primary text on stable solid surfaces when contrast cannot be guaranteed across a gradient.
- Use a restrained timeline, path, scroll, or chapter motif only when it preserves scanning and reading order.
- Keep professional content dominant; fantasy terminology may support visual character but must not replace clear section labels.

### Requirement 9 — Responsive Layout

- At desktop widths, allow an alternating timeline, two-column entries, or project media/content grid when reading order remains clear.
- At narrow widths, collapse content into a single logical column.
- Keep the page within the viewport at 320px, 768px, 769px, and desktop widths.
- Ensure dates, organization names, degree names, technology labels, and URLs wrap without clipping.
- Scale images while preserving aspect ratio.
- Keep résumé and project links usable when wrapped or stacked.
- Reserve enough bottom space for the shared mobile navigation at 768px and below.
- Do not use fixed heights that clip responsibility lists or enlarged text.
- Preserve readable line lengths and spacing at 200% zoom.
- Do not rely on visual left/right alternation to establish chronological order.

### Requirement 10 — Accessibility and Semantics

- Use one page-level `<h1>` and logical `<h2>` and `<h3>` descendants.
- Use `<section>` for major content areas and `<article>` or list structures for repeated entries.
- Use `<time>` with valid `datetime` values only when the source dates are sufficiently precise; otherwise render verified display text without false machine precision.
- Ensure all links are keyboard operable and have visible focus treatment.
- Make external-link behavior clear in accessible names or nearby text when needed.
- Give project screenshots useful alt text that describes the represented interface rather than repeating the project title alone.
- Mark decorative AI art with empty alt text when it adds no unique content.
- Do not rely on color, timeline position, icon, image, motion, or gradient alone to communicate chronology or section meaning.
- Respect `prefers-reduced-motion` for reveal, hover, timeline, or decorative effects.
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
| `src/assets/portfolio-phoenix-journey.jpg` | Wide visual connecting education, professional analysis, and code | Use concise informative alt text if the image adds a unique narrative; otherwise use `alt=""` | Record the actual AI tool, generation date, optimization, dimensions, and final alt text after creation |
| `src/assets/portfolio-code-scroll.jpg` | Supporting documentation-and-code illustration near Experience or Projects | Use `alt=""` when adjacent headings and text fully communicate its purpose | Record the actual AI tool, generation date, optimization, dimensions, and final alt text after creation |

The filenames describe required asset roles, but the assets do not exist yet. Do not mark the AI-image criterion complete until two actual Portfolio-specific files render and their provenance is recorded.

## User Flow and Expected Behavior

### First-Visit Flow

1. A visitor selects Portfolio from the shared navigation or opens `/#/portfolio` directly.
2. The Portfolio page renders inside the shared Header, Main, and Footer layout.
3. The page heading and introduction explain what the visitor can review.
4. The visitor scrolls through Education, Professional Experience, and Projects in a logical document order.
5. The visitor can open the live project, inspect its public source, or download the approved résumé.

### Education and Experience Review Flow

1. The visitor reaches a clearly labeled section.
2. Entries appear newest first in both visual layout and DOM order.
3. Each entry exposes its required title, organization or institution, date, and supporting details without requiring hover or interaction.
4. On a narrow screen or with enlarged text, the same DOM order remains intact in a single column.

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
  - Owns page composition, the page-level heading, introduction, primary sections, résumé action, and Portfolio-specific media.
  - Replaces the `/portfolio` setup-route definition in `src/App.jsx`.

### Reusable Components

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
  - Owns Portfolio layout, timelines or entry grids, project presentation, résumé actions, image treatment, and responsive behavior.
  - Reuses global design tokens and shared primitives rather than redefining the palette.

### Assets

- `src/assets/portfolio-phoenix-journey.jpg` — Portfolio-specific AI-created journey art.
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
}
```

Validation rules:

- `id`, `institution`, `program`, `dates`, and numeric `startYear` are required.
- `id` values are unique and stable.
- `location` is optional and must be approved for publication.
- `startYear` controls ordering but is not rendered as a substitute for `dates`.
- Entries sort by `startYear` descending.
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
  width: 1600,
  height: 900,
  generatedWith: 'Recorded after the final asset is created',
  purpose: 'Connect education, professional analysis, and software development.',
}
```

Validation rules:

- Exactly recording the actual generation tool is mandatory before release.
- `width` and `height` match the optimized file.
- `alt` is empty only when the image is decorative.
- Each asset is specific to Portfolio and is not reused to satisfy another page's image count.
- Both assets render at the deployed URL and have documented provenance.

### Expected Rendering

- Render Education, Professional Experience, and Projects from arrays rather than duplicating card markup.
- Use stable `id` values as React keys.
- Sort copied arrays or keep source arrays intentionally ordered; do not mutate imported shared data during render.
- Do not render empty metadata wrappers, empty responsibility lists, broken anchors, or false “Present” labels.
- Do not expose private source notes or verification flags as polished public claims.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, and project CSS.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Keep Portfolio under the existing shared `Main` layout.
- Do not add a dependency for timelines, cards, icons, image loading, or PDF viewing.
- Do not query Supabase or another backend for static résumé data.
- Import build-managed Portfolio images from `src/assets`.
- Serve the approved résumé from `public/assets` so its stable public URL is not content-hashed.
- Use `/assets/resume-standard.pdf` because the repository deploys at the GitHub Pages root with Vite `base: '/'`.
- Preserve the canonical `phoenixPalette` values and approved gradient stop orders.
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

A visual timeline can be built with semantic markup and CSS pseudo-elements. Avoiding a timeline package reduces bundle size and preserves control over DOM order, zoom behavior, focus, and narrow-screen presentation.

## Acceptance Criteria

### Route and Introduction

- [ ] `/#/portfolio` renders `PortfolioPage` inside the shared layout.
- [ ] Direct loading and refresh work in local preview and deployed GitHub Pages.
- [ ] The setup placeholder no longer renders at `/portfolio`.
- [ ] The page has exactly one descriptive `<h1>` and a concise professional introduction.
- [ ] No separate résumé or project-detail route is added.

### Education

- [ ] The page contains a clearly labeled Education section.
- [ ] At least one education entry renders.
- [ ] Every entry includes institution, degree/program, and approved dates.
- [ ] Entries appear by starting date descending in the DOM and visual presentation.
- [ ] University of Colorado Law School precedes University of South Florida when both approved entries are used.
- [ ] “Present,” location, and program details match owner-approved source content.

### Professional Experience

- [ ] The page contains a clearly labeled Professional Experience section.
- [ ] At least one work entry renders.
- [ ] Every entry includes role, organization, approved dates, and at least one responsibility or achievement description.
- [ ] Entries appear by starting date descending in the DOM and visual presentation.
- [ ] Bay Area Legal Services appears before the 2021, 2019, and 2018 starting-date entries when all approved roles are used.
- [ ] No invented metrics, achievements, or software-development implications appear.

### Projects

- [ ] The page contains a clearly labeled Projects section.
- [ ] At least one complete project renders.
- [ ] The initial portfolio project includes name, technology, purpose, description, and representative image.
- [ ] The project wording describes only behavior present in the published build.
- [ ] The live URL resolves to `https://omi-moitra.github.io`.
- [ ] The source URL resolves to the public GitHub repository.
- [ ] External links open in a new tab with `rel="noopener noreferrer"`.
- [ ] Project content and links remain available if the preview image fails.

### Résumé

- [ ] An approved public PDF exists at `public/assets/resume-standard.pdf`.
- [ ] A visible, keyboard-accessible “Download résumé (PDF)” link is present.
- [ ] Activating the link downloads a valid, readable PDF with a meaningful filename.
- [ ] The deployed asset request returns the PDF rather than the application shell.
- [ ] Essential Education, Work, and Project content remains available in HTML.
- [ ] The published PDF and its metadata contain no unapproved private information.

### Visual Sections and AI Images

- [ ] Education, Professional Experience, and Projects are three visibly distinct sections.
- [ ] Section separation remains clear without relying only on color.
- [ ] Two Portfolio-specific AI-created images render on the Portfolio page.
- [ ] Neither required image is borrowed from Header, Home, Links, or stock-only inventory.
- [ ] Each image complements résumé, professional-journey, documentation, or code content.
- [ ] Each image has an appropriate informative or decorative alt-text decision.
- [ ] The actual AI tool, purpose, filename, dimensions, optimization, placement, and alt-text decision are documented for both images.
- [ ] The project screenshot is not counted as AI-created unless its origin truthfully supports that claim.

### Responsive, Accessible, and Quality

- [ ] Content follows a logical heading and DOM order.
- [ ] All actionable elements work by keyboard and have visible focus.
- [ ] Text, controls, dates, tags, borders, and focus states meet project contrast requirements.
- [ ] Content does not depend on hover, motion, color, image, or timeline position alone.
- [ ] Motion is removed or reduced when `prefers-reduced-motion: reduce` is active.
- [ ] No horizontal overflow, clipped text, overlapping content, or hidden controls appear at 320px, 768px, 769px, desktop widths, or 200% zoom.
- [ ] Content clears the fixed mobile navigation at 768px and below.
- [ ] Images preserve aspect ratio, reserve stable space, and are optimized for their rendered sizes.
- [ ] Optional image failures do not hide essential content.
- [ ] Every changed file has its required format-appropriate TOC and current decision comments.
- [ ] `npm run lint` succeeds.
- [ ] `npm run build` succeeds.

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

## Warnings and Known Limitations

> **:warning: Résumé publication boundary:** The ignored PDF in `.omi` is a source document, not automatically an approved public asset. Do not copy or commit it as `resume-standard.pdf` until Oishieka approves its visible content and metadata for unrestricted distribution.

> **:warning: Unverified education status:** Both education entries currently use “Present.” Confirm those statuses and date ranges before publishing them.

> **:warning: Responsibility-only résumé content:** The source résumé primarily describes responsibilities and does not provide measurable work outcomes. Do not invent achievements or metrics.

> **:warning: Project claim accuracy:** The initial project card describes this website. Update it to reflect only features that are actually implemented and deployed when Portfolio ships.

> **:warning: AI image evidence:** Proposed filenames and concepts are not evidence that images were AI-generated. The requirement remains incomplete until two rendered files and their actual provenance records exist.

> **:warning: External destinations:** GitHub and live-site links can change independently of the application. Verify both immediately before release.

> **:warning: PDF asset path:** A missing public résumé may appear to return the SPA shell depending on hosting behavior. Verify content, response, and file signature rather than accepting a successful navigation alone.

> **:warning: Chronology:** Visual alternating timelines can produce a misleading reading order. Source-array order and DOM order must remain newest first regardless of decorative placement.

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
