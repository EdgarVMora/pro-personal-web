import { personal, projects, skills, journey } from '../../data/index'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import JourneySection from './sections/JourneySection'
import ContactSection from './sections/ContactSection'

const featuredProjects = projects.filter((p) => p.featured)
const journeyPreview = [journey[0], journey[journey.length - 1]]

function Home() {
  return (
    <main>
      <HeroSection personal={personal} />
      <AboutSection personal={personal} skills={skills} />
      <ProjectsSection projects={featuredProjects} />
      <JourneySection journey={journeyPreview} />
      <ContactSection personal={personal} />
    </main>
  )
}

export default Home
