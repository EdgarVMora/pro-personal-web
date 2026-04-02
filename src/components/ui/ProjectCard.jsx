function ProjectCard({ title, description, tags, status, links, builtWith }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag}><span>{tag}</span></li>
        ))}
      </ul>
      <span>{status}</span>
      <span>{builtWith}</span>
      <a href={links.repo}>Repo</a>
      <a href={links.live}>Live</a>
    </article>
  )
}

export default ProjectCard
