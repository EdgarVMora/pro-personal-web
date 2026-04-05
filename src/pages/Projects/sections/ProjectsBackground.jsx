import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../animations/gsap.config'
import AlienSphere from '../../../components/ui/AlienSphere'

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
      <div style={{ position: 'absolute', top: '10%', left: '70%', perspective: '600px' }}>
        <div ref={sphere1Ref} style={{ opacity: 0 }}>
          <AlienSphere size={240} rotationSpeed={28} color={0x8b3a28} emissive={0x3a1510} />
        </div>
      </div>

      {/* ── Esfera 2 — pequeña, centro-izquierda ── */}
      <div style={{ position: 'absolute', top: '50%', left: '8%', perspective: '600px' }}>
        <div ref={sphere2Ref} style={{ opacity: 0 }}>
          <AlienSphere size={120} rotationSpeed={18} color={0x2d6b3a} emissive={0x0f2a15} />
        </div>
      </div>

      {/* ── Esfera 3 — mediana, abajo-derecha ── */}
      <div style={{ position: 'absolute', top: '62%', left: '78%', perspective: '600px' }}>
        <div ref={sphere3Ref} style={{ opacity: 0 }}>
          <AlienSphere size={180} rotationSpeed={22} color={0xa07840} emissive={0x3d2a12} />
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
