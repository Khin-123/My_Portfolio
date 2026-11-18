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
            {achievements.map(({ id, title, issuer, date, dateLabel, certificateUrl, paperTitle }) => {
              const details = (
                <>
                  <h3>{title}</h3>
                  <p className="achievement-meta">
                    {issuer}{date && <> · <time dateTime={date}>{dateLabel}</time></>}
                  </p>
                </>
              )

              return (
                <li key={id} id={id} tabIndex={-1} className="achievement-item">
                  {certificateUrl ? (
                    <ImagePreview
                      className="achievement-summary"
                      src={certificateUrl}
                      title={title}
                      alt={`Certificate for ${title}`}
                      label={`View certificate for ${title}`}
                    >
                      {details}
                      <Maximize2 className="achievement-preview-icon" size={17} aria-hidden="true" />
                    </ImagePreview>
                  ) : (
                    <div className="achievement-summary">{details}</div>
                  )}
                  {paperTitle && <p className="achievement-paper">Presented “{paperTitle}.”</p>}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
