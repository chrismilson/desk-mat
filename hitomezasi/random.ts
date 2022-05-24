/**
 * Returns a random boolean value
 *
 * @param ratio The proportion of true to false; lower -> more false
 */
export function coinflip(ratio: number, gen = Math.random): boolean {
  return gen() < ratio;
}

export function* repeat(ratio: number, n: number): Generator<boolean> {
  for (let i = 0; i < n; i++) {
    yield coinflip(ratio);
  }
}
