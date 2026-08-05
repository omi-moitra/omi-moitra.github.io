# Feature Specification — Links Page

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

- **Feature name:** Links Page
- **Related area:** Curated professional resources, external navigation, resource imagery, responsive cards, and accessibility
- **Specification path:** `ai/features/link-page.feature.md`
- **Required branch:** `feature/links`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Routing foundation from `ai/features/setup-deploy.feature.md` and shared layout from `ai/features/header-footer.feature.md`
- **Primary users:** Recruiters, collaborators, coaches, developers, learners, and other public visitors

## Feature Goal

Create a public Links page that shares a concise, intentional set of resources relevant to Oishieka Moitra's full stack development work. Each resource should be immediately understandable from its image, title, and short description, and should open its verified external destination safely in a new tab.

After this feature is complete:

- `/#/links` renders the Links page through React Router;
- at least three complete resource cards appear;
- every resource includes a locally controlled image, title, one-to-three-sentence description, and verified clickable URL;
- external destinations open in a new tab without giving them access to the originating window;
- at least one Links-specific AI-created image is rendered and documented; and
- the page remains readable, operable, and visually intentional from 320px through desktop widths.

## Feature Scope

### In Scope — Included

- Links at React Router path `/links` and deployed hash URL `/#/links`.
- A short page introduction explaining why the resources were selected.
- At least three structured resource cards.
- A relevant image, title, one-to-three-sentence description, and clickable URL for every resource.
- MDN Web Docs, React documentation, and Supabase documentation as the initial concrete resource set, subject to final owner approval.
- Local, optimized imagery rather than remote image hotlinking.
- Three Links-specific AI-created card images, exceeding the one-image measurable rubric minimum.
- Documentation of each AI image's generation tool, purpose, filename, optimization, placement, and alt-text decision.
- Safe new-tab behavior using `target="_blank"` with `rel="noopener noreferrer"`.
- Clear external-link cues in visible and accessible content.
- Semantic card/list structure, meaningful link text, keyboard access, visible focus, useful image alternatives, adequate contrast, and reduced-motion behavior.
- Responsive card-grid behavior from narrow phones through desktop widths.
- Data-driven resource rendering with stable identifiers.
- Phoenix, Code, and Creative gradient use derived from the canonical `phoenixPalette`.
- Graceful behavior when a card image fails or an external destination is temporarily unavailable.

### Out of Scope — Excluded

- Header, Footer, personal logo, desktop navigation, or mobile bottom-navigation implementation.
- Home skills and introduction content.
- Portfolio education, work history, projects, or résumé download.
- Contact form fields, validation, Supabase insertion, or submission feedback.
- Login, Back Office, authentication, message data, deletion, or logout.
- Any Supabase query or backend operation.
- A resource database, CMS, bookmarking service, RSS feed, API, or automated link-preview service.
- User-submitted links, ratings, comments, favorites, sorting, filtering, pagination, or search.
- A dedicated detail route or modal for each resource.
- Unverified social profiles or personal contact links.
- Remote third-party images loaded directly from the resource websites.
- Copying third-party logos, screenshots, or branded artwork without checking permitted use.
- Counting the Header logo, Home images, Portfolio images, favicon, or stock-only artwork toward the Links AI-image requirement.
- A new UI framework, icon library, animation library, or card package solely for Links.

## Requirements Breakdown

### Requirement 1 — Links Route and Page Introduction

- Replace the setup placeholder at React Router path `/links` with the Links page component.
- Render the page at deployed hash URL `/#/links` inside the shared `Main` layout.
- Direct loading and refreshing of `/#/links` must work on GitHub Pages.
- Use one page-level `<h1>` such as “Developer Resources.”
- Add a short introduction that explains the collection's relevance to Oishieka's work and learning.
- Keep the introduction in plain professional language; fantasy language may support the theme but must not obscure the page's purpose.
- Do not create nested resource routes or use imperative navigation for external links.

### Requirement 2 — Minimum Resource Inventory

- Render at least three resource entries.
- Every resource entry includes:

  - a unique stable identifier;
  - a locally stored image;
  - image alt text appropriate to its purpose;
  - a visible title or name;
  - a description containing one to three complete sentences;
  - a valid HTTPS URL; and
  - a clear external-link action.

