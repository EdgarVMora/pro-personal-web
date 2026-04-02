import { projects } from '../../data/index'
import ProjectsBackground from './sections/ProjectsBackground'
import ProjectsHeader from './sections/ProjectsHeader'
import ProjectsGrid from './sections/ProjectsGrid'

function Projects() {
  return (
    <>
      {/* Fondo fijo — permanece mientras las secciones scrollean */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <ProjectsBackground />
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <ProjectsHeader />
        <ProjectsGrid projects={projects} />
      </main>
    </>
  )
}

export default Projects
