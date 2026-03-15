"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  onClick?: () => void
}

export function SpotlightCard({ children, className, onClick }: SpotlightCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
    </div>
  )
}
