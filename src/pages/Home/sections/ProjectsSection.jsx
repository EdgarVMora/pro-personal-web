import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'
import ProjectCard from '../../../components/ui/ProjectCard'

function ProjectsSection({ projects }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.proj-anim')

    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '680px' }} className="w-full">

        {/* Label badge */}
        <div className="proj-anim flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Proyectos
          </span>
        </div>

        {/* Heading */}
        <h2 className="proj-anim font-display text-title text-foreground mb-10">
          Lo que he construido
        </h2>

        {/* Project cards */}
        <div className="proj-anim flex flex-col gap-4 mb-8">
          {projects.map(({ id, ...props }) => (
            <ProjectCard key={id} {...props} />
          ))}
        </div>

        {/* CTA */}
        <div className="proj-anim">
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200"
          >
            Ver todos los proyectos →
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ProjectsSection
