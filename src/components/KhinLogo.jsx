import AnimatedLogo from './AnimatedLogo'

export default function KhinLogo() {
  return (
    <AnimatedLogo className="khin-logo">
      <svg viewBox="0 0 76 36" width="76" height="36" aria-hidden="true" focusable="false">
        <path className="khin-logo-plate" d="M7.5 1.5h56l11 11v16a6 6 0 0 1-6 6h-56l-11-11v-16a6 6 0 0 1 6-6Z" />
        <g className="khin-logo-letters">
          <path pathLength="1" d="M12.5 22V10m8.5 0-8.5 7m2.8-2.3L21 22" />
          <path pathLength="1" d="M27 22V10m8.5 0v12M27 16h8.5" />
          <path pathLength="1" d="M41 10h6m-3 0v12m-3 0h6" />
          <path pathLength="1" d="M53 22V10l10 12V10" />
        </g>
        <path className="khin-logo-trace" d="M12.5 27.5H63" />
        <path className="khin-logo-signal" pathLength="1" d="M12.5 27.5H63" />
        <circle className="khin-logo-terminal" cx="63" cy="27.5" r="1.7" />
      </svg>
    </AnimatedLogo>
  )
}
