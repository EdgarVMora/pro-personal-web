import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'

function AboutSection({ personal, skills }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const elements = sectionRef.current.querySelectorAll('.about-anim')

    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div style={{ maxWidth: '640px' }} className="w-full mr-auto">

        {/* Label badge */}
        <div className="about-anim flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Sobre mí
          </span>
        </div>

        {/* Heading */}
        <h2 className="about-anim font-display text-title text-foreground mb-5">
          Quién está detrás del teclado
        </h2>

        {/* Bio */}
        <p className="about-anim font-sans text-lg leading-relaxed text-muted mb-12">
          {personal.bio}
        </p>

        {/* Skills grid — glassmorphism */}
        <div className="grid grid-cols-2 gap-4">
          {skills.map((category) => (
            <div
              key={category.category}
              className="about-anim p-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
                {category.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-muted px-2 py-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default AboutSection
