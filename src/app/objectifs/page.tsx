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
    <Crosshair key={3} className="w-6 h-6" />,
    <Code2 key={4} className="w-6 h-6" />,
    <Globe key={5} className="w-6 h-6" />,
    <Wrench key={6} className="w-6 h-6" />,
    <GraduationCap key={7} className="w-6 h-6" />,
  ]

  const goals = t.goals.items.map((item, i) => ({ ...item, icon: goalIcons[i] }))

  const sectionOrder = ["Court terme", "Moyen terme", "Long terme"] as const

  const groupedGoals = sectionOrder.map((timeframe) => ({
    timeframe,
    goals: goals.filter((goal) => goal.timeframe === timeframe),
  }))

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

      <div className="relative z-10">
        <div className="grid gap-6 xl:grid-cols-3">
          {groupedGoals.map((section, sectionIndex) => {
            const cfg = timeframeConfig[section.timeframe]
            const sectionLabel = t.goals.timeframes[section.timeframe]

            return (
              <motion.section
                key={section.timeframe}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: sectionIndex * 0.12, duration: 0.45, ease: "easeOut" }}
                className="glass-panel border border-border/50 rounded-[2rem] p-5 sm:p-6 md:p-7 relative overflow-hidden"
                style={{ borderColor: `${cfg.accent}22` }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-80"
                  style={{ background: `linear-gradient(90deg, ${cfg.accent}88 0%, transparent 100%)` }}
                />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span className={`inline-flex text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                      {sectionLabel}
                    </span>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground">
                      {sectionLabel}
                    </h2>
                  </div>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: cfg.bg, color: cfg.accent }}>
                    <Target className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  {section.goals.map((goal, goalIndex) => (
                    <motion.div
                      key={`${section.timeframe}-${goalIndex}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: goalIndex * 0.08, duration: 0.35, ease: "easeOut" }}
                      className="group relative overflow-hidden rounded-[1.4rem] border border-border/50 glass-panel card-hover p-5 sm:p-6"
                      style={{ borderColor: `${cfg.accent}1f` }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 30% 20%, ${cfg.accent}10 0%, transparent 70%)` }}
                      />

                      <div className="relative z-10 flex items-start gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ background: cfg.bg, color: cfg.accent }}
                        >
                          {goal.icon}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base font-bold mb-2 text-foreground leading-snug group-hover:text-primary transition-colors">
                            {goal.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

