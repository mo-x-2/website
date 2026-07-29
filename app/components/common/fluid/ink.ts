import type { FluidFrameContext } from './types'

/**
 * Lightweight grid fluid (density + velocity) for ink-like trails.
 * Coarse resolution keeps CPU cost acceptable for a portfolio Hero.
 */
export type InkState = {
  cols: number
  rows: number
  cell: number
  u: Float32Array
  v: Float32Array
  uPrev: Float32Array
  vPrev: Float32Array
  dens: Float32Array
  densPrev: Float32Array
  p: Float32Array
  div: Float32Array
  nextDripAt: number
  drips: { i: number; j: number; until: number }[]
}

function ix(cols: number, i: number, j: number) {
  return i + j * cols
}

export function createInkState(width: number, height: number): InkState {
  const cell = 8
  const cols = Math.max(32, Math.floor(width / cell))
  const rows = Math.max(24, Math.floor(height / cell))
  const n = cols * rows
  return {
    cols,
    rows,
    cell,
    u: new Float32Array(n),
    v: new Float32Array(n),
    uPrev: new Float32Array(n),
    vPrev: new Float32Array(n),
    dens: new Float32Array(n),
    densPrev: new Float32Array(n),
    p: new Float32Array(n),
    div: new Float32Array(n),
    nextDripAt: 1 + Math.random() * 2,
    drips: [],
  }
}

function setBounds(cols: number, rows: number, b: number, x: Float32Array) {
  for (let i = 1; i < cols - 1; i++) {
    x[ix(cols, i, 0)] = b === 2 ? -x[ix(cols, i, 1)] : x[ix(cols, i, 1)]
    x[ix(cols, i, rows - 1)] = b === 2 ? -x[ix(cols, i, rows - 2)] : x[ix(cols, i, rows - 2)]
  }
  for (let j = 1; j < rows - 1; j++) {
    x[ix(cols, 0, j)] = b === 1 ? -x[ix(cols, 1, j)] : x[ix(cols, 1, j)]
    x[ix(cols, cols - 1, j)] = b === 1 ? -x[ix(cols, cols - 2, j)] : x[ix(cols, cols - 2, j)]
  }
  x[ix(cols, 0, 0)] = 0.5 * (x[ix(cols, 1, 0)] + x[ix(cols, 0, 1)])
  x[ix(cols, 0, rows - 1)] = 0.5 * (x[ix(cols, 1, rows - 1)] + x[ix(cols, 0, rows - 2)])
  x[ix(cols, cols - 1, 0)] = 0.5 * (x[ix(cols, cols - 2, 0)] + x[ix(cols, cols - 1, 1)])
  x[ix(cols, cols - 1, rows - 1)] = 0.5 * (x[ix(cols, cols - 2, rows - 1)] + x[ix(cols, cols - 1, rows - 2)])
}

function linSolve(
  cols: number,
  rows: number,
  b: number,
  x: Float32Array,
  x0: Float32Array,
  a: number,
  c: number,
  iterations = 8,
) {
  for (let k = 0; k < iterations; k++) {
    for (let j = 1; j < rows - 1; j++) {
      for (let i = 1; i < cols - 1; i++) {
        x[ix(cols, i, j)] =
          (x0[ix(cols, i, j)] +
            a *
              (x[ix(cols, i - 1, j)] +
                x[ix(cols, i + 1, j)] +
                x[ix(cols, i, j - 1)] +
                x[ix(cols, i, j + 1)])) /
          c
      }
    }
    setBounds(cols, rows, b, x)
  }
}

function diffuse(cols: number, rows: number, b: number, x: Float32Array, x0: Float32Array, diff: number, dt: number) {
  const a = dt * diff * (cols - 2) * (rows - 2)
  linSolve(cols, rows, b, x, x0, a, 1 + 4 * a)
}

function advect(
  cols: number,
  rows: number,
  b: number,
  d: Float32Array,
  d0: Float32Array,
  u: Float32Array,
  v: Float32Array,
  dt: number,
) {
  const dtx = dt * (cols - 2)
  const dty = dt * (rows - 2)

  for (let j = 1; j < rows - 1; j++) {
    for (let i = 1; i < cols - 1; i++) {
      let x = i - dtx * u[ix(cols, i, j)]
      let y = j - dty * v[ix(cols, i, j)]
      if (x < 0.5) x = 0.5
      if (x > cols - 1.5) x = cols - 1.5
      if (y < 0.5) y = 0.5
      if (y > rows - 1.5) y = rows - 1.5
      const i0 = Math.floor(x)
      const i1 = i0 + 1
      const j0 = Math.floor(y)
      const j1 = j0 + 1
      const s1 = x - i0
      const s0 = 1 - s1
      const t1 = y - j0
      const t0 = 1 - t1
      d[ix(cols, i, j)] =
        s0 * (t0 * d0[ix(cols, i0, j0)] + t1 * d0[ix(cols, i0, j1)]) +
        s1 * (t0 * d0[ix(cols, i1, j0)] + t1 * d0[ix(cols, i1, j1)])
    }
  }
  setBounds(cols, rows, b, d)
}

