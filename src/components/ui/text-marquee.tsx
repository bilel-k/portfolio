"use client"

import { motion } from "framer-motion"

interface TextMarqueeProps {
  text: string
  /** How many times to repeat the text */
  repeat?: number
  /** CSS class for the text */
  className?: string
  /** Animation duration in seconds */
  duration?: number
  /** Reverse direction */
  reverse?: boolean
}

/**
 * Infinite horizontal scrolling text — like a news ticker.
 * Renders the text multiple times to create a seamless loop.
 */
export function TextMarquee({
  text,
  repeat = 6,
  className = "",
  duration = 20,
  reverse = false,
}: TextMarqueeProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap select-none pointer-events-none">
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span
            key={i}
            className={`inline-block px-8 ${className}`}
            aria-hidden={i > 0}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/**
 * Multi-item marquee — accepts array of strings
 */
export function MultiMarquee({
  items,
  repeat = 4,
  className = "",
  duration = 25,
  reverse = false,
  separator = "•",
}: {
  items: string[]
  repeat?: number
  className?: string
  duration?: number
  reverse?: boolean
  separator?: string
}) {
  const fullText = items.join(` ${separator} `)

  return (
    <div className="overflow-hidden whitespace-nowrap select-none pointer-events-none">
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span
            key={i}
            className={`inline-block px-8 ${className}`}
            aria-hidden={i > 0}
          >
            {fullText}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
