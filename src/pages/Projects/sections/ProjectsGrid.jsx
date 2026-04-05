import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../../animations/gsap.config'
import ProjectCard from '../../../components/ui/ProjectCard'
import { LayoutDashboard, FlaskConical, Layers } from 'lucide-react'

const ICON_MAP = {
  LayoutDashboard,
  FlaskConical,
  Layers,
}

function ProjectsGrid({ projects }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    // ── Animación horizontal principal ──
    const tween = gsap.to(trackRef.current, {
      x: () => -(trackRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // ── Animación de entrada por slide ──
    const slides = trackRef.current.querySelectorAll('.h-slide')
    slides.forEach((slide) => {
      const lefts = slide.querySelectorAll('.from-left')
      const rights = slide.querySelectorAll('.from-right')

      gsap.set(lefts, { x: -50, opacity: 0 })
      gsap.set(rights, { x: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: slide,
        containerAnimation: tween,
        start: 'left 65%',
        onEnter: () => {
          gsap.to(lefts, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
          gsap.to(rights, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 })
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: `${projects.length * 100}vw`,
          height: '100vh',
          willChange: 'transform',
        }}
      >
        {projects.map(({ id, icon, ...props }, index) => {
          const IconComponent = ICON_MAP[icon]
          return (
            <div
              key={id}
              className="h-slide"
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8rem',
                padding: '0 8rem',
                flexShrink: 0,
              }}
            >
              {/* Lado izquierdo — texto descriptivo */}
              <div
                className="from-left"
                style={{
                  maxWidth: '420px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <span
                  className="from-left"
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(160,100,255,0.7)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h2
                  className="from-left"
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.1,
                  }}
                >
                  {props.title}
                </h2>
                <p
                  className="from-left"
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {props.description}
                </p>
              </div>

              {/* Lado derecho — card */}
              <div className="from-right">
                <ProjectCard {...props} IconComponent={IconComponent} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsGrid
