import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'
import ProjectCard from '../../../components/ui/ProjectCard'

function ProjectsGrid({ projects }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.grid-anim')

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
      className="relative z-10 px-6 md:px-16 lg:px-24 pb-32"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ maxWidth: '900px' }}
      >
        {projects.map(({ id, ...props }) => (
          <div key={id} className="grid-anim">
            <ProjectCard {...props} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsGrid
