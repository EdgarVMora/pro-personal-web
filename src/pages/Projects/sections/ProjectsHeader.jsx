import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'

function ProjectsHeader() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.header-anim')

    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
    )
  }, { scope: sectionRef })

  return (
    <header
      ref={sectionRef}
      className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 pb-16"
    >
      {/* Label badge */}
      <div className="header-anim flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
        <div className="h-px w-8 bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          Proyectos
        </span>
      </div>

      {/* Título */}
      <h1
        className="header-anim font-display text-title text-foreground mb-4"
        style={{ opacity: 0 }}
      >
        Lo que he construido
      </h1>

      {/* Subtexto */}
      <p
        className="header-anim font-sans text-lg leading-relaxed text-muted"
        style={{ maxWidth: '520px', opacity: 0 }}
      >
        {/* TODO: contenido real */}
        Un registro de proyectos construidos con diferentes herramientas, enfoques y grados de locura.
      </p>
    </header>
  )
}

export default ProjectsHeader
