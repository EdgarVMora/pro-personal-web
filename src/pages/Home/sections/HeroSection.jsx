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

    // Loop de la flecha
    gsap.to('.hero-arrow', {
      y: 6, duration: 1.3, repeat: -1,
      yoyo: true, ease: 'sine.inOut', delay: 2.5,
    })
  }, { scope: sectionRef })

  const [firstName, ...rest] = personal.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        padding: '2.5rem 3rem',
        zIndex: 10,
      }}
    >
      {/* FILA 0 — esquinas superiores */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

        {/* Esquina sup-izq — label badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ height: '2px', width: '32px', background: 'var(--color-accent)' }} />
          <span
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Desarrollador de software
          </span>
        </div>

        {/* Esquina sup-der — tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            textAlign: 'right',
            maxWidth: '220px',
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          {personal.tagline}
        </p>
      </div>

      {/* FILA 1 — título central */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1
          ref={nameRef}
          className="hero-name"
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(5rem, 13vw, 15rem)',
            fontWeight: 400,
            color: 'rgba(235, 235, 245, 0.82)',
            letterSpacing: '-0.02em',
            lineHeight: 0.92,
            textAlign: 'center',
            userSelect: 'none',
            margin: 0,
          }}
        >
          <span style={{ display: 'block' }}>{'\u00A0'}</span>
          <span style={{ display: 'block' }}>{'\u00A0'}</span>
        </h1>
      </div>

      {/* FILA 2 — esquinas inferiores + flecha */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>

        {/* Esquina inf-izq — bio */}
        <p
          ref={bioRef}
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: '260px',
            opacity: 0,
          }}
        >
          {personal.bio}
        </p>

        {/* Flecha central */}
        <div
          className="hero-arrow"
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        >
          <button
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              ↓
            </span>
          </button>
        </div>

        {/* Esquina inf-der — badges + CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>

          {/* Badges */}
          <div
            ref={badgesRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'flex-end' }}
          >
            {SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '0.2rem 0.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  opacity: 0,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                opacity: 0,
              }}
            >
              Ver proyectos →
            </Link>
            <a
              href="#about"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                opacity: 0,
              }}
            >
              Sobre mí →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
