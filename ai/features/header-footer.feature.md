# Feature Specification — Project Layout, Header & Footer

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
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

- **Feature name:** Project Layout, Header & Footer
- **Related area:** Shared React layout, public navigation, responsive design, accessibility, and brand presentation
- **Specification path:** `ai/features/header-footer.feature.md`
- **Required branch:** `feature/header-footer`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Depends on:** Setup & Deploy routing foundation from `ai/features/setup-deploy.feature.md`
- **Primary users:** Public visitors, recruiters, hiring managers, authenticated administrators, and keyboard/screen-reader users

## Feature Goal

Create a consistent shared layout that places every route’s page content between a branded Header and Footer, provides clear access to the four public pages, and adapts navigation at the exact 768px breakpoint without obscuring content or exposing hidden administrator routes.

After this feature is complete:

- every route renders within a predictable Header → main content → Footer structure;
- the personal logo returns visitors to Home;
- desktop visitors use horizontal top navigation;
- mobile and tablet-width visitors use icon-based bottom navigation;
- Login and Back Office remain absent from all navigation;
- footer contact, professional links, and copyright content are consistent; and
- keyboard, screen-reader, zoom, small-screen, and long-page behavior remain usable.

## Feature Scope

### In Scope — Included

- A reusable `Main` layout component that renders Header, route content, and Footer in document order.
- A semantic Header visible at the top of every route.
- A sticky Header that remains available during vertical scrolling.
- A reusable desktop navigation containing Home, Portfolio, Links, and Contact.
- An icon-based bottom navigation at 768px and below.
- Consistent active, hover, focus-visible, and current-page states.
- A Footer at the end of every route’s page content.
- Approved public email, professional social/profile links, and copyright content in the Footer.
- One AI-generated personal logo in the Header.
- Logo navigation to Home with useful alternative text and an accessible link name.
- Shared layout/design tokens for color, typography, spacing, focus, feedback, container width, stacking, and responsive behavior.
- Global media rules that keep logos, images, text, cards, sections, and route content within the viewport.
- A keyboard-accessible skip link to the main route content.
- Responsive verification at 320px, 768px, 769px, and a desktop width.
- Documentation of the logo’s AI generation tool, purpose, filename, optimization, and alt-text decision.

### Out of Scope — Excluded

- Home introduction, technical skills, soft skills, or Home-specific AI images.
- Portfolio education, work experience, projects, resume download, or Portfolio-specific AI images.
- Links-page resource cards or Links-specific AI image.
- Contact form fields, validation, Supabase insertion, or form feedback.
- Login form behavior, authentication, or session redirects.
- Back Office route protection, message data, modal, deletion, or logout behavior.
- Creating or changing Supabase tables, policies, authentication, credentials, or environment configuration.
- Adding Login or Back Office to any navigation, menu, sitemap-style content, or visible discovery control.
- A hamburger/drawer menu when the rubric requires icon-based bottom navigation at 768px and below.
- Final page-specific section layouts beyond the shared responsive container and global media behavior.
- Optional splash animation, dark mode, language switcher, and dual-PDF selector.
- Unverified email addresses, social URLs, or placeholder profile links.
- A new UI framework, CSS-in-JS library, icon package, or animation dependency solely for shared layout.

## Requirements Breakdown

### Requirement 1 — Main Layout Composition

- Create a reusable layout component named `Main` in `src/layouts/Main.jsx`.
- Render elements in this document order:

  1. skip link;
  2. Header;
  3. main content landmark containing the active route content; and
  4. Footer.

- Use React Router’s `Outlet` for nested route content unless the established router composition requires an equivalent children-based layout.
- Give the main content landmark a stable target such as `id="main-content"` for the skip link.
- Ensure each route owns its page-level heading; the layout must not add a competing generic `<h1>`.
- Use a full-height flex/grid shell so short pages still place the Footer at the bottom of the viewport while long pages keep it after their content.
- Do not duplicate Header or Footer imports in each page component.
- Render the shared layout for Home, Portfolio, Links, Contact, Login, and Back Office so the rubric’s “every page” requirement is met.
- Public navigation within that layout must still contain only the four public routes.

