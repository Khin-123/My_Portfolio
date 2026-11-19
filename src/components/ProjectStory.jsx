import { useEffect, useRef, useState } from 'react'
import { AirVent, ArrowRight, Cloud, Cpu } from 'lucide-react'

const storyIcons = { cloud: Cloud, chip: Cpu, appliance: AirVent }
const storyMedia = '(min-width: 701px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)'

export default function ProjectStory({ steps }) {
  const detailsRef = useRef(null)
  const [activeStep, setActiveStep] = useState(null)

  useEffect(() => {
    const details = detailsRef.current
    const scrollArea = details.closest('.modal-content')
    if (!scrollArea) return undefined

    const media = window.matchMedia(storyMedia)
    const cards = Array.from(details.children)
    let frame = null

    function updateStep() {
      frame = null
      if (!media.matches) {
        setActiveStep(null)
        return
      }

      const area = scrollArea.getBoundingClientRect()
      const readingLine = area.top + area.height / 2
      const current = cards.findLastIndex((card) => card.getBoundingClientRect().top <= readingLine)
      setActiveStep(Math.max(0, current))
    }

    function scheduleUpdate() {
      if (frame === null) frame = window.requestAnimationFrame(updateStep)
    }

    // Font loading and dialog opening can change the scroll area without a scroll event.
    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(details)
    observer.observe(scrollArea)
    scrollArea.addEventListener('scroll', scheduleUpdate, { passive: true })
    media.addEventListener('change', scheduleUpdate)
    scheduleUpdate()

    return () => {
      observer.disconnect()
      scrollArea.removeEventListener('scroll', scheduleUpdate)
      media.removeEventListener('change', scheduleUpdate)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [steps])

  return (
    <div className="project-story-layout">
      <ol className="project-story-path" aria-hidden="true">
        {steps.map((step, index) => {
          const Icon = storyIcons[step.icon] ?? ArrowRight
          return (
            <li
              key={step.label}
              data-current={activeStep === index || undefined}
              data-reached={(activeStep !== null && index <= activeStep) || undefined}
            >
              <Icon size={20} />
              <span>{step.label}</span>
            </li>
          )
        })}
      </ol>
      <ol ref={detailsRef} className="project-story-details" role="list">
        {steps.map((step, index) => (
          <li key={step.label} aria-current={activeStep === index ? 'step' : undefined}>
            <p className="project-story-stage">{step.label}</p>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
