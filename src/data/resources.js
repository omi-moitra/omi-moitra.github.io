// =============================================================================
// src/data/resources.js — curated external references and local card artwork
// -----------------------------------------------------------------------------
// 1. Asset imports       optimized Links-specific AI illustrations
// 2. Resource metadata   approved draft copy, safe URLs, and image decisions
// =============================================================================

import linksMdnWebPlatform from '../assets/links-mdn-web-platform.jpg'
import linksReactComponents from '../assets/links-react-components.jpg'
import linksSupabaseData from '../assets/links-supabase-data.jpg'

// :warning: Revalidate these official destinations before release. Every URL
// must remain HTTPS and every consumer must preserve safe new-tab attributes.
export const resources = [
  {
    id: 'mdn-web-docs',
    title: 'MDN Web Docs',
    description:
      'MDN provides references and learning material for HTML, CSS, JavaScript, accessibility, and browser APIs. I use it to verify platform behavior and make implementation decisions grounded in web standards.',
    url: 'https://developer.mozilla.org/en-US/',
    actionLabel: 'Visit MDN Web Docs',
    image: linksMdnWebPlatform,
    imageAlt:
      'Luminous digital library representing web-platform documentation and browser standards.',
    imageWidth: 1200,
    imageHeight: 800,
    tone: 'code',
  },
  {
    id: 'react-documentation',
    title: 'React Documentation',
    description:
      "React's official documentation explains components, state, effects, and the patterns used to compose interactive interfaces. It supports the component-driven approach used throughout this portfolio.",
    url: 'https://react.dev/',
    actionLabel: 'Visit React Documentation',
    image: linksReactComponents,
    imageAlt: 'Interface components connected into a larger application constellation.',
    imageWidth: 1200,
    imageHeight: 800,
    tone: 'creative',
  },
  {
    id: 'supabase-documentation',
    title: 'Supabase Documentation',
    description:
      "Supabase's official documentation covers its Postgres database, authentication, Row Level Security, and JavaScript client. It is the primary technical reference for this portfolio's contact and private administration workflows.",
    url: 'https://supabase.com/docs',
    actionLabel: 'Visit Supabase Documentation',
    image: linksSupabaseData,
    imageAlt: 'Secure data vault connected to web application services.',
    imageWidth: 1200,
    imageHeight: 800,
    tone: 'phoenix',
  },
]