### Requirement 2 — Header

- Use a semantic `<header>` element.
- Keep the Header visible while scrolling with `position: sticky` and `top: 0` unless testing proves a fixed Header is necessary.
- Give the Header a consistent background, spacing, border/shadow treatment, and stacking level on every route.
- Place the personal logo and its Home link in the Header.
- Above 768px, show the public navigation horizontally at the top.
- At 768px and below, hide the desktop link row while retaining the branded Header/logo area.
- Ensure sticky positioning does not cover the skip-link target or focused content.
- Avoid layout shifts when the logo image loads by providing intrinsic dimensions or a stable aspect ratio.

### Requirement 3 — Public Navigation Model

- Define one shared public navigation data source with exactly these destinations:

  | Label | React Router path | Deployed hash URL |
  | --- | --- | --- |
  | Home | `/` | `/#/` |
  | Portfolio | `/portfolio` | `/#/portfolio` |
  | Links | `/links` | `/#/links` |
  | Contact | `/contact` | `/#/contact` |

- Render navigation with React Router `NavLink`, not plain server-path anchors.
- Use the shared data source for desktop and mobile navigation to prevent destination drift.
- Provide an accessible name for every navigation link.
- Expose the current page with a visible active style and `aria-current="page"` behavior supplied by `NavLink`.
- Ensure hover, keyboard focus, and active states remain visually distinguishable from one another.
- Do not include `/login`, `/back-office`, administrator labels, secret-route hints, or administrator icons in navigation data.
- Do not use links that request server paths such as `/portfolio` outside `HashRouter`.

### Requirement 4 — AI-Generated Personal Logo

- Display one personal logo image in the Header.
- Use the supplied source asset at `public/personalLogo.png`, available at `/personalLogo.png`.
- Generate the logo with an AI image tool rather than using an unchanged stock mark.
- Keep the logo consistent with the polished phoenix-inspired fantasy/code direction and professional tone.
- Avoid embedding tiny text in the generated image because it can become illegible or malformed.
- Optimize the final file for web delivery and store it in the appropriate project asset directory.
- Provide explicit width/height information or `aspect-ratio` to prevent content shift.
- Scale the logo without distortion or viewport overflow.
- Wrap the logo in a React Router link to `/`.
- Use useful alt text such as “Oishieka Moitra portfolio home” unless visible adjacent text would make that wording unnecessarily repetitive.
- Document the AI tool, generation purpose, source/output filename, optimization, and final alt-text decision in this specification or an approved research document.
- Do not claim the logo requirement is complete until the generated asset and provenance note both exist.

Current source-asset status:

- **Path:** `public/personalLogo.png`
- **Format:** RGB PNG without transparency
- **Intrinsic dimensions:** 1254 × 1254 pixels
- **Current file size:** 1,570,585 bytes (approximately 1.5 MB)
- **Visual description:** A multicolored phoenix with painterly rainbow feathers and code-themed details in its dark right wing.
- **AI derivative tool:** OpenAI built-in image generation tool
- **Generation purpose:** Preserve the supplied phoenix/code identity while removing tiny pseudo-code text and simplifying the mark for legibility at Header size.
- **Prompt summary:** Refine the source into a professional ascending phoenix with warm painterly feathers, a midnight technology wing, and abstract circuit accents; include no words, readable code, watermark, or extra objects.
- **Header output:** `public/personal-logo-header.png`, an RGB PNG rendered at 320 × 320 pixels
- **Optimization:** Downsampled from 1254 × 1254 to 320 × 320 with macOS `sips`; file size reduced from 1,570,585 to 153,613 bytes (90.2%).
- **Alt-text decision:** The image uses empty alt text because adjacent visible brand text names Oishieka Moitra; the wrapping Home link provides the accessible name `Oishieka Moitra portfolio home`.

