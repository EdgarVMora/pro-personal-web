function TimelineStep({ period, tool, phase, description, milestone, isLast }) {
  return (
    <div className="relative flex gap-6">
      {/* Línea + dot */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: '#f0a030', boxShadow: '0 0 8px rgba(240,160,48,0.6)' }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }}
          />
        )}
      </div>

      {/* Card glassmorphism */}
      <article
        className={`flex-1 p-5 ${!isLast ? 'mb-6' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-dim">{period}</span>
          <span
            className="font-mono text-xs text-muted px-2 py-0.5"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {phase}
          </span>
        </div>

        {/* Tool name */}
        <h3 className="font-display text-xl text-foreground mb-2">{tool}</h3>

        {/* Description */}
        <p className="font-sans text-sm leading-relaxed text-muted mb-4">{description}</p>

        {/* Milestone */}
        <blockquote
          className="pl-3 font-mono text-xs text-accent italic"
          style={{ borderLeft: '2px solid #f0a030' }}
        >
          {milestone}
        </blockquote>
      </article>
    </div>
  )
}

export default TimelineStep
