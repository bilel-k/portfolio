"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&"

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  trigger?: "inview" | "mount"
}

export function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 1200,
  trigger = "inview",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  const scramble = () => {
    if (started.current) return
    started.current = true
    const total = text.length
    const stepTime = duration / (total * 3)
    let frame = 0

    const interval = setInterval(() => {
      const revealed = Math.floor(frame / 3)
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < revealed) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )
      frame++
      if (revealed >= total) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, stepTime)
  }

  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(scramble, delay)
      return () => clearTimeout(t)
    }

    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(scramble, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {display}
    </span>
  )
}
