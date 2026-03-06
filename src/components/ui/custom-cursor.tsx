"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches
    setIsTouch(touch)
    if (touch) return

    let ringX = 0
    let ringY = 0
    let dotX = 0
    let dotY = 0
    let raf: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ringX = lerp(ringX, dotX, 0.12)
      ringY = lerp(ringY, dotY, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      if (!visible) setVisible(true)
    }

    const onEnterInteractive = () => setHovered(true)
    const onLeaveInteractive = () => setHovered(false)

    const attachListeners = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, label"
      )
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive)
        el.addEventListener("mouseleave", onLeaveInteractive)
      })
    }

    // Re-attach on DOM changes (Next.js navigation)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    attachListeners()

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      observer.disconnect()
    }
  }, [visible])

  if (isTouch) return null

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full bg-primary transition-transform duration-150"
          style={{
            width: hovered ? "8px" : "6px",
            height: hovered ? "8px" : "6px",
            marginLeft: hovered ? "-1px" : "0",
            marginTop: hovered ? "-1px" : "0",
          }}
        />
      </div>

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full border border-primary/60 transition-all duration-200"
          style={{
            width: hovered ? "44px" : "32px",
            height: hovered ? "44px" : "32px",
            marginLeft: hovered ? "-22px" : "-16px",
            marginTop: hovered ? "-22px" : "-16px",
            backgroundColor: hovered ? "hsl(var(--primary) / 0.08)" : "transparent",
          }}
        />
      </div>
    </>
  )
}
