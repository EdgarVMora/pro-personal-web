function TimelineStep({ period, tool, phase, description, milestone, isLast }) {
  return (
    <article>
      <span>{period}</span>
      <h3>{tool}</h3>
      <span>{phase}</span>
      <p>{description}</p>
      <blockquote>{milestone}</blockquote>
    </article>
  )
}

export default TimelineStep
