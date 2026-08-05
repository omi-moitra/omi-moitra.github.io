# Feature Specification — Home Page

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

- **Feature name:** Home Page
- **Related area:** Public landing page, professional introduction, skills presentation, visual storytelling, responsive layout, and accessibility
- **Specification path:** `ai/features/home-page.feature.md`
- **Required branch:** `feature/home-page`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing foundation from `ai/features/setup-deploy.feature.md` and shared layout from `ai/features/header-footer.feature.md`
- **Primary users:** Recruiters, hiring managers, collaborators, coaches, and other public visitors

## Feature Goal

Create the default landing page for Oishieka Moitra’s portfolio. The page should immediately communicate who Oishieka is, what kind of developer she is, and which technical and professional strengths she brings, using an accessible phoenix-inspired fantasy/code presentation that remains concise and credible.

The page implements the plan's “Enter the Codex” concept: semantic introduction and
calls to action render first, while a progressively loaded vortex, phoenix, restrained
dragon silhouette, ink fragments, and code particles create the signature atmosphere.

After this feature is complete:

- `/#/` renders Home as the default React Router destination;
- the hero prominently identifies Oishieka Moitra as a Full Stack Developer;
- visitors can understand her professional positioning from a brief introduction;
- at least three technical skills and three soft skills are presented with icons and meaningful supporting descriptions;
- Introduction, Technical Skills, and Soft Skills are visually distinct sections;
- at least two Home-specific AI-created images support the content and theme; and
- a simplified vortex scene enhances the hero without owning text or navigation;
- optional featured-project, journey-preview, and contact-callout sections point into
  the combined Portfolio and Contact routes using only verified content; and
- the page remains readable, operable, performant, and visually intentional from 320px through desktop widths.

## Feature Scope

### In Scope — Included

- Home as the default route at React Router path `/` and deployed hash URL `/#/`.
- A semantic hero/introduction section.
- Prominent display of `Oishieka Moitra`.
- Prominent display of `Full Stack Developer` or the approved shorter tagline.
- A brief resume-derived professional introduction.
- Clear React Router calls to action for Portfolio and Contact.
- A visually organized Technical Skills section with at least three complete skill items.
- A visually organized Soft Skills or Talents section with at least three complete items.
- A meaningful icon and supporting description for every skill item.
- At least three visually distinct Home sections.
- At least two relevant Home-specific AI-created images.
- AI image provenance, purpose, optimization, and alt-text documentation.
- Phoenix Codex parchment, ink, pastel, magical-accent, and Home-gradient tokens.
- A lazy-loaded, route-scoped Three.js vortex with static poster fallback, reduced-motion
  frame, mobile particle reduction, visibility pausing, and full cleanup on unmount.
- Up to three verified featured-project previews, a Phoenix Path preview, and a final
  contact invitation after the required skill sections.
- Semantic headings, keyboard access, visible focus, appropriate image alternatives, contrast, reduced-motion behavior, and responsive layout.
- Data-driven repeated skill rendering where it improves clarity and consistency.
- Home-specific empty/failure resilience for optional media, such as preserving readable content if an image fails to load.

### Out of Scope — Excluded

- Header, Footer, personal logo, desktop navigation, or mobile bottom-navigation implementation.
- Education, work history, projects, or resume PDF content owned by Portfolio.
- External resource cards owned by Links.
- Contact form fields, validation, Supabase insertion, or feedback behavior.
- Login, Back Office, authentication, message data, deletion, or logout.
- Any Supabase query or backend operation.
- Publishing unverified claims, dates, project details, social URLs, achievements, or proficiency percentages.
- A standalone About or Resume route.
- A skill-filtering system, animated percentage meter, carousel, or other interaction not required by the rubric.
- Reusing the Header logo as one of the two required Home AI-created images.
- Stock images counted as AI-created assets.
- Image text that duplicates essential HTML content.
- Full-screen splash, dark mode, language switcher, sound, device tilt, and theme selector.
- A new UI framework, icon library, animation library, or image package solely for Home.

## Requirements Breakdown

### Requirement 1 — Root Route and Landing Behavior

