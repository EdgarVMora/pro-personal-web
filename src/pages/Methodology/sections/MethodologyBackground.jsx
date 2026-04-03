import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../../../animations/gsap.config'

function MethodologyBackground() {
  const canvasRef = useRef(null)
  const nebulaRef = useRef(null)
  const rocketRef = useRef(null)
  const motionPathRef = useRef(null)

  useEffect(() => {
    // ── 1. CANVAS — CAMPO DE ESTRELLAS ────────────────────────────────
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.2 + Math.random() * 1.1,
      alpha: Math.random() * 0.7 + 0.1,
    }))

    stars.forEach((star) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220, 225, 255, ${star.alpha})`
      ctx.fill()
    })

    const starTweens = stars.map((star) => {
      const proxy = { alpha: star.alpha }
      return gsap.to(proxy, {
        alpha: Math.random() * 0.8 + 0.1,
        duration: 1.5 + Math.random() * 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 4,
        onUpdate() {
          star.alpha = proxy.alpha
          const pad = star.r + 1
          ctx.clearRect(star.x - pad, star.y - pad, pad * 2, pad * 2)
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(220, 225, 255, ${star.alpha})`
          ctx.fill()
        },
      })
    })

    // ── 2. NEBULOSA — BLOBS ───────────────────────────────────────────
    const blobs = nebulaRef.current.querySelectorAll('.n-blob')
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

    // ── 3. COHETE — MOTION PATH + SCROLLTRIGGER ───────────────────────
    const trigger = document.getElementById('methodology-timeline')

    if (trigger && rocketRef.current && motionPathRef.current) {
      // Posición inicial: inicio del path (top-right)
      gsap.set(rocketRef.current, { opacity: 1 })

      const rocketTween = gsap.to(rocketRef.current, {
        motionPath: {
          path: motionPathRef.current,
          align: motionPathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: 'none',
        immediateRender: true,
        scrollTrigger: {
          trigger: trigger,
          start: 'top 60%',
          end: 'bottom 90%',
          scrub: 1.5,
        },
      })

      return () => {
        starTweens.forEach((t) => t.kill())
        blobs.forEach((blob) => gsap.killTweensOf(blob))
        rocketTween.kill()
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    }

    return () => {
      starTweens.forEach((t) => t.kill())
      blobs.forEach((blob) => gsap.killTweensOf(blob))
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* ── Capa 1: Canvas de estrellas ── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* ── Capa 2: Nebulosa ── */}
      <div ref={nebulaRef} style={{ position: 'absolute', inset: 0 }}>
        {/* Blob 1 — Púrpura profundo, arriba-derecha */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '780px',
            height: '680px',
            background: 'radial-gradient(ellipse at center, rgba(55,12,130,0.28) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Blob 2 — Azul eléctrico, abajo-izquierda (Opción A) */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '640px',
            height: '520px',
            background: 'radial-gradient(ellipse at center, rgba(37,127,245,0.20) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Blob 3 — Carmesí, arriba-izquierda */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            top: '-5%',
            left: '5%',
            width: '560px',
            height: '420px',
            background: 'radial-gradient(ellipse at center, rgba(100,12,40,0.22) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        {/* Blob 4 — Ámbar tenue, abajo-derecha */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '8%',
            width: '360px',
            height: '260px',
            background: 'radial-gradient(ellipse at center, rgba(240,160,48,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Capa 3: Cohete + Motion Path ── */}
      <svg
        viewBox="0 0 1000 900"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Path invisible — curva de trayectoria del cohete */}
        <path
          ref={motionPathRef}
          id="rocket-motion-path"
          d="M 850 80 C 830 160, 800 260, 740 380 C 670 510, 480 600, 300 700 C 190 760, 110 810, 80 855"
          fill="none"
          stroke="transparent"
          strokeWidth="0"
        />

        {/* Cohete — vista lateral, nariz apuntando derecha */}
        <g ref={rocketRef} style={{ opacity: 0 }} transform="scale(2.2)">
          {/* Cuerpo principal */}
          <rect x="-10" y="-7" width="18" height="14" rx="3" fill="#c07820" />
          {/* Nariz */}
          <path d="M 8 0 L 20 -5 L 22 0 L 20 5 Z" fill="#f0a030" />
          {/* Ventana — azul eléctrico */}
          <circle cx="2" cy="0" r="4" fill="rgba(37,127,245,0.90)" />
          <circle cx="2" cy="0" r="2.5" fill="rgba(140,200,255,0.60)" />
          {/* Aleta superior */}
          <path d="M -10 -7 L -18 -16 L -4 -7 Z" fill="#f0a030" />
          {/* Aleta inferior */}
          <path d="M -10 7 L -18 16 L -4 7 Z" fill="#f0a030" />
          {/* Llama */}
          <path d="M -10 -4 L -20 0 L -10 4 Z" fill="rgba(240,160,48,0.85)" />
          <path d="M -10 -2 L -24 0 L -10 2 Z" fill="rgba(255,220,100,0.55)" />
        </g>
      </svg>

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

export default MethodologyBackground
