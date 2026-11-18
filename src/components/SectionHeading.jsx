export default function SectionHeading({ id, title }) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
    </div>
  )
}