- Register Home at React Router path `/`.
- Render Home for deployed URL `/#/`.
- Treat Home as the default landing destination when the site opens without another hash route.
- Render Home within the shared `Main` layout.
- Use React Router links for Portfolio and Contact calls to action.
- Do not create `/home` as the canonical route.
- Direct loading and refreshing `/#/` must work on the deployed GitHub Pages site.

### Requirement 2 — Introduction Section

- Use a semantic section associated with a clear heading.
- Display `Oishieka Moitra` prominently as the page-level `<h1>`.
- Display `Full Stack Developer` as the professional title.
- Include one brief introductory paragraph based on verified resume content.
- Keep the introduction concise enough to scan before the visitor scrolls deeply.
- Provide a primary Portfolio call to action and a secondary Contact call to action.
- Use links styled as calls to action rather than buttons that imperatively change location.
- Make both calls to action keyboard operable with visible focus.
- Do not include the resume phone number or detailed residential information.

### Requirement 3 — Technical Skills Section

- Use a section-level `<h2>` such as “Technical Skills.”
- Present at least three technical skill items.
- Every item contains:

  - a unique stable identifier;
  - a skill/group name;
  - a meaningful icon or icon concept;
  - a supporting description longer than a one-word label; and
  - no unsupported numerical proficiency score.

- Organize items as accessible cards, a grid, or a semantic list.
- Use the verified resume-derived groups in this specification unless Oishieka approves replacements.
- Distinguish beginner-level SQL/Python claims where relevant rather than implying advanced mastery.
- Keep icons consistent in size, style, and accessible treatment.
- Do not load a dependency merely to provide three icons; use existing assets, an approved sprite, or accessible inline SVG.

### Requirement 4 — Soft Skills or Talents Section

- Use a section-level `<h2>` such as “Professional Strengths” or “Soft Skills & Talents.”
- Present at least three soft skill/talent items.
- Every item contains:

  - a unique stable identifier;
  - a skill name;
  - a meaningful icon or icon concept; and
  - a supporting description grounded in resume experience.

- Organize items as accessible cards, a grid, or a semantic list.
- Keep language specific enough to demonstrate the skill rather than using unsupported adjectives alone.
- Do not invent percentages, ratings, client outcomes, awards, or quantified achievements.

### Requirement 5 — Three Distinct Visual Sections

- Home contains at least these three sections:

  1. Introduction/Hero;
  2. Technical Skills; and
  3. Soft Skills or Talents.

- Separate sections with intentional spacing, solid surface changes, approved gradients, borders, or decorative dividers.
- Maintain a logical narrative from identity → technical capability → professional strengths.
- Use a consistent maximum-width container while allowing selected decorative backgrounds to span wider when they do not create overflow.
- Give each section sufficient padding and a distinct heading relationship.
- Avoid making every section visually identical or using decoration without hierarchy.

### Requirement 6 — Two Home-Specific AI-Created Images

- Include at least two images generated using an AI image tool specifically for Home.
- The Header’s personal logo does not count toward this two-image minimum.
- Images must support Home content or the phoenix/code theme rather than serving as unrelated decoration.
- Recommended image roles:

  1. a hero phoenix/code illustration that reinforces the professional introduction; and
  2. a supporting technical/creative realms illustration that helps transition between skill sections.

- Do not place important names, headings, skill descriptions, or calls to action only inside image pixels.
- Optimize images before committing and choose dimensions appropriate to their rendered size.
- Provide intrinsic dimensions or aspect ratios to prevent layout shift.
- Use eager loading only for an above-the-fold hero image that materially contributes to initial presentation.
- Lazy-load below-the-fold supporting media where appropriate.
- Give informative images concise, useful alt text.
- Use empty alt text when an image is purely decorative and nearby HTML already communicates its meaning.
- Document the generation tool, image purpose, filename, optimization, placement, and alt-text decision.
- Do not claim this requirement is complete until both assets and both provenance records exist.

### Requirement 7 — Phoenix Visual Direction

- Use the exact canonical `phoenixCodexPalette` names and values from `ai/ai-spec.md`.
- Reuse the shared kebab-case CSS custom properties established by the layout feature.
- Use the approved Home gradient current in this exact order: `softCream` →
  `phoenixCoral` → `blushPink` → `radiantGold` → `arcaneViolet`.
- Use parchment, cream, ivory, ink, and warm brown for most surfaces and text;
  pastels support section identity and magical accents remain sparse.
