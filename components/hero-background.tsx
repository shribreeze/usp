"use client"

import { useEffect, useRef } from "react"
import { cn } from "../lib/utils"


export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    type Line = {
      y: number
      speed: number
      color: string
      alpha: number
      thickness: number
      offset: number
    }
    const lines: Line[] = []

    const colors = [
      "rgba(0,178,255,0.22)", // blue
      "rgba(122,92,255,0.22)", // purple
      "rgba(255,61,154,0.20)", // pink
    ]

    function resize() {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    function makeLines() {
      lines.length = 0
      const count = Math.max(8, Math.floor((width / 120) * 3)) // responsive density
      for (let i = 0; i < count; i++) {
        lines.push({
          y: Math.random() * height,
          speed: 0.25 + Math.random() * 0.75,
          color: colors[i % colors.length],
          alpha: 0.16 + Math.random() * 0.18,
          thickness: 1 + Math.random() * 2.5,
          offset: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw(ts: number) {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, width, height)

      // Soft vignette using foreground color for consistency
      const fg = "rgba(245,247,250,0.10)"
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        Math.min(width, height) * 0.1,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.9,
      )
      grad.addColorStop(0, "rgba(0,0,0,0)")
      grad.addColorStop(1, "rgba(0,0,0,0.35)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // flowing lines
      for (const l of lines) {
        const x0 = -50
        const x1 = width + 50
        const wave = Math.sin(ts * 0.001 * l.speed + l.offset)
        const y = (l.y += 0.15 + l.speed * 0.2)
        if (y > height + 50) l.y = -50

        const cpOffset = 80 + wave * 40
        ctx.lineWidth = l.thickness
        ctx.strokeStyle = l.color
        ctx.beginPath()
        ctx.moveTo(x0, y)
        ctx.bezierCurveTo(x0 + cpOffset, y - 40, x1 - cpOffset, y + 40, x1, y)
        ctx.stroke()
      }

      // faint tech grid using foreground tone
      ctx.save()
      ctx.strokeStyle = fg
      ctx.lineWidth = 1
      const gridSize = 36
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(width, y + 0.5)
        ctx.stroke()
      }
      ctx.restore()
    }

    const ro = new ResizeObserver(() => {
      resize()
      makeLines()
    })
    ro.observe(canvas)

    resize()
    makeLines()
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  // subtle parallax on orbs
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onScroll() {
      const y = window.scrollY
      el.style.setProperty("--parallax", String(y * 0.02))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0" ref={containerRef}>
      {/* gradient orbs with parallax */}
      <div
        className={cn(
          "absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl opacity-50",
          "bg-[radial-gradient(circle_at_30%_30%,rgba(0,178,255,0.35),transparent_60%)]",
        )}
        style={{ transform: "translateY(calc(var(--parallax, 0) * -1px))" }}
      />
      <div
        className={cn(
          "absolute -right-24 top-40 h-80 w-80 rounded-full blur-3xl opacity-40",
          "bg-[radial-gradient(circle_at_70%_70%,rgba(122,92,255,0.30),transparent_60%)]",
        )}
        style={{ transform: "translateY(calc(var(--parallax, 0) * 0.6px))" }}
      />

      {/* canvas for flowing payment streams */}
      <canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
    </div>
  )
}
