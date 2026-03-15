"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Sparkles, Shield, Code2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { SectionReveal, ScrollDivider } from "@/components/ui/section-reveal"
import { MultiMarquee } from "@/components/ui/text-marquee"
import { HackerTerminal } from "@/components/ui/hacker-terminal"
import { useLanguage } from "@/components/language-provider"
import dynamic from "next/dynamic"
import Image from "next/image"

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10)
  const suffix = value.replace(/[0-9]/g, "")
  const { count, ref } = useCountUp(numeric)
  return (
      <div ref={ref} className="relative h-full flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 rounded-3xl glass-panel card-hover hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.28)] group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0" />
      <div className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-1 sm:mb-2 tracking-tight drop-shadow-sm">
        {count}{suffix}
      </div>
      <div className="relative z-10 text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-widest leading-tight">{label}</div>
    </div>
  )
}

function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="container mx-auto px-6 py-20 max-w-[1440px] animate-pulse">
      <div className="h-10 w-48 bg-muted rounded-2xl mb-10" />
      <div className="space-y-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded-xl" style={{ width: `${90 - i * 10}%` }} />
        ))}
      </div>
    </div>
  )
}

const About = dynamic(() => import("./a-propos/page"), { loading: () => <SectionSkeleton lines={4} /> })
const Projects = dynamic(() => import("./projets/page"), { loading: () => <SectionSkeleton lines={3} /> })
const Experience = dynamic(() => import("./parcours/page"), { loading: () => <SectionSkeleton lines={4} /> })
const Certifications = dynamic(() => import("./certifications/page"), { loading: () => <SectionSkeleton lines={2} /> })
const Objectifs = dynamic(() => import("./objectifs/page"), { loading: () => <SectionSkeleton lines={2} /> })
const Contact = dynamic(() => import("./contact/page"), { loading: () => <SectionSkeleton lines={3} /> })

function TypingAnimation({ roles }: { roles: readonly string[] }) {
  const [currentRole, setCurrentRole] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setCurrentRole(0)
    setText("")
    setIsDeleting(false)
  }, [roles])

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(role.slice(0, text.length + 1))
        if (text === role) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setText(role.slice(0, text.length - 1))
        if (text === "") {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentRole, roles])

  return (
    <span className="text-primary">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
    </span>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const stats = t.hero.stats
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
    }
  }

  const nameWords = ["Bilel", "Kaoulala"]

  return (
    <div className="flex flex-col w-full" id="top">
      <div className="relative overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-grid-pattern mask-radial-faded pointer-events-none opacity-40 mix-blend-overlay dark:opacity-20" />
        
        {/* Gradient orbs — static, no parallax */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div className="container mx-auto px-6 pt-10 sm:pt-20 pb-6 max-w-[1440px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-5xl mx-auto">
          {/* Left content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 glass-panel text-primary px-5 py-2 rounded-full text-sm font-semibold border border-border/40">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                {t.hero.available}
              </div>
            </motion.div>

            {/* Mobile-only profile photo — same card style as desktop */}
            <motion.div variants={itemVariants} className="flex justify-center lg:hidden">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-[2rem] glass-panel border border-border/30 shadow-2xl flex items-center justify-center p-2 group">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-card/80 border border-border/50">
                  <Image src="/profile.png" alt="Bilel Kaoulala" fill className="object-cover" sizes="(max-width: 640px) 176px, 208px" />
                </div>
                {/* Floating badges - static on mobile */}
                <div className="absolute -top-3 -right-3 p-2.5 rounded-xl glass-panel shadow-lg">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="absolute -bottom-3 -left-3 p-2.5 rounded-xl glass-panel shadow-lg">
                  <Code2 className="h-4 w-4 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <div className="overflow-hidden">
                <motion.p
                  className="text-base font-semibold tracking-[0.2em] text-muted-foreground uppercase"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {t.hero.subtitle}
                </motion.p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05]">
                <span className="flex flex-wrap gap-x-4">
                  {nameWords.map((word, wi) => (
                    <motion.span
                      key={wi}
                      className="text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground/50 drop-shadow-sm"
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.2 + wi * 0.12,
                        ease: [0.215, 0.61, 0.355, 1.0],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <div className="mt-2 text-2xl sm:text-3xl lg:text-5xl font-bold text-primary h-10 sm:h-12 flex items-center">
                  <TypingAnimation roles={t.hero.roles} />
                </div>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
              <span className="text-base text-muted-foreground font-medium">{t.hero.followMe}</span>
              <div className="h-px w-8 bg-border" />
              <div className="flex gap-3">
                {[
                  { Icon: Github, href: "https://github.com/bilel-k", label: "GitHub" },
                  { Icon: Linkedin, href: "https://linkedin.com/in/bilel-kaoulala", label: "LinkedIn" },
                  { Icon: Mail, href: "mailto:bilel@mail.com", label: "Email" },
                ].map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.55 + i * 0.07, ease: [0.215, 0.61, 0.355, 1.0] }}
                    whileHover={{ y: -3, scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Photo */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
          >
            {/* Main card */}
            <div className="relative w-80 h-80 rounded-[3rem] glass-panel border border-border/30 shadow-2xl flex items-center justify-center p-2 group hover:scale-[1.02] transition-transform duration-500">

              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-card/80 backdrop-blur-md border border-border/50">
                <Image src="/profile.png" alt="Bilel Kaoulala" fill className="object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-700" priority sizes="320px" />
              </div>
              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 p-3.5 rounded-2xl glass-panel shadow-xl shadow-black/5"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 p-3.5 rounded-2xl glass-panel shadow-xl shadow-black/5"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Code2 className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 p-3 rounded-xl glass-panel shadow-xl shadow-black/5"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-6 max-w-3xl mx-auto items-stretch">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AnimatedStat value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
        </motion.div>


      </div>

      {/* Terminal interactif */}
      <div className="py-4 border-y border-border/30 bg-muted/10 flex justify-center px-6">
        <div className="w-full max-w-2xl">
          <HackerTerminal />
        </div>
      </div>

      <ScrollDivider />
      <SectionReveal id="about" className="scroll-mt-20"><About /><div className="border-t border-border/20 my-2 mx-6 md:mx-20" /><Objectifs /></SectionReveal>
      <ScrollDivider />
      <SectionReveal id="projects" className="scroll-mt-20"><Projects /></SectionReveal>
      <ScrollDivider />
      <SectionReveal id="experience" className="scroll-mt-20"><Experience /><div className="border-t border-border/20 my-2 mx-6 md:mx-20" /><Certifications /></SectionReveal>
      <ScrollDivider />
      <SectionReveal id="contact" className="scroll-mt-20"><Contact /></SectionReveal>
    </div>
  )
}