- Keep primary text on stable solid surfaces when contrast cannot be guaranteed across a gradient.
- Use creative accents deliberately; do not display every palette color in every component.
- Keep fantasy language secondary to immediately understandable professional copy.

### Requirement 8 — Responsive Layout

- At desktop widths, allow intentional two-column hero or card-grid layouts when content remains readable.
- At narrow widths, stack hero content, skill items, and media vertically.
- Keep the page within the viewport at 320px, 768px, 769px, and desktop widths.
- Ensure text wraps naturally without clipping or horizontal scrolling.
- Scale images while preserving aspect ratio.
- Keep calls to action usable when stacked or wrapped.
- Reserve enough bottom space for the shared mobile navigation at 768px and below.
- Avoid fixed heights that clip longer text, enlarged fonts, or translated content.
- Keep readable line length and spacing at 200% zoom.

### Requirement 9 — Accessibility and Semantics

- Use one page-level `<h1>` and logical `<h2>`/`<h3>` descendants.
- Use semantic sections and lists where appropriate.
- Ensure icon-only visual elements have correct accessible treatment.
- Do not repeat verbose alt text when a decorative image sits beside equivalent HTML.
- Keep calls to action and any links keyboard operable.
- Provide visible focus treatment with adequate contrast.
- Do not rely on color, gradient, icon, motion, or spatial position alone to communicate section meaning.
- Respect `prefers-reduced-motion` for any reveal, hover, or decorative motion.
- Content must remain understandable with CSS images disabled or failed.
- Avoid rapid flashing, continuous essential motion, or parallax that harms readability.

### Requirement 10 — Performance and Resilience

- Remove Vite starter text and starter assets from the rendered Home page.
- Do not ship multi-megabyte Home images at small rendered dimensions.
- Prefer optimized WebP/AVIF or appropriately compressed PNG/JPEG based on the artwork’s needs.
- Avoid blocking initial content on optional media or animation.
- Preserve semantic text and calls to action if either Home image fails to load.
- Prevent image layout shift with intrinsic dimensions/aspect ratios.
- Keep component and CSS complexity proportional to a three-section landing page.
- Do not fetch static Home content from Supabase or another service.

### Requirement 11 — File Documentation and Handoff

- Every created or modified Markdown file contains an appropriate linked Table of Contents.
- Every created or modified JavaScript, JSX, and CSS file begins with the comments-based TOC required by `ai/ai-spec.md`.
- Why-comments explain non-obvious content, image-loading, responsive, and accessibility decisions.
- `:warning:` comments identify material invariants, such as preserving sourced claims or keeping essential content out of images.
- The final implementation handoff reports verification and provides exact-file staging commands and truthful commit messages.

### Requirement 12 — Enter the Codex Scene and Narrative Previews

- Keep the hero's name, role, introduction, and calls to action in semantic HTML outside
  the canvas and usable before the scene loads.
- Render the desktop vortex as a soft rotating ink circle with emerging color, one
  guiding phoenix, at most one distant dragon silhouette, and restrained code/particle
  details. Decorative creatures must not compete with the heading.
- On mobile, use a simplified vertical composition, at most half the desktop particles,
  lower-resolution assets, and a static or lightly animated fallback.
- Lazy-load the Three.js scene after the readable interface and poster are available.
- Pause the render loop when the hero is outside the viewport and dispose all scene
  resources and listeners when Home unmounts.
- Under `prefers-reduced-motion`, show the poster or a stable rendered frame without
  continuous rotation, flight, parallax, or particle travel.
- If WebGL or an asset fails, keep the poster, HTML, skills, and calls to action intact.
- After the required skill sections, show no more than three verified project previews,
  a concise Journey preview, and a Contact callout. Each links to `/portfolio` or
  `/contact`; do not invent project content to fill an empty slot.

## Approved Draft Content

The following content is derived from `.omi/plan/project-content.md`, which was extracted from Oishieka’s resume. It is approved as the implementation draft but still requires Oishieka’s final factual confirmation before production publication.

### Hero Identity

- **Name:** Oishieka Moitra
- **Professional title:** Full Stack Developer
- **Short tagline:** Full Stack Developer creating maintainable web applications with careful attention to requirements, edge cases, and the people who use them.

### Introduction

