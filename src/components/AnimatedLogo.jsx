import { useState } from 'react'
import { motion } from 'framer-motion'

const viewport = { once: true, amount: 0.6 }

export default function AnimatedLogo({ children, className = '' }) {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <motion.span
      className={className ? `animated-logo ${className}` : 'animated-logo'}
      data-logo-visible={hasEntered || undefined}
      viewport={viewport}
      onViewportEnter={hasEntered ? undefined : () => setHasEntered(true)}
    >
      {children}
    </motion.span>
  )
}
