import type { FluidFrameContext, MouseState } from './types'

type Ball = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
}

export type MetaballState = {
  balls: Ball[]
  resolution: number
  threshold: number
}

export function createMetaballState(width: number, height: number, count = 4): MetaballState {
  const balls: Ball[] = []
  for (let i = 0; i < count; i++) {
    balls.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 40 + 120,
      vx: Math.random() * 0.8 - 0.4,
      vy: Math.random() * 0.8 - 0.4,
    })
  }
  return { balls, resolution: 10, threshold: 1.0 }
}

function applyMouseForce(ball: Ball, mouse: MouseState, reduceMotion: boolean) {
  if (!mouse.active || reduceMotion) return

  const dx = ball.x - mouse.x
  const dy = ball.y - mouse.y
  const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
  const radius = 220

  if (dist < radius) {
    const force = (1 - dist / radius) * 0.45
    ball.vx += (dx / dist) * force
    ball.vy += (dy / dist) * force
  }

  // Mild follow of mouse velocity for organic lag
  const mx = mouse.x - mouse.px
  const my = mouse.y - mouse.py
  const influence = Math.max(0, 1 - dist / 320) * 0.04
  ball.vx += mx * influence
  ball.vy += my * influence
}

export function updateAndDrawMetaball(state: MetaballState, frame: FluidFrameContext) {
  const { ctx, width, height, mouse, reduceMotion, accent } = frame
  const { balls, resolution, threshold } = state

  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = accent
  ctx.lineWidth = 1
  ctx.beginPath()

  for (const ball of balls) {
    applyMouseForce(ball, mouse, reduceMotion)

    if (!reduceMotion) {
      ball.vx *= 0.985
      ball.vy *= 0.985
      // Keep a little ambient drift
      ball.vx += (Math.random() - 0.5) * 0.02
      ball.vy += (Math.random() - 0.5) * 0.02
      ball.x += ball.vx
      ball.y += ball.vy
    }

    if (ball.x < ball.r || ball.x > width - ball.r) {
      ball.vx *= -1
      ball.x = Math.max(ball.r, Math.min(width - ball.r, ball.x))
    }
    if (ball.y < ball.r || ball.y > height - ball.r) {
      ball.vy *= -1
      ball.y = Math.max(ball.r, Math.min(height - ball.r, ball.y))
    }
  }

  const cols = Math.floor(width / resolution) + 1
  const rows = Math.floor(height / resolution) + 1
  const field: number[][] = []

  for (let i = 0; i < cols; i++) {
    field[i] = []
    for (let j = 0; j < rows; j++) {
      const x = i * resolution
      const y = j * resolution
      let sum = 0
      for (const ball of balls) {
        const d2 = (x - ball.x) ** 2 + (y - ball.y) ** 2
        sum += (ball.r * ball.r) / (d2 + 1)
      }
      field[i][j] = sum
    }
  }

  const interp = (x1: number, y1: number, x2: number, y2: number, v1: number, v2: number) => {
    const t = (threshold - v1) / (v2 - v1 + 1e-6)
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) }
  }

  const drawLine = (
    x1: number, y1: number, x2: number, y2: number, v1: number, v2: number,
    x3: number, y3: number, x4: number, y4: number, v3: number, v4: number,
  ) => {
    const p1 = interp(x1, y1, x2, y2, v1, v2)
    const p2 = interp(x3, y3, x4, y4, v3, v4)
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      const x = i * resolution
      const y = j * resolution
      const a = field[i][j] > threshold ? 1 : 0
      const b = field[i + 1][j] > threshold ? 1 : 0
      const c = field[i + 1][j + 1] > threshold ? 1 : 0
      const d = field[i][j + 1] > threshold ? 1 : 0
      const cell = a + b * 2 + c * 4 + d * 8

      switch (cell) {
        case 1: case 14:
          drawLine(x, y, x, y + resolution, field[i][j], field[i][j + 1],
            x, y, x + resolution, y, field[i][j], field[i + 1][j])
          break
        case 2: case 13:
          drawLine(x + resolution, y, x, y, field[i + 1][j], field[i][j],
            x + resolution, y, x + resolution, y + resolution, field[i + 1][j], field[i + 1][j + 1])
          break
        case 3: case 12:
          drawLine(x, y, x, y + resolution, field[i][j], field[i][j + 1],
            x + resolution, y, x + resolution, y + resolution, field[i + 1][j], field[i + 1][j + 1])
          break
        case 4: case 11:
          drawLine(x + resolution, y + resolution, x + resolution, y, field[i + 1][j + 1], field[i + 1][j],
            x, y + resolution, x + resolution, y + resolution, field[i][j + 1], field[i + 1][j + 1])
          break
        case 5:
          drawLine(x, y, x, y + resolution, field[i][j], field[i][j + 1],
            x, y, x + resolution, y, field[i][j], field[i + 1][j])
          drawLine(x + resolution, y + resolution, x + resolution, y, field[i + 1][j + 1], field[i + 1][j],
            x, y + resolution, x + resolution, y + resolution, field[i][j + 1], field[i + 1][j + 1])
          break
        case 6: case 9:
          drawLine(x, y, x + resolution, y, field[i][j], field[i + 1][j],
            x, y + resolution, x + resolution, y + resolution, field[i][j + 1], field[i + 1][j + 1])
          break
        case 7: case 8:
          drawLine(x, y, x, y + resolution, field[i][j], field[i][j + 1],
            x, y + resolution, x + resolution, y + resolution, field[i][j + 1], field[i + 1][j + 1])
          break
        case 10:
          drawLine(x, y, x + resolution, y, field[i][j], field[i + 1][j],
            x + resolution, y, x + resolution, y + resolution, field[i + 1][j], field[i + 1][j + 1])
          drawLine(x, y + resolution, x, y, field[i][j + 1], field[i][j],
            x, y + resolution, x + resolution, y + resolution, field[i][j + 1], field[i + 1][j + 1])
          break
      }
    }
  }

  ctx.stroke()
}
