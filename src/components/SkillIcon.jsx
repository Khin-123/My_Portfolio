import { Activity, CircuitBoard, Cpu, Wrench } from 'lucide-react'
import {
  SiArduino, SiC, SiCplusplus, SiEasyeda, SiGit, SiGithub, SiJavascript,
  SiNodedotjs, SiPlatformio, SiProteus, SiPython, SiReact, SiStmicroelectronics, SiTailwindcss,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const icons = {
  ESP32: { icon: Cpu, color: '#007ca6' },
  STM32: { icon: SiStmicroelectronics, color: '#03234b' },
  Arduino: { icon: SiArduino, color: '#00878f' },
  C: { icon: SiC, color: '#00599c' },
  'C++': { icon: SiCplusplus, color: '#00599c' },
  Python: { icon: SiPython, color: '#3776ab' },
  JavaScript: { icon: SiJavascript, color: '#b08900' },
  'PCB design': { icon: CircuitBoard, color: '#007861' },
  'Hardware testing': { icon: Activity, color: '#006b8f' },
  Proteus: { icon: SiProteus, color: '#2a5eaa' },
  EasyEDA: { icon: SiEasyeda, color: '#1765ef' },
  React: { icon: SiReact, color: '#0082a6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#00869b' },
  'Node.js': { icon: SiNodedotjs, color: '#48823a' },
  Git: { icon: SiGit, color: '#cf452b' },
  GitHub: { icon: SiGithub, color: '#181717' },
  PlatformIO: { icon: SiPlatformio, color: '#be5310' },
  'Arduino IDE': { icon: SiArduino, color: '#00878f' },
  'VS Code': { icon: VscVscode, color: '#007acc' },
}

export default function SkillIcon({ name }) {
  const { icon: Icon, color } = icons[name] ?? { icon: Wrench, color: 'currentColor' }

  return <Icon className="skill-technology-icon" size={20} color={color} aria-hidden="true" focusable="false" />
}
