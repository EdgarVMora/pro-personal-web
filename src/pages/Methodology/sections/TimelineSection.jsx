import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'
import TimelineStep from '../../../components/ui/TimelineStep'

function TimelineSection({ journey }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Header
    const headers = sectionRef.current.querySelectorAll('.timeline-anim')
    gsap.from(headers, {
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

    // Cards — una a una con stagger
    const cards = sectionRef.current.querySelectorAll('.step-anim')
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="methodology-timeline"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>

        {/* Label */}
        <div className="timeline-anim flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Recorrido
          </span>
          <div className="h-px w-8 bg-accent" />
        </div>

        {/* Heading */}
        <h2 className="timeline-anim font-display text-title text-foreground mb-12 text-center">
          Etapas del aprendizaje
        </h2>

        {/* Timeline — cada card animada individualmente */}
        {journey.map((step, index) => (
          <div key={step.id} className="step-anim">
            <TimelineStep
              period={step.period}
              tool={step.tool}
              phase={step.phase}
              description={step.description}
              milestone={step.milestone}
              isLast={index === journey.length - 1}
            />
          </div>
        ))}

      </div>
    </section>
  )
}

export default TimelineSection
