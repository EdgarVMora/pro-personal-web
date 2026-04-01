export const fadeUp = {
  from: { y: 60, opacity: 0 },
  duration: 1,
  ease: 'power3.out',
}

export const fadeIn = {
  from: { opacity: 0 },
  duration: 0.8,
  ease: 'power2.out',
}

export const slideInLeft = {
  from: { x: -60, opacity: 0 },
  duration: 1,
  ease: 'power3.out',
}

export const stagger = {
  each: 0.12,
  ease: 'power2.out',
}