- Use the three resources in this specification unless Oishieka approves replacements.
- Keep all required card information visible without hover, focus, or animation.
- Do not use empty cards, “coming soon” items, example URLs, or unfinished descriptions to reach the minimum count.
- Do not count Header, Footer, navigation, email, or social-profile links as resource entries.

### Requirement 3 — Resource Card Structure

- Render resources as a semantic list of cards or another clearly structured collection.
- Use one `<article>` or `<li>` relationship per resource.
- Preserve a consistent information order: image → title → description → external action.
- Ensure the entire card has one unambiguous destination.
- If the card itself is an anchor, do not place buttons or additional anchors inside it.
- If only a dedicated action link is clickable, ensure its hit area and visible label are large and clear.
- Use visible action text such as “Visit MDN Web Docs” instead of a bare URL or generic “Click here.”
- Indicate that the destination opens in a new tab through visible helper text, an accessible name, or both.
- Keep titles and descriptions as real HTML text rather than baking them into images.

### Requirement 4 — External-Link Safety and Validation

- Every resource URL must use `https:`.
- Every resource link must use `target="_blank"`.
- Every new-tab link must use `rel="noopener noreferrer"`.
- Verify each destination manually before release and immediately before final submission.
- Keep external links independent of React Router; do not use React Router `Link` for off-site URLs.
- Do not use `window.open()` when a normal anchor supplies the required behavior.
- Do not append tracking parameters unless Oishieka explicitly approves them.
- Do not expose the originating page through an unsafe opener relationship.
- Treat a temporarily unreachable resource as an external availability issue; the Links page itself must continue rendering normally.

### Requirement 5 — Resource Descriptions

- Give each resource a concise description of one to three sentences.
- Explain what the resource provides and why it belongs in this collection.
- Use original wording; do not copy long marketing or documentation text from the destination.
- Avoid claims such as “best,” “complete,” or “always current” unless they can be supported and remain appropriate.
- Keep the tone consistent, professional, and useful to recruiters as well as developers.
- Do not imply endorsement, partnership, employment, certification, or sponsorship by any linked organization.
- Keep version-specific claims out of descriptions unless a version is essential and verified before publication.

### Requirement 6 — Resource Images

- Provide one image for every resource card.
- Store all images locally in `src/assets` and import them through Vite.
- Use images that visually distinguish the resources without requiring copyrighted logos or copied site artwork.
- Do not place the resource title or essential description only inside image pixels.
- Optimize every image for its rendered dimensions before committing.
- Provide intrinsic dimensions or CSS aspect ratios to reduce layout shift.
- Lazy-load card images when they appear below the initial viewport.
- Give informative images concise alt text.
- Use empty alt text only when the adjacent card content fully communicates the same information and the artwork is purely decorative.
- Preserve title, description, and link access if an image fails.

### Requirement 7 — Links-Specific AI-Created Images

- Render at least one image created using an AI image tool specifically for Links.
- This specification requires three AI-created card images so each resource receives original, locally controlled artwork:

  1. `links-mdn-web-platform.jpg` — an abstract web-platform reference library;
  2. `links-react-components.jpg` — modular interface components arranged as a constellation; and
  3. `links-supabase-data.jpg` — a secure data vault connected to application nodes.

- Do not ask the image tool to reproduce third-party logos, trademarks, screenshots, or exact brand styles.
- Keep essential titles, technology names, descriptions, and actions in HTML.
- Record the actual generation tool and final asset details before marking the feature complete.
- Do not claim an image is AI-created solely because it was resized, compressed, downloaded, or edited by conventional software.

### Requirement 8 — Phoenix Visual Direction

- Use the exact canonical `phoenixPalette` token names and values from `ai/ai-spec.md`.
- Reuse shared kebab-case CSS custom properties rather than redefining competing colors.
- Use approved gradients selectively:

  - Phoenix: `phoenixRed` → `blazeOrange` → `solarGold` for the page introduction or primary flourish;
  - Code: `midnightBlue` → `sapphire` → `teal` for developer-reference cards and technical accents; and
  - Creative: `royalViolet` → `magenta` → `phoenixRed` for selected borders, dividers, or artwork framing.

