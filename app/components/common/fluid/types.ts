export type FluidMode = 'metaball' | 'particles' | 'ink'

export type MouseState = {
  x: number
  y: number
  px: number
  py: number
  active: boolean
  /** Toggle: click on → follow cursor until next click */
  interactive: boolean
  /** One-shot stronger seep on click */
  burst: boolean
}

export type FluidFrameContext = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  mouse: MouseState
  dt: number
  time: number
  reduceMotion: boolean
  accent: string
}
