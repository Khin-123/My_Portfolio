import { Cpu } from 'lucide-react'
import { SiArduino, SiC, SiCplusplus, SiCss, SiFirebase, SiGit, SiGithub, SiHtml5, SiJavascript, SiNodedotjs, SiPlatformio, SiPython, SiReact, SiStmicroelectronics, SiTailwindcss } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const icons = {
  ESP32: { icon: Cpu, color: '#007ca6' },
  Arduino: { icon: SiArduino, color: '#00878f' },
  STM32: { icon: SiStmicroelectronics, color: '#03234b' },
  'Arduino IDE': { icon: SiArduino, color: '#00878f' },
  PlatformIO: { icon: SiPlatformio, color: '#f5822a' },
  Python: { icon: SiPython, color: '#3776ab' },
  C: { icon: SiC, color: '#00599c' },
  'C++': { icon: SiCplusplus, color: '#00599c' },
  'C/C++': { icon: SiCplusplus, color: '#00599c' },
  JavaScript: { icon: SiJavascript, color: '#e0b800' },
  HTML: { icon: SiHtml5, color: '#e34f26' },
  CSS: { icon: SiCss, color: '#663399' },
  React: { icon: SiReact, color: '#149eca' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06b6d4' },
  'Node.js': { icon: SiNodedotjs, color: '#5fa04e' },
  Firebase: { icon: SiFirebase, color: '#dd7a00' },
  Git: { icon: SiGit, color: '#f05032' },
  GitHub: { icon: SiGithub, color: '#181717' },
  'VS Code': { icon: VscVscode, color: '#007acc' },
}

export default function SkillIcon({ name }) {
  const { icon: Icon, color } = icons[name] || icons.ESP32
  return <Icon className="skill-technology-icon" size={28} color={color} aria-hidden="true" focusable="false" />
}
