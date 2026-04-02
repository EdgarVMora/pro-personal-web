const STATUS_LABELS = {
  completed: 'Completado',
  'in-progress': 'En progreso',
  archived: 'Archivado',
}

const STATUS_COLORS = {
  completed: 'text-accent',
  'in-progress': 'text-foreground',
  archived: 'text-dim',
}

function ProjectCard({ title, description, tags, status, links, builtWith }) {
  return (
    <article
      className="p-6 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        <span className={`font-mono text-xs shrink-0 ${STATUS_COLORS[status]}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-sm leading-relaxed text-muted">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-dim px-2 py-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3 mt-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-mono text-xs text-dim">
          built with {builtWith}
        </span>
        <div className="flex gap-4">
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              repo →
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent hover:opacity-70 transition-opacity duration-200"
            >
              live →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
