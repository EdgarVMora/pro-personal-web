import { journey } from '../../data/index'
import TimelineStep from '../../components/ui/TimelineStep'

function Methodology() {
  return (
    <main>
      <h1>Metodología de Aprendizaje</h1>
      <p>[FAKE] Un recorrido por las herramientas y etapas que definieron mi forma de construir software con IA.</p>
      <section>
        {journey.map((step, index) => (
          <TimelineStep
            key={step.id}
            period={step.period}
            tool={step.tool}
            phase={step.phase}
            description={step.description}
            milestone={step.milestone}
            isLast={index === journey.length - 1}
          />
        ))}
      </section>
    </main>
  )
}

export default Methodology
