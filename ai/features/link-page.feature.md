# Feature Specification — Links Page

## Table of Contents

- [Goal](#goal)
- [Route and Structure](#route-and-structure)
- [Professional Portals](#professional-portals)
- [Link Safety and Accessibility](#link-safety-and-accessibility)
- [Responsive Behavior](#responsive-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Provide a focused public page for Oishieka’s verified professional profiles. The route
presents LinkedIn and GitHub as clearly named portals without mixing them with hidden
administration, unverified destinations, or generic placeholder links.

## Route and Structure

`/links` is a public lazy route represented as Links / Portals in both navigation
presentations. It uses the Links mint, cyan, blue, and violet route current.

The page contains:

1. an eyebrow reading “Portals · Find me online”;
2. the page heading “Professional Links”;
3. a short invitation to connect on LinkedIn or explore work on GitHub; and
4. one “Open a portal” section containing the verified profiles.

The portal collection renders only when verified records exist. There is no placeholder,
empty wrapper, invented social network, or Login/Back Office destination.

## Professional Portals

| Profile | URL | Description |
| --- | --- | --- |
| LinkedIn | `https://www.linkedin.com/in/oishieka-moitra-6300181b7` | Connect and explore professional experience |
| GitHub | `https://github.com/omi-moitra` | Explore projects and source code |

Each profile record has a stable ID, visible label, concise description, HTTPS URL, and
external-destination flag. The Footer independently repeats GitHub and LinkedIn as
icon-only links; the Links page uses visible profile names and descriptions.

## Link Safety and Accessibility

- Every destination is a normal anchor and remains usable without client-side event
  handling.
- External links open in a new tab with `target="_blank"` and
  `rel="noopener noreferrer"`.
- Visible labels name the destination and descriptions explain why to open it.
- The arrow indicator is decorative because text and new-tab behavior already identify
  the action.
- Card links have visible hover and focus states in Light, Dark, and forced-colors modes.
- The page heading and section heading form one logical hierarchy.

## Responsive Behavior

Portal links stack at narrow widths and form a balanced grid where space allows.
Descriptions wrap, targets remain large enough for touch, focus is not clipped, and no
card creates page-level horizontal overflow. The route remains usable at 320px, tablet,
desktop, 200% zoom, keyboard-only input, touch, reduced motion, and forced colors.

## Acceptance Contract

- `/#/links` loads and refreshes locally and on GitHub Pages.
- Exactly two verified professional portals render: LinkedIn and GitHub.
- Both visible labels, descriptions, and URLs are correct.
- Both anchors use safe new-tab attributes.
- No email, Login, Back Office, placeholder resource, or unverified profile appears in
  the portal collection.
- No clipped text, horizontal page overflow, hidden action, or hover-only information
  appears at supported widths and zoom.
