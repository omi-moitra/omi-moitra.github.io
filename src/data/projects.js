// =============================================================================
// src/data/projects.js — verified public project cards and case-study content
// -----------------------------------------------------------------------------
// 1. projects    truthful current-site metadata, URLs, and implementation story
// =============================================================================

export const projects = [
  {
    id: 'oishieka-fantasy-portfolio',
    slug: 'oishieka-fantasy-portfolio',
    title: 'Oishieka Moitra Fantasy Portfolio',
    subtitle: 'A responsive Phoenix Codex for professional work and experience.',
    summary:
      'A phoenix-inspired static React portfolio built for GitHub Pages with accessible presentation, progressive visual effects, and a protected message workflow.',
    featured: true,
    status: 'published',
    year: 2026,
    role: ['Portfolio Owner', 'Designer', 'Full Stack Developer'],
    technologies: ['React', 'Vite', 'JavaScript', 'React Router', 'CSS'],
    categories: ['Portfolio', 'Frontend', 'Accessibility'],
    // :warning: Do not substitute thematic art for the required actual website
    // screenshot. This remains null until a browser capture is approved.
    coverImage: null,
    links: {
      live: 'https://omi-moitra.github.io',
      repository: 'https://github.com/omi-moitra/omi-moitra.github.io',
    },
    overview:
      'The portfolio gives recruiters and professional contacts one responsive place to review Oishieka’s profile, skills, education, experience, project work, resources, and contact options without requiring a custom server.',
    challenge:
      'The experience needed to preserve direct-route refreshes on static hosting, balance a rich fantasy identity with recruiter-friendly scanning, and keep public contact submission separate from private message access.',
    solution:
      'Hash-based routing keeps deployed routes on the root document, semantic content remains complete beneath progressive Three.js decoration, and one shared Supabase client handles contact persistence and email/password authentication.',
    outcome:
      'The application provides a responsive public portfolio, validated contact workflow, hidden administrator login, and protected message-management experience in one static build.',
    metrics: [],
    gallery: [],
    process: [
      'Keep essential content in semantic HTML while treating Three.js as progressive decoration.',
      'Keep the professional Journey and project case studies on separate focused routes.',
      'Use HashRouter so direct project routes remain compatible with GitHub Pages.',
    ],
    lessons: [
      'Add more owner-verified projects and screenshots.',
      'Complete production Supabase verification.',
      'Continue reducing the route-scoped 3D bundle.',
    ],
  },
]
