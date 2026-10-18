import { useCallback, useEffect, useRef, useState } from 'react'

interface Body {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  mass: number
  color: string
  trail: { x: number; y: number }[]
}

const COLORS = ['#c77c3b', '#3b7a7a', '#a3622a', '#6b8f71', '#b5533c', '#4f7ca3']
const TRAIL_LENGTH = 90
const SUN_MASS = 4000

let nextId = 1

function createSun(width: number, height: number): Body {
  return {
    id: 0,
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0,
    mass: SUN_MASS,
    color: '#d8a24a',
    trail: [],
  }
}

export default function OrbitalSimDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bodiesRef = useRef<Body[]>([])
  const gravityRef = useRef(1)
  const [gravity, setGravity] = useState(1)
  const [count, setCount] = useState(1)
  const dragRef = useRef<{ x: number; y: number } | null>(null)
  const dimsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    gravityRef.current = gravity
  }, [gravity])

  const reset = useCallback(() => {
    const { width, height } = dimsRef.current
    bodiesRef.current = [createSun(width, height)]
    setCount(1)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const width = parent.clientWidth
      const height = 420
      dimsRef.current = { width, height }
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (bodiesRef.current.length === 0) {
        bodiesRef.current = [createSun(width, height)]
      }
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const G = 0.6

    const step = () => {
      const bodies = bodiesRef.current
      const g = gravityRef.current
      for (let i = 1; i < bodies.length; i++) {
        const body = bodies[i]
        let ax = 0
        let ay = 0
        for (const other of bodies) {
          if (other === body) continue
          const dx = other.x - body.x
          const dy = other.y - body.y
          const distSq = dx * dx + dy * dy + 50
          const dist = Math.sqrt(distSq)
          const force = (G * g * other.mass) / distSq
          ax += (force * dx) / dist
          ay += (force * dy) / dist
        }
        body.vx += ax
        body.vy += ay
        body.x += body.vx
        body.y += body.vy
        body.trail.push({ x: body.x, y: body.y })
        if (body.trail.length > TRAIL_LENGTH) body.trail.shift()
      }

      const { width, height } = dimsRef.current
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      ctx.fillStyle = isDark ? 'rgba(11,17,32,0.35)' : 'rgba(250,247,240,0.35)'
      ctx.fillRect(0, 0, width, height)

      for (const body of bodies) {
        if (body.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(body.trail[0].x, body.trail[0].y)
          for (const point of body.trail) ctx.lineTo(point.x, point.y)
          ctx.strokeStyle = body.color + '55'
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        ctx.beginPath()
        const radius = body.id === 0 ? 12 : 5
        ctx.arc(body.x, body.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = body.color
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  const getPos = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = getPos(event)
  }

  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const start = dragRef.current
    if (!start) return
    const end = getPos(event)
    const vx = (end.x - start.x) * 0.08
    const vy = (end.y - start.y) * 0.08
    bodiesRef.current.push({
      id: nextId++,
      x: start.x,
      y: start.y,
      vx,
      vy,
      mass: 15 + Math.random() * 15,
      color: COLORS[bodiesRef.current.length % COLORS.length],
      trail: [],
    })
    dragRef.current = null
    setCount(bodiesRef.current.length)
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="img"
        aria-label="Orbital mechanics canvas. Click and drag on the canvas to launch a new planet in that direction."
        className="w-full cursor-crosshair touch-none rounded-md border border-ink/10 dark:border-paper/10"
      />
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-3 text-sm text-ink/80 dark:text-paper/80">
          Gravity
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={gravity}
            onChange={(event) => setGravity(Number(event.target.value))}
            className="accent-copper"
          />
          <span className="font-mono text-xs text-ink/50 dark:text-paper/50">
            {gravity.toFixed(1)}×
          </span>
        </label>
        <p className="text-sm text-ink/60 dark:text-paper/60">
          {count} {count === 1 ? 'body' : 'bodies'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:border-copper hover:text-copper dark:border-paper/20 dark:text-paper/80"
        >
          Reset
        </button>
      </div>
      <p className="mt-2 text-xs text-ink/50 dark:text-paper/50">
        Click and drag on the canvas, then release to launch a planet in that direction.
      </p>
    </div>
  )
}
