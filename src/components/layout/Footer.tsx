"use client"

import { useLanguage } from "@/components/language-provider"

const stack = [
  { label: "Next.js", color: "bg-foreground/10 text-foreground" },
  { label: "TypeScript", color: "bg-blue-500/10 text-blue-400" },
  { label: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-400" },
  { label: "Framer Motion", color: "bg-violet-500/10 text-violet-400" },
  { label: "Vercel", color: "bg-foreground/10 text-foreground" },
]

export function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="relative border-t border-border/50 mt-24 overflow-hidden glass-panel rounded-t-[3rem]">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/8 blur-[120px] pointer-events-none rounded-full" />
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">

          {/* Brand — full row on mobile, span 2 on md */}
          <div className="col-span-2 space-y-5 md:pr-8">
            <span className="font-extrabold text-2xl tracking-tight">
              Bilel<span className="text-primary">.</span>
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {f.bio}
            </p>
            {/* Social icons row */}
            <div className="flex gap-3 pt-1">
              {[
                { href: "https://github.com/biIeI", label: "GitHub", svg: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></> },
                { href: "https://linkedin.com/in/bilel-kaoulala", label: "LinkedIn", svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></> },
                { href: "mailto:bilel@mail.com", label: "Email", svg: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></> },
              ].map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group p-2.5 rounded-xl border border-border/40 bg-background/40 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    {svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80">{f.navTitle}</h4>
            <nav className="flex flex-col gap-2.5">
              {f.navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Stack */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80">{f.stackTitle}</h4>
            <div className="flex flex-col gap-2.5">
              {stack.map(({ label, color }) => (
                <span key={label} className={`w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-sm text-muted-foreground/80">
            © {new Date().getFullYear()} Bilel Kaoulala<span className="text-primary">.</span> {f.rights}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {f.madeWith} Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