> I’m Oishieka Moitra, a Full Stack Developer with hands-on experience building scalable web applications using JavaScript, React, Node.js, Express, MongoDB, and SQL. I combine software engineering practices such as RESTful API design, role-based authentication, and automated testing with a disciplined background in legal research, risk analysis, and clear documentation.

The introduction uses claims present in the resume. Confirm that Oishieka is prepared to discuss every named technology/practice in an interview before publication.

### Technical Skill Items

| ID | Name | Icon concept | Supporting description |
| --- | --- | --- | --- |
| `react-javascript` | React & JavaScript | Component brackets or atom | Builds interactive web interfaces with JavaScript and React as part of a full stack application workflow. |
| `node-express` | Node.js & Express | Connected server nodes | Develops server-side application behavior and RESTful APIs, with experience in role-based authentication and Jest testing. |
| `databases` | Databases | Layered database cylinder | Works with MongoDB and relational data tools including SQL, MySQL, and DBeaver; the resume identifies SQL as a beginner-level skill. |

Additional resume-listed technologies may be added only after content review: Java, Spring Boot, JPA/Hibernate, Python (beginner), HTML, CSS, Postman, Expo, and Microsoft Suite.

### Soft Skill/Talent Items

| ID | Name | Icon concept | Supporting description |
| --- | --- | --- | --- |
| `problem-solving` | Problem Solving & Risk Assessment | Shield with magnifying glass | Identifies inconsistencies, missing requirements, and system edge cases, then recommends clear corrective action. |
| `documentation` | Documentation & Attention to Detail | Quill or organized scroll | Produces precise written analysis, reviews complex documents for accuracy, and maintains organized records that support decisions. |
| `communication` | Cross-Functional Communication | Linked speech bubbles | Clarifies requirements with internal and external partners and adapts complex explanations for different audiences. |

### Calls to Action

| Label | React Router destination | Purpose |
| --- | --- | --- |
| View My Work | `/portfolio` | Move from introduction to detailed experience and projects |
| Contact Me | `/contact` | Move to the public contact form |

### AI Image Inventory

| Asset role | Suggested content | Tool | Filename | Alt-text decision | Status |
| --- | --- | --- | --- | --- | --- |
| Hero illustration | Phoenix rising through structured software systems | OpenAI built-in image generation tool | `src/assets/home-phoenix-hero.jpg` | Informative: “A luminous phoenix rising through layered digital systems.” | Complete |
| Skills transition illustration | A visual bridge between technical systems and professional strengths | OpenAI built-in image generation tool | `src/assets/home-skills-bridge.jpg` | Informative: “A radiant feather connecting digital systems with research and communication symbols.” | Complete |

#### Implemented Image Provenance

**Home phoenix hero**

- **Purpose and placement:** Reinforce the phoenix/code identity beside the Home introduction without replacing the HTML name, title, introduction, or calls to action.
- **Prompt summary:** Create an elegant phoenix rising through luminous code, interface grids, and connected application layers in the canonical Phoenix and Code palettes; keep the composition professional, wide, text-free, and free of logos or watermarks.
- **Generated source:** 1536 × 1024 PNG, 2,198,324 bytes.
- **Optimization:** Converted with macOS `sips` to an 82-quality, 1200 × 800 JPEG at 273,053 bytes, an 87.6% reduction.
- **Loading:** Eager with high fetch priority because the illustration is above the fold; intrinsic dimensions prevent avoidable layout shift.
- **Alt decision:** Concise informative alt text communicates the thematic phoenix/software connection while essential professional content remains in adjacent HTML.

**Home skills bridge**

- **Purpose and placement:** Introduce Professional Strengths by connecting technical systems with research, documentation, risk analysis, and communication motifs.
- **Prompt summary:** Create one radiant phoenix feather bridging midnight-blue software systems and a snow-white analytical workspace with document, magnifier, and communication motifs; keep the composition wide, text-free, and free of logos, metrics, awards, or watermarks.
- **Generated source:** 1536 × 1024 PNG, 2,018,168 bytes.
- **Optimization:** Converted with macOS `sips` to an 82-quality, 1200 × 800 JPEG at 224,732 bytes, an 88.9% reduction.
- **Loading:** Lazy because the image appears below the fold; intrinsic dimensions prevent avoidable layout shift.
- **Alt decision:** Concise informative alt text describes the technical-to-professional bridge without duplicating the adjacent skill descriptions.

