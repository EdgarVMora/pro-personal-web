import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'
import TimelineStep from '../../../components/ui/TimelineStep'

function JourneySection({ journey }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.journey-anim')

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
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '600px' }} className="w-full mr-auto">

        {/* Label badge */}
        <div className="journey-anim flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Metodología
          </span>
        </div>

        {/* Heading */}
        <h2 className="journey-anim font-display text-title text-foreground mb-10">
          Cómo trabajo
        </h2>

        {/* Timeline */}
        <div className="journey-anim">
          <TimelineStep
            period={journey[0].period}
            tool={journey[0].tool}
            phase={journey[0].phase}
            description={journey[0].description}
            milestone={journey[0].milestone}
            isLast={false}
          />
          <TimelineStep
            period={journey[1].period}
            tool={journey[1].tool}
            phase={journey[1].phase}
            description={journey[1].description}
            milestone={journey[1].milestone}
            isLast={true}
          />
        </div>

        {/* CTA */}
        <div className="journey-anim mt-6">
          <Link
            to="/methodology"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200"
          >
            Ver proceso completo →
          </Link>
        </div>

      </div>
    </section>
  )
}

export default JourneySection
