import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { education } from '../data/profile'
import AnimatedLogo from './AnimatedLogo'
import Reveal from './Reveal'

const rotationInterval = 3000

function EducationCarousel({ photos }) {
  const carouselRef = useRef(null)
  const swipeStart = useRef(null)
  const isInView = useInView(carouselRef, { amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [manual, setManual] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const rotating = !manual && !reduceMotion && isInView && !hovered && !keyboardFocused && pageVisible

  useEffect(() => {
    function updateVisibility() {
      setPageVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (!rotating) return undefined
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % photos.length)
    }, rotationInterval)
    return () => window.clearTimeout(timer)
  }, [activeIndex, photos.length, rotating])

  function selectPhoto(index) {
    if (index === activeIndex) return
    setManual(true)
    setActiveIndex(index)
  }

  function startSwipe(event) {
    if (!event.isPrimary || event.button !== 0) return
    swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function finishSwipe(event) {
    const start = swipeStart.current
    if (start?.id !== event.pointerId) return
    swipeStart.current = null
    const distance = event.clientX - start.x
    const verticalDistance = event.clientY - start.y
    if (Math.abs(distance) < 40 || Math.abs(distance) <= Math.abs(verticalDistance)) return
    const step = distance < 0 ? 1 : -1
    selectPhoto((activeIndex + step + photos.length) % photos.length)
  }

  return (
    <div
      ref={carouselRef}
      className="education-carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="University photos"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true) }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => setKeyboardFocused(event.target.matches(':focus-visible'))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false)
      }}
    >
      <div
        className="education-carousel-slides"
        aria-live={rotating ? 'off' : 'polite'}
        onPointerDown={startSwipe}
        onPointerUp={finishSwipe}
        onLostPointerCapture={(event) => {
          if (swipeStart.current?.id === event.pointerId) swipeStart.current = null
        }}
      >
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className={photo.logo ? 'education-carousel-slide education-carousel-slide-logo' : 'education-carousel-slide'}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photos.length}`}
            aria-hidden={index !== activeIndex}
          >
            {photo.logo ? (
              <AnimatedLogo className="education-logo-frame">
                <img src={photo.src} alt={photo.alt} width={1324} height={556} loading="lazy" decoding="async" draggable={false} />
              </AnimatedLogo>
            ) : (
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable={false} />
            )}
          </figure>
        ))}
      </div>
      <div className="education-carousel-dots" role="group" aria-label="Choose a university photo">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className="education-carousel-dot"
            aria-label={`Show ${photo.label}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => selectPhoto(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" aria-label="Education" tabIndex={-1}>
      <Reveal>
        <div className="education-card">
          <div className="education-details">
            <h3>{education.degree}</h3>
            <p>{education.university}</p>
            <p>{education.period} · {education.status}</p>
            {education.expectedGraduation && <p>Expected graduation: {education.expectedGraduation}</p>}
          </div>
          <EducationCarousel photos={education.photos} />
        </div>
      </Reveal>
    </section>
  )
}