## User Flow and Expected Behavior

### First-Visit Flow

1. A visitor opens the root portfolio URL.
2. `HashRouter` selects Home at `/`.
3. The shared Header identifies the site and public navigation; the Home link is current.
4. The hero presents Oishieka’s name, title, introduction, calls to action, and relevant AI-created artwork.
5. The visitor can continue to Portfolio or Contact immediately.
6. Scrolling reveals Technical Skills and Soft Skills as clearly separate sections.
7. Each skill can be understood from its name, icon, and description without relying on hover.
8. The shared Footer follows Home content.

### Portfolio Call-to-Action Flow

1. The visitor activates “View My Work.”
2. React Router navigates to `/portfolio` without a full-page server request.
3. The deployed URL becomes `/#/portfolio`.
4. Keyboard focus/scroll behavior remains predictable under the shared layout.

### Contact Call-to-Action Flow

1. The visitor activates “Contact Me.”
2. React Router navigates to `/contact` without a full-page server request.
3. The deployed URL becomes `/#/contact`.
4. Contact feature behavior remains owned by its feature specification.

### Narrow-Screen Flow

1. At 768px or below, the shared mobile navigation remains available at the bottom.
2. Hero text, calls to action, images, and skill cards stack without overflow.
3. Home reserves sufficient bottom space so no content is covered by mobile navigation.
4. Images resize without distortion and text remains readable without horizontal scrolling.

### Image-Failure Flow

1. If an AI image cannot load, the section’s semantic text and navigation remain available.
2. Reserved dimensions prevent severe layout movement.
3. The broken image does not cover text or create an unusable control.
4. No essential claim or instruction is lost because it existed only inside the image.

## Interfaces

### React Components

- `src/pages/HomePage.jsx` — route-level Home composition and section order.
- `src/components/SkillCard.jsx` — optional reusable presentation for technical and soft skill items.
- `src/components/SectionHeading.jsx` — optional shared heading treatment when already justified by layout work.
- `src/App.jsx` — route registration that maps `/` to Home within the shared layout.

Component boundaries are recommendations, not a requirement to create trivial wrappers. Keep Home readable and reuse repeated skill markup without over-componentizing.

### Static Data

- `src/data/homeContent.js` — recommended source for hero copy, calls to action, technical skills, soft skills, and Home image metadata.
- `src/data/phoenixCodexPalette.js` — canonical palette export if not already established by the shared-layout feature.

If content is kept in `HomePage.jsx`, preserve the same validation rules and avoid duplicate versions elsewhere.

### Styling

- Shared tokens from the layout feature or `src/index.css`.
- `src/pages/HomePage.css`, `src/App.css`, or an equivalent focused stylesheet for Home-specific sections and cards.
- Existing focus and responsive foundations must be reused rather than redefined inconsistently.

Every modified CSS file requires an accurate comments-based TOC banner.

### Assets

- `src/assets/` — preferred location for imported, optimized, build-fingerprinted Home images.
- A research/specification record — generation tool, purpose, filename, optimization, placement, and alt text for each required image.

The personal Header logo is not a Home-image substitute and does not count toward the two-image requirement.

### Backend and API

Home performs no backend, authentication, database, or Supabase operation. All Home content is static and bundled with the application.

## Data and Validation

### Hero Data

- `name` — required non-empty text; expected value `Oishieka Moitra`.
- `title` — required non-empty text; expected value `Full Stack Developer`.
- `introduction` — required concise paragraph using verified claims.
- `callsToAction` — exactly the approved Portfolio and Contact links unless a later approved content change says otherwise.

Reject empty identity fields, Vite starter copy, lorem ipsum, placeholder brackets, unsupported metrics, unverified links, or private contact details.

### Skill Data

Each technical and soft skill item contains:

- `id` — required and unique within its collection;
- `name` — required readable label;
- `description` — required supporting sentence or short paragraph;
- `icon` — required approved icon component/reference; and
- `iconAlt` or decorative flag — explicit accessible treatment based on rendering context.

Validation rules:

