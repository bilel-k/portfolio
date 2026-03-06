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
      <div 
        className="pointer-events-none absolute -inset-[1px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,hsl(var(--primary)_/_0.6)_50%,transparent_100%)] animate-[spin_3s_linear_infinite]" style={{ background: gradientColor ? `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${gradientColor} 50%, transparent 100%)` : undefined }} />
      </div>
      <div className="absolute inset-[1px] z-0 rounded-[calc(2rem-1px)] bg-background/95 backdrop-blur-xl transition-colors duration-500 group-hover:bg-background/80" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
