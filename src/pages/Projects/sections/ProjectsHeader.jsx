import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../../animations/gsap.config'

function ProjectsHeader() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(() => {
    // 1. ScrambleText en cada línea del título con stagger
    const spans = titleRef.current.querySelectorAll('span')
    const tl = gsap.timeline()
    tl.to(spans[0], {
      duration: 1.4,
      scrambleText: {
        text: 'LO QUE',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        revealDelay: 0.3,
        speed: 0.4,
      },
    })
    tl.to(spans[1], {
      duration: 1.6,
      scrambleText: {
        text: 'CONSTRUYO',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        revealDelay: 0.3,
        speed: 0.4,
      },
    }, '-=0.8')

    // 2. Esquinas y flecha
    gsap.fromTo(
      ['.corner-anim', '.arrow-anim'],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.9 }
    )

    // 3. Loop de la flecha
    gsap.to('.arrow-anim', {
      y: 6, duration: 1.3, repeat: -1,
      yoyo: true, ease: 'sine.inOut', delay: 1.6,
    })

    // 4. Desvanecimiento del título al scrollear
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(titleRef.current, {
          opacity: 1 - self.progress * 2,
          y: self.progress * -30,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <header
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        zIndex: 10,
        display: 'grid',
        gridTemplateRows: '1fr auto 1fr',
        padding: '2.5rem 3rem',
      }}
    >
      {/* Fila 0 — esquinas superiores */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          className="corner-anim"
          style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          Trabajo en código,<br />ideas y sistemas.
        </div>
      </div>

      {/* Fila 1 — título central */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(4.5rem, 11vw, 13rem)',
            fontWeight: 400,
            color: '#ede8e0',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            textAlign: 'center',
            userSelect: 'none',
            margin: 0,
          }}
        >
          <span style={{ display: 'block' }}>{'\u00A0'}</span>
          <span style={{ display: 'block', paddingLeft: '0.08em' }}>{'\u00A0'}</span>
        </h1>
      </div>

      {/* Fila 2 — esquinas inferiores + flecha */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
        }}
      >
        {/* Esquina inferior izquierda */}
        <div
          className="corner-anim"
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            maxWidth: '260px',
            opacity: 0,
          }}
        >
          Un portfolio es el único lugar<br />donde el trabajo habla por sí solo.
        </div>

        {/* Flecha central */}
        <div
          className="arrow-anim"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
          }}
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

        {/* Esquina inferior derecha */}
        <div
          className="corner-anim"
          style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.12em',
            alignSelf: 'flex-end',
            opacity: 0,
          }}
        >
          v2 · 2025
        </div>
      </div>
    </header>
  )
}

export default ProjectsHeader