- at least three technical items exist;
- at least three soft skill/talent items exist;
- IDs are stable and unique;
- every description adds meaning beyond the skill name;
- no array index is used as a React key when the stable ID is available;
- icons are not broken or unlabeled when they communicate meaning;
- no skill uses an unsupported percentage/rating; and
- beginner-level claims remain accurately qualified.

### AI Image Data

Each Home image record contains:

- `id` — stable unique identifier;
- `src` — valid imported optimized asset;
- `width` and `height` or equivalent aspect ratio;
- `purpose` — why the image belongs on Home;
- `tool` — actual AI generation tool used;
- `placement` — hero or supporting section;
- `alt` — useful text or an explicit empty string for decoration; and
- `loading` — eager only when justified above the fold, otherwise lazy.

Validation rules:

- at least two distinct Home-specific AI images exist;
- both tools/provenance records are complete;
- both images are relevant and optimized;
- neither image is the Header logo counted again;
- no essential content is embedded only in image pixels; and
- alt decisions match final placement, not only the source artwork.

### Expected Rendering

- Exactly one page-level heading identifies Oishieka.
- Three or more clearly separated sections render in narrative order.
- Three or more complete technical items render.
- Three or more complete soft skill/talent items render.
- Two or more documented Home-specific AI images render.
- Calls to action navigate through React Router.
- Missing optional media never removes identity, skill descriptions, or navigation.

## Technical Constraints

- Use React, JSX, project CSS, and the established `HashRouter`.
- Use `Link` from `react-router-dom` for internal calls to action.
- Keep Home at route `/`; do not add a canonical `/home` route.
- Render Home inside the shared `Main` layout.
- Use the canonical `phoenixCodexPalette` and approved Home gradient stop order.
- Use `three` only for the route-scoped hero scene; lazy-load it and do not introduce a
  second animation or particle framework.
- Reuse shared CSS tokens; do not scatter duplicate raw hex values through Home styles.
- Use semantic HTML before adding ARIA.
- Use static local content; do not fetch Home from Supabase.
- Use existing/inline icon capabilities rather than adding an icon dependency solely for six items.
- Do not add an animation dependency for basic reveal or hover behavior.
- Keep essential content available without images, hover, JavaScript animation, or motion.
- Preserve the code-quality, content-verification, accessibility, privacy, branching, and handoff rules from `ai/ai-spec.md`.

## Implementation Decisions

### Name as the Page Heading

Oishieka’s name is the page’s most important identity and should be the single `<h1>`. The professional title supports it without creating a second page-level heading.

### Resume-Derived Draft Content

Using the extracted resume content prevents generic placeholder writing and keeps Home consistent with Portfolio. Final publication still requires confirmation because extraction is not the same as factual approval.

### Three Skill Groups Instead of Percentages

The selected technical groups represent the resume’s primary full stack areas without implying unsupported numerical mastery. Meaningful descriptions provide stronger evidence than arbitrary progress bars.

### Data-Driven Skill Rendering

Technical and soft skill collections share a stable data shape, allowing accessible repeated rendering while keeping the two sections semantically and visually distinct.

### Two New Home Images

The rubric separately requires two Home images and one Header logo. Keeping a distinct Home inventory prevents accidental double-counting and encourages page-relevant visual storytelling.

### Gradient Roles

The route-specific Home current supplies motion and page identity, while parchment and
ink surfaces carry readable content. Pastel framing differentiates sections and bright
magic accents remain sparse. Stable solid text surfaces protect readability when a
multicolor gradient cannot maintain uniform contrast.

### Static Content Resilience

Home identity and skills are bundled as semantic text so they render immediately and remain useful even if decorative media fails. No service availability is required to understand the landing page.

### Progressive Vortex Rather Than a Canvas Application

The vortex is an atmospheric layer behind or beside the hero. React and semantic HTML
own all text, links, skills, and previews. This keeps first paint, accessibility,
responsive layout, and failure recovery independent from GPU capability.

## Acceptance Criteria

### Route and Introduction

- [x] Home is registered at React Router path `/` and is the default landing page.
- [ ] Direct loading and refreshing `/#/` works locally and on GitHub Pages.
- [x] Home renders inside the shared `Main` layout.
- [x] `Oishieka Moitra` is prominently displayed as the single page-level heading.
- [x] `Full Stack Developer` or the approved tagline is clearly visible.
- [x] A brief, proofread, resume-derived introduction describes Oishieka professionally.
- [ ] Every technology/practice claim in the introduction has been confirmed before publication.
- [x] Portfolio and Contact calls to action use React Router and have visible focus states.
- [x] No Vite starter text, lorem ipsum, placeholder copy, phone number, or detailed residential information appears.

