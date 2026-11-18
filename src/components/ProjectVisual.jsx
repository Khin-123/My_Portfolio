import { ArrowRight } from 'lucide-react'

export default function ProjectVisual({ evidence }) {
  if (!evidence) return null

  return (
    <figure className="project-evidence">
      <figcaption>{evidence.label}</figcaption>
      {evidence.steps && (
        <ol className="evidence-steps" role="list">
          {evidence.steps.map((step, index) => (
            <li key={step}>
              {index > 0 && <ArrowRight size={13} aria-hidden="true" />}
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
      {evidence.readings && (
        <dl className="evidence-readings">
          {evidence.readings.map(({ value, label }) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      )}
      {evidence.image && (
        <img src={evidence.image.src} alt={evidence.image.alt} width={evidence.image.width} height={evidence.image.height} loading="lazy" />
      )}
      {evidence.video && (
        <video controls preload="none" playsInline aria-label={evidence.video.label} src={evidence.video.src}>
          {evidence.video.captions && <track kind="captions" src={evidence.video.captions} srcLang="en" label="English" />}
          <a href={evidence.video.src}>Download the demo video</a>
        </video>
      )}
      {evidence.audio && (
        <div className="evidence-audio">
          {evidence.audio.map(({ src, label }) => (
            <div key={src}>
              <p>{label}</p>
              <audio controls preload="none" src={src} aria-label={label}><a href={src}>Download {label.toLowerCase()}</a></audio>
            </div>
          ))}
        </div>
      )}
      {evidence.caption && <p className="evidence-caption">{evidence.caption}</p>}
    </figure>
  )
}
