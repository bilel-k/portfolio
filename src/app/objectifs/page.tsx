// src/app/objectifs/page.tsx
"use client"

import { motion } from "framer-motion"
import { Target, Rocket, Shield, Briefcase, Code2, Crosshair, Wrench, Globe, GraduationCap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Goals() {
  const { t } = useLanguage()

  const goalIcons = [
    <Shield key={0} className="w-6 h-6" />,
    <Briefcase key={1} className="w-6 h-6" />,
    <Rocket key={2} className="w-6 h-6" />,
    <Code2 key={3} className="w-6 h-6" />,
    <Crosshair key={4} className="w-6 h-6" />,
    <Wrench key={5} className="w-6 h-6" />,
    <Globe key={6} className="w-6 h-6" />,
    <GraduationCap key={7} className="w-6 h-6" />,
  ]

  const goals = t.goals.items.map((item, i) => ({ ...item, icon: goalIcons[i] }))

  const timeframeConfig: Record<string, { color: string; accent: string; bg: string; border: string }> = {
    "Court terme":  { color: "text-emerald-400", accent: "#10b981", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    "Moyen terme":  { color: "text-blue-400",    accent: "#3b82f6", bg: "bg-blue-500/10",    border: "border-blue-500/20"    },
    "Long terme":   { color: "text-violet-400",  accent: "#8b5cf6", bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{t.goals.title}<span className="gradient-text-animated">.</span></h1>
        <p className="text-xl text-muted-foreground">
          {t.goals.subtitle}
        </p>
      </motion.div>

      {/* Horizontal connector line (desktop) */}
      <div className="relative z-10">
        <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {goals.map((goal, index) => {
            const cfg = timeframeConfig[goal.timeframe]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                className="relative flex flex-col group"
              >
                {/* Step dot on timeline */}
                <div className="hidden lg:flex justify-center mb-6">
                  <div
                    className="w-[26px] h-[26px] rounded-full border-[3px] shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                    style={{ borderColor: cfg.accent, background: "var(--background)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-0"
                      style={{ background: cfg.accent }}
                    />
                    <span
                      className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ color: cfg.accent }}
                    >
                      <Target className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 glass-panel rounded-[1.5rem] p-6 border card-hover relative overflow-hidden group-hover:shadow-xl"
                  style={{
                    borderColor: `${cfg.accent}30`,
                    boxShadow: undefined,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 40px -12px ${cfg.accent}44`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                    style={{ background: `radial-gradient(ellipse at 30% 20%, ${cfg.accent}12 0%, transparent 70%)` }} />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: cfg.bg, color: cfg.accent }}
                  >
                    {goal.icon}
                  </div>

                  {/* Badge */}
                  <span
                    className={`relative z-10 inline-flex text-xs font-bold px-2.5 py-1 rounded-full border mb-3 ${cfg.color} ${cfg.bg} ${cfg.border}`}
                  >
                    {t.goals.timeframes[goal.timeframe]}
                  </span>

                  <h3 className="relative z-10 text-base font-bold mb-2 text-foreground leading-snug group-hover:text-primary transition-colors">
                    {goal.title}
                  </h3>
                  <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

