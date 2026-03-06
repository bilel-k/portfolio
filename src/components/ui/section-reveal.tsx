"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  /** Section id for navigation */
  id?: string
}

/**
 * Wraps a section with scroll-driven reveal:
 * - Fade + slide up from below
 * - Uses `whileInView` with a single trigger (once)
 */
export function SectionReveal({ children, className, id }: SectionRevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Horizontal scroll-driven divider line
 */
export function ScrollDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div ref={ref} className="relative py-12 md:py-20 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ scaleX }}
        className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-border to-transparent origin-center"
      />
    </div>
  )
}