function project(cols: number, rows: number, u: Float32Array, v: Float32Array, p: Float32Array, div: Float32Array) {
  for (let j = 1; j < rows - 1; j++) {
    for (let i = 1; i < cols - 1; i++) {
      div[ix(cols, i, j)] =
        (-0.5 *
          (u[ix(cols, i + 1, j)] - u[ix(cols, i - 1, j)] + v[ix(cols, i, j + 1)] - v[ix(cols, i, j - 1)])) /
        cols
      p[ix(cols, i, j)] = 0
    }
  }
  setBounds(cols, rows, 0, div)
  setBounds(cols, rows, 0, p)
  linSolve(cols, rows, 0, p, div, 1, 4)

  for (let j = 1; j < rows - 1; j++) {
    for (let i = 1; i < cols - 1; i++) {
      u[ix(cols, i, j)] -= 0.5 * (p[ix(cols, i + 1, j)] - p[ix(cols, i - 1, j)]) * cols
      v[ix(cols, i, j)] -= 0.5 * (p[ix(cols, i, j + 1)] - p[ix(cols, i, j - 1)]) * rows
    }
  }
  setBounds(cols, rows, 1, u)
  setBounds(cols, rows, 2, v)
}

function stepVelocity(state: InkState, visc: number, dt: number) {
  const { cols, rows, u, v, uPrev, vPrev, p, div } = state
  diffuse(cols, rows, 1, uPrev, u, visc, dt)
  diffuse(cols, rows, 2, vPrev, v, visc, dt)
  project(cols, rows, uPrev, vPrev, p, div)
  advect(cols, rows, 1, u, uPrev, uPrev, vPrev, dt)
  advect(cols, rows, 2, v, vPrev, uPrev, vPrev, dt)
  project(cols, rows, u, v, p, div)
}

function stepDensity(state: InkState, diff: number, dt: number) {
  const { cols, rows, dens, densPrev, u, v } = state
  diffuse(cols, rows, 0, densPrev, dens, diff, dt)
  advect(cols, rows, 0, dens, densPrev, u, v, dt)
}

function addSource(target: Float32Array, source: Float32Array) {
  for (let i = 0; i < target.length; i++) target[i] += source[i]
}

function clear(arr: Float32Array) {
  arr.fill(0)
}

function injectSoftTouch(
  state: InkState,
  i: number,
  j: number,
  amount: number,
  vx = 0,
  vy = 0,
) {
  const { cols, rows, densPrev, uPrev, vPrev } = state
  for (let oj = -3; oj <= 3; oj++) {
    for (let oi = -3; oi <= 3; oi++) {
      const ii = i + oi
      const jj = j + oj
      if (ii < 1 || ii >= cols - 1 || jj < 1 || jj >= rows - 1) continue
      const falloff = 1 - Math.sqrt(oi * oi + oj * oj) / 4.2
      if (falloff <= 0) continue
      densPrev[ix(cols, ii, jj)] += amount * falloff
      uPrev[ix(cols, ii, jj)] += vx * falloff
      vPrev[ix(cols, ii, jj)] += vy * falloff
    }
  }
}

function injectMouse(state: InkState, frame: FluidFrameContext) {
  const { mouse, width, height, reduceMotion, time } = frame
  const { cols, rows } = state

  // Idle drips: hold 2–6s, next starts 2–5s after this one begins (may overlap)
  if (!reduceMotion) {
    if (time >= state.nextDripAt) {
      const hold = 2 + Math.random() * 4 // 2–6 seconds
      state.drips.push({
        i: 2 + Math.floor(Math.random() * (cols - 4)),
        j: 2 + Math.floor(Math.random() * (rows - 4)),
        until: time + hold,
      })
      state.nextDripAt = time + 2 + Math.random() * 3 // 2–5 seconds from start
    }

    state.drips = state.drips.filter((d) => time <= d.until)
    for (const d of state.drips) {
      injectSoftTouch(
        state,
        d.i,
        d.j,
        8,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      )
    }
  }

  if (reduceMotion) return
  if (!mouse.interactive && !mouse.burst) return

  const i = Math.floor((mouse.x / width) * cols)
  const j = Math.floor((mouse.y / height) * rows)
  if (i < 1 || i >= cols - 1 || j < 1 || j >= rows - 1) {
    mouse.burst = false
    return
  }

  const mx = mouse.x - mouse.px
  const my = mouse.y - mouse.py
  const speed = Math.min(1.5, Math.sqrt(mx * mx + my * my) / 18)

  if (mouse.burst) {
    injectSoftTouch(state, i, j, 55, mx * 0.02, my * 0.02)
    mouse.burst = false
  }

  if (mouse.interactive) {
    injectSoftTouch(
      state,
      i,
      j,
      22 * (0.7 + speed * 0.5),
      mx * 0.02,
      my * 0.02,
    )
  }
}

export function updateAndDrawInk(state: InkState, frame: FluidFrameContext) {
  const { ctx, width, height, dt, reduceMotion } = frame
  clear(state.uPrev)
  clear(state.vPrev)
  clear(state.densPrev)

  injectMouse(state, frame)

  if (!reduceMotion) {
    addSource(state.u, state.uPrev)
    addSource(state.v, state.vPrev)
    addSource(state.dens, state.densPrev)
    // Slower time scale + more diffusion = calm bleed
    const step = Math.min(dt, 0.033) * 3.2
    stepVelocity(state, 0.00035, step)
    stepDensity(state, 0.00028, step)

    for (let i = 0; i < state.dens.length; i++) {
      state.dens[i] *= 0.9975
      state.u[i] *= 0.988
      state.v[i] *= 0.988
    }
  }

  ctx.clearRect(0, 0, width, height)

  // Soft blue wash — pairs with #C00000 UI accent without reading as blood
  const r = 58
  const g = 111
  const b = 158

  const { cols, rows, dens, cell } = state
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const d = dens[ix(cols, i, j)]
      if (d < 0.25) continue
      const alpha = Math.min(0.28, d * 0.018)
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
      ctx.fillRect(i * cell, j * cell, cell + 1, cell + 1)
    }
  }
}
