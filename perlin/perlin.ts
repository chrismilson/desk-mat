const randomGradient = (xi: number, yi: number) => {
  const w = 16
  const s = w / 2
  const m = (1 << w) - 1

  let a = xi
  let b = yi
  a *= 3284157443
  b ^= ((a << s) | (a >> (w - s))) & m
  b *= 1911520717
  a ^= ((b << s) | (b >> (w - s))) & m
  a *= 2048419325

  const rand = (a * Math.PI) / (1 << (w - 1))
  return [Math.sin(rand), Math.cos(rand)]
}

const interpolate = (a: number, b: number, t: number): number => {
  //   return t * a + (1 - t) * b
  return a + t * (b - a)
  //   return t * a + (1 - t) * b
}

const dotGridGradient = (
  xi: number,
  yi: number,
  x: number,
  y: number
): number => {
  const [xg, yg] = randomGradient(xi, yi)
  const xd = x - xi
  const yd = y - yi
  return xd * xg + yd * yg
}

export const perlinAt = (x: number, y: number) => {
  const x0 = Math.floor(x)
  const x1 = x0 + 1
  const y0 = Math.floor(y)
  const y1 = y0 + 1

  const sx0 = x - x0
  const sy0 = y - y0

  const sx = -2 * sx0 * sx0 * sx0 + 3 * sx0 * sx0
  const sy = -2 * sy0 * sy0 * sy0 + 3 * sy0 * sy0

  return interpolate(
    interpolate(
      dotGridGradient(x0, y0, x, y),
      dotGridGradient(x1, y0, x, y),
      sx
    ),
    interpolate(
      dotGridGradient(x0, y1, x, y),
      dotGridGradient(x1, y1, x, y),
      sx
    ),
    sy
  )
}
