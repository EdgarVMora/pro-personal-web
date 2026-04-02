import { projects } from '../../data/index'
import ProjectCard from '../../components/ui/ProjectCard'

function Projects() {
  return (
    <main>
      <h1>Proyectos</h1>
      {projects.map(({ id, ...props }) => (
        <ProjectCard key={id} {...props} />
      ))}
    </main>
  )
}

export default Projects
