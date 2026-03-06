"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type Line =
  | { type: "prompt"; text: string }
  | { type: "output"; text: string; color?: string }
  | { type: "blank" }

const sequence: { command: string; output: Line[] }[] = [
  {
    command: "whoami",
    output: [
      { type: "output", text: "bilel_kaoulala", color: "text-emerald-400" },
    ],
  },
  {
    command: "cat profile.json",
    output: [
      { type: "output", text: "{" },
      { type: "output", text: '  "role":     "Consultant IT & Étudiant",', color: "text-sky-300" },
      { type: "output", text: '  "school":   "Geneva Institute of Technology",', color: "text-sky-300" },
      { type: "output", text: '  "company":  "SATOM",', color: "text-sky-300" },
      { type: "output", text: '  "status":   "open_to_opportunities"', color: "text-emerald-400" },
      { type: "output", text: "}" },
    ],
  },
  {
    command: "nmap -sV --open portfolio.local",
    output: [
      { type: "output", text: "Starting Nmap 7.94  ( https://nmap.org )", color: "text-zinc-400" },
      { type: "blank" },
      { type: "output", text: "PORT     STATE  SERVICE    VERSION", color: "text-amber-400" },
      { type: "output", text: "80/tcp   open   http       Next.js 15.1" },
      { type: "output", text: "443/tcp  open   ssl/https  TLS 1.3" },
      { type: "output", text: "3000/tcp open   dev        Turbopack" },
      { type: "blank" },
      { type: "output", text: "3 open ports — no vulnerabilities found", color: "text-emerald-400" },
    ],
  },
  {
    command: "ls skills/",
    output: [
      {
        type: "output",
        text: "cybersec/   devweb/   infra/   iac/",
        color: "text-sky-300",
      },
    ],
  },
  {
    command: "cat skills/cybersec.txt",
    output: [
      { type: "output", text: "OPNsense · Wazuh · Nessus · Burp Suite" },
      { type: "output", text: "Metasploit · PowerShell Empire · Wireshark" },
      { type: "output", text: "OpenVPN · Analyse de vulnérabilités" },
    ],
  },
  {
    command: "sudo ping -c 1 avenir.pro",
    output: [
      { type: "output", text: "PING avenir.pro (93.184.x.x): 56 bytes", color: "text-zinc-400" },
      { type: "output", text: "64 bytes: icmp_seq=0 ttl=54 time=8.3 ms" },
      { type: "blank" },
      { type: "output", text: "✓ Connexion établie — prêt pour de nouveaux défis.", color: "text-emerald-400" },
    ],
  },
]

const TYPING_SPEED = 42   // ms per char
const OUTPUT_DELAY  = 180  // ms before showing output
const STEP_PAUSE    = 1400 // ms between commands
const LOOP_PAUSE    = 2800 // ms before restarting

export function HackerTerminal() {
  const [lines, setLines] = useState<(Line & { id: number })[]>([])
  const [typingCmd, setTypingCmd] = useState("")
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing")
  const [cmdIdx, setCmdIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [outIdx, setOutIdx] = useState(0)
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const uid = () => idRef.current++

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, typingCmd])

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return
    const cmd = sequence[cmdIdx].command
    if (charIdx < cmd.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), TYPING_SPEED)
      return () => clearTimeout(t)
    } else {
      // Done typing — move to output phase
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id: uid(), type: "prompt", text: cmd }])
        setTypingCmd("")
        setOutIdx(0)
        setPhase("output")
      }, OUTPUT_DELAY)
      return () => clearTimeout(t)
    }
  }, [phase, charIdx, cmdIdx])

  useEffect(() => {
    if (phase === "typing") {
      setTypingCmd(sequence[cmdIdx].command.slice(0, charIdx))
    }
  }, [charIdx, phase, cmdIdx])

  // Output phase
  useEffect(() => {
    if (phase !== "output") return
    const outputs = sequence[cmdIdx].output
    if (outIdx < outputs.length) {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { id: uid(), ...outputs[outIdx] }])
        setOutIdx(i => i + 1)
      }, 90)
      return () => clearTimeout(t)
    } else {
      // All output shown
      setLines(prev => [...prev, { id: uid(), type: "blank" }])
      const nextCmd = (cmdIdx + 1) % sequence.length
      if (nextCmd === 0) {
        // Loop: clear and restart
        const t = setTimeout(() => {
          setLines([])
          setCmdIdx(0)
          setCharIdx(0)
          setPhase("typing")
        }, LOOP_PAUSE)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setCmdIdx(nextCmd)
          setCharIdx(0)
          setPhase("typing")
        }, STEP_PAUSE)
        return () => clearTimeout(t)
      }
    }
  }, [phase, outIdx, cmdIdx])

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.3 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-white/10">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-zinc-400 font-mono select-none">bilel@portfolio ~ </span>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        className="bg-zinc-950/95 px-5 py-4 h-80 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {lines.map(line => (
          <div key={line.id}>
            {line.type === "blank" && <div className="h-2" />}
            {line.type === "prompt" && (
              <div className="flex gap-2">
                <span className="text-emerald-400 select-none shrink-0">❯</span>
                <span className="text-zinc-100">{line.text}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className={`pl-4 text-zinc-300 ${line.color ?? ""}`}>{line.text}</div>
            )}
          </div>
        ))}

        {/* Typing line */}
        {phase === "typing" && (
          <div className="flex gap-2 items-center">
            <span className="text-emerald-400 select-none shrink-0">❯</span>
            <span className="text-zinc-100">{typingCmd}</span>
            <span className="inline-block w-[7px] h-[14px] bg-emerald-400 ml-0.5 animate-[blink_1s_step-end_infinite] rounded-sm" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
