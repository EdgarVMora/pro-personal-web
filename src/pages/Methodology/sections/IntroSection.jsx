import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '../../../animations/gsap.config'

function IntroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(() => {
    // Título — SplitText char por char con rotateX
    SplitText.create(titleRef.current, {
      type: 'chars',
      onSplit(self) {
        gsap.from(self.chars, {
          opacity: 0,
          y: 30,
          rotateX: -60,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      },
    })

    // Resto de elementos
    const elements = sectionRef.current.querySelectorAll('.intro-anim')
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

        {/* Esquina sup-der — párrafo principal */}
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

      {/* FILA 1 — título central */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ perspective: '600px' }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(3rem, 7vw, 8.5rem)',
              fontWeight: 400,
              color: 'rgba(235, 235, 245, 0.82)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              textAlign: 'center',
              userSelect: 'none',
              margin: 0,
            }}
          >
            <span style={{ display: 'block' }}>Cómo aprendí</span>
            <span style={{ display: 'block' }}>a construir con IA</span>
          </h1>
        </div>
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

        {/* Esquina inf-der — frase destacada */}
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

    </section>
  )
}

export default IntroSection
