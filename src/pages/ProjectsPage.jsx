import { Link } from 'react-router-dom'
import ProjectShowcase from '../components/ProjectShowcase.jsx'
import { portfolioImages, projects } from '../data/portfolioContent.js'
import './PortfolioPage.css'
import './ProjectsPage.css'

export default function ProjectsPage() {
  return (
    <article className="portfolio-page projects-page projects-showroom" style={{ '--projects-background': `url(${portfolioImages.codeScroll.src})` }}>
      <header className="showroom-heading">
        <p className="portfolio-eyebrow">Crafted Worlds / Selected work</p>
        <h1>Ideas, brought<br /><em>to life.</em></h1>
        <p>Four projects. Real challenges. Explore the interfaces, systems, and decisions behind the work.</p>
      </header>
      <ProjectShowcase projects={projects} />
      <footer className="showroom-contact"><div><p className="showcase__eyebrow">Your next idea</p><h2>Let’s build something that matters.</h2></div><Link className="showcase__cta" to="/contact">Start a conversation ↗</Link></footer>
    </article>
  )
}
