const executeUntil = ([c1, c2]: number[], breaker: (seen: number[]) => boolean): number[] => {
  const band = (l: number, r: number) => l & r;
  const bor = (l: number, r: number) => l | r;

  const seen: number[] = [];

  let a = 0;
  while (!breaker(seen)) {
    let b = bor(a, 0x10000);
    a = c1;
    while (b !== 0) {
      a += band(b, 0xff);
      a = band(a, 0xffffff);
      a *= c2;
      a = band(a, 0xffffff);
      b = Math.floor(b / 256);
      if (b === 0 && !seen.includes(a)) {
        seen.push(a);
      }
    }
  }
  return seen;
};

const magicNumbers = (input: string) => {
  const parts = input.split('\n').map(line => line.split(' '));
  const a = parseInt(parts[8][1], 10);
  const b = parseInt(parts[12][2], 10);
  return [a, b];
};

export const first = (input: string) => {
  return executeUntil(magicNumbers(input), seen => seen.length > 0)[0];
};

export const second = (input: string) => {
  const now = () => new Date().getTime();

  const start = now();
  const result = executeUntil(magicNumbers(input), () => now() - start >= 1000);
  return result[result.length - 1];
};
