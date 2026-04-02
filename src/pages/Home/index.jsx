import { personal, projects, skills, journey } from '../../data/index'
import HeroBackground from './sections/HeroBackground'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import JourneySection from './sections/JourneySection'
import ContactSection from './sections/ContactSection'

const featuredProjects = projects.filter((p) => p.featured)
const journeyPreview = [journey[0], journey[journey.length - 1]]

function Home() {
  return (
    <>
      {/* Background fijo — permanece intacto mientras las secciones scrollean */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <HeroBackground />
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection personal={personal} />
        <AboutSection personal={personal} skills={skills} />
        <ProjectsSection projects={featuredProjects} />
        <JourneySection journey={journeyPreview} />
        <ContactSection personal={personal} />
      </main>
    </>
  )
}

export default Home
