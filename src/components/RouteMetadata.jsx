// =============================================================================
// src/components/RouteMetadata.jsx — route-aware document and social metadata
// -----------------------------------------------------------------------------
// 1. Static metadata      canonical titles and descriptions for public routes
// 2. Project metadata     derive case-study copy from the verified data record
// 3. DOM synchronization update title, description, Open Graph, and hash URL
//
// HashRouter keeps the pathname inside the deployed URL fragment; Open Graph
// URLs therefore preserve `#${pathname}` for GitHub Pages compatibility.
// =============================================================================

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects.js'

const baseTitle = 'Oishieka Moitra | Full Stack Developer'
const defaultDescription =
  'Oishieka Moitra’s full stack developer portfolio, professional journey, selected work, resources, and contact form.'

const routeMetadata = {
  '/': { title: baseTitle, description: defaultDescription },
  '/journey': {
    title: `Journey & Experience | ${baseTitle}`,
    description: 'Explore Oishieka Moitra’s education and professional experience.',
  },
  '/projects': {
    title: `Projects | ${baseTitle}`,
    description: 'Explore selected full stack development work and case studies.',
  },
  '/links': {
    title: `Developer Codex | ${baseTitle}`,
    description:
      'Browse Oishieka Moitra’s curated library of web documentation, standards, tutorials, and technical references.',
  },
  '/contact': {
    title: `Contact | ${baseTitle}`,
    description: 'Send Oishieka Moitra a professional project, role, or collaboration inquiry.',
  },
  '/login': {
    title: `Administrator Sign In | ${baseTitle}`,
    description: defaultDescription,
  },
}

function updateMetaContent(selector, content) {
  // Metadata is progressive enhancement. A missing optional tag should never
  // interrupt route rendering, so updates are deliberately null-safe.
  const element = document.querySelector(selector)
  if (element) element.setAttribute('content', content)
}

function RouteMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Dynamic project routes share one route pattern but need record-specific
    // titles. Unknown slugs fall back to the same neutral Not Found metadata.
    const projectSlug = pathname.startsWith('/projects/')
      ? pathname.slice('/projects/'.length)
      : null
    const project = projectSlug
      ? projects.find((entry) => entry.slug === projectSlug)
      : null
    const metadata = project
      ? {
          title: `${project.title} | ${baseTitle}`,
          description: project.summary || defaultDescription,
        }
      : routeMetadata[pathname] || {
          title: `Page Not Found | ${baseTitle}`,
          description: defaultDescription,
        }

    document.title = metadata.title
    updateMetaContent('meta[name="description"]', metadata.description)
    updateMetaContent('meta[property="og:title"]', metadata.title)
    updateMetaContent('meta[property="og:description"]', metadata.description)
    updateMetaContent(
      'meta[property="og:url"]',
      `https://omi-moitra.github.io/#${pathname}`,
    )
  }, [pathname])

  return null
}

export default RouteMetadata