- Preserve each gradient's token order.
- Keep card text on stable solid surfaces when contrast cannot be guaranteed across a gradient.
- Use a library, spellbook, portal, or constellation motif only when labels and actions remain immediately understandable.
- Keep the three cards visually related without making their destinations indistinguishable.
- Keep decoration subordinate to titles, descriptions, and link actions.

### Requirement 9 — Responsive Layout

- Use a single-column resource list at narrow widths.
- Allow two or three columns at wider widths when cards retain comfortable reading width.
- Keep the page within the viewport at 320px, 768px, 769px, and desktop widths.
- Ensure titles, descriptions, helper text, and URLs wrap without clipping.
- Keep cards usable when descriptions differ in length.
- Scale images while preserving consistent aspect ratios.
- Keep the external action reachable without requiring cards to share a fixed height.
- Reserve enough bottom space for the shared mobile navigation at 768px and below.
- Preserve readable spacing and link access at 200% zoom.
- Do not reorder resources visually in a way that differs from DOM reading order.

### Requirement 10 — Accessibility and Semantics

- Use one page-level `<h1>` and logical section/card headings.
- Use a semantic list when the cards form one curated collection.
- Ensure every external link is keyboard operable and has a visible focus indicator.
- Make each link's purpose understandable outside surrounding context.
- Ensure external-tab behavior is not communicated through color or icon alone.
- Use useful alt text for informative images and empty alt text for decorative images.
- Avoid repeating the full title and description in image alt text.
- Do not rely on color, image, hover, position, gradient, or motion alone to distinguish resources.
- Respect `prefers-reduced-motion` for card entrances, hover movement, or decorative effects.
- Maintain contrast for titles, descriptions, metadata, links, borders, and focus rings.
- Preserve comprehension when CSS or images fail to load.

### Requirement 11 — Performance and Resilience

- Do not fetch remote metadata, favicons, screenshots, or Open Graph images at runtime.
- Do not ship multi-megabyte card images at small rendered dimensions.
- Prefer appropriately compressed JPEG, PNG, WebP, or AVIF based on the artwork's needs and browser-support decision.
- Avoid loading all full-resolution images eagerly.
- Render card text and links without waiting for optional media.
- Use stable image dimensions to prevent layout movement during load.
- Do not make the page depend on Supabase, a CMS, an API, or third-party JavaScript.
- Do not block the page or show an application error when an external destination is offline.
- Avoid unnecessary JavaScript for card hover or layout behavior that CSS can provide.

### Requirement 12 — File Documentation and Handoff

- Every created or modified Markdown file must have a linked Table of Contents near the top.
- Every created or modified comment-capable source file must open with an accurate comments-based TOC.
- Add why-comments for non-obvious resource, URL, image, security, and accessibility decisions.
- Use `// :warning:` for material limitations and cross-system invariants, including external URL validation and new-tab safety.
- Keep comments current when resource data or behavior changes.
- At implementation handoff, report verification and provide exact staging commands and ready-to-run commit messages for only the files changed.

## Approved Draft Content

The source résumé does not identify external resources for this page. The initial set below was selected because each destination is official, directly relevant to the website's technology and implementation practices, and useful to visitors interested in full stack development. Oishieka must approve the selection before implementation is considered content-complete.

### Page Introduction

> These are a few of the references I return to while building accessible, maintainable web applications. Together they cover the browser platform, component-based interface development, and the data and authentication services used in this portfolio.

### Resource 1 — MDN Web Docs

- **Title:** MDN Web Docs
- **URL:** `https://developer.mozilla.org/en-US/`
- **Description:** MDN provides references and learning material for HTML, CSS, JavaScript, accessibility, and browser APIs. I use it to verify platform behavior and make implementation decisions grounded in web standards.
- **Image:** `src/assets/links-mdn-web-platform.jpg`
- **Image concept:** A luminous reference library built from abstract browser panels, semantic document layers, and code symbols without Mozilla or MDN logos.
- **Initial alt text:** Abstract digital library representing web-platform documentation and browser standards.
- **Visible action:** Visit MDN Web Docs

### Resource 2 — React Documentation

- **Title:** React Documentation
- **URL:** `https://react.dev/`
- **Description:** React's official documentation explains components, state, effects, and the patterns used to compose interactive interfaces. It supports the component-driven approach used throughout this portfolio.
- **Image:** `src/assets/links-react-components.jpg`
- **Image concept:** Independent interface panels connecting into a coherent constellation without the React logo or branded site artwork.
- **Initial alt text:** Interface components connecting into a larger application structure.
- **Visible action:** Visit React Documentation

