import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { ArrowDown, ArrowUp, ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { profile, skillGroups } from './data/profile'
import { projectCategories, projects } from './data/projects'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import SectionHeading from './components/SectionHeading'
import HeroIllustration from './components/HeroIllustration'
import ProjectCard from './components/ProjectCard'
import ProjectModal from './components/ProjectModal'
import Achievements from './components/Achievements'
import SkillIcon from './components/SkillIcon'
import AnimatedLogo from './components/AnimatedLogo'
import Education from './components/Education'
import KhinLogo from './components/KhinLogo'

const projectsById = new Map(projects.map((project) => [project.id, project]))

function getProjectFromHash() {
  const hash = window.location.hash
  return hash.startsWith('#project-') ? projectsById.get(hash.slice('#project-'.length)) : null
}

function DownloadCv() {
  return profile.cvUrl && (
    <a href={profile.cvUrl} className="button button-secondary" download={profile.cvFileName}>
      Download CV <Download size={18} aria-hidden="true" />
    </a>
  )
}

function ContactLink({ icon: Icon, title, value, href, external = false, branded = false }) {
  const icon = <Icon size={20} aria-hidden="true" />

  return (
    <a className="contact-item" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <span className="contact-icon">{branded ? <AnimatedLogo>{icon}</AnimatedLogo> : icon}</span>
      <span className="contact-item-copy"><strong>{title}</strong>{value && <span>{value}</span>}</span>
      <ArrowUpRight size={18} className="contact-arrow" aria-hidden="true" />
    </a>
  )
}

function App() {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  const projectCountLabel = visibleProjects.length === 1 ? 'project' : 'projects'

  useEffect(() => {
    const initialHash = window.location.hash
    let mounted = true

    function syncProject() {
      setSelectedProject(getProjectFromHash() ?? null)
    }

    if (initialHash) {
      const sectionId = getProjectFromHash() ? 'projects' : initialHash.slice(1)
      const target = document.getElementById(sectionId)
      target?.scrollIntoView({ behavior: 'instant' })

      // The heading font can change section heights after the first fragment scroll.
      document.fonts.ready.then(() => {
        if (mounted && window.location.hash === initialHash) {
          target?.scrollIntoView({ behavior: 'instant' })
        }
      })
    }
    syncProject()
    window.addEventListener('hashchange', syncProject)
    return () => {
      mounted = false
      window.removeEventListener('hashchange', syncProject)
    }
  }, [])

  function openProject(event, projectId) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    window.history.pushState({ portfolioProject: true }, '', event.currentTarget.hash)
    setSelectedProject(projectsById.get(projectId))
  }

  function closeProject() {
    if (window.history.state?.portfolioProject) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', '#projects')
      setSelectedProject(null)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
          <HeroIllustration />
          <div className="container hero-layout">
            <Reveal className="hero-copy">
              <h1 id="hero-title">{profile.name}</h1>
              <p className="hero-introduction">{profile.introduction}</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">View my work <ArrowDown size={18} aria-hidden="true" /></a>
                <a href="#contact" className="button button-secondary">Contact me <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
              <ul className="hero-links" role="list">
                {profile.github && (
                  <li><a href={profile.github} target="_blank" rel="noreferrer"><AnimatedLogo><Github size={17} aria-hidden="true" /></AnimatedLogo> GitHub</a></li>
                )}
                {profile.linkedin && (
                  <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><AnimatedLogo><Linkedin size={17} aria-hidden="true" /></AnimatedLogo> LinkedIn</a></li>
                )}
                <li><a href="#ieee-conference-2026">ICAIT 2026 research <ArrowDown size={17} aria-hidden="true" /></a></li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="projects-section section-pad" aria-labelledby="projects-title" tabIndex={-1}>
          <div className="container">
            <Reveal><SectionHeading id="projects-title" title="Projects" /></Reveal>
            <div className="project-filters" role="group" aria-label="Filter projects by category">
              {projectCategories.map((category) => (
                <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                  {category}
                </button>
              ))}
            </div>
            <p className="sr-only" role="status">
              Showing {visibleProjects.length} {projectCountLabel}{filter === 'All' ? '' : ` in ${filter}`}.
            </p>
            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <Reveal key={project.id} className={project.category === 'Software' ? '' : 'featured-project'}>
                  <ProjectCard project={project} onViewDetails={openProject} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section section-pad" aria-labelledby="skills-title" tabIndex={-1}>
          <div className="container">
            <Reveal><SectionHeading id="skills-title" title="Skills" /></Reveal>
            <Reveal>
              <div className="skill-subsections">
                {skillGroups.map((group, index) => (
                  <section key={group.title} className="skill-subsection" aria-labelledby={`skill-group-${index}`}>
                    <h3 id={`skill-group-${index}`}>{group.title}</h3>
                    <ul className="skill-list" role="list">
                      {group.skills.map((skill) => (
                        <li key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="section-pad" aria-labelledby="about-title" tabIndex={-1}>
          <div className="container about-layout">
            <Reveal>
              <SectionHeading id="about-title" title="About" />
              <div className="about-copy">{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </Reveal>
            <Education />
          </div>
        </section>

        <Achievements />

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="container contact-layout">
            <Reveal>
              <SectionHeading id="contact-title" title="Contact" />
              <p className="contact-description">{profile.jobTarget} {profile.availability}</p>
              <div className="hero-actions">
                {profile.email && <a href={`mailto:${profile.email}`} className="button button-primary">Email me <Mail size={18} aria-hidden="true" /></a>}
                <DownloadCv />
              </div>
            </Reveal>
            <Reveal>
              <div className="contact-list">
                {profile.phone && <ContactLink icon={Phone} title="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} />}
                {profile.github && <ContactLink icon={Github} title="GitHub" value={profile.githubLabel} href={profile.github} external branded />}
                {profile.linkedin && <ContactLink icon={Linkedin} title="LinkedIn" href={profile.linkedin} external branded />}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="footer-brand" href="#home"><KhinLogo />{profile.name}</a>
          <p>© 2026 {profile.name}</p>
          <a className="back-to-top" href="#home">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={closeProject} />
    </MotionConfig>
  )
}

export default App
