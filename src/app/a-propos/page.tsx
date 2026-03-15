"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Code2, Network, ShieldCheck, HeartHandshake, Eye, X, Wrench, Terminal, GraduationCap, Building2, MapPin, MessageCircle, Users, CheckCircle2, FlaskConical, ExternalLink, FileText } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function About() {
  const [cvOpen, setCvOpen] = useState(false)
  const [activeSkillCat, setActiveSkillCat] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const { t, lang } = useLanguage()
  const [iconColor, setIconColor] = useState("ffffff") // default to dark-mode value for SSR
  useEffect(() => {
    setIconColor(resolvedTheme === "light" ? "000000" : "ffffff")
  }, [resolvedTheme])

  const softSkillDisplay: Record<string, string> = {
    "Communication": t.about.softSkillNames[0],
    "Esprit d'équipe": t.about.softSkillNames[1],
    "Rigueur": t.about.softSkillNames[2],
    "Curiosité technique": t.about.softSkillNames[3],
  }

  const logoSrc = (skill: string): string | null => {
    const slugs: Record<string, string | null> = {
      "Python": "python", "JavaScript": "javascript", "TypeScript": "typescript",
      "HTML": "html5", "CSS": "css", "SQL": "postgresql", "C++": "cplusplus",
      "React": "react", "Next.js": "nextdotjs", "Node.js": "nodedotjs",
      "Express.js": "express", "Git": "git", "Docker": "docker",
      "Canva": "/canva.svg", "WordPress": "wordpress",
      "Microsoft 365": "/365.svg",
      "Linux": "linux",
      "Windows Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
      "Cisco": "cisco", "AWS": "/aws.svg",
      "Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
      "VMware": "vmware", "Proxmox": "proxmox", "QEMU": null,
      "Ansible": "ansible", "Terraform": "terraform",
      "OPNsense": "opnsense", "Wazuh": "/wazuh.svg", "Nessus": "/tenable-nessus.svg",
      "Burp Suite": "burpsuite", "Metasploit": "/metasploit.png",
      "PowerShell Empire": "/empire.png", "OpenVPN": "openvpn", "Wireshark": "wireshark",
      "Communication": null, "Esprit d'équipe": null, "Rigueur": null, "Curiosité technique": null,
    }
    const v = slugs[skill]
    if (!v) return null
    if (v.startsWith("https://") || v.startsWith("/")) return v
    return `https://cdn.simpleicons.org/${v}/${iconColor}`
  }

  // Local logos that are white-on-transparent — need invert in light mode
  const monochromeLocalLogos = new Set(["/metasploit.png", "/empire.png", "/canva.svg", "/aws.svg"])
  // Local logos that are dark-on-transparent — need invert in dark mode
  const darkLocalLogos = new Set(["/wazuh.svg", "/tenable-nessus.svg"])

  const fallbackEmoji: Record<string, string> = {
    "C++": "C++", "SQL": "SQL", "QEMU": "VM",
    "Trivy": "TVY", "OWASP ZAP": "ZAP", "Fail2Ban": "F2B",
  }

  const skillIcons: Record<string, ReactNode> = {
    "Communication":      <MessageCircle className="w-10 h-10" strokeWidth={1.5} />,
    "Esprit d'équipe":   <Users className="w-10 h-10" strokeWidth={1.5} />,
    "Rigueur":           <CheckCircle2 className="w-10 h-10" strokeWidth={1.5} />,
    "Curiosité technique": <FlaskConical className="w-10 h-10" strokeWidth={1.5} />,
  }

  const skills = [
    { title: t.about.skillCategories[0], icon: <Code2 className="h-5 w-5" />,       accent: "#10b981", tw: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40", glow: "rgba(16,185,129,0.35)" },    items: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "C++", "Bash"] },
    { title: t.about.skillCategories[1], icon: <Wrench className="h-5 w-5" />,      accent: "#f59e0b", tw: { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/40",   glow: "rgba(245,158,11,0.35)" },    items: ["React", "Next.js", "Node.js", "Express.js", "Git", "Docker", "Grafana", "InfluxDB", "Node-RED", "WordPress", "Canva", "Microsoft 365"] },
    { title: t.about.skillCategories[2], icon: <Network className="h-5 w-5" />,     accent: "#3b82f6", tw: { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/40",    glow: "rgba(59,130,246,0.35)" },    items: ["Linux", "Windows Server", "Cisco", "AWS", "Azure", "VMware", "Proxmox", "QEMU"] },
    { title: t.about.skillCategories[3], icon: <Terminal className="h-5 w-5" />,    accent: "#06b6d4", tw: { text: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/40",    glow: "rgba(6,182,212,0.35)" },     items: ["Ansible", "Terraform", "GitHub Actions", "Kubernetes"] },
    { title: t.about.skillCategories[4], icon: <ShieldCheck className="h-5 w-5" />, accent: "#ef4444", tw: { text: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/40",     glow: "rgba(239,68,68,0.35)" },     items: ["OPNsense", "Wazuh", "Nessus", "Burp Suite", "Metasploit", "PowerShell Empire", "OpenVPN", "Wireshark", "Trivy", "Semgrep", "OWASP ZAP", "Fail2Ban"] },
    { title: t.about.skillCategories[5], icon: <HeartHandshake className="h-5 w-5" />, accent: "#8b5cf6", tw: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/40",  glow: "rgba(139,92,246,0.35)" },   items: ["Communication", "Esprit d'équipe", "Rigueur", "Curiosité technique"] },
  ]
  const cat = skills[activeSkillCat]

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="mb-20 md:text-center relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6">{t.about.title}<span className="gradient-text-animated"> ?</span></h1>
      </motion.div>
      
      <div className="space-y-16 relative z-10">
        {/* Bio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Bio text — large, light, gradient keywords */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-relaxed md:leading-relaxed mb-16 text-center max-w-3xl mx-auto font-light [&_strong]:font-semibold [&_strong]:gradient-text-animated"
            dangerouslySetInnerHTML={{ __html: t.about.bio }}
          />

          {/* Bento info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {t.about.infoCards.map((info, i) => {
              const icons = [
                <GraduationCap className="h-7 w-7" key="grad" />,
                <Building2 className="h-7 w-7" key="build" />,
                <MapPin className="h-7 w-7" key="map" />,
              ]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                  className="group relative glass-panel rounded-3xl p-7 md:p-8 border border-border/30 card-hover cursor-default overflow-hidden hover:shadow-2xl"
                >
                  {/* Corner glow removed */}

                  <div className="relative z-10">
                    {/* Icon + status dot */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="inline-flex p-3.5 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300">
                        {icons[i]}
                      </div>
                      {i === 1 && (
                        <span className="flex items-center gap-1.5 text-xs text-primary font-medium">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                          {"Freelance"}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-2">{info.label}</p>
                    <p className="font-extrabold text-foreground text-xl md:text-2xl leading-tight mb-1.5">{info.value}</p>
                    <p className="text-sm text-muted-foreground/80 font-medium">{info.sub}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CV card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -6, transition: { type: "spring", stiffness: 400, damping: 18 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCvOpen(true)}
              className="group relative inline-flex items-center gap-4 rounded-2xl px-8 py-5 cursor-pointer bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-shadow duration-500 overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <FileText className="w-6 h-6 relative z-10" />
              <span className="relative z-10 font-bold text-lg tracking-wide">{t.about.viewCV}</span>
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Skills — interactive logo cloud */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* ── compact category pills ── */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {skills.map((s, idx) => {
              const active = activeSkillCat === idx
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSkillCat(idx)}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300"
                  style={{
                    background: active ? s.accent + "18" : "transparent",
                    border: `1.5px solid ${active ? s.accent : "rgba(127,127,127,0.15)"}`,
                    color: active ? s.accent : undefined,
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: s.accent + "10", boxShadow: `0 0 24px -6px ${s.accent}66` }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">{s.icon}</span>
                  <span className="relative z-10">{s.title}</span>
                </button>
              )
            })}
          </div>

          {/* ── skill logo cloud ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillCat}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-5 md:gap-7"
            >
              {cat.items.map((skill, i) => {
                const src = logoSrc(skill)
                const emoji = fallbackEmoji[skill] ?? "🔹"
                const isHovered = hoveredSkill === skill
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="relative group"
                  >
                  <motion.div
                      whileHover={{ scale: 1.1, y: -6 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-3xl cursor-default"
                      style={{
                        background: isHovered ? cat.accent + "15" : "rgba(127,127,127,0.05)",
                        border: `1.5px solid ${isHovered ? cat.accent + "60" : "rgba(127,127,127,0.1)"}`,
                        boxShadow: isHovered
                          ? `0 12px 40px -8px ${cat.accent}50, 0 0 0 1px ${cat.accent}20`
                          : "0 2px 12px -4px rgba(0,0,0,0.1)",
                        transition: "background 0.25s, border-color 0.25s, box-shadow 0.3s",
                      }}
                    >
                      {/* logo */}
                      {skillIcons[skill] ? (
                        <div
                          className="transition-all duration-300"
                          style={{
                            color: isHovered ? cat.accent : resolvedTheme === "light" ? "#555" : "#aaa",
                            filter: isHovered ? `drop-shadow(0 0 14px ${cat.accent}cc)` : undefined,
                          }}
                        >
                          {skillIcons[skill]}
                        </div>
                      ) : src ? (
                        <img
                          src={src}
                          alt={skill}
                          width={64}
                          height={64}
                          className="w-14 h-14 md:w-16 md:h-16 object-contain transition-all duration-300"
                          style={{
                            filter: [
                              monochromeLocalLogos.has(src) && resolvedTheme === "light" ? "invert(1)" : "",
                              darkLocalLogos.has(src) && resolvedTheme === "dark" ? "invert(1)" : "",
                              isHovered ? `drop-shadow(0 0 14px ${cat.accent}cc)` : "",
                            ].filter(Boolean).join(" ") || undefined,
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold" style={{ color: isHovered ? cat.accent : undefined }}>{emoji}</span>
                      )}

                      {/* hover label */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap z-20 pointer-events-none"
                            style={{
                              background: cat.accent,
                              color: "#fff",
                              boxShadow: `0 4px 16px -4px ${cat.accent}88`,
                            }}
                          >
                            {softSkillDisplay[skill] ?? skill}
                            <div
                              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                              style={{ background: cat.accent }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </div>

      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-lg"
            onClick={() => setCvOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setCvOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[90vh] bg-card border border-border/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Modern header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base leading-tight">{t.about.cvTitle}</h3>
                    <p className="text-xs text-muted-foreground">PDF</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-full h-9 px-3 sm:px-4 text-xs hover:bg-primary/5 transition-all">
                    <a href="/cv-bk.pdf" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 sm:mr-1.5" /> <span className="hidden sm:inline">{lang === "fr" ? "Nouvel onglet" : "New tab"}</span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="rounded-full h-9 px-3 sm:px-4 text-xs hover:bg-primary/5 transition-all">
                    <a href="/cv-bk.pdf" download>
                      <Download className="h-3.5 w-3.5 sm:mr-1.5" /> <span className="hidden sm:inline">{t.about.downloadCV}</span>
                    </a>
                  </Button>
                  <button
                    onClick={() => setCvOpen(false)}
                    className="p-2.5 bg-background hover:bg-destructive/10 hover:text-destructive rounded-xl border border-border/30 transition-all duration-200 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* PDF viewer */}
              <div className="flex-1 w-full bg-muted/5">
                <iframe
                  src="/cv-bk.pdf#toolbar=0"
                  className="w-full h-full border-none"
                  title="CV Bilel Kaoulala"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
