import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../../animations/gsap.config'

function IntroSection() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })

    // Título — ScrambleText línea por línea
    const scrambleConfig = {
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%',
      revealDelay: 0.3,
      speed: 0.4,
      newClass: 'text-dim',
    }
    tl.to(line1Ref.current, { duration: 1.4, scrambleText: { ...scrambleConfig, text: 'lo que aprendí' } })
    tl.to(line2Ref.current, { duration: 1.2, scrambleText: { ...scrambleConfig, text: 'a construir' } }, '-=0.8')
    tl.to(line3Ref.current, { duration: 0.9, scrambleText: { ...scrambleConfig, text: 'con IA' } }, '-=0.7')

    // Resto de elementos
    const elements = sectionRef.current.querySelectorAll('.intro-anim')
    tl.from(
      elements,
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '-=1.0'
    )

    // Loop continuo de la flecha
    gsap.to('.intro-arrow', {
      y: 6, duration: 1.3, repeat: -1,
      yoyo: true, ease: 'sine.inOut', delay: 1.8,
    })
  }, { scope: sectionRef })

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
        <div
          className="intro-anim"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{ width: '24px', height: '2px', background: 'var(--color-accent)' }} />
          <span style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Metodología
          </span>
        </div>

        {/* Esquina sup-der — frase destacada */}
        <div
          className="intro-anim"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '2px solid #f0a030',
            padding: '1rem 1.25rem',
            maxWidth: '280px',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.75)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            display: 'block',
          }}>
            {/* TODO: contenido real */}
            [FAKE] "La IA no reemplazó mi criterio — lo afiló."
          </span>
        </div>

      </div>

      {/* FILA 1 — título central */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1
          className="intro-title"
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(3rem, 7vw, 8.5rem)',
            fontWeight: 400,
            color: 'var(--color-foreground)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            textAlign: 'center',
            userSelect: 'none',
            margin: 0,
          }}
        >
          <span ref={line1Ref} style={{ display: 'block' }}>{'\u00A0'}</span>
          <span ref={line2Ref} style={{ display: 'block' }}>{'\u00A0'}</span>
          <span ref={line3Ref} style={{ display: 'block' }}>{'\u00A0'}</span>
        </h1>
      </div>

      {/* FILA 2 — esquinas inferiores + flecha */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>

        {/* Esquina inf-izq — párrafo secundario */}
        <p
          className="intro-anim"
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            maxWidth: '260px',
            margin: 0,
          }}
        >
          {/* TODO: contenido real */}
          [FAKE] Desde las noches frustrantes con vanilla JS hasta delegar arquitecturas completas
          a Claude Code — cada etapa dejó un insight que no se aprende en ningún tutorial.
        </p>

        {/* Flecha central */}
        <div
          className="intro-arrow"
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
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.5)',
            }}>
              ↓
            </span>
          </button>
        </div>

        {/* Esquina inf-der — párrafo principal */}
        <p
          className="intro-anim"
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            maxWidth: '260px',
            textAlign: 'right',
            margin: 0,
          }}
        >
          {/* TODO: contenido real */}
          [FAKE] No aprendí programación de forma lineal. Cada herramienta que adopté
          transformó mi forma de pensar el problema antes de escribir la primera línea de código.
          Este es el recorrido honesto de esa evolución.
        </p>

      </div>

    </section>
  )
}

export default IntroSection
