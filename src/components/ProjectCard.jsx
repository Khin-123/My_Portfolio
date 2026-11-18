import { ArrowUpRight, Github } from 'lucide-react'

export default function ProjectCard({ project, onViewDetails }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-skills">
        <ul className="tags" role="list" aria-label="Technologies used">
          {project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
        </ul>
      </div>
      <div className="project-card-actions">
        <a className="project-link" href={`#project-${project.id}`} onClick={(event) => onViewDetails(event, project.id)} aria-label={`View details for ${project.title}`}>
          View details <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        {project.github && (
          <a className="project-repository" href={project.github} target="_blank" rel="noreferrer" aria-label={`View repository for ${project.title} (opens in a new tab)`}>
            <Github size={17} aria-hidden="true" /> View repository
          </a>
        )}
      </div>
    </article>
  )
}
