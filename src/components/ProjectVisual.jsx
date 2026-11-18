import { Activity, AudioLines, ChartSpline, CircuitBoard, Code2, Cpu, Music2 } from 'lucide-react'

function Greenhouse() {
  return (
    <div className="art art-greenhouse">
      <svg className="greenhouse-svg" viewBox="0 0 440 230" fill="none">
        <ellipse cx="222" cy="209" rx="144" ry="12" fill="#d6e7df" />
        <path d="M107 111 217 38l116 73v91H107z" fill="#fff" fillOpacity=".65" stroke="#7da99a" strokeWidth="2" />
        <path d="M217 38v164M107 111h226M160 77v125M275 75v127M107 157h226" stroke="#a4c5b7" strokeWidth="1.5" />
        <path d="M92 112 217 28l130 84" stroke="#4f8472" strokeWidth="5" strokeLinecap="round" />
        <path d="M194 202v-65h47v65" fill="#deeee5" stroke="#7da99a" strokeWidth="2" />
        <path d="M134 191v-38m0 22c-18 0-21-15-21-15 17-5 21 15 21 15m0-13c15 0 20-17 20-17-15-4-20 17-20 17M302 191v-38m0 22c-18 0-21-15-21-15 17-5 21 15 21 15m0-13c15 0 20-17 20-17-15-4-20 17-20 17" stroke="#4a9277" fill="#8fbea2" strokeWidth="2" />
        <path d="M124 188h21l-3 15h-15zm168 0h21l-3 15h-15z" fill="#89afa0" />
        <circle cx="350" cy="47" r="18" fill="#e3ecce" />
        <path d="M350 20v-5m0 64v-5m-32-27h-5m74 0h-5m-55-23-4-4m54 54-4-4m0-46 4-4m-54 54 4-4" stroke="#abc086" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Music() {
  const bars = [12, 22, 34, 20, 42, 58, 32, 70, 43, 28, 52, 76, 46, 62, 34, 52, 24, 40, 28, 16]
  return (
    <div className="art art-music">
      <div className="music-orbit orbit-one" /><div className="music-orbit orbit-two" />
      <div className="album-art"><Music2 size={58} strokeWidth={1.2} /></div>
      <div className="sound-wave">{bars.map((height, i) => <span key={i} style={{ height: `${height}px` }} />)}</div>
    </div>
  )
}

function Remote() {
  return (
    <div className="art art-remote">
      <svg className="remote-lines" viewBox="0 0 440 230" fill="none">
        <path d="M93 119h75m104 0h75M220 45v25m0 100v25" stroke="#b9cbee" strokeWidth="1.5" strokeDasharray="5 5" />
        <circle cx="93" cy="119" r="23" fill="#fff" stroke="#d7e2f5" />
        <circle cx="347" cy="119" r="23" fill="#fff" stroke="#d7e2f5" />
        <path d="M83 118h20m-17-5h14m-10 10h6m241-10 10 14 10-14m-17 0h14" stroke="#7e9fd1" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="remote-device"><span className="remote-led" /><span className="remote-power">⏻</span><div className="remote-dpad"><span>+</span><span className="remote-center" /><span>−</span></div><div className="remote-buttons">{[0,1,2,3,4,5].map((i) => <i key={i} />)}</div></div>
    </div>
  )
}

function Health() {
  return (
    <div className="art art-health">
      <div className="health-ring ring-one" /><div className="health-ring ring-two" />
      <div className="health-symbol"><Activity size={76} strokeWidth={1.3} /></div>
      <svg className="health-line" viewBox="0 0 440 230" fill="none"><path d="M0 147h105l14-19 17 44 24-81 23 56h73l17-30 15 49 20-73 22 54h110" stroke="#66aaa9" strokeWidth="2" opacity=".38" /></svg>
    </div>
  )
}

function TechnicalVisual({ icon: Icon, title }) {
  return <div className="art art-fallback"><Icon size={90} strokeWidth={1} /><span>{title}</span></div>
}

function Audio() {
  return <TechnicalVisual icon={AudioLines} title="Audio & signal processing" />
}

function Modeling() {
  return <TechnicalVisual icon={ChartSpline} title="Mathematical modeling" />
}

function Circuit() {
  return <TechnicalVisual icon={CircuitBoard} title="Voltage protection & circuit design" />
}

const visuals = { greenhouse: Greenhouse, music: Music, remote: Remote, health: Health, audio: Audio, modeling: Modeling, circuit: Circuit }

export default function ProjectVisual({ project }) {
  if (project.image) return <img className="project-image" src={project.image} alt={project.imageAlt || `${project.title} project preview`} loading="lazy" />
  const Visual = visuals[project.visual]
  return <div aria-hidden="true">{Visual ? <Visual /> : <div className="art art-fallback"><Code2 size={72} strokeWidth={1} /><Cpu size={28} /></div>}</div>
}
