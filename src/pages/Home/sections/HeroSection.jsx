import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
// La importación desde gsap.config garantiza que ScrambleTextPlugin está registrado
import { gsap } from '../../../animations/gsap.config'

const SKILLS = ['React', 'Node.js', 'UI/UX', 'GSAP', 'TypeScript']

function HeroSection({ personal }) {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const bioRef = useRef(null)
  const badgesRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Paso 1 — ScrambleText en el h1: descifrado de nombre
    tl.to(nameRef.current, {
      duration: 1.8,
      scrambleText: {
        text: personal.name,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%',
        revealDelay: 0.3,
        speed: 0.4,
        newClass: 'text-dim',
      },
    })

    // Paso 2 — Tagline (overlap: empieza cuando el scramble lleva 0.8s)
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=1.0'
    )

    // Paso 3 — Bio
    tl.fromTo(
      bioRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )

    // Paso 4 — Badges en cascada
    tl.fromTo(
      Array.from(badgesRef.current.children),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' },
      '-=0.5'
    )

    // Paso 5 — CTAs
    tl.fromTo(
      Array.from(ctaRef.current.children),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
    >
      {/* Contenido — z-index sobre el fondo fijo */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-20">
        <div style={{ maxWidth: '520px' }}>

          {/* Label badge con línea decorativa */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Desarrollador de software
            </span>
          </div>

          {/* Nombre — target de ScrambleText, empieza vacío */}
          <h1
            ref={nameRef}
            className="font-display text-hero text-foreground mb-4"
          >
            {'\u00A0'}
          </h1>

          {/* Tagline — empieza invisible, entra con fromTo */}
          <p
            ref={taglineRef}
            className="font-display text-title text-gradient-amber mb-5"
            style={{ opacity: 0 }}
          >
            {personal.tagline}
          </p>

          {/* Bio */}
          <p
            ref={bioRef}
            className="font-sans text-lg leading-relaxed text-muted mb-8"
            style={{ opacity: 0 }}
          >
            {personal.bio}
          </p>

          {/* Badges de habilidades — cada hijo animado con stagger */}
          <div ref={badgesRef} className="flex flex-wrap gap-2 mb-8">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs bg-surface border border-border text-muted px-3 py-1.5"
                style={{ opacity: 0 }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex gap-4 flex-wrap">
            <Link
              to="/projects"
              className="font-mono text-xs uppercase tracking-widest bg-accent text-background px-5 py-3 transition-all duration-200 hover:opacity-90 hover:glow-amber"
              style={{ opacity: 0 }}
            >
              Ver Proyectos
            </Link>
            <a
              href="#about"
              className="font-mono text-xs uppercase tracking-widest border border-border text-muted px-5 py-3 transition-colors duration-200 hover:text-foreground hover:border-dim"
              style={{ opacity: 0 }}
            >
              Sobre mí
            </a>
          </div>

        </div>
      </div>

      {/* Indicador de scroll — esquina inferior izquierda */}
      <div className="absolute bottom-8 left-6 md:left-16 flex flex-col items-center gap-2">
        <div className="h-12 w-px bg-muted" />
        <span
          className="font-mono text-xs text-muted tracking-widest uppercase"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          scroll
        </span>
      </div>
    </section>
  )
}

export default HeroSection
