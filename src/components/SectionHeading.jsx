export default function SectionHeading({ id, title, description }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
