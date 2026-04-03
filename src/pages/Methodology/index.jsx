import { journey } from '../../data/index'
import MethodologyBackground from './sections/MethodologyBackground'
import IntroSection from './sections/IntroSection'
import TimelineSection from './sections/TimelineSection'

function Methodology() {
  return (
    <>
      {/* Background fijo — permanece intacto mientras las secciones scrollean */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <MethodologyBackground />
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <IntroSection />
        <TimelineSection journey={journey} />
      </main>
    </>
  )
}

export default Methodology
