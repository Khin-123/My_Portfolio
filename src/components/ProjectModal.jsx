import { useEffect, useRef } from 'react'
import { ArrowUpRight, CalendarDays, Github, Layers3, X } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  const closeRef = useRef(null)
  const backdropPointerDown = useRef(false)

  useEffect(() => {
    if (!project) return undefined

    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })

    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [project])

  if (!project) return null

  function isOutsideContent(event) {
    const bounds = contentRef.current?.getBoundingClientRect()
    return bounds && (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-overview"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = event.target === event.currentTarget && isOutsideContent(event)
      }}
      onClick={(event) => {
        if (backdropPointerDown.current && event.target === event.currentTarget && isOutsideContent(event)) {
          onClose()
        }
        backdropPointerDown.current = false
      }}
    >
      <div ref={contentRef} className="modal-content">
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Close project details"
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="eyebrow">Project details</p>
        <h2 id="project-modal-title">{project.title}</h2>
        <p className="modal-subtitle">{project.subtitle}</p>
        <div className="modal-meta">
          <span><CalendarDays size={15} aria-hidden="true" /> {project.year}</span>
          <span><Layers3 size={15} aria-hidden="true" /> {project.category}</span>
        </div>

        <p id="project-modal-overview">{project.details?.overview || project.description}</p>
        {project.details?.highlights?.length > 0 && (
          <ul className="modal-highlights">
            {project.details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        )}

        <div className="tags" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span className="tag" key={technology}>{technology}</span>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div className="modal-links">
            {project.github && (
              <a
                className="button button-primary"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              >
                <Github size={17} aria-hidden="true" /> View on GitHub
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.demo && (
              <a
                className="button button-secondary"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} live demo (opens in a new tab)`}
              >
                Live demo <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}
