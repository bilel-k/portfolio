"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MagicCardProps {
  children: ReactNode
  className?: string
  gradientColor?: string
}

export function MagicCard({ children, className, gradientColor }: MagicCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] group", className)}>
      <div className="absolute inset-[1px] z-0 rounded-[calc(2rem-1px)] bg-background/95 backdrop-blur-xl transition-colors duration-500 group-hover:bg-background/80" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