### Requirement 5 — Desktop Navigation Above 768px

- At viewport widths of 769px and greater, display Home, Portfolio, Links, and Contact horizontally in the Header.
- Keep link text readable and targets comfortably clickable.
- Allow wrapping only if it remains visually intentional; prevent navigation from overlapping the logo or overflowing the viewport.
- Keep the mobile bottom navigation hidden at 769px and above.
- Preserve active and focus-visible states at desktop widths.

### Requirement 6 — Mobile Bottom Navigation at 768px and Below

- At viewport widths of 768px and below, display the four public destinations as icons in a bottom navigation.
- Use short visible labels with icons when space permits; otherwise retain programmatically determinable accessible names.
- Keep tap targets large enough for reliable touch use, with a target size of approximately 44 by 44 CSS pixels where practical.
- Fix the navigation to the bottom of the viewport so it remains available while scrolling.
- Account for device safe-area insets using `env(safe-area-inset-bottom)` where supported.
- Reserve enough page/footer bottom space that the fixed navigation never covers content, links, buttons, form controls, or the final Footer line.
- Keep the bottom navigation above page content in stacking order without obscuring dialogs owned by later features.
- Keep the desktop navigation hidden at 768px and below.
- At exactly 768px, show only the mobile bottom navigation; never show both navigation systems.

### Requirement 7 — Footer

- Use a semantic `<footer>` element after the main content.
- Render the Footer on every route.
- Include the approved public contact email.
- Include verified professional social/profile links such as LinkedIn and GitHub when supplied.
- Include a copyright notice identifying Oishieka Moitra.
- The copyright year may be generated from the current date to avoid stale annual edits.
- Use `mailto:` only for the approved public email.
- Open external professional links in a new tab with `rel="noopener noreferrer"`.
- Give links descriptive accessible names rather than raw or ambiguous “click here” text.
- Do not render empty list items, `#` URLs, generic placeholders, or unverified profiles while content is pending.
- Keep Footer content readable, wrapping, and reachable above the mobile bottom navigation.

### Requirement 8 — Shared Design Tokens

- Define shared CSS custom properties for:

  - every canonical `phoenixPalette` color from `ai/ai-spec.md`, using matching kebab-case CSS names;
  - the Phoenix, Code, and Creative gradient recipes from `ai/ai-spec.md`;
  - readable foreground colors with verified contrast;
  - fonts and system fallbacks;
  - spacing and responsive gutters;
  - maximum content width;
  - borders, radii, and shadows;
  - Header and mobile-navigation heights;
  - stacking layers; and
  - focus, success, warning, and error colors needed by later features.

- Reuse tokens in Header, Footer, navigation, containers, buttons, cards, and later feature states.
- Preserve the exact `phoenixPalette` token names and hex values supplied in `ai/ai-spec.md`.
- Preserve the approved gradient stop order: Phoenix uses red → orange → gold, Code uses midnight blue → sapphire → teal, and Creative uses royal violet → magenta → red.
- Use core brand colors for primary identity, creative accents selectively, and neutrals for readable foundations.
- Do not copy raw palette values repeatedly across component styles when a shared token is appropriate.
- Solve contrast with appropriate token pairings or documented derived state tokens rather than silently changing canonical values.
- Keep decorative script fonts out of navigation, instructions, and long passages.

### Requirement 9 — Global Responsive Behavior

