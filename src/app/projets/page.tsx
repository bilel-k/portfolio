"use client"

import { motion } from "framer-motion"
import { Terminal, Shield, Cpu, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { ScrambleText } from "@/components/ui/scramble-text"
import { useLanguage } from "@/components/language-provider"

export default function Projects() {
  const { t } = useLanguage()

  const projectMeta = [
    { icon: <ShoppingCart className="h-5 w-5" />, techs: ["React", "TypeScript", "Express.js", "SQLite", "Stripe"], image: "/projet-site/page1.png", color: "from-violet-500/20 to-purple-500/20", href: "https://github.com/bilel-k/fitcorner" },
    { icon: <Cpu className="h-5 w-5" />, techs: ["Docker", "MQTT", "InfluxDB", "Grafana", "Node-RED", "Node.js", "Python", "OPA"], image: "/projet-iot.png", color: "from-blue-500/20 to-cyan-500/20", href: "https://github.com/bilel-k/industritech" },
    { icon: <Terminal className="h-5 w-5" />, techs: ["Proxmox", "Virtualisation", "HA", "Infrastructure"], image: "/diagram-proxmox.webp", color: "from-emerald-500/20 to-green-500/20", href: "https://github.com/bilel-k/proxmox" },
    { icon: <Shield className="h-5 w-5" />, techs: ["OPNsense", "Wazuh", "Nessus", "OpenVPN", "Fail2Ban"], image: "/diagram-cybersecurity.webp", color: "from-red-500/20 to-orange-500/20", href: "https://github.com/bilel-k/audit-sec" },
  ]

  const projects = t.projects.items.map((item, i) => ({ ...item, ...projectMeta[i] }))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-20 md:text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{t.projects.title}<span className="gradient-text-animated">.</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          {t.projects.subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show" viewport={{ once: true, margin: "-100px" }}
        className="grid gap-8 md:grid-cols-2"
      >
        {projects.map((project, index) => (
          <motion.div variants={item} key={index} className="flex">
            <SpotlightCard
              className="group relative flex flex-col w-full glass-panel rounded-[2rem] overflow-hidden card-hover hover:shadow-2xl"
              onClick={project.href ? () => window.open(project.href, "_blank", "noopener,noreferrer") : undefined}
            >
              
              {/* Image banner */}
              <div className="relative h-44 sm:h-56 w-full overflow-hidden border-b bg-muted/50">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/10 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                  <ExternalLink className="w-5 h-5 text-foreground" />
                </div>
              </div>

              <div className="flex-1 p-5 sm:p-8 flex flex-col relative">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-secondary/80 text-secondary-foreground text-xs font-semibold rounded-full border border-border/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-muted-foreground tracking-widest uppercase flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                    {project.date}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

        ))}
      </motion.div>
    </div>
  )
}
