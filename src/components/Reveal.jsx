import { useEffect } from 'react'
import { useAnimate, useInView, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  const [scope, animate] = useAnimate()
  const inView = useInView(scope, { once: true, amount: 0.12 })

  useEffect(() => {
    if (!inView || reduceMotion) return undefined
    const animation = animate(scope.current, { opacity: [0, 1], y: [18, 0] }, {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => animation.stop()
  }, [animate, delay, inView, reduceMotion, scope])

  return (
    <div
      ref={scope}
      className={className}
      style={{ opacity: reduceMotion ? 1 : 0 }}
    >
      {children}
    </div>
  )
}