- Apply `box-sizing: border-box` consistently.
- Keep the document and layout width within the viewport without hiding genuine bugs behind `overflow-x: hidden`.
- Give route content a responsive container with readable line lengths and gutters.
- Make images responsive with preserved aspect ratios.
- Ensure the logo, text, navigation, and Footer wrap or scale without clipping.
- Make multi-column page sections capable of stacking vertically on narrow viewports.
- Allow long email addresses and URLs to wrap without forcing horizontal scrolling.
- Account for sticky Header and fixed mobile-navigation dimensions in scroll/focus behavior.
- Maintain readable content at 200% browser zoom.
- Avoid fixed content heights that clip translated, zoomed, or user-enlarged text.

### Requirement 10 — Accessibility and Keyboard Behavior

- Use semantic `header`, `nav`, `main`, and `footer` landmarks.
- Give desktop and mobile navigation distinct accessible labels, such as “Primary navigation” and “Mobile navigation.”
- Provide a skip link as the first focusable control.
- Keep the skip link visually hidden until focused, then make it clearly visible above sticky content.
- Ensure logical focus order follows document order.
- Make the logo link, navigation links, email link, and social links keyboard operable.
- Provide visible focus indicators that meet contrast requirements.
- Do not communicate current page or hover state with color alone.
- Mark decorative icons hidden from assistive technology and give informative icons or links meaningful names.
- Respect `prefers-reduced-motion` for any shared transition.
- Do not add autoplaying or essential motion to the shared layout.

### Requirement 11 — File Documentation and Handoff

- Every created or modified Markdown file contains an appropriate linked Table of Contents.
- Every created or modified JavaScript, JSX, and CSS file starts with the comments-based TOC required by `ai/ai-spec.md`.
- Why-comments explain the shared navigation source, exact breakpoint, mobile content offset, and other non-obvious invariants.
- `:warning:` comments identify material cross-layout risks, including exposing hidden routes or covering content with fixed navigation.
- The implementation handoff reports verification results and provides exact-file staging commands and truthful commit messages.

## User Flow and Expected Behavior

### Desktop Visitor Flow — 769px and Above

1. A visitor opens any defined route.
2. The Header appears at the top with the personal logo and horizontal public navigation.
3. The link matching the active route is visibly identified.
4. Selecting the logo navigates to Home through React Router.
5. Selecting a public navigation link changes the hash route without a full-page server navigation.
6. While the visitor scrolls, the sticky Header remains available.
7. Route content renders inside the main landmark.
8. The Footer follows the page content with approved contact information, professional links, and copyright.

### Mobile Visitor Flow — 768px and Below

1. A visitor opens any defined route at a narrow viewport.
2. The branded Header/logo remains at the top without the desktop link row.
3. The four public destinations appear as icons in the fixed bottom navigation.
4. The active destination is visually and programmatically identified.
5. Selecting an icon changes the hash route without reloading the application.
6. Page content and the Footer remain fully scrollable above the fixed navigation.
7. Safe-area padding prevents controls from colliding with device interface areas.

### Keyboard Visitor Flow

1. On the first Tab press, the skip link becomes visible.
2. Activating the skip link moves focus to the main route content.
3. Continued Tab navigation reaches the logo, active navigation system, route controls, Footer email, and Footer social links in logical order.
4. Every focused control has a visible focus indicator.
5. Enter activates links without requiring a pointer or hover.
6. Hidden desktop/mobile navigation does not leave invisible focusable links in the tab order.

### Hidden Route Flow

1. A visitor may enter `/#/login` or `/#/back-office` directly.
2. The shared layout may render around that route’s content so Header and Footer remain consistent.
3. Neither hidden route appears in desktop navigation, mobile navigation, Footer links, or logo behavior.
4. Login and Back Office feature specifications own authentication and private-data behavior.

### Missing Optional Footer Content

1. The layout reads only approved contact/profile data.
2. If an optional professional URL is not yet verified, its link is omitted entirely.
3. The Footer reflows cleanly without an empty placeholder.
4. Missing optional social links do not prevent the approved email and copyright from rendering.

## Interfaces

### React Components

