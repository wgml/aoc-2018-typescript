import * as common from './common';

const tokens = {
  lumberyard: '#',
  open: '.',
  tree: '|',
};

const tick = (map: string[][], x: number, y: number): string[][] => {
  const matches = (row: number, col: number, token: string): number => {
    let count = 0;
    for (let r = Math.max(0, row - 1); r < Math.min(y, row + 2); ++r) {
      for (let c = Math.max(0, col - 1); c < Math.min(x, col + 2); ++c) {
        if ((r !== row || c !== col) && map[r][c] === token) {
          ++count;
        }
      }
    }
    return count;
  };

  const result: string[][] = Array(y)
    .fill(0)
    .map(() => Array(x).fill(''));

  for (let row = 0; row < y; ++row) {
    for (let col = 0; col < x; ++col) {
      const acre = map[row][col];
      let res = acre;

      const trees = matches(row, col, tokens.tree);
      const lumberyards = matches(row, col, tokens.lumberyard);

      if (acre === tokens.open && trees >= 3) {
        res = tokens.tree;
      } else if (acre === tokens.tree && lumberyards >= 3) {
        res = tokens.lumberyard;
      } else if (acre === tokens.lumberyard) {
        if (lumberyards >= 1 && trees >= 1) {
          res = tokens.lumberyard;
        } else {
          res = tokens.open;
        }
      }

      result[row][col] = res;
    }
  }
  return result;
};

const parseInput = (input: string) => {
  const result: string[][] = input.split('\n').map(line => line.split(''));
  return { result, y: result.length, x: result[0].length };
};

const hash = (map: string[][]) => map.map(line => line.join('')).join('');

const calcResult = (map: string[][], x: number, y: number) => {
  let trees = 0;
  let lumberyards = 0;
  for (let row = 0; row < y; ++row) {
    for (let col = 0; col < x; ++col) {
      const c = map[row][col];
      if (c === tokens.tree) {
        ++trees;
      } else if (c === tokens.lumberyard) {
        ++lumberyards;
      }
    }
  }

  return trees * lumberyards;
};

const fromCache = (map: string[][], cache: Map<string, number>, iteration: number, max: number): number => {
  const prevIteration = cache.get(hash(map));
  if (!prevIteration) {
    return 0;
  }
  const interationDiff = iteration - prevIteration;
  if (interationDiff === 0) {
    return 0;
  }
  return interationDiff * Math.floor((max - iteration) / interationDiff);
};

const toCache = (map: string[][], cache: Map<string, number>, iteration: number) => {
  const hashed = hash(map);
  if (!cache.has(hashed)) {
    cache.set(hashed, iteration);
  }
};

const calc = (input: string, maxIterations: number) => {
  const parsed = parseInput(input);
  let map = parsed.result;
  const x = parsed.x;
  const y = parsed.y;

  const cache: Map<string, number> = new Map();

  let iteration = 0;
  while (iteration < maxIterations) {
    const offset = fromCache(map, cache, iteration, maxIterations);
    if (offset > 0) {
      iteration += offset;
      continue;
    }

    map = tick(map, x, y);
    ++iteration;

    toCache(map, cache, iteration);
  }

  return calcResult(map, x, y);
};

export const first = (input: string) => calc(input, 10);

export const second = (input: string) => calc(input, 1000000000);
