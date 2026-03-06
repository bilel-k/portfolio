"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, ArrowLeft, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const GLITCH_CHARS = "!@#$%^&*<>[]{}|01"

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let iterations = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iterations) return text[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join("")
      )
      if (iterations >= text.length) clearInterval(interval)
      iterations += 0.5
    }, 40)
    return () => clearInterval(interval)
  }, [text])

  return <span className="font-mono">{display}</span>
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
            <div className="relative p-6 bg-card border rounded-2xl">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* 404 */}
        <motion.div
          className="text-[120px] sm:text-[160px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-primary/20 mb-2 select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.div>

        {/* Terminal-style message */}
        <motion.div
          className="bg-card/80 border rounded-xl px-6 py-4 mb-8 font-mono text-sm text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span className="text-xs">terminal</span>
          </div>
          <p className="text-primary">
            $ <GlitchText text="access --path /unknown" />
          </p>
          <p className="text-destructive mt-1">ERROR: Route not found [403/404]</p>
          <p className="text-muted-foreground mt-1">{">"} Redirecting to safe zone...</p>
        </motion.div>

        <motion.p
          className="text-muted-foreground mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Cette page n&apos;existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button asChild size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-primary/20 group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
