import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import AnimatedLogo from './AnimatedLogo'

const links = ['Home', 'Projects', 'Skills', 'About', 'Achievements', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const toggleRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main > section[id]'))
    let frame = null
    function updateActive() {
      frame = null
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const currentSection = atBottom ? sections.at(-1) : sections.findLast((section) => {
        const anchorOffset = parseFloat(getComputedStyle(section).scrollMarginTop)
        return section.getBoundingClientRect().top <= anchorOffset + 1
      })
      setActive(currentSection?.id || 'home')
    }
    function scheduleUpdate() {
      if (frame === null) frame = window.requestAnimationFrame(updateActive)
    }
    updateActive()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onPointerDown(event) {
      if (!navRef.current?.contains(event.target)) setOpen(false)
    }
    function onResize() {
      if (toggleRef.current?.getClientRects().length === 0) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="site-header" ref={navRef}>
      <nav className="container nav-inner" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label={`${profile.name} — home`} onClick={() => setOpen(false)}>
          <AnimatedLogo className="brand-icon"><Code2 size={21} aria-hidden="true" /></AnimatedLogo>
          <span>{profile.name}</span>
        </a>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open} aria-controls="navigation-links" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
        <div id="navigation-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((label) => {
            const id = label.toLowerCase()
            return (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
                className={`${active === id ? 'active' : ''} ${id === 'contact' ? 'nav-contact' : ''}`}
                onClick={() => setOpen(false)}>
                {label}{id === 'contact' && <ArrowUpRight size={15} aria-hidden="true" />}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
