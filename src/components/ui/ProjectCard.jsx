const STATUS_LABELS = {
  completed: 'Completado',
  'in-progress': 'En progreso',
  archived: 'Archivado',
}

function ProjectCard({ title, description, tags, status, links, builtWith, IconComponent }) {
  return (
    <article
      style={{
        width: '420px',
        flexShrink: 0,
        flexGrow: 0,
        padding: '2rem',
        borderRadius: '2px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Icono */}
      {IconComponent && (
        <div style={{ marginBottom: '0.25rem' }}>
          <IconComponent
            size={48}
            style={{
              color: 'rgba(160,100,255,0.85)',
              filter: 'drop-shadow(0 0 12px rgba(140,80,255,0.5))',
            }}
          />
        </div>
      )}

      {/* Título */}
      <h3
        style={{
          fontFamily: 'var(--font-family-sans)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {/* Separador */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      {/* Descripción */}
      <p
        style={{
          fontFamily: 'var(--font-family-sans)',
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              padding: '0.25rem 0.5rem',
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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.7rem',
            color: 'rgba(160,100,255,0.6)',
          }}
        >
          {STATUS_LABELS[status]}
        </span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
            >
              repo →
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.7rem',
                color: 'rgba(160,100,255,0.85)',
                textDecoration: 'none',
              }}
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
