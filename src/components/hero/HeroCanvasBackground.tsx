import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Dot {
  x: number
  y: number
  baseY: number
  phase: number
}

const SPACING = 36

export function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let rafId = 0

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      dots = []
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          dots.push({ x, y, baseY: y, phase: Math.random() * Math.PI * 2 })
        }
      }
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const color = isDark() ? '241, 106, 31' : '79, 129, 192'
      for (const dot of dots) {
        const offset = reducedMotion ? 0 : Math.sin(time / 1800 + dot.phase) * 3
        const y = dot.baseY + offset
        const alpha = reducedMotion ? 0.12 : 0.08 + Math.abs(Math.sin(time / 1800 + dot.phase)) * 0.1
        ctx.beginPath()
        ctx.arc(dot.x, y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${alpha})`
        ctx.fill()
      }
      if (!reducedMotion) rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(draw)
    if (reducedMotion) draw(0)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
