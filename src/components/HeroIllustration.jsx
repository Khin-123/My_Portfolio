import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function HeroIllustration() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const portraitOffset = useTransform(scrollY, [0, 480], ['0px', '20px'])

  return (
    <motion.figure className="hero-portrait" style={{ '--hero-parallax-offset': portraitOffset }}>
      <motion.img
        src="/images/hero-portrait.webp"
        width="1672"
        height="941"
        alt="Khin Thida Hnin"
        fetchPriority="high"
        initial={reduceMotion ? false : { scale: 1.045 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.figure>
  )
}
