import TimelineStep from '../../../components/ui/TimelineStep'

function JourneySection({ journey }) {
  return (
    <section>
      <h2>Journey</h2>
      <TimelineStep
        key={journey[0].id}
        period={journey[0].period}
        tool={journey[0].tool}
        phase={journey[0].phase}
        description={journey[0].description}
        milestone={journey[0].milestone}
        isLast={false}
      />
      <a href="/methodology">Ver proceso completo</a>
      <TimelineStep
        key={journey[1].id}
        period={journey[1].period}
        tool={journey[1].tool}
        phase={journey[1].phase}
        description={journey[1].description}
        milestone={journey[1].milestone}
        isLast={true}
      />
    </section>
  )
}

export default JourneySection