### Resource 3 — Supabase Documentation

- **Title:** Supabase Documentation
- **URL:** `https://supabase.com/docs`
- **Description:** Supabase's official documentation covers its Postgres database, authentication, Row Level Security, and JavaScript client. It is the primary technical reference for this portfolio's contact and private administration workflows.
- **Image:** `src/assets/links-supabase-data.jpg`
- **Image concept:** A protected data vault connected to application nodes without Supabase logos or copied interface imagery.
- **Initial alt text:** Secure data storage connected to web application services.
- **Visible action:** Visit Supabase Documentation

### Links AI Image Inventory

| Intended filename | Resource role | Initial alt-text decision | Completion evidence |
| --- | --- | --- | --- |
| `src/assets/links-mdn-web-platform.jpg` | Card image for MDN Web Docs | Informative alt text describing the web-platform library concept | Record actual AI tool, generation date, optimization, dimensions, and final alt text after creation |
| `src/assets/links-react-components.jpg` | Card image for React Documentation | Informative alt text describing connected interface components | Record actual AI tool, generation date, optimization, dimensions, and final alt text after creation |
| `src/assets/links-supabase-data.jpg` | Card image for Supabase Documentation | Informative alt text describing protected application data | Record actual AI tool, generation date, optimization, dimensions, and final alt text after creation |

The filenames describe required asset roles, but these assets do not exist yet. Do not mark the card-image or AI-image criteria complete until the files render and their provenance is recorded.

## User Flow and Expected Behavior

### First-Visit Flow

1. A visitor selects Links from the shared navigation or opens `/#/links` directly.
2. The Links page renders inside the shared Header, Main, and Footer layout.
3. The page heading and introduction explain why the resources were selected.
4. At least three complete cards appear in a logical reading order.
5. Each card exposes its image, title, description, and external action without requiring interaction.

### Resource-Visit Flow

1. The visitor identifies a relevant card from its heading and description.
2. The visitor focuses or selects its clearly labeled external link.
3. The verified HTTPS destination opens in a new tab.
4. The Links page remains open in the original tab.
5. The external page cannot access the original page through `window.opener`.

### Keyboard Flow

1. The visitor tabs from shared navigation into the resource collection.
2. Focus moves through cards or their action links in DOM order.
3. Each focused link has a visible indicator against its actual background.
4. Enter activates the link and opens the new tab as described.
5. Decorative imagery never creates an extra focus stop.

### Narrow-Screen Flow

1. Cards render in one logical column.
2. Images scale to the card width without distortion.
3. Titles, descriptions, and external-link cues wrap inside the viewport.
4. Card actions remain large enough to operate and clear the fixed mobile navigation.

### Image-Failure Flow

1. Reserved media space limits unexpected layout movement where practical.
2. The title, description, and external link continue rendering.
3. Informative images expose useful alternative text.
4. The broken image does not make the whole card or route unusable.

### External-Destination Failure Flow

1. The browser attempts to open the external destination in a new tab.
2. Any network, domain, or destination error remains confined to that tab.
3. The original Links page remains rendered and operable.
4. The application does not claim that an external site is always available.

## Interfaces

### React Page

- `src/pages/LinksPage.jsx`
  - Owns page composition, page-level heading, introduction, resource collection, and Links-specific media.
  - Replaces the `/links` setup-route definition in `src/App.jsx`.

### Reusable Component

- `src/components/ResourceCard.jsx`
  - Renders one resource's image, title, description, and safe external action.
  - Preserves one clear interactive destination without nested controls.

Keep the card inside `LinksPage.jsx` if it is genuinely small and not reusable. Do not create a component solely to wrap a single element.

### Static Data

- `src/data/resources.js`
  - Exports the owner-approved resource array and centralized external URLs.
  - Keeps image imports and accessibility metadata beside the content they describe.
  - Uses stable IDs for React keys.

### Styling

- `src/pages/LinksPage.css`
  - Owns the Links introduction, resource grid, card hierarchy, image framing, external-link cues, focus treatment, and responsive behavior.
  - Reuses global design tokens and shared primitives rather than redefining the palette.

### Assets

