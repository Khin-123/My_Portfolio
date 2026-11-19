import { Maximize2 } from 'lucide-react'
import { achievements } from '../data/achievements'
import ImagePreview from './ImagePreview'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad" aria-labelledby="achievements-title" tabIndex={-1}>
      <div className="container">
        <Reveal className="achievements-panel">
          <SectionHeading id="achievements-title" title="Achievements & Certifications" />
          <ul className="achievements-list" role="list">
            {achievements.map(({ id, title, issuer, date, dateLabel, certificateUrl, paperTitle }) => (
              <li key={id} id={id} tabIndex={-1} className="achievement-item">
                <div className="achievement-heading">
                  <h3>
                    {certificateUrl ? (
                      <a className="achievement-link" href={certificateUrl} target="_blank" rel="noreferrer">{title}</a>
                    ) : title}
                  </h3>
                  {(date || certificateUrl) && (
                    <div className="achievement-date-group">
                      {date && <time className="achievement-date" dateTime={date}>{dateLabel}</time>}
                      {certificateUrl && (
                        <ImagePreview
                          className="achievement-preview-link"
                          src={certificateUrl}
                          title={title}
                          alt={`Certificate for ${title}`}
                          label={`View certificate for ${title}`}
                        >
                          <Maximize2 size={17} aria-hidden="true" />
                        </ImagePreview>
                      )}
                    </div>
                  )}
                </div>
                <p className="achievement-meta">{issuer}</p>
                {paperTitle && <p className="achievement-paper">Presented “{paperTitle}.”</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