### Technical Skills

- [x] At least three technical skill items render.
- [x] Every technical item has a name, icon, and meaningful supporting description.
- [x] Technical skills are visually organized as an accessible grid, list, or card collection.
- [x] SQL/Python or other beginner claims are not presented as advanced expertise.
- [x] No unsupported percentage or proficiency rating appears.
- [x] Stable skill IDs are used as React keys.

### Soft Skills or Talents

- [x] At least three soft skill/talent items render.
- [x] Every soft skill item has a name, icon, and meaningful supporting description.
- [x] Soft skills are visually organized as an accessible grid, list, or card collection.
- [x] Descriptions demonstrate resume-supported behavior rather than generic adjectives alone.
- [x] No invented metric, award, or outcome appears.

### Visual Sections and Brand

- [x] Introduction, Technical Skills, and Soft Skills are three clearly separated visual sections.
- [x] Section order creates a clear identity → technical capability → professional-strength narrative.
- [ ] Home uses canonical `phoenixCodexPalette` token names/values and the approved Home gradient order.
- [x] Gradient content passes contrast across the full surface or uses a solid backing surface.
- [x] Fantasy/code decoration supports rather than obscures professional content.
- [x] The Header logo is not counted as one of the Home images.

### AI-Created Images

- [x] At least two distinct Home-specific AI-created images render.
- [x] Both images are relevant to Home content or the phoenix/code theme.
- [x] Both generation tools, purposes, filenames, optimizations, placements, and alt decisions are documented.
- [x] Both images have useful alt text or an explicitly justified empty alt value.
- [x] Both images are optimized and sized for their rendered context.
- [x] Intrinsic dimensions/aspect ratios prevent avoidable layout shift.
- [x] Below-the-fold media uses lazy loading where appropriate.
- [x] Essential identity, skills, and actions remain available if either image fails.

### Responsive, Accessible, and Quality

- [x] Heading hierarchy, sections, lists/cards, links, icons, and images use correct semantics.
- [x] Keyboard users can reach and activate both calls to action with visible focus.
- [x] Content does not rely on color, gradient, icon, image, hover, or motion alone.
- [x] Informative/decorative media uses appropriate accessible treatment.
- [x] Any motion respects `prefers-reduced-motion`.
- [ ] The Home scene loads after readable HTML and has a static poster/WebGL-failure fallback.
- [ ] Mobile uses a simplified composition and no more than half the desktop particle budget.
- [ ] The scene pauses out of view and releases render resources on unmount.
- [ ] Featured-project previews never exceed three and render only verified projects.
- [ ] Journey preview and Contact callout link to `/portfolio` and `/contact` without adding new top-level routes.
- [ ] Home has no horizontal overflow at 320px, 768px, 769px, or desktop width.
- [x] Hero, skill items, media, and calls to action stack/wrap correctly on narrow screens.
- [ ] Home remains readable and operable at 200% zoom.
- [x] Shared mobile navigation does not cover Home content.
- [x] Modified Markdown, JavaScript, JSX, and CSS files meet the TOC/comment requirements in `ai/ai-spec.md`.
- [x] `npm run lint` and `npm run build` pass.
- [x] The implementation handoff reports verification and provides safe exact-file staging and commit commands.

## Verification Plan

### Automated Checks

Run from the repository root:

```bash
npm run lint
npm run build
```

Review build output for missing image/module warnings and unexpectedly large Home assets.

### Content Count Matrix

| Requirement | Minimum | Verification |
| --- | ---: | --- |
| Introduction sections | 1 | Name, title, paragraph, and calls to action are visible |
| Technical skill items | 3 | Every item has name, icon, and supporting description |
| Soft skill/talent items | 3 | Every item has name, icon, and supporting description |
| Distinct visual sections | 3 | Introduction, Technical Skills, and Soft Skills are visibly separated |
| Home-specific AI images | 2 | Both render, are documented, and do not reuse the Header logo count |

### Route and Interaction Checks

