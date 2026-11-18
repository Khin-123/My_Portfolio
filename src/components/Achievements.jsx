import { ArrowUpRight, Award, BookOpen, Languages } from 'lucide-react'
import { achievements } from '../data/achievements'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Achievements() {
  return (
    <section id="achievements" className="achievements-section section-pad" aria-labelledby="achievements-title" tabIndex={-1}>
      <div className="container">
        <Reveal><SectionHeading id="achievements-title" title="Achievements & Certifications" /></Reveal>
        <Reveal><ul className="achievements-list" role="list">{achievements.map((achievement) => {
          const Icon = achievement.paperTitle ? BookOpen : achievement.category === 'Language Certification' ? Languages : Award
          return (
            <li key={achievement.id} className="achievement-item">
              <Icon className="achievement-icon" size={24} aria-hidden="true" />
              <div className="achievement-copy">
                <p className="achievement-category">{achievement.category}</p>
                <h3>{achievement.title}</h3>
                {achievement.date && achievement.dateLabel && <p className="achievement-date"><time dateTime={achievement.date}>{achievement.dateLabel}</time></p>}
                {achievement.paperTitle && <p className="achievement-paper"><span>Paper:</span> {achievement.paperTitle}</p>}
                {achievement.certificateUrl ? <a className="achievement-certificate" href={achievement.certificateUrl} target="_blank" rel="noreferrer" aria-label={`View certificate for ${achievement.title} (opens in a new tab)`}>View certificate<ArrowUpRight size={15} aria-hidden="true" /></a> : <p className="achievement-certificate-placeholder">Certificate not added yet</p>}
              </div>
            </li>
          )
        })}</ul></Reveal>
      </div>
    </section>
  )
}
