import { useEffect, useRef } from 'react'
import { ArrowUpRight, Github, X } from 'lucide-react'
import ProjectVisual from './ProjectVisual'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const backdropPointerDown = useRef(false)
  const linkedSection = useRef(null)

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

      if (linkedSection.current) {
        linkedSection.current.focus({ preventScroll: true })
        linkedSection.current = null
      } else if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true })
      } else {
        document.querySelector(`.project-link[href="#project-${project.id}"]`)?.focus({ preventScroll: true })
      }
    }
  }, [project])

  if (!project) return null

  const relatedLink = project.details.relatedLink

  return (
    <dialog
      key={project.id}
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-overview"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (backdropPointerDown.current && event.target === event.currentTarget) onClose()
        backdropPointerDown.current = false
      }}
    >
      <div className="modal-shell">
        <header className="modal-header">
          <h2 id="project-modal-title">{project.title}</h2>
          <button ref={closeRef} type="button" className="modal-close" aria-label="Close project details" onClick={onClose}>
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="modal-content" tabIndex={0} role="region" aria-label="Case study content">
          <div className="project-meta"><span>{project.specialty || project.category}</span><span>{project.year}</span></div>
          <p id="project-modal-overview">{project.details.overview}</p>

          {(project.contribution || project.verification) && (
            <dl className="project-facts">
              {project.contribution && <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>}
              {project.verification && <div><dt>How I verified it</dt><dd>{project.verification}</dd></div>}
            </dl>
          )}
          <ProjectVisual evidence={project.evidence} />
          {project.details.highlights && (
            <ul className="modal-highlights">
              {project.details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          )}

          <ul className="tags" role="list" aria-label="Technologies used">
            {project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
          </ul>

          {(project.github || project.demo || relatedLink) && (
            <div className="modal-links">
              {relatedLink && (
                <a className="button button-primary" href={relatedLink.href} target={relatedLink.href.startsWith('https:') ? '_blank' : undefined} rel="noreferrer"
                  onClick={(event) => {
                    if (relatedLink.href.startsWith('#') && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                      linkedSection.current = document.getElementById(relatedLink.href.slice(1))
                    }
                  }}>
                  {relatedLink.label} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub (opens in a new tab)`}>
                  <Github size={17} aria-hidden="true" /> View on GitHub
                </a>
              )}
              {project.demo && (
                <a className="button button-secondary" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} (opens in a new tab)`}>
                  Open app <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}
