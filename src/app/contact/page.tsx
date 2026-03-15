// src/app/contact/page.tsx
"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Phone, Send, CheckCircle2, Loader2, Copy, Check, CarFront, Globe } from "lucide-react"
import emailjs from '@emailjs/browser'
import { useToast } from "@/components/ui/toast"
import { useLanguage } from "@/components/language-provider"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeZone, setActiveZone] = useState<number | null>(null)
  const [hoveredZone, setHoveredZone] = useState<number | null>(null)
  const { toast } = useToast()
  const { t } = useLanguage()
  const tc = t.contact

  const mobilityZones = tc.zones.map((z, i) => ({ ...z, id: i + 1, icon: i === 0 ? <MapPin className="h-5 w-5" /> : i === 1 ? <CarFront className="h-5 w-5" /> : <Globe className="h-5 w-5" /> }))

  const copyEmail = async () => {
    await navigator.clipboard.writeText("bilel@mail.com")
    setCopied(true)
    toast(tc.emailCopied, "info")
    setTimeout(() => setCopied(false), 2500)
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs.sendForm(
      'service_9vimkl2', 
      'template_75m1luh', 
      formRef.current!, 
      'OJ4mCUhQ5rk_pU5qo'
    )
    .then(() => {
      setIsSuccess(true)
      formRef.current?.reset()
      toast(tc.successSend, "success")
      setTimeout(() => setIsSuccess(false), 5000)
    })
    .catch((error) => {
      toast(tc.sendErrorMsg, "error")
      console.error('FAILED...', error.text)
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  }

  const containerParams = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemParams = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="mb-20 md:text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{tc.title}<span className="gradient-text-animated">.</span></h1>
        <p className="text-xl text-muted-foreground">
          {tc.subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={containerParams} 
        initial="hidden" 
        whileInView="show" viewport={{ once: true, margin: "-100px" }} 
        className="grid md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemParams} className="md:col-span-1 space-y-6">
          <div className="glass-panel border rounded-[2rem] p-8 card-hover hover:shadow-xl relative overflow-hidden group">
             <h3 className="relative z-10 text-xl font-bold mb-6 flex items-center gap-2">
               {tc.coordTitle}
             </h3>
             <div className="space-y-6">
                <div className="flex items-center gap-2">
                <a href="mailto:bilel@mail.com" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors flex-1">
                  <div className="p-2.5 bg-muted/60 rounded-xl group-hover:bg-primary/[0.08] transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[15px]">bilel@mail.com</span>
                </a>
                <button
                  onClick={copyEmail}
                  title={tc.copyEmail}
                  className="p-2 rounded-xl bg-muted/60 hover:bg-primary/[0.08] hover:text-primary transition-colors shrink-0"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
                </div>
                <a href="tel:+33767103750" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                  <div className="p-2.5 bg-muted/60 rounded-xl group-hover:bg-primary/[0.08] transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[15px]">+33 7 67 10 37 50</span>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="p-2.5 bg-muted/60 rounded-xl">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[15px]">Pays de Gex / Frontalier</span>
                </div>
             </div>
          </div>


          <div className="glass-panel border rounded-[2rem] p-8 card-hover hover:shadow-xl relative overflow-hidden group">
             <h3 className="relative z-10 text-xl font-bold mb-6">{tc.socialTitle}</h3>
             <div className="relative z-10 flex gap-3">
               <a href="https://github.com/bilel-k" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/60 rounded-xl hover:bg-primary/[0.08] hover:text-primary transition-colors hover:scale-105 transform duration-200">
                 <Github className="h-5 w-5" />
               </a>
               <a href="https://linkedin.com/in/bilel-kaoulala" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/60 rounded-xl hover:bg-primary/[0.08] hover:text-primary transition-colors hover:scale-105 transform duration-200">
                 <Linkedin className="h-5 w-5" />
               </a>
             </div>
          </div>
        </motion.div>

        <motion.div variants={itemParams} className="md:col-span-2 glass-panel border rounded-[2rem] p-5 sm:p-8 md:p-12 relative overflow-hidden card-hover hover:shadow-2xl group">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 relative z-10 tracking-tight">{tc.formTitle} <span className="text-primary">.</span></h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold">{tc.fullName}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name"
                  required
                  className="w-full px-5 py-3.5 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
                  placeholder={tc.namePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">{tc.emailLabel}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  required
                  className="w-full px-5 py-3.5 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
                  placeholder={tc.emailPlaceholder}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-semibold">{tc.subject}</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                required
                className="w-full px-5 py-3.5 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
                placeholder={tc.subjectPlaceholder}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">{tc.message}</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={6}
                className="w-full px-5 py-3.5 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all resize-none"
                placeholder={tc.messagePlaceholder}
              ></textarea>
            </div>

            {isSuccess ? (
              <div className="flex items-center gap-3 text-emerald-500 font-semibold px-4 py-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5" />
                {tc.successMsg}
              </div>
            ) : (
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto rounded-full gap-2 font-semibold shadow-md hover:shadow-lg transition-all h-12 px-8">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {tc.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {tc.sendButton}
                  </>
                )}
              </Button>
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>

    {/* Zone de Mobilité */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="container mx-auto px-6 py-16 max-w-[1440px]"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-10 md:mb-14 inline-flex items-center gap-3 w-full justify-center"
      >
        {tc.mobilityTitle}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
        </span>
      </motion.h2>

      <div className="flex flex-col items-center gap-10">
        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[420px]"
        >
          <svg viewBox="0 0 300 300" className="w-full" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="c" /><feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="ringGlow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <radialGradient id="sweepFill"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.01" /></radialGradient>
            </defs>

            {/* Grid */}
            <line x1="150" y1="0" x2="150" y2="300" stroke="hsl(var(--primary) / 0.06)" strokeWidth="0.5" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="hsl(var(--primary) / 0.06)" strokeWidth="0.5" />
            <line x1="44" y1="44" x2="256" y2="256" stroke="hsl(var(--primary) / 0.04)" strokeWidth="0.5" />
            <line x1="256" y1="44" x2="44" y2="256" stroke="hsl(var(--primary) / 0.04)" strokeWidth="0.5" />

            {/* Sweep */}
            <g className="animate-[radar-sweep_5s_linear_infinite]" style={{ transformOrigin: '150px 150px' }}>
              <path d="M150,150 L150,14 A136,136,0,0,1,237,46 Z" fill="url(#sweepFill)" />
              <line x1="150" y1="150" x2="150" y2="14" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
            </g>

            {/* Ripples */}
            <circle cx="150" cy="150" r="0" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="1" className="animate-[radar-ripple_3s_linear_infinite]" />
            <circle cx="150" cy="150" r="0" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="1" className="animate-[radar-ripple_3s_linear_infinite]" style={{ animationDelay: '1s' }} />

            {/* Rings */}
            {[
              { id: 3, r: 136 },
              { id: 2, r: 92 },
              { id: 1, r: 50 },
            ].map((zone) => {
              const on = activeZone === zone.id || hoveredZone === zone.id
              return (
                <g key={zone.id} style={{ cursor: 'pointer' }}
                  onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <circle cx="150" cy="150" r={zone.r}
                    fill={on ? "hsl(var(--primary) / 0.12)" : "hsl(var(--primary) / 0.03)"}
                    stroke={on ? "hsl(var(--primary) / 0.85)" : "hsl(var(--primary) / 0.15)"}
                    strokeWidth={on ? "2" : "1"}
                    strokeDasharray={zone.id === 3 ? "8 5" : zone.id === 2 ? "5 4" : "none"}
                    style={{ transition: "fill 0.35s ease, stroke 0.35s ease, stroke-width 0.35s ease" }}
                    filter={on ? "url(#ringGlow)" : undefined}
                  />
                  {/* Wide invisible hit area */}
                  <circle cx="150" cy="150" r={zone.r} fill="transparent" stroke="transparent" strokeWidth="20" />
                </g>
              )
            })}

            {/* Dots */}
            {[
              { cx: 175, cy: 107, z: 1, d: '0s' }, { cx: 125, cy: 107, z: 1, d: '1.8s' },
              { cx: 230, cy: 104, z: 2, d: '0.6s' }, { cx: 70, cy: 104, z: 2, d: '2.4s' },
              { cx: 246, cy: 54, z: 3, d: '1.2s' }, { cx: 54, cy: 246, z: 3, d: '2.8s' }, { cx: 286, cy: 150, z: 3, d: '0.4s' },
            ].map((m, i) => (
              <g key={i}>
                <circle cx={m.cx} cy={m.cy} r="3"
                  fill={activeZone === m.z || hoveredZone === m.z ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.35)"}
                  style={{ transition: "fill 0.35s ease" }}
                  filter={activeZone === m.z ? "url(#glow)" : undefined}
                />
                <circle cx={m.cx} cy={m.cy} r="3" fill="hsl(var(--primary) / 0.25)" className="animate-[radar-ping_3s_ease-out_infinite]" style={{ animationDelay: m.d }} />
              </g>
            ))}

            {/* Center */}
            <circle cx="150" cy="150" r="7" fill="hsl(var(--primary))" filter="url(#glow)" />
            <circle cx="150" cy="150" r="14" fill="hsl(var(--primary) / 0.15)" className="animate-ping" style={{ animationDuration: '2s' }} />
            <text x="150" y="172" textAnchor="middle" fill="hsl(var(--primary))" fontSize="10" fontWeight="bold" className="select-none">Pays de Gex</text>

            {/* Labels */}
            {[
              { id: 1, y: 106, text: tc.radarLabels[0] },
              { id: 2, y: 64, text: tc.radarLabels[1] },
              { id: 3, y: 22, text: tc.radarLabels[2] },
            ].map((l) => {
              const on = activeZone === l.id || hoveredZone === l.id
              return (
                <text key={l.id} x="150" y={l.y} textAnchor="middle"
                  fill={on ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                  fontSize={on ? "11" : "9"} fontWeight={on ? "bold" : "normal"}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease, font-size 0.3s ease' }}
                  onClick={(e) => { e.stopPropagation(); setActiveZone(activeZone === l.id ? null : l.id) }}
                  onMouseEnter={() => setHoveredZone(l.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                >{l.text}</text>
              )
            })}
          </svg>
        </motion.div>

        {/* Pills with shared layout background */}
        <div className="flex flex-wrap justify-center gap-3">
          {mobilityZones.map((zone, i) => {
            const on = activeZone === zone.id || hoveredZone === zone.id
            return (
              <motion.button
                key={zone.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                whileHover={{ scale: 1.06, transition: { type: "spring", stiffness: 500, damping: 25 } }}
                whileTap={{ scale: 0.95 }}
                className={`relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full border font-semibold text-sm cursor-pointer overflow-hidden ${
                  on
                    ? 'border-primary shadow-lg shadow-primary/25'
                    : 'border-border/30'
                }`}
                style={{ color: on ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))', transition: 'color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
              >
                {/* Animated fill background */}
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  <motion.span
                    animate={{ scale: on ? 1.15 : 1, rotate: on ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  >
                    {zone.icon}
                  </motion.span>
                  {zone.title}
                  <AnimatePresence mode="popLayout">
                    {on && (
                      <motion.span
                        key="stat"
                        initial={{ opacity: 0, x: -6, width: 0 }}
                        animate={{ opacity: 0.85, x: 0, width: "auto" }}
                        exit={{ opacity: 0, x: -4, width: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="text-xs font-bold overflow-hidden whitespace-nowrap"
                      >
                        · {zone.stats[0].value}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
    </>
  )
}

