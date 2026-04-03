import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'

function LatitudeLines({ size }) {
  const r = size / 2
  const lines = [
    { cy: r * 0.22, rx: r * 0.50, ry: r * 0.08 },
    { cy: r * 0.42, rx: r * 0.80, ry: r * 0.12 },
    { cy: r,        rx: r * 0.95, ry: r * 0.15 },
    { cy: r * 1.58, rx: r * 0.80, ry: r * 0.12 },
    { cy: r * 1.78, rx: r * 0.50, ry: r * 0.08 },
  ]

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {lines.map((line, i) => (
        <ellipse
          key={i}
          cx={r}
          cy={line.cy}
          rx={line.rx}
          ry={line.ry}
          fill="none"
          stroke="rgba(200,160,255,0.18)"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

function ProjectsBackground() {
  const containerRef = useRef(null)
  const sphere1Ref = useRef(null)
  const sphere2Ref = useRef(null)
  const sphere3Ref = useRef(null)

  useGSAP(() => {
    const spheres = [sphere1Ref.current, sphere2Ref.current, sphere3Ref.current]

    // Entrada
    gsap.fromTo(
      spheres,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, stagger: 0.3, ease: 'power3.out' }
    )

    // Rotación continua — cada esfera a distinta velocidad
    gsap.to(sphere1Ref.current, { rotateY: 360, duration: 28, repeat: -1, ease: 'none' })
    gsap.to(sphere2Ref.current, { rotateY: 360, duration: 18, repeat: -1, ease: 'none' })
    gsap.to(sphere3Ref.current, { rotateY: 360, duration: 22, repeat: -1, ease: 'none' })

    // Blobs nebulosa
    const blobs = containerRef.current.querySelectorAll('.p-blob')
    blobs.forEach((blob) => {
      gsap.to(blob, {
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 40,
        scale: 0.94 + Math.random() * 0.12,
        duration: 12 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {/* ── Nebulosa — blobs morado ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Blob 1 — Morado profundo, arriba-derecha */}
        <div
          className="p-blob"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '800px',
            height: '700px',
            background: 'radial-gradient(ellipse at center, rgba(90,20,180,0.28) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Blob 2 — Morado azulado, abajo-izquierda */}
        <div
          className="p-blob"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '650px',
            height: '550px',
            background: 'radial-gradient(ellipse at center, rgba(70,15,150,0.30) 0%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />
        {/* Blob 3 — Morado violeta, arriba-izquierda */}
        <div
          className="p-blob"
          style={{
            position: 'absolute',
            top: '-5%',
            left: '5%',
            width: '580px',
            height: '450px',
            background: 'radial-gradient(ellipse at center, rgba(110,30,200,0.22) 0%, transparent 70%)',
            filter: 'blur(65px)',
          }}
        />
        {/* Blob 4 — Morado oscuro, centro */}
        <div
          className="p-blob"
          style={{
            position: 'absolute',
            top: 'calc(50% - 150px)',
            left: 'calc(50% - 200px)',
            width: '400px',
            height: '300px',
            background: 'radial-gradient(ellipse at center, rgba(60,10,140,0.20) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Esfera 1 — grande, arriba-derecha ── */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '70%',
          perspective: '600px',
        }}
      >
        <div
          ref={sphere1Ref}
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, rgba(160,80,255,0.9) 0%, rgba(70,20,160,0.95) 50%, rgba(15,5,45,1) 100%)',
            boxShadow: '0 0 40px rgba(120,50,220,0.35), 0 0 80px rgba(80,20,160,0.18)',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <LatitudeLines size={240} />
        </div>
      </div>

      {/* ── Esfera 2 — pequeña, centro-izquierda ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '8%',
          perspective: '400px',
        }}
      >
        <div
          ref={sphere2Ref}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(180,100,255,0.85) 0%, rgba(90,30,180,0.92) 50%, rgba(20,8,55,1) 100%)',
            boxShadow: '0 0 25px rgba(140,60,240,0.3), 0 0 50px rgba(100,30,180,0.15)',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <LatitudeLines size={120} />
        </div>
      </div>

      {/* ── Esfera 3 — mediana, abajo-derecha ── */}
      <div
        style={{
          position: 'absolute',
          top: '62%',
          left: '78%',
          perspective: '500px',
        }}
      >
        <div
          ref={sphere3Ref}
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 30%, rgba(130,60,220,0.88) 0%, rgba(55,15,130,0.94) 55%, rgba(12,4,38,1) 100%)',
            boxShadow: '0 0 35px rgba(100,40,200,0.32), 0 0 70px rgba(70,20,150,0.16)',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <LatitudeLines size={180} />
        </div>
      </div>

      {/* ── Viñeta de borde ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 38%, rgba(4,4,7,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default ProjectsBackground