- `src/layouts/Main.jsx` — shared Header → active route content → Footer composition and skip-link target.
- `src/components/Header.jsx` — semantic sticky Header, logo, and desktop navigation.
- `src/components/Footer.jsx` — approved contact/profile content and copyright.
- `src/components/MobileNavigation.jsx` — icon-based navigation rendered for 768px and below.
- `src/components/NavigationLinks.jsx` or equivalent — optional shared renderer for consistent `NavLink` behavior.
- `src/App.jsx` — nested route configuration using `Main` as the shared layout element.
- `src/main.jsx` — existing top-level `HashRouter` boundary; do not create a second router.

Component boundaries may be combined when the result remains clear, reusable, and testable. Do not split components solely to match filenames in this specification.

### Static Data

- `src/data/navigation.js` — optional single source for the four public destinations and icon identifiers.
- `src/data/profile.js` — optional approved public email and professional profile links.
- `src/data/phoenixPalette.js` — canonical `phoenixPalette` export when JavaScript needs programmatic color access; add the required file TOC banner above the export.

If these objects remain small, they may live in the owning component. They must not be duplicated between desktop and mobile navigation.

### Styling

- `src/index.css` — global reset, body defaults, shared tokens, responsive media defaults, and focus foundation.
- `src/App.css` or focused component stylesheets — layout, Header, Footer, desktop navigation, and mobile navigation styles.

Use the smallest clear stylesheet organization. Any modified CSS file requires an accurate comments-based TOC banner.

### Assets

- `public/personalLogo.png` — supplied 1254 × 1254 source logo, available at `/personalLogo.png`; optimization remains required before Header acceptance.
- `src/assets/` — optional destination for an optimized imported derivative if build fingerprinting is preferred.
- Approved inline SVG or existing icon sprite — public navigation icons where appropriate.
- Specification or research note — AI-logo provenance, purpose, optimization, and alt-text decision.

### Backend and API

This feature has no backend endpoints and performs no Supabase operations.

## Data and Validation

### Public Navigation Data

Each destination contains:

- `label` — non-empty human-readable text;
- `to` — one unique approved React Router path; and
- `icon` or icon identifier — a meaningful visual representation for mobile navigation.

Validation rules:

- exactly four public navigation entries exist;
- paths are exactly `/`, `/portfolio`, `/links`, and `/contact`;
- labels and paths are unique;
- every mobile icon link has an accessible name;
- Login and Back Office entries are rejected; and
- desktop and mobile navigation use the same data source.

### Logo Metadata

The implemented logo records:

- final filename;
- AI generation tool;
- generation purpose/prompt summary where appropriate;
- optimization performed;
- intrinsic dimensions or aspect ratio; and
- alt-text decision.

Reject a logo completion claim when the asset is missing, not AI-generated, undocumented, visibly distorted, illegible, or not linked to Home.

The current source satisfies asset availability and has known dimensions. It does not yet satisfy provenance or optimization requirements because the AI tool has not been recorded and the approximately 1.5 MB PNG has not been prepared for Header delivery.

### Footer Data

- `email` — approved public address with a valid email shape before creating a `mailto:` link.
- `socialLinks` — zero or more verified objects containing label and absolute HTTPS URL.
- `copyrightName` — `Oishieka Moitra`.
- `copyrightYear` — current four-digit year.

Validation rules:

- omit unverified optional social links instead of rendering placeholders;
- reject empty labels, relative external URLs, `javascript:` URLs, and `#` placeholders;
- add `target="_blank"` and `rel="noopener noreferrer"` together for external profiles;
- keep the approved email visible in readable text; and
- do not include phone or residential details by default.

### Responsive State

Responsive behavior is controlled by CSS media queries rather than stored React state.

- `max-width: 768px` selects mobile navigation.
- `min-width: 769px` selects desktop navigation.
- Hidden navigation must use CSS that removes it from layout and keyboard access.
- JavaScript resize listeners are not required for this binary layout switch.

## Technical Constraints

