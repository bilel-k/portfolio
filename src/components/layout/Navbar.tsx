'use client'

import * as React from "react"
import Link from "next/link"
import { Menu, X, Home, User, FolderKanban, Briefcase, Mail } from "lucide-react"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const navIcons = {
  home:       Home,
  about:      User,
  projects:   FolderKanban,
  experience: Briefcase,
  contact:    Mail,
} as const

const navHrefs = [
  { href: "/#top",        key: "home" as const },
  { href: "/#about",     key: "about" as const },
  { href: "/#projects",  key: "projects" as const },
  { href: "/#experience",key: "experience" as const },
  { href: "/#contact",   key: "contact" as const },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("/#top")
  const { scrollY } = useScroll()
  const { t } = useLanguage()
  const navLinks = navHrefs.map(({ href, key }) => ({ href, key, label: t.nav[key] }))

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 20)
    if (latest > 150 && latest > prev) {
      setIsOpen(false) // Close mobile menu on scroll down
    }
  })

  React.useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map(link => link.href.substring(2))
      let current = "/#top"
      for (const section of sections) {
        if (section === "top") continue
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) current = `/#${section}`
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none px-4 gap-2 transition-all duration-500",
        scrolled ? "mt-4" : "mt-8"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
<nav 
        className={cn(
          "pointer-events-auto relative flex items-center justify-between px-4 md:px-6 py-2 bg-background/80 backdrop-blur-xl border border-border/40 rounded-full w-full md:w-max gap-6 transition-all duration-500",
          scrolled ? "shadow-lg shadow-black/5" : ""
        )}
      >
        {/* LOGO */}
        <div className="flex justify-start">
          <Link href="/#top" className="flex items-center gap-3 group">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight">
              Bilel<span className="gradient-text-animated text-xl sm:text-2xl">.</span>
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 justify-center">
          {navLinks.map(({ href, label, key }) => {
            const isActive = activeSection === href
            const Icon = navIcons[key]
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-[15.5px] font-semibold tracking-wide rounded-full transition-colors duration-200",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill-desktop"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <Icon className="relative z-10 h-[17px] w-[17px] shrink-0" />
                <span className="relative z-10">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full border bg-card/60 hover:bg-muted transition-colors"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map(({ href, key, label }, i) => {
                  const isActive = activeSection === href
                  const Icon = navIcons[key]
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center gap-2.5 px-5 py-3.5 text-[15px] font-semibold tracking-wide rounded-2xl transition-all",
                          isActive
                            ? "bg-foreground text-background border border-foreground/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
              {/* Toggles row inside mobile menu */}
              <div className="flex items-center justify-between px-5 py-3 mt-1 border-t border-border/30">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Apparence</span>
                <div className="flex items-center gap-1">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Toggles — right of navbar, desktop only */}
      <div className="hidden md:flex pointer-events-auto items-center gap-1 bg-background/80 backdrop-blur-xl border border-border/40 rounded-full px-1.5 py-2 shadow-lg">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </motion.div>
  )
}
