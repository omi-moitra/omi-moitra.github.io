// =============================================================================
// src/data/homeContent.js — approved Home identity, skills, and image metadata
// -----------------------------------------------------------------------------
// 1. Imports              optimized Home-specific generated images
// 2. Hero content         verified draft identity, introduction, and actions
// 3. Skill collections   technical capabilities and professional strengths
// 4. Image metadata      provenance-aware placement and accessibility details
// =============================================================================

import vortexCreaturesImage from '../assets/home-vortex-creatures.jpg'
import vortexCreaturesImageSmall from '../assets/home-vortex-creatures-768.jpg'
import skillsBridgeImage from '../assets/home-skills-bridge.jpg'
import skillsBridgeImageSmall from '../assets/home-skills-bridge-600.jpg'

// :warning: These claims come from the approved resume-derived draft. Keep
// changes traceable to an approved source and never add unsupported metrics.
export const homeHero = {
  name: 'Oishieka Moitra',
  title: 'Full Stack Developer',
  tagline:
    'Creating maintainable web applications with careful attention to requirements, edge cases, and the people who use them.',
  introduction:
    'I’m Oishieka Moitra, a Full Stack Developer with hands-on experience building scalable web applications using JavaScript, React, Node.js, Express, MongoDB, and SQL. I combine software engineering practices such as RESTful API design, role-based authentication, and automated testing with a disciplined background in legal research, risk analysis, and clear documentation.',
  callsToAction: [
    { label: 'View My Work', to: '/projects', variant: 'primary' },
    { label: 'Contact Me', to: '/contact', variant: 'secondary' },
  ],
}

export const technicalSkills = [
  {
    id: 'react-javascript',
    name: 'React & JavaScript',
    icon: 'component-code',
    iconIsDecorative: true,
    description:
      'Builds interactive web interfaces with JavaScript and React as part of a full stack application workflow.',
  },
  {
    id: 'node-express',
    name: 'Node.js & Express',
    icon: 'connected-nodes',
    iconIsDecorative: true,
    description:
      'Develops server-side application behavior and RESTful APIs, with experience in role-based authentication and Jest testing.',
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'database',
    iconIsDecorative: true,
    description:
      'Works with MongoDB and relational data tools including SQL, MySQL, and DBeaver; the resume identifies SQL as a beginner-level skill.',
  },
]

export const professionalStrengths = [
  {
    id: 'problem-solving',
    name: 'Problem Solving & Risk Assessment',
    icon: 'risk-assessment',
    iconIsDecorative: true,
    description:
      'Identifies inconsistencies, missing requirements, and system edge cases, then recommends clear corrective action.',
  },
  {
    id: 'documentation',
    name: 'Documentation & Attention to Detail',
    icon: 'documentation',
    iconIsDecorative: true,
    description:
      'Produces precise written analysis, reviews complex documents for accuracy, and maintains organized records that support decisions.',
  },
  {
    id: 'communication',
    name: 'Cross-Functional Communication',
    icon: 'communication',
    iconIsDecorative: true,
    description:
      'Clarifies requirements with internal and external partners and adapts complex explanations for different audiences.',
  },
]

// :warning: Both records are Home-specific generated assets. The Header logo is
// separate and must never be counted toward the two-image Home requirement.
export const homeImages = {
  vortexCreatures: {
    id: 'home-vortex-creatures',
    src: vortexCreaturesImage,
    srcSet: `${vortexCreaturesImageSmall} 768w, ${vortexCreaturesImage} 1536w`,
    sizes: '100vw',
    width: 1536,
    height: 1024,
    tool: 'OpenAI built-in image generation tool',
    purpose: 'Frame the full-page vortex with one guiding phoenix and one restrained dragon.',
    placement: 'Decorative Home scene background',
    // The creatures establish atmosphere only; the professional narrative stays
    // in HTML cards, so announcing them would add noise without useful content.
    alt: '',
    loading: 'eager',
  },
  skillsBridge: {
    id: 'home-skills-bridge',
    src: skillsBridgeImage,
    srcSet: `${skillsBridgeImageSmall} 600w, ${skillsBridgeImage} 1200w`,
    sizes: '(min-width: 59.4375rem) 42vw, 100vw',
    width: 1200,
    height: 800,
    tool: 'OpenAI built-in image generation tool',
    purpose: 'Bridge technical systems with analysis, documentation, and communication.',
    placement: 'Professional strengths introduction',
    alt: 'A radiant feather connecting digital systems with research and communication symbols.',
    loading: 'lazy',
  },
}