- `src/assets/links-mdn-web-platform.jpg` — AI-created web-platform documentation art.
- `src/assets/links-react-components.jpg` — AI-created component-system art.
- `src/assets/links-supabase-data.jpg` — AI-created secure-data art.

### Routing

- `src/App.jsx`
  - Imports `LinksPage`.
  - Registers `<Route path="/links" element={<LinksPage />} />` within `Main`.
  - Removes only the obsolete `/links` setup-route definition.

### Endpoints and Services

- No API endpoint, Supabase query, authentication state, or environment variable is used by this feature.
- Resource destinations are ordinary external anchors, not application-service integrations.
- No runtime link-preview or metadata service is introduced.

## Data and Validation

### Resource Data Shape

```javascript
{
  id: 'mdn-web-docs',
  title: 'MDN Web Docs',
  description:
    'MDN provides references and learning material for HTML, CSS, JavaScript, accessibility, and browser APIs.',
  url: 'https://developer.mozilla.org/en-US/',
  actionLabel: 'Visit MDN Web Docs',
  image: linksMdnWebPlatform,
  imageAlt: 'Abstract digital library representing web-platform documentation and browser standards.',
}
```

Validation rules:

- `id`, `title`, `description`, `url`, `actionLabel`, `image`, and `imageAlt` are required.
- `id` values are unique and stable.
- `description` contains one to three complete sentences.
- `url` parses successfully and uses `https:`.
- `actionLabel` uniquely identifies the destination and avoids generic wording.
- `image` resolves to a local imported asset.
- `imageAlt` is concise and does not duplicate the full title and description.
- The implementation renders at least three valid entries.

### AI Image Metadata Shape

```javascript
{
  id: 'links-mdn-web-platform',
  src: linksMdnWebPlatform,
  alt: 'Abstract digital library representing web-platform documentation and browser standards.',
  width: 1200,
  height: 800,
  generatedWith: 'Recorded after the final asset is created',
  purpose: 'Represent standards-based web documentation without reproducing third-party branding.',
}
```

Validation rules:

- Exactly recording the actual generation tool is mandatory before release.
- `width` and `height` match the optimized file.
- The image contains no misleading copied logo, interface, certification, or endorsement.
- Each file is specific to Links and is not reused to satisfy another page's image count.
- At least one valid Links-specific AI asset renders; this specification targets all three card images.
- Every rendered asset has documented provenance and a reviewed alt-text decision.

### External Anchor Contract

Each resource action renders as a normal anchor with:

- `href={resource.url}`;
- `target="_blank"`;
- `rel="noopener noreferrer"`; and
- visible text from `resource.actionLabel`.

Do not use a React Router `Link`, button, click handler, or `window.open()` for this contract.

### Expected Rendering

- Render resources from one array rather than duplicating card markup.
- Use stable resource `id` values as React keys.
- Preserve resource-array order in DOM and visual layout.
- Do not render entries with missing images, titles, descriptions, actions, or valid URLs.
- Do not render empty metadata wrappers or hidden interactive duplicates.
- Render static content immediately without waiting for network requests.

## Technical Constraints

- Use React 19, Vite 8, JavaScript modules, React Router, semantic HTML, and project CSS.
- Use the existing `HashRouter`; do not replace it with `BrowserRouter`.
- Keep Links under the existing shared `Main` layout.
- Do not add a dependency for cards, masonry, icons, external-link handling, image loading, or URL previews.
- Do not query Supabase or another backend for static resource data.
- Import build-managed Links images from `src/assets`.
- Do not hotlink third-party images or use remote favicons as card images.
- Preserve the canonical `phoenixPalette` values and approved gradient stop orders.
- Keep resource descriptions original and concise.
- Do not place credentials, tracking tokens, referral codes, or private URLs in resource data.
- Preserve lint and production build success.

## Implementation Decisions

### Use Three Official Technical Resources

The résumé does not provide Links-page content. MDN, React, and Supabase are concrete official references directly related to the browser platform, component architecture, and backend service used by this portfolio. They create an honest initial collection without inventing personal affiliations, but Oishieka retains final content approval.

### Use One Clear Destination Per Card

Every rubric entry requires one clickable URL. A single destination avoids nested interactive elements, ambiguous click targets, and duplicated tab stops while keeping the card easy to understand.

