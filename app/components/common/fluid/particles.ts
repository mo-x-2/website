import type { FluidFrameContext, MouseState } from './types'

type Particle = {
  x: number
  y: number
  px: number
  py: number
  life: number
}

export type ParticlesState = {
  particles: Particle[]
  noiseSeed: number
}

function hash(n: number) {
  const x = Math.sin(n) * 43758.5453123
  return x - Math.floor(x)
}

function noise2(x: number, y: number, seed: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi + yi * 57 + seed)
  const b = hash(xi + 1 + yi * 57 + seed)
  const c = hash(xi + (yi + 1) * 57 + seed)
  const d = hash(xi + 1 + (yi + 1) * 57 + seed)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

export function createParticlesState(width: number, height: number, count = 320): ParticlesState {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    particles.push({ x, y, px: x, py: y, life: Math.random() })
  }
  return { particles, noiseSeed: Math.floor(Math.random() * 10000) }
}

function flowAngle(x: number, y: number, time: number, seed: number) {
  const n = noise2(x * 0.0025, y * 0.0025 + time * 0.03, seed)
  return n * Math.PI * 2
}

function applyMouseVortex(
  x: number,
  y: number,
  mouse: MouseState,
  reduceMotion: boolean,
): { fx: number; fy: number } {
  if (!mouse.active || reduceMotion) return { fx: 0, fy: 0 }

  const dx = x - mouse.x
  const dy = y - mouse.y
  const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
  const radius = 160
  if (dist > radius) return { fx: 0, fy: 0 }

  const strength = (1 - dist / radius) * 2.2
  // Tangential swirl + slight push along mouse motion
  const tx = -dy / dist
  const ty = dx / dist
  const mx = mouse.x - mouse.px
  const my = mouse.y - mouse.py
  return {
    fx: tx * strength + mx * 0.08,
    fy: ty * strength + my * 0.08,
  }
}

export function updateAndDrawParticles(state: ParticlesState, frame: FluidFrameContext) {
  const { ctx, width, height, mouse, time, reduceMotion, accent } = frame
  const { particles, noiseSeed } = state

  // Fade trails
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  // Use destination-out style clear for transparent canvas: clear then redraw trails via previous positions
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = accent
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.55
  ctx.beginPath()

  for (const p of particles) {
    p.px = p.x
    p.py = p.y

    if (!reduceMotion) {
      const angle = flowAngle(p.x, p.y, time, noiseSeed)
      let vx = Math.cos(angle) * 1.15
      let vy = Math.sin(angle) * 1.15
      const vortex = applyMouseVortex(p.x, p.y, mouse, reduceMotion)
      vx += vortex.fx
      vy += vortex.fy
      p.x += vx
      p.y += vy
      p.life += 0.004
    }

    if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life > 1) {
      p.x = Math.random() * width
      p.y = Math.random() * height
      p.px = p.x
      p.py = p.y
      p.life = 0
    }

    ctx.moveTo(p.px, p.py)
    ctx.lineTo(p.x, p.y)
  }

  ctx.stroke()
  ctx.globalAlpha = 1
}
