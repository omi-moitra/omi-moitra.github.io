// =============================================================================
// src/pages/PortfolioPage.jsx — legacy module compatibility for Journey
// -----------------------------------------------------------------------------
// 1. Re-export    keep old internal imports resolving without a combined page
// =============================================================================

// :warning: The public /portfolio URL redirects to /journey in App.jsx. This
// module remains only to avoid breaking stale internal imports during migration.
export { default } from './JourneyPage.jsx'
