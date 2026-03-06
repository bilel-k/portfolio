"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

interface BinaryChar {
  x: number
  y: number
  char: string
  speed: number
  opacity: number
  size: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    // Skip entirely on touch/mobile devices — too expensive
    if (window.matchMedia("(pointer: coarse)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let binaryChars: BinaryChar[] = []
    const CHARS = "01アイウエオカキク10110101001011"

    const getThemeColor = () => {
      const isDark = document.documentElement.classList.contains("dark")
      const style = getComputedStyle(document.documentElement)
      const primary = style.getPropertyValue("--primary").trim()
      if (primary) {
        const parts = primary.split(" ")
        if (parts.length >= 3) {
          const h = parseFloat(parts[0])
          const s = parseFloat(parts[1])
          const l = parseFloat(parts[2])
          return { h, s, l, isDark }
        }
      }
      return { h: 262, s: 83, l: 58, isDark }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100)
      const { h, s } = getThemeColor()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.5 + 0.15,
        hue: h + (Math.random() - 0.5) * 40,
      }))
      binaryChars = Array.from({ length: 18 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.1 + 0.03,
        size: Math.random() * 8 + 9,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { h, s, l, isDark } = getThemeColor()
      const mx = mouse.current.x
      const my = mouse.current.y

      // Subtle grid
      const gridSize = 80
      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }
      ctx.strokeStyle = isDark ? `rgba(255,255,255,0.025)` : `rgba(0,0,0,0.03)`
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Binary / katakana chars drifting upward
      for (const bc of binaryChars) {
        bc.y -= bc.speed
        if (bc.y < -20) {
          bc.y = canvas.height + 10
          bc.x = Math.random() * canvas.width
          bc.char = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        ctx.font = `${bc.size}px monospace`
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${bc.opacity})`
        ctx.fillText(bc.char, bc.x, bc.y)
      }

      // Particles with mouse attraction
      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = ((200 - dist) / 200) * 0.012
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        grd.addColorStop(0, `hsla(${p.hue}, ${s}%, ${l}%, ${p.opacity})`)
        grd.addColorStop(1, `hsla(${p.hue}, ${s}%, ${l}%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${s}%, ${l}%, ${p.opacity * 1.5})`
        ctx.fill()
      }

      // Connection lines between nearby particles
      const connectionDist = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    const onResize = () => {
      resize()
      createParticles()
    }

    resize()
    createParticles()
    draw()

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
