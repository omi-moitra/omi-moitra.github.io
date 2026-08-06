// =============================================================================
// src/data/portfolioContent.js — sourced Journey/Projects content and asset metadata
// -----------------------------------------------------------------------------
// 1. Imports              optimized route-specific generated artwork
// 2. Introduction         concise professional background framing
// 3. Education            newest-first resume-derived academic entries
// 4. Experience           newest-first roles and sourced responsibilities
// 5. Projects             re-export of verified shared project inventory
// 6. Resume boundary      approval-gated public download metadata
// 7. Image inventory      provenance, placement, dimensions, and alt decisions
// =============================================================================

import portfolioCodeScroll from '../assets/portfolio-code-scroll.jpg'
import portfolioCodeScrollSmall from '../assets/portfolio-code-scroll-600.jpg'
import portfolioPhoenixJourney from '../assets/portfolio-phoenix-journey.jpg'
export { projects } from './projects.js'

export const portfolioIntroduction =
  'My path to full stack development brings together hands-on application building with experience in legal research, risk analysis, precise documentation, and cross-functional communication. Explore the education and professional experience that shape how I approach requirements and build maintainable software.'

const educationEntries = [
  {
    id: 'colorado-law-jd',
    institution: 'University of Colorado Law School',
    program: 'Juris Doctor (J.D.)',
    location: 'Boulder, Colorado',
    dates: '2024–Present',
    startYear: 2024,
    trail: { x: '61%', y: '41%', side: 'left' },
  },
  {
    id: 'south-florida-biomedical-sciences',
    institution: 'University of South Florida',
    program: 'Bachelor of Science (B.S.), Biomedical Sciences',
    location: 'Tampa, Florida',
    dates: '2019–Present',
    startYear: 2019,
    trail: { x: '42%', y: '58%', side: 'left' },
  },
]

const experienceEntries = [
  {
    id: 'bay-area-legal-services-law-clerk',
    role: 'Law Clerk',
    organization: 'Bay Area Legal Services',
    location: 'Tampa, Florida',
    dates: '2025–2026',
    startYear: 2025,
    trail: { x: '69%', y: '31%', side: 'right' },
    responsibilities: [
      'Drafted, reviewed, and edited complex legal documents with close attention to accuracy, clause interpretation, and compliance.',
      'Identified risks, inconsistencies, and missing terms, then escalated issues and recommended corrective action.',
      'Conducted structured research into statutes, regulations, and policy requirements relevant to procurement and contract compliance.',
      'Coordinated with internal teams and external parties to gather information, clarify requirements, and finalize documentation.',
      'Maintained organized electronic records and prepared written summaries supporting decision-making.',
    ],
  },
  {
    id: 'wells-anderson-race-summer-associate',
    role: 'Summer Associate',
    organization: 'Wells, Anderson & Race, LLC',
    location: 'Denver, Colorado',
    dates: '2021',
    startYear: 2021,
    trail: { x: '63%', y: '54%', side: 'right' },
    responsibilities: [
      'Reviewed multiple sources for accuracy and consistency.',
      'Drafted precise written analyses.',
    ],
  },
  {
    id: 'liberty-national-life-insurance-agent',
    role: 'Life Insurance Agent',
    organization: 'Liberty National Life Insurance Company',
    location: 'Tampa, Florida',
    dates: '2019–2020',
    startYear: 2019,
    trail: { x: '35%', y: '75%', side: 'right' },
    responsibilities: [
      'Explained policy terms and contractual obligations to clients.',
      'Ensured regulatory compliance and maintained accurate transaction documentation.',
    ],
  },
  {
    id: 'varsity-tutors-independent-contractor',
    role: 'Independent Contractor Tutor',
    organization: 'Varsity Tutors',
    location: 'Tampa, Florida',
    dates: '2018–2020',
    startYear: 2018,
    trail: { x: '22%', y: '85%', side: 'left' },
    responsibilities: [
      'Developed structured plans and maintained detailed records, demonstrating strong organization and documentation.',
      'Communicated complex concepts clearly and adapted explanations to diverse audiences.',
    ],
  },
]

// Sorting copies keeps chronology deterministic without mutating the sourced
// records. Trail coordinates follow the approved wireframe independently of
// array order, so visual placement never becomes the chronology source.
export const education = [...educationEntries].sort(
  (first, second) => second.startYear - first.startYear,
)

export const professionalExperience = [...experienceEntries].sort(
  (first, second) => second.startYear - first.startYear,
)

// :warning: The private source PDF has not been approved for unrestricted
// publication. Keep this null so the page cannot emit a broken or unsafe link;
// add metadata only when public/assets/resume-standard.pdf is owner-approved.
export const resume = null

// :warning: These images were generated specifically for Journey and Projects and do not
// count Header, Home, favicon, or screenshot assets toward this feature's pair.
export const portfolioImages = {
  journey: {
    id: 'portfolio-phoenix-journey',
    src: portfolioPhoenixJourney,
    width: 1200,
    height: 800,
    tool: 'OpenAI built-in image generation tool',
    generatedOn: '2026-08-05',
    purpose:
      'Connect academic study, professional analysis, and software development as one progression.',
    placement: 'Full Journey page background behind the résumé trail',
    // The image establishes atmosphere while the complete journey remains in
    // semantic HTML, so its CSS-background placement is intentionally silent.
    alt: '',
    loading: 'eager',
  },
  codeScroll: {
    id: 'portfolio-code-scroll',
    src: portfolioCodeScroll,
    srcSet: `${portfolioCodeScrollSmall} 600w, ${portfolioCodeScroll} 1200w`,
    sizes: '(min-width: 64rem) 55rem, 100vw',
    width: 1200,
    height: 800,
    tool: 'OpenAI built-in image generation tool',
    generatedOn: '2026-08-05',
    purpose:
      'Connect precise professional documentation with structured software systems.',
    placement: 'Projects page background and collection illustration',
    alt: '',
    loading: 'lazy',
  },
}
