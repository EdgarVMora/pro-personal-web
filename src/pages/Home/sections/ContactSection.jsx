import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'

function ContactSection({ personal }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.contact-anim')

    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '560px' }} className="ml-auto">

        {/* Label badge — espejado a la derecha */}
        <div className="contact-anim flex items-center flex-row-reverse gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Contacto
          </span>
        </div>

        {/* Heading */}
        <h2 className="contact-anim font-display text-title text-foreground mb-4 text-right">
          ¿Trabajamos juntos?
        </h2>

        {/* Subtext */}
        <p className="contact-anim font-sans text-lg leading-relaxed text-muted mb-10 text-right">
          Si tienes un proyecto en mente o simplemente quieres conectar, escríbeme.
        </p>

        {/* Email */}
        <a
          href={`mailto:${personal.email}`}
          className="contact-anim block font-display text-2xl text-foreground hover:text-accent hover:glow-amber-text transition-all duration-300 mb-10 text-right"
        >
          {personal.email}
        </a>

        {/* Social links */}
        <div className="contact-anim flex gap-4 justify-end">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted px-5 py-3 transition-colors duration-200 hover:text-foreground hover:border-dim"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            GitHub
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted px-5 py-3 transition-colors duration-200 hover:text-foreground hover:border-dim"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            LinkedIn
          </a>
        </div>

      </div>
    </section>
  )
}

export default ContactSection