- Use React, JSX, project CSS, CSS custom properties, and the established `HashRouter`.
- Use `NavLink` and `Link` from `react-router-dom` for internal navigation.
- Use one top-level router and one shared `Main` route layout.
- Keep public navigation limited to Home, Portfolio, Links, and Contact.
- Use the exact desktop/mobile boundary: desktop is greater than 768px; mobile is 768px or less.
- Prefer CSS media queries over JavaScript viewport state.
- Prefer `position: sticky` for the Header and `position: fixed` for mobile bottom navigation.
- Do not add a UI framework, CSS-in-JS package, icon dependency, or animation library for this feature.
- Use responsive imported assets, inline SVG, or the existing icon sprite.
- Keep phoenix-inspired fantasy/code styling professional, readable, and subordinate to navigation clarity.
- Preserve the canonical `phoenixPalette` names and values; mirror them as kebab-case CSS custom properties.
- Preserve the code-quality, accessibility, privacy, branching, and handoff rules from `ai/ai-spec.md`.

## Implementation Decisions

### One Shared Main Layout

Using one route layout with an `Outlet` prevents Header/Footer drift and guarantees consistent landmark order across route components. Pages remain responsible for their own headings and feature content.

### Shared Navigation Data

Desktop and mobile navigation represent the same four destinations. A shared data source prevents one navigation system from gaining a route, label, or ordering change that the other does not receive.

### Sticky Header and Fixed Mobile Navigation

A sticky Header remains available without permanently removing content from normal document flow. Mobile navigation is fixed because the rubric requires it at the bottom and continuously accessible; the layout must reserve bottom space to prevent overlap.

### CSS Breakpoint Instead of JavaScript Width State

CSS media queries respond automatically to resize, zoom, orientation, and browser rendering without listeners or duplicate React state. Separate `max-width: 768px` and `min-width: 769px` rules make behavior at the required boundary unambiguous.

### Visible Mobile Labels

Icons meet the rubric’s mobile requirement, while short labels reduce recognition ambiguity and improve accessibility. If extremely narrow screens require visually hidden labels, accessible names must remain and the 320px layout must still pass.

### Omit Unverified Footer Links

An absent optional link is more trustworthy and accessible than a placeholder destination. Footer rendering must tolerate partial approved profile data without exposing unfinished content.

### AI Logo as a Home Link

The logo combines identity and a familiar Home affordance. Its alt text describes destination/function without narrating decorative visual details that do not help navigation.

## Acceptance Criteria

### Shared Layout

- [x] `Main` renders a skip link, Header, main landmark/route content, and Footer in logical document order.
- [x] Home, Portfolio, Links, Contact, Login, and Back Office route content render within the shared layout.
- [x] Header and Footer are not duplicated inside individual page components.
- [x] Short pages place the Footer at the viewport bottom; long pages place it after content.
- [x] The main landmark has a stable skip-link target and pages retain responsibility for their own `<h1>`.

### Header and Logo

- [x] A semantic Header appears at the top of every route with consistent styling.
- [x] The Header remains visible during vertical scrolling.
- [x] One AI-generated personal logo is visible, responsive, and free of distortion/overflow.
- [x] The supplied source logo has been resized/compressed or replaced by an optimized derivative appropriate for repeated Header delivery.
- [x] The logo has intrinsic sizing or a stable aspect ratio that prevents layout shift.
- [x] Selecting the logo navigates to Home through React Router.
- [x] The logo link has useful alternative text or an equivalent accessible name.
- [x] The AI tool, purpose, filename, optimization, and alt-text decision are documented.

### Navigation

- [x] Public navigation contains exactly Home, Portfolio, Links, and Contact.
- [x] Desktop and mobile navigation use the same destination data.
- [x] Login and Back Office do not appear in Header, Footer, desktop navigation, or mobile navigation.
- [x] Internal links use React Router and do not request nested server paths.
- [x] The current route is visibly identified and exposed with `aria-current="page"` behavior.
- [x] Hover, focus-visible, and active styles remain distinguishable.
- [x] Every navigation link has an accessible name.

