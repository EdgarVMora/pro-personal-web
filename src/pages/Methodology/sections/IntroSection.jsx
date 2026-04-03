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
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>

        {/* Label */}
        <div className="intro-anim flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Metodología
          </span>
          <div className="h-px w-8 bg-accent" />
        </div>

        {/* Heading — animado con SplitText */}
        <div style={{ perspective: '400px' }}>
          <h1
            ref={titleRef}
            className="font-display text-title text-foreground mb-6 leading-tight"
          >
            Cómo aprendí a construir con IA
          </h1>
        </div>

        {/* Párrafo principal */}
        <p className="intro-anim font-sans text-lg leading-relaxed text-muted mb-4">
          {/* TODO: contenido real */}
          [FAKE] No aprendí programación de forma lineal. Cada herramienta que adopté
          transformó mi forma de pensar el problema antes de escribir la primera línea de código.
          Este es el recorrido honesto de esa evolución.
        </p>

        {/* Párrafo secundario */}
        <p className="intro-anim font-sans text-lg leading-relaxed text-muted mb-10">
          {/* TODO: contenido real */}
          [FAKE] Desde las noches frustrantes con vanilla JS hasta delegar arquitecturas completas
          a Claude Code — cada etapa dejó un insight que no se aprende en ningún tutorial.
        </p>

        {/* Frase destacada — glassmorphism */}
        <blockquote
          className="intro-anim pl-5 py-4 pr-5 font-mono text-sm text-foreground italic"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '2px solid #f0a030',
            textAlign: 'left',
          }}
        >
          {/* TODO: contenido real */}
          [FAKE] "La IA no reemplazó mi criterio — lo afiló."
        </blockquote>

      </div>
    </section>
  )
}

export default IntroSection
