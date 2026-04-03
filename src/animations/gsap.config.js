import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, MotionPathPlugin, SplitText)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger, ScrambleTextPlugin, SplitText }
