'use client'

import { useEffect, useRef, useState } from 'react'
import { createMetaballState, updateAndDrawMetaball, type MetaballState } from './fluid/metaball'
import { createParticlesState, updateAndDrawParticles, type ParticlesState } from './fluid/particles'
import { createInkState, updateAndDrawInk, type InkState } from './fluid/ink'
import type { FluidMode, MouseState } from './fluid/types'

type Props = {
  sectionId?: string
  showModeToggle?: boolean
  defaultMode?: FluidMode
}

const MODE_LABELS: { id: FluidMode; label: string }[] = [
  { id: 'metaball', label: 'A' },
  { id: 'particles', label: 'B' },
  { id: 'ink', label: 'C' },
]

const MODE_HINT: Record<FluidMode, string> = {
  metaball: 'Metaball',
  particles: 'Particles',
  ink: 'Ink',
}

export default function HeroFluidBackground({
  sectionId = 'home',
  showModeToggle = false,
  defaultMode = 'ink',
}: Props) {
  const [mode, setMode] = useState<FluidMode>(defaultMode)
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const mouseRef = useRef<MouseState>({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    active: false,
    interactive: false,
    burst: false,
  })
  const modeRef = useRef<FluidMode>(mode)
  const reduceMotionRef = useRef(reduceMotion)

  const metaballRef = useRef<MetaballState | null>(null)
  const particlesRef = useRef<ParticlesState | null>(null)
  const inkRef = useRef<InkState | null>(null)
  const lastTimeRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    reduceMotionRef.current = reduceMotion
  }, [reduceMotion])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionId])

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const width = window.innerWidth
      const section = document.getElementById(sectionId)
      const height = section
        ? Math.max(section.getBoundingClientRect().height, window.innerHeight)
        : window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = { width, height }

      metaballRef.current = createMetaballState(width, height, 4)
      particlesRef.current = createParticlesState(width, height, width < 640 ? 180 : 320)
      inkRef.current = createInkState(width, height)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [sectionId])

  // Mouse: click toggles interactive mode (click → click)
  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect()
      const m = mouseRef.current
      m.px = m.x
      m.py = m.y
      m.x = clientX - rect.left
      m.y = clientY - rect.top
      m.active = true
    }

    const isUiTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(target.closest('a, button, input, textarea, select, label'))
    }

    const onMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return
      if (isUiTarget(e.target)) return
      updatePosition(e.clientX, e.clientY)
      const m = mouseRef.current
      m.interactive = !m.interactive
      m.burst = true
    }

    const onLeave = () => {
      mouseRef.current.active = false
    }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      updatePosition(t.clientX, t.clientY)
    }

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      if (isUiTarget(e.target)) return
      updatePosition(t.clientX, t.clientY)
      const m = mouseRef.current
      m.interactive = !m.interactive
      m.burst = true
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('click', onClick)
    section.addEventListener('mouseleave', onLeave)
    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('click', onClick)
      section.removeEventListener('mouseleave', onLeave)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
    }
  }, [sectionId])

  useEffect(() => {
    if (!isVisible) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      return
    }

    lastTimeRef.current = performance.now()

    const animate = (now: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000)
      lastTimeRef.current = now
      timeRef.current += dt

      const { width, height } = dimensionsRef.current
      const frame = {
        ctx,
        width,
        height,
        mouse: mouseRef.current,
        dt,
        time: timeRef.current,
        reduceMotion: reduceMotionRef.current,
        accent: 'rgba(192, 0, 0, 0.55)',
      }

      const current = modeRef.current
      if (current === 'metaball' && metaballRef.current) {
        updateAndDrawMetaball(metaballRef.current, frame)
      } else if (current === 'particles' && particlesRef.current) {
        updateAndDrawParticles(particlesRef.current, frame)
      } else if (current === 'ink' && inkRef.current) {
        updateAndDrawInk(inkRef.current, frame)
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isVisible, mode])

  return (
    <>
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 overflow-hidden"
        style={{ opacity: isVisible ? 1 : 0 }}
        aria-hidden
      >
        <canvas ref={canvasRef} className="block absolute top-0 left-0" />
      </div>

      {showModeToggle && (
        <div
          className="
            absolute bottom-4 right-4 z-30
            flex items-center gap-1
            rounded-full border border-black/[.08] dark:border-white/[.145]
            bg-[var(--background)]/80 backdrop-blur-sm
            p-1
            pointer-events-auto
          "
          role="group"
          aria-label="Fluid animation mode"
        >
          {MODE_LABELS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`
                min-w-8 h-8 px-2 rounded-full text-xs font-medium transition-colors
                ${mode === id
                  ? 'bg-[#C00000] text-white'
                  : 'text-foreground/60 hover:text-[#C00000]'
                }
              `}
              aria-pressed={mode === id}
              title={MODE_HINT[id]}
            >
              {label}
            </button>
          ))}
          <span className="hidden sm:inline px-2 text-[10px] text-foreground/40 whitespace-nowrap">
            {MODE_HINT[mode]}
          </span>
        </div>
      )}
    </>
  )
}