1. Load and refresh `/#/` locally and on the deployed site.
2. Confirm Home is selected without a `/home` server path.
3. Activate “View My Work” with pointer and keyboard; confirm `/#/portfolio`.
4. Return Home, activate “Contact Me,” and confirm `/#/contact`.
5. Confirm calls to action do not trigger full-page server navigation.
6. Confirm shared Header, Footer, active Home navigation, and mobile navigation remain consistent.

### Viewport and Zoom Matrix

| Width/state | Required checks |
| --- | --- |
| 320px | One-column flow, no overflow, readable cards, usable calls to action, mobile-nav offset |
| 768px | Mobile navigation mode, stacked/wrapped sections, no duplicate nav overlap |
| 769px | Desktop navigation mode, intentional hero/grid transition |
| 1440px or similar | Bounded line length, balanced whitespace, appropriately sized artwork |
| 200% zoom | No clipped text, hidden controls, overlap, or horizontal content loss |

### Accessibility Checks

1. Inspect headings and confirm one `<h1>` followed by logical section/card headings.
2. Navigate calls to action and any linked content using Tab, Shift+Tab, and Enter.
3. Confirm visible focus and adequate contrast.
4. Inspect skill icons and Home images in the accessibility tree.
5. Disable images or simulate load failures and confirm all text/actions remain available.
6. Enable reduced motion and confirm nonessential effects stop or simplify.
7. Confirm no information depends on hover or color alone.

### Content Verification

- Compare the displayed identity, introduction, technical skills, and soft skills with the Approved Draft Content section.
- Obtain Oishieka’s confirmation for every named technology/practice before production.
- Confirm spelling, capitalization, and professional tone.
- Confirm no private contact information or unsupported achievements were introduced.
- Confirm additional skills, if any, are supported by an approved source.

### AI Image Verification

For each of the two Home images:

1. Open the committed asset and confirm it matches the documented purpose.
2. Confirm the actual AI tool is recorded.
3. Confirm filename, dimensions, file size, optimization, and placement are documented.
4. Confirm alt text is useful in final page context or intentionally empty for decoration.
5. Confirm intrinsic sizing prevents layout shift.
6. Confirm the image is not the Header logo counted again.
7. Confirm the image remains relevant at desktop and mobile crops.

## Warnings and Known Limitations

> :warning: The resume-derived introduction is sourced but not yet finally verified. Do not publish claims Oishieka is not prepared to explain in an interview.

> :warning: The Header logo is a separate rubric asset and cannot satisfy either of the two required Home-image slots.

> :warning: Do not label stock artwork as AI-created. Record the actual generation tool and asset purpose for both Home images.

> :warning: Bright gradient stops may not provide consistent text contrast across their full width. Put essential text on a verified solid surface when necessary.

> :warning: Do not use skill percentages or progress bars without a verifiable measurement source; the resume supports named skills and descriptions, not numerical mastery.

> :warning: The site’s implementation backend is Supabase only, but Home may accurately describe Oishieka’s resume-listed Node.js, Express, and MongoDB experience as professional skill content.

> :warning: Optional image or animation failure must never remove Oishieka’s identity, skill descriptions, or navigation actions.

## Notes for AI and Contributors

- Read `ai/ai-spec.md`, `ai/features/setup-deploy.feature.md`, and `ai/features/header-footer.feature.md` before implementation.
- Use the Approved Draft Content in this specification rather than generating replacement biography or skill claims.
- Ask for confirmation instead of inventing missing achievements, projects, metrics, links, or proficiency levels.
- Keep Home limited to Introduction, Technical Skills, Soft Skills/Talents, their supporting visuals, and appropriate calls to action.
- Do not implement Supabase or other page features in this branch.
- Do not count the Header logo as a Home image.
- Do not add dependencies for simple icons, cards, gradients, or transitions.
- Reuse canonical palette tokens, shared layout primitives, and established focus behavior.
- Add accurate TOC banners to every modified source/style file and keep this Markdown TOC current.
- Use why-comments for content and image decisions; use `:warning:` comments for sourced-claim, image-count, and gradient-contrast invariants.
- Test all content counts, route actions, 320/768/769/desktop widths, zoom, keyboard, image failure, contrast, and reduced motion.
- Run lint and build before handoff.
- End the implementation handoff with exact staging commands and a truthful Conventional Commit message for only relevant files.