### Responsive Behavior

- [x] At 769px and above, public links appear horizontally in the Header and bottom navigation is hidden.
- [x] At 768px and below, desktop links are hidden and icon-based bottom navigation is visible.
- [x] At exactly 768px, only the mobile navigation is present and focusable.
- [x] Mobile navigation includes icons and accessible destination names.
- [x] Mobile targets are comfortably operable by touch.
- [x] Safe-area padding is supported where available.
- [x] No content, Footer link, button, or form control is covered by fixed mobile navigation.
- [x] The logo, text, images, sections, and Footer scale or stack without horizontal overflow.
- [ ] Layout remains readable at 320px, 768px, 769px, desktop width, and 200% zoom.
- [x] Horizontal overflow is fixed at its source rather than hidden globally.

### Footer

- [x] A semantic Footer appears after route content on every route.
- [x] The Footer shows the approved public email as a working `mailto:` link.
- [ ] Verified professional links render with descriptive labels and safe new-tab attributes.
- [x] Missing/unverified optional profiles produce no empty item or placeholder link.
- [x] The Footer includes an accurate copyright notice for Oishieka Moitra.
- [x] Footer content remains readable, wrapping, keyboard reachable, and unobscured on mobile.
- [x] Phone and residential details are not published by default.

### Accessibility and Quality

- [x] Shared design tokens use the canonical `phoenixPalette` names and values from `ai/ai-spec.md`.
- [x] CSS custom properties mirror palette names in kebab case without duplicating untracked raw hex values throughout component styles.
- [x] Phoenix, Code, and Creative gradient variables preserve their approved color-stop sequences.
- [x] Content placed over a gradient passes contrast across the full gradient or uses a solid backing surface.
- [x] Header, navigation, main, and Footer landmarks are semantically correct.
- [x] The first Tab reveals a working skip link that moves focus to main content.
- [x] Keyboard focus order is logical and no hidden navigation remains focusable.
- [x] Every interactive element has a visible focus indicator with adequate contrast.
- [x] Current-page state is not communicated by color alone.
- [x] Informative and decorative icons/images use appropriate accessible treatment.
- [x] Shared color pairs pass contrast checks in default, hover, focus, active, and disabled states.
- [x] Shared transitions respect `prefers-reduced-motion`.
- [x] Modified Markdown, JavaScript, JSX, and CSS files meet the TOC/comment rules in `ai/ai-spec.md`.
- [x] `npm run lint` and `npm run build` pass.
- [x] The implementation handoff reports checks and provides safe exact-file staging and commit commands.

## Verification Plan

### Automated Checks

Run from the repository root:

```bash
npm run lint
npm run build
```

Inspect the production build for missing asset errors and confirm no ignored/private files were added to `dist/`.

### Route and Layout Matrix

Verify Header, route main content, and Footer on:

| Route | Public nav contains route? | Shared layout expected? |
| --- | --- | --- |
| `/#/` | Yes | Yes |
| `/#/portfolio` | Yes | Yes |
| `/#/links` | Yes | Yes |
| `/#/contact` | Yes | Yes |
| `/#/login` | No | Yes |
| `/#/back-office` | No | Yes |

Confirm the correct public `NavLink` is active on the four public routes. Confirm no administrator route appears in either navigation system or Footer.

### Viewport Matrix

| Width/state | Expected navigation | Required checks |
| --- | --- | --- |
| 320px | Mobile bottom icons | No overflow, usable targets, content/Footer offset |
| 768px | Mobile bottom icons | Desktop links absent, no breakpoint duplication |
| 769px | Desktop horizontal links | Mobile nav absent, logo/link row fits |
| 1440px or similar | Desktop horizontal links | Bounded content width and intentional spacing |
| 200% zoom | Responsive result | Readable content, no clipping or inaccessible controls |

