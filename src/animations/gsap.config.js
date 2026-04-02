import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger, ScrambleTextPlugin }
