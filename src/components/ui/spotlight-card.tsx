"use client"

import { useRef, MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  onClick?: () => void
}

export function SpotlightCard({ children, className, spotlightColor, onClick }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const spot = spotRef.current
    if (!card || !spot) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spot.style.left = `${x}px`
    spot.style.top = `${y}px`
    spot.style.opacity = "1"
  }

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Spotlight layer */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          opacity: 0,
          background: spotlightColor ?? "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Magic Border Beam */}
      <div className="magic-border z-50" />
      {children}
    </div>
  )
}
