import ProjectCard from '../../../components/ui/ProjectCard'

function ProjectsSection({ projects }) {
  return (
    <section>
      <h2>Projects</h2>
      {projects.map(({ id, ...props }) => (
        <ProjectCard key={id} {...props} />
      ))}
    </section>
  )
}

export default ProjectsSection
