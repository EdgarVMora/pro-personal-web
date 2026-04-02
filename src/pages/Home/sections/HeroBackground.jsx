import { useRef, useEffect } from 'react'
import { gsap } from '../../../animations/gsap.config'

function HeroBackground() {
  const canvasRef = useRef(null)
  const nebulaRef = useRef(null)
  const torusWrapRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)

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

    // Dibujo inicial
    stars.forEach((star) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220, 225, 255, ${star.alpha})`
      ctx.fill()
    })

    // Twinkle — un tween por estrella con proxy object
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

    // ── 3. TORUS ORBITAL ──────────────────────────────────────────────
    // Inclinación orbital inicial (el plano sobre el que GSAP rota en Z)
    gsap.set(torusWrapRef.current, { rotateX: 68 })

    // Entrada: fade + scale desde 0.88, stagger entre los tres anillos
    gsap.fromTo([ring1Ref.current, ring2Ref.current, ring3Ref.current], 
      { scale: 0.88, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2.8,
        stagger: 0.25,
        ease: 'power3.out',
      }
    )

    // Rotación continua del conjunto (30s por vuelta, horario)
    gsap.to(torusWrapRef.current, {
      rotateZ: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
    })

    // Anillo exterior — rotación propia anti-horaria (45s)
    gsap.to(ring2Ref.current, {
      rotate: -360,
      duration: 45,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    })

    // Anillo interior — rotación propia horaria (60s)
    gsap.to(ring3Ref.current, {
      rotate: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    })

    // ── CLEANUP ───────────────────────────────────────────────────────
    return () => {
      starTweens.forEach((t) => t.kill())
      gsap.killTweensOf(torusWrapRef.current)
      gsap.killTweensOf(ring1Ref.current)
      gsap.killTweensOf(ring2Ref.current)
      gsap.killTweensOf(ring3Ref.current)
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
        {/* Blob 2 — Azul espacial, abajo-izquierda */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '640px',
            height: '520px',
            background: 'radial-gradient(ellipse at center, rgba(8,18,70,0.30) 0%, transparent 70%)',
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
        {/* Blob 4 — Ámbar tenue, detrás del torus */}
        <div
          className="n-blob"
          style={{
            position: 'absolute',
            top: 'calc(50% - 130px)',
            left: 'calc(58% - 180px)',
            width: '360px',
            height: '260px',
            background: 'radial-gradient(ellipse at center, rgba(240,160,48,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Capa 3: Torus orbital ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '58%',
          transform: 'translate(-50%, -50%)',
          perspective: '1800px',
          zIndex: 10,
        }}
      >
        <div
          ref={torusWrapRef}
          style={{
            position: 'relative',
            width: '800px',
            height: '280px',
          }}
        >
          {/* Anillo principal */}
          <svg
            ref={ring1Ref}
            viewBox="-420 -160 840 320"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f0a030" />
                <stop offset="50%" stopColor="#ffd070" />
                <stop offset="100%" stopColor="#f0a030" />
              </linearGradient>
              <filter id="glow-main" x="-40%" y="-200%" width="180%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="clip-back-main">
                <rect x="-420" y="-200" width="840" height="200" />
              </clipPath>
              <clipPath id="clip-front-main">
                <rect x="-420" y="0" width="840" height="200" />
              </clipPath>
            </defs>
            {/* Arco trasero — tenue, azul-índigo */}
            <ellipse
              cx="0" cy="0"
              rx="300" ry="95"
              fill="none"
              stroke="rgba(70,90,160,0.65)"
              strokeWidth="14"
              clipPath="url(#clip-back-main)"
            />
            {/* Arco frontal — ámbar brillante con glow */}
            <ellipse
              cx="0" cy="0"
              rx="300" ry="95"
              fill="none"
              stroke="url(#grad-main)"
              strokeWidth="14"
              clipPath="url(#clip-front-main)"
              filter="url(#glow-main)"
            />
          </svg>

          {/* Anillo exterior */}
          <svg
            ref={ring2Ref}
            viewBox="-420 -160 840 320"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <clipPath id="clip-back-outer">
                <rect x="-450" y="-200" width="900" height="200" />
              </clipPath>
              <clipPath id="clip-front-outer">
                <rect x="-450" y="0" width="900" height="200" />
              </clipPath>
            </defs>
            <ellipse cx="0" cy="0" rx="370" ry="116" fill="none" stroke="rgba(55,75,120,0.55)" strokeWidth="4" clipPath="url(#clip-back-outer)" />
            <ellipse cx="0" cy="0" rx="370" ry="116" fill="none" stroke="rgba(220,165,65,0.75)" strokeWidth="4" clipPath="url(#clip-front-outer)" />
          </svg>

          {/* Anillo interior */}
          <svg
            ref={ring3Ref}
            viewBox="-420 -160 840 320"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <clipPath id="clip-back-inner">
                <rect x="-350" y="-160" width="700" height="160" />
              </clipPath>
              <clipPath id="clip-front-inner">
                <rect x="-350" y="0" width="700" height="160" />
              </clipPath>
            </defs>
            <ellipse cx="0" cy="0" rx="232" ry="73" fill="none" stroke="rgba(55,75,120,0.45)" strokeWidth="3" clipPath="url(#clip-back-inner)" />
            <ellipse cx="0" cy="0" rx="232" ry="73" fill="none" stroke="rgba(200,145,55,0.65)" strokeWidth="3" clipPath="url(#clip-front-inner)" />
          </svg>
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

export default HeroBackground
