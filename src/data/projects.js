// =============================================================================
// src/data/projects.js — verified public project cards and case-study content
// -----------------------------------------------------------------------------
// 1. projects    truthful current-site metadata, URLs, and implementation story
// =============================================================================

export const projects = [
  {
    id: 'oishieka-fantasy-portfolio',
    name: 'Oishieka Moitra Fantasy Portfolio',
    technologies: ['React', 'Vite', 'JavaScript', 'React Router', 'CSS'],
    purpose:
      'Give recruiters and professional contacts one responsive place to review Oishieka’s professional profile, skills, education, experience, and current project work.',
    description:
      'A phoenix-inspired static React single-page application built for GitHub Pages. The current build uses reusable components, hash-based routing, semantic content, responsive navigation, and accessible presentation across its implemented public pages.',
    // :warning: Do not substitute thematic art for the required actual website
    // screenshot. This remains null until a browser capture is approved.
    image: null,
    imageAlt: '',
    imageWidth: null,
    imageHeight: null,
    liveUrl: 'https://omi-moitra.github.io',
    sourceUrl: 'https://github.com/omi-moitra/omi-moitra.github.io',
    caseStudy: {
      objective:
        'Create one recruiter-friendly portfolio that presents professional history, technical capability, resources, contact options, and a protected message workflow without requiring a custom server.',
      role: 'Portfolio owner, designer, and full stack developer',
      architecture:
        'A static React and Vite single-page application uses HashRouter for GitHub Pages. Supabase supplies contact-message persistence, email/password authentication, and Row Level Security for private administration.',
      decisions: [
        'Keep essential content in semantic HTML while treating Three.js as progressive decoration.',
        'Keep the professional Journey and project case studies on separate focused routes.',
        'Protect message data with both an authenticated route gate and database policies.',
      ],
      challenges: [
        'Preserving direct-route refresh behavior on static GitHub Pages hosting.',
        'Balancing a rich fantasy visual identity with accessibility and recruiter scanning.',
        'Keeping anonymous contact insertion separate from authenticated message access.',
      ],
      solutions: [
        'Used hash-based routing so every deployed route continues requesting the root document.',
        'Loaded scene code progressively over complete semantic content and static artwork.',
        'Centralized Supabase access and documented least-privilege RLS expectations.',
      ],
      outcome:
        'The current application provides a responsive public portfolio, validated contact workflow, hidden administrator login, and protected message-management experience in one deployable static build.',
      nextSteps:
        'Add more owner-verified projects and screenshots, complete production Supabase verification, and continue reducing the route-scoped 3D bundle.',
    },
  },
]
