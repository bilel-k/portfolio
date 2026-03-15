// src/app/parcours/page.tsx
"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, CalendarDays } from "lucide-react"
import { ScrambleText } from "@/components/ui/scramble-text"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function Experience() {
  const { t } = useLanguage()
  const { education, experiences } = t.experience

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="mb-20 md:text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{t.experience.title}<span className="gradient-text-animated">.</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          {t.experience.subtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
        {/* FORMATION COLUMN */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.experience.educationTitle}
            </h2>
          </div>
          
          <div className="space-y-12">
              {education.map((item, i) => (
              <motion.div variants={itemAnim} key={i} className="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-muted">
                <div className="md:hidden absolute -left-[1.1rem] top-1 p-2 bg-background border-2 border-primary rounded-full">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                
                <div className="glass-panel p-6 md:p-8 rounded-[2rem] shadow-sm card-hover hover:shadow-xl relative overflow-hidden group">
                  <div className="relative z-10 flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-border/50">
                      <Image 
                        src={i === 0 ? "/genevainstitute.jpg" : "/lycee.png"}
                        alt={item.school} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                      <div className="text-primary font-medium">{item.school}</div>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm font-semibold mb-4 text-secondary-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {item.date}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* EXPERIENCE COLUMN */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-muted">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {t.experience.experienceTitle}
            </h2>
          </div>
          
          <div className="space-y-12">
              {experiences.map((item, i) => (
              <motion.div variants={itemAnim} key={i} className="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-muted">
                <div className="md:hidden absolute -left-[1.1rem] top-1 p-2 bg-background border-2 border-primary rounded-full">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="glass-panel p-6 md:p-8 rounded-[2rem] card-hover hover:shadow-xl relative overflow-hidden group">
                  <div className="relative z-10 flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-border/50 p-1">
                      <Image 
                        src={item.logo} 
                        alt={item.company} 
                        fill 
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                      <div className="text-primary font-medium">{item.company}</div>
                      <div className="text-sm text-muted-foreground/80">{item.location}</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm font-semibold mb-4 text-secondary-foreground mt-2">
                    <CalendarDays className="h-4 w-4" />
                    {item.date}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