### Store Images Locally

Remote screenshots, logos, and Open Graph images can change, fail, track visitors, or create usage-rights uncertainty. Local original artwork makes performance, dimensions, availability, and accessibility decisions controllable within the project.

### Create Original Conceptual Images

The resources are represented through conceptual AI illustrations rather than copied brands. This satisfies the image requirements while avoiding false affiliation and keeping the phoenix/code visual system coherent.

### Exceed the AI-Image Minimum Deliberately

The Links rubric contains a copied “Portfolio page” phrase but appears inside the Links subsection and states a measurable minimum of one AI-created image. Supplying one AI-created image per required resource produces clearer cards and makes compliance independently verifiable.

### Keep External Links as Anchors

Native anchors communicate link semantics to browsers and assistive technology, support standard context-menu behavior, and meet new-tab requirements without imperative JavaScript.

## Acceptance Criteria

### Route and Introduction

- [ ] `/#/links` renders `LinksPage` inside the shared layout.
- [ ] Direct loading and refresh work in local preview and deployed GitHub Pages.
- [ ] The setup placeholder no longer renders at `/links`.
- [ ] The page has exactly one descriptive `<h1>` and a concise introduction.
- [ ] No nested resource routes, filters, search, or data service are added.

### Resource Inventory

- [ ] At least three complete resource cards render.
- [ ] Every card has a local image, visible title, one-to-three-sentence description, and clickable URL.
- [ ] MDN Web Docs, React Documentation, and Supabase Documentation render unless Oishieka approves replacements.
- [ ] Every selected title, URL, description, and action label has owner approval.
- [ ] No incomplete, generic, duplicate, social-profile, or “coming soon” item is counted.
- [ ] Required information is visible without hover, focus, motion, or image text.

### External Links

- [ ] Every destination uses a verified HTTPS URL.
- [ ] Every resource opens in a new tab.
- [ ] Every resource anchor includes `rel="noopener noreferrer"`.
- [ ] Every action has unique, descriptive visible text.
- [ ] No external destination uses React Router, a button, `window.open()`, or tracking parameters.
- [ ] A failed external destination does not break the Links page.

### Images and AI Evidence

- [ ] Every resource card renders one locally stored, optimized image.
- [ ] At least one Links-specific AI-created image renders; the planned implementation renders three.
- [ ] Required images are not borrowed from Header, Home, Portfolio, favicon, remote sites, or stock-only inventory.
- [ ] Artwork does not reproduce third-party logos, screenshots, or exact brand styling.
- [ ] Every image has an appropriate informative or decorative alt-text decision.
- [ ] The actual AI tool, purpose, filename, dimensions, optimization, placement, and alt-text decision are documented for every AI-created image.
- [ ] Card text and links remain available if an image fails.

### Responsive, Accessible, and Quality

- [ ] Cards form a semantic list or equally clear structured collection.
- [ ] DOM order and visual order match.
- [ ] All links work by keyboard and have visible focus.
- [ ] External-tab behavior is communicated without relying only on an icon or color.
- [ ] Text, links, borders, and focus states meet project contrast requirements.
- [ ] Content does not depend on hover, image, color, gradient, motion, or position alone.
- [ ] Motion is removed or reduced when `prefers-reduced-motion: reduce` is active.
- [ ] No horizontal overflow, clipped text, overlapping cards, or hidden controls appear at 320px, 768px, 769px, desktop widths, or 200% zoom.
- [ ] Content clears the fixed mobile navigation at 768px and below.
- [ ] Images preserve aspect ratio, reserve stable space, and are optimized for rendered size.
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

Inspect the production output to confirm all three Links images are emitted and no remote card-image requests are introduced.

### Content Count Matrix

| Requirement | Minimum | Planned | Verification |
| --- | ---: | ---: | --- |
| Resource cards | 3 | 3 | Count rendered cards and inspect every required field |
| Image per resource | 3 | 3 | Confirm each card renders one local image |
| Description sentences | 1 per card | 2 per card | Read rendered descriptions and count complete sentences |
| Links-specific AI images | 1 | 3 | Inspect rendered assets and provenance records |
| Safe new-tab links | 3 | 3 | Inspect anchor attributes and activate each link |

### Route and Interaction Checks