Repeat narrow-width checks with long Footer text and the longest navigation label.

### Keyboard and Screen-Reader Checks

1. Reload a public route and press Tab.
2. Confirm the skip link appears first and moves focus to main content.
3. Traverse logo, currently visible navigation, page content, and Footer links.
4. Confirm hidden navigation is absent from the focus order.
5. Confirm the current route is announced through `aria-current` behavior.
6. Activate every shared link with the keyboard.
7. Confirm focus never disappears behind the sticky Header or fixed bottom navigation.
8. Inspect the accessibility tree for distinct Header, navigation, main, and Footer landmarks.

### Content and Link Checks

- Verify the published email is explicitly approved and the `mailto:` destination matches it.
- Open every professional profile URL and confirm it is correct, HTTPS, and safely opens in a new tab.
- Confirm no `#`, empty, example, or unverified link is rendered.
- Confirm the copyright name and year are accurate.
- Confirm the logo opens Home and its accessible name is useful in context.
- Confirm the AI-logo provenance record is complete.
- Confirm the delivered logo size is suitable for a small Header asset rather than serving the current 1.5 MB source unchanged.

### Reduced-Motion and Visual Checks

- Enable `prefers-reduced-motion` and confirm shared transitions are removed or minimized.
- Verify foreground/background contrast for normal, hover, focus, and active states.
- Scroll long content and confirm the sticky Header and mobile navigation remain stable.
- Confirm the fixed bottom navigation does not cover the final Footer line.
- Confirm logo and navigation layout do not shift significantly as assets/fonts load.

## Warnings and Known Limitations

> :warning: Login and Back Office must never enter the shared public navigation data. Hiding a link with CSS is insufficient because it can remain focusable or discoverable; omit those destinations from the data entirely.

> :warning: At exactly 768px, only mobile navigation is allowed. Overlapping media queries can show both systems or make duplicate links keyboard focusable.

> :warning: Fixed bottom navigation can cover Footer links and page controls. The layout must reserve space equal to the navigation height plus the device safe-area inset.

> :warning: Do not use global `overflow-x: hidden` to conceal layout overflow. It can mask inaccessible off-screen content and focus indicators.

> :warning: The logo cannot be counted as AI-generated until its tool/provenance is documented. Do not substitute an unchanged stock logo and label it AI-created.

> :warning: `public/personalLogo.png` is currently approximately 1.5 MB. Do not ship the full source unchanged as a small Header logo; create an optimized derivative while preserving the supplied source unless Oishieka explicitly approves replacement.

> :warning: Footer contact and social data must be verified before publication. Omit unknown values rather than using placeholders or inventing URLs.

> :warning: Route hiding is not authentication. The later Back Office feature must still enforce session checks and database security before rendering private data.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` and `ai/features/setup-deploy.feature.md` before implementing this feature.
- Keep work limited to the shared layout, Header, Footer, logo, public navigation, shared tokens, and global responsive/accessibility behavior.
- Do not implement page-specific content or Supabase behavior in this feature.
- Preserve the established `HashRouter`; do not add another router boundary.
- Use a single public navigation source for desktop and mobile renderers.
- Prefer semantic HTML and CSS media queries over JavaScript viewport detection.
- Do not invent social URLs or publish private resume contact details.
- Do not add a dependency merely for four navigation icons or a simple layout interaction.
- Add accurate TOC banners to every modified source/style file and keep this Markdown TOC current.
- Use why-comments for shared layout invariants and `:warning:` comments for breakpoint, hidden-route, and overlap risks.
- Test 320px, 768px, 769px, desktop, keyboard, zoom, contrast, and reduced-motion behavior before declaring completion.
- Run lint and build before handoff.
- End the implementation handoff with exact staging commands and a truthful Conventional Commit message for only the relevant files.
