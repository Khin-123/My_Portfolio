import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Code2, Download, Github, GraduationCap, Heart, Linkedin, Mail, Phone } from 'lucide-react'
import { profile, education, skillGroups } from './data/profile'
import { projects } from './data/projects'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import SectionHeading from './components/SectionHeading'
import SkillIcon from './components/SkillIcon'
import HeroIllustration from './components/HeroIllustration'
import ProjectCard from './components/ProjectCard'
import ProjectModal from './components/ProjectModal'
import Achievements from './components/Achievements'

const categories = ['All projects', ...new Set(projects.map((project) => project.category))]
const hardwareCategories = new Set(['IoT/Embedded', 'Hardware', 'Electronics / Hardware'])
const orderedProjects = [...projects].sort((a, b) => Number(hardwareCategories.has(b.category)) - Number(hardwareCategories.has(a.category)))
const hasEducationValue = (value) => typeof value === 'string' && value.trim() && !/\[[^\]]*\]/.test(value)

function ContactItem({ icon: Icon, title, value, href, download }) {
  const content = <><span className="contact-icon"><Icon size={20} aria-hidden="true" /></span><span className="contact-item-copy"><span>{title}</span><strong>{value}</strong></span>{href && <ArrowUpRight size={19} className="contact-arrow" aria-hidden="true" />}</>
  return href ? <a className="contact-item" href={href} download={download} target={download || href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'} rel="noreferrer">{content}</a> : <div className="contact-item is-placeholder">{content}</div>
}

function App() {
  const [filter, setFilter] = useState('All projects')
  const [selectedProject, setSelectedProject] = useState(null)
  const visibleProjects = filter === 'All projects' ? orderedProjects : orderedProjects.filter((project) => project.category === filter)

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`
  }, [])

  return (
    <MotionConfig reducedMotion="user">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
            <div className="container">
              <div className="hero-layout grid items-center lg:grid-cols-2">
                <Reveal className="hero-copy">
                  <p className="student-badge"><span /> FINAL-YEAR IT STUDENT</p>
                  <p className="hello-text">Hello, I’m</p>
                  <h1 id="hero-title" className="hero-name">{profile.name}</h1>
                  <p className="hero-role">{profile.role}</p>
                  <p className="hero-introduction">{profile.introduction}</p>
                  <div className="hero-actions flex flex-wrap items-center gap-3">
                    <a href="#projects" className="button button-primary">View Projects<ArrowUpRight size={18} aria-hidden="true" /></a>
                    <a href="#contact" className="button button-secondary">Contact Me<ArrowRight size={17} aria-hidden="true" /></a>
                  </div>
                  <div className="hero-socials">
                    <span className="social-rule" />
                    {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)"><Github size={17} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>}
                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><Linkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a>}
                  </div>
                </Reveal>
                <Reveal className="hero-art" delay={0.12}><HeroIllustration /></Reveal>
              </div>
              <div className="hero-bottom"><a href="#projects"><span className="scroll-icon"><ArrowDown size={15} aria-hidden="true" /></span> EXPLORE MY WORK</a></div>
            </div>
          </section>

          <section id="projects" className="projects-section section-pad" aria-labelledby="projects-title" tabIndex={-1}>
            <div className="container">
              <Reveal className="projects-heading-row"><SectionHeading id="projects-title" title="Projects" description="IoT, embedded systems, electronics, and software projects." /><span className="project-total"><strong>{String(projects.length).padStart(2, '0')}</strong> projects<ArrowDown size={20} aria-hidden="true" /></span></Reveal>
              <div className="project-filters" role="group" aria-label="Filter projects by category">{categories.map((category) => <button key={category} type="button" className={filter === category ? 'is-active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category === 'IoT/Embedded' ? 'IoT & Embedded' : category}<span>{category === 'All projects' ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div>
              <p className="sr-only" role="status">Showing {visibleProjects.length} {filter === 'All projects' ? '' : filter} projects</p>
              <div className="projects-grid grid gap-7 md:grid-cols-2">{visibleProjects.map((project) => <Reveal key={project.id}><ProjectCard project={project} onViewDetails={setSelectedProject} /></Reveal>)}</div>
              {profile.github && <p className="more-projects">There’s always something in the works.<a href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub<ArrowUpRight size={16} aria-hidden="true" /></a></p>}
            </div>
          </section>

          <section id="skills" className="skills-section section-pad" aria-labelledby="skills-title" tabIndex={-1}>
            <div className="container">
              <Reveal><SectionHeading id="skills-title" title="My Skills" description="Microcontrollers, programming languages, and development tools." /></Reveal>
              <Reveal><div className="skill-subsections">{skillGroups.map((group, index) => (
                <section key={group.title} className="skill-subsection" aria-labelledby={`skill-group-${index}`}>
                  <h3 id={`skill-group-${index}`}>{group.title}</h3>
                  <ul className="skill-icon-grid" role="list">{group.skills.map((skill) => <li key={skill} className="skill-icon-tile"><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul>
                </section>
              ))}</div></Reveal>
            </div>
          </section>

          <section id="about" className="about-section section-pad" aria-labelledby="about-title" tabIndex={-1}>
            <div className="container about-layout grid gap-10 lg:grid-cols-2">
              <Reveal><SectionHeading id="about-title" title="About" /></Reveal>
              <Reveal delay={0.08}><div className="about-copy">{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal>
            </div>
          </section>

          <section id="education" className="education-section section-pad" aria-labelledby="education-title" tabIndex={-1}>
            <div className="container education-layout grid gap-10 lg:grid-cols-2">
              <Reveal><SectionHeading id="education-title" title="Education" description="Currently a final-year IT student." /></Reveal>
              <Reveal delay={0.08}><div className="education-card"><span className="education-icon"><GraduationCap size={28} strokeWidth={1.5} aria-hidden="true" /></span><div className="education-content"><span className="education-status"><span />{education.status}</span>{hasEducationValue(education.university) && <h3>{education.university}</h3>}{hasEducationValue(education.degree) && <p>{education.degree}</p>}{hasEducationValue(education.period) && <span className="education-period">{education.period}</span>}</div></div></Reveal>
            </div>
          </section>

          <Achievements />

          <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title" tabIndex={-1}>
            <div className="container contact-layout grid gap-12 lg:grid-cols-2">
              <Reveal><SectionHeading id="contact-title" title="Contact" /><p className="contact-description">Get in touch by email or explore my GitHub projects.</p>{profile.email ? <a href={`mailto:${profile.email}`} className="button button-primary">Say hello<Mail size={17} aria-hidden="true" /></a> : <p className="contact-placeholder-note">Email: [Your email address]</p>}</Reveal>
              <Reveal delay={0.08}><div className="contact-list"><ContactItem icon={Mail} title="Email" value={profile.email || '[Your email address]'} href={profile.email ? `mailto:${profile.email}` : null} />{profile.phone && <ContactItem icon={Phone} title="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} />}<ContactItem icon={Github} title="GitHub" value={profile.github ? new URL(profile.github).pathname.slice(1) : '[GitHub profile]'} href={profile.github} />{profile.linkedin && <ContactItem icon={Linkedin} title="LinkedIn" value="Let’s connect professionally" href={profile.linkedin} />}{profile.cvUrl && <ContactItem icon={Download} title="Curriculum vitae" value="Download CV" href={profile.cvUrl} download={profile.cvFileName} />}</div></Reveal>
            </div>
          </section>
        </main>
        <footer className="site-footer"><div className="container footer-inner"><a className="footer-brand" href="#home"><Code2 size={19} aria-hidden="true" />{profile.name}</a><p>© {new Date().getFullYear()} · Built with curiosity &<Heart size={12} aria-hidden="true" /><span className="sr-only">care</span></p><a className="back-to-top" href="#home">Back to top<ArrowUp size={15} aria-hidden="true" /></a></div></footer>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </MotionConfig>
  )
}

export default App