- Open `/#/links` directly and refresh it.
- Navigate to Links from desktop navigation and mobile bottom navigation.
- Confirm shared active-link treatment identifies Links correctly.
- Tab through resource links in DOM order.
- Activate each link and confirm it opens the intended destination in a new tab.
- Inspect every anchor for `target="_blank"` and `rel="noopener noreferrer"`.
- Confirm no card contains nested interactive elements.
- Temporarily break each image path and confirm card text and links remain usable.

### URL and Content Checks

- Verify `https://developer.mozilla.org/en-US/` resolves to MDN Web Docs.
- Verify `https://react.dev/` resolves to React's official documentation.
- Verify `https://supabase.com/docs` resolves to Supabase's official documentation.
- Confirm each description is original, accurate, professional, and one to three sentences.
- Confirm all three resources have Oishieka's approval.
- Confirm no affiliate parameters, credentials, private URLs, unsupported endorsements, copied marketing text, or Vite starter content appears.

### Viewport and Zoom Matrix

- Test at 320px width.
- Test at 768px width.
- Test at 769px width.
- Test at a representative desktop width such as 1440px.
- Test at 200% browser zoom.
- Check the longest title, description, and action label for wrapping.
- Confirm the final card and link clear mobile bottom navigation.

### Accessibility Checks

- Navigate the complete page with a keyboard only.
- Inspect heading order, collection semantics, card relationships, links, images, and accessible names.
- Confirm focus indicators remain visible on every card surface and gradient.
- Verify informative image alt text and empty alt text only when artwork is decorative.
- Verify each link purpose remains clear outside surrounding context.
- Verify new-tab behavior is communicated accessibly.
- Test reduced-motion preference.
- Check representative text, link, border, and focus color pairs for contrast.
- Confirm reading order remains logical when grid CSS and images are disabled.

### AI Image Verification

For each Links image, record and inspect:

- actual AI generation tool;
- generation date;
- resource purpose and card placement;
- committed filename and file type;
- pixel dimensions and optimized file size;
- confirmation that no third-party logo or screenshot was reproduced;
- whether the image is informative or decorative;
- final alt text; and
- rendered behavior at narrow and wide viewports.

## Warnings and Known Limitations

> **:warning: Owner approval required:** The source résumé does not supply Links-page resources. MDN, React, and Supabase are verified draft selections, but Oishieka must approve them before content is considered final.

> **:warning: Rubric wording conflict:** The AI-image row appears in the Links subsection but says “Portfolio page.” The measurable bullet requires at least one image on this page, and the Global AI Spec requires one Links image. This specification uses the stricter page-relevant interpretation and plans three.

> **:warning: External availability:** External URLs can move, redirect, or become unavailable independently of this application. Verify every destination immediately before release and submission.

> **:warning: New-tab invariant:** Every resource anchor must keep `target="_blank"` and `rel="noopener noreferrer"` together. Removing the relationship protection changes the security behavior.

> **:warning: AI image evidence:** Proposed filenames and concepts do not prove generation. The requirement remains incomplete until rendered files and actual provenance records exist.

> **:warning: Third-party identity:** Conceptual artwork must not imply sponsorship, partnership, certification, or endorsement by Mozilla, React, Meta, or Supabase.

> **:warning: Content freshness:** Documentation structure and product capabilities change. Avoid version-specific or absolute claims and review descriptions immediately before publication.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` and this specification before implementing or modifying Links.
- Treat the Module 16 grading CSV as final authority when requirements conflict.
- Use the resource set in this specification only after Oishieka approves it.
- Preserve `HashRouter`; React Router paths omit the hash while deployed browser URLs include it.
- Keep at least three complete resource entries and one image per entry.
- Keep one clear external destination per card and use native anchors.
- Keep all resource imagery local, original, optimized, and accessible.
- Add no dependencies unless a separately approved requirement makes one necessary.
- Do not introduce Supabase queries, authentication, a CMS, or runtime preview fetching into this static public page.
- Do not count assets from another page toward the Links-specific AI-image minimum.
- Record actual asset provenance after image creation; never claim an unspecified or unverified tool.
- Recheck every external URL immediately before deployment and final submission.
- Preserve existing user work and keep unrelated edits out of this feature.
- End implementation handoffs with verification results, exact staging commands, and ready-to-run commit messages for only the relevant files.
