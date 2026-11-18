import { ArrowUpRight, Github } from 'lucide-react'

export default function ProjectCard({ project, onViewDetails }) {
  return (
    <article className="project-card">
      <div className="project-content">
        <p className="project-category">{project.category}</p>
        <div className="project-title-row"><h3>{project.title}</h3><span className="project-year">{project.year}</span></div>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="tags" aria-label="Technologies used">{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
        <div className="project-actions">
          <div className="project-external-links">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub (opens in a new tab)`}><Github size={15} aria-hidden="true" />GitHub</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo (opens in a new tab)`}>Live demo<ArrowUpRight size={15} aria-hidden="true" /></a>}
          </div>
          <button type="button" className="details-button" onClick={() => onViewDetails(project)} aria-label={`View details for ${project.title}`}>View details<ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </article>
  )
}
