import seedrandom from 'seedrandom';

export const SEED = 'wholesale-os-2026-demo';

type RNG = ReturnType<typeof seedrandom>;

export function createRng(seed: string = SEED): RNG {
  return seedrandom(seed);
}

let rng = createRng();

export function randomFloat(): number {
  return rng();
}

export function randomInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function randomWeighted<T>(items: Array<{ value: T; weight: number }>): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let r = rng() * totalWeight;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

export function randomBoolean(chance: number = 0.5): boolean {
  return rng() < chance;
}

export function randomDate(start: Date, end: Date): Date {
  const ms = rng() * (end.getTime() - start.getTime()) + start.getTime();
  return new Date(ms);
}

export function resetRng(seed: string = SEED): void {
  rng = createRng(seed);
}
