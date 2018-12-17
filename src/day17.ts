import * as common from './common';

const tokens = {
  clay: '#',
  sand: '.',

  flow: '|',
  water: '~',
  source: '+',
};

const toRange = (str: string): { b: number; e: number } => {
  const parts = str.split('..');
  if (parts.length === 1) {
    const num = parseInt(parts[0], 10);
    return { b: num, e: num + 1 };
  } else {
    const [b, e] = parts.map(p => parseInt(p, 10));
    return { b, e: e + 1 };
  }
};

const parseInput = (input: string) => {
  const grid = common.DefaultArray(() => common.DefaultArray(() => '.'));
  grid[0][500] = tokens.source;

  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  for (const line of input.split('\n')) {
    const xs = line.match(/x=((\d+)(\.\.(\d+))?)/)!;
    const xRange = toRange(xs[1]);

    const ys = line.match(/y=((\d+)(\.\.(\d+))?)/)!;
    const yRange = toRange(ys[1]);

    for (let y = yRange.b; y < yRange.e; ++y) {
      for (let x = xRange.b; x < xRange.e; ++x) {
        if (y < yMin) {
          yMin = y;
        }
        if (y > yMax) {
          yMax = y;
        }
        grid[y][x] = tokens.clay;
      }
    }
  }

  return { grid, yMin, yMax };
};

const waterOrClay = (grid: string[][], [x, y]: number[]): boolean => {
  return [tokens.water, tokens.clay].includes(grid[y][x]);
};

const walled = (grid: string[][], [x, y]: number[]) => {
  const isWall = (offset: number) => {
    let currentX = x;
    while (true) {
      if (grid[y][currentX] === tokens.sand) {
        return false;
      }
      if (grid[y][currentX] === tokens.clay) {
        return true;
      }
      currentX += offset;
    }
  };
  return isWall(-1) && isWall(1);
};

const fill = (grid: string[][], [x, y]: number[]) => {
  const fillSide = (offset: number) => {
    let currentX = x;
    while (true) {
      if (grid[y][currentX] === tokens.clay) {
        break;
      }
      grid[y][currentX] = tokens.water;
      currentX += offset;
    }
  };

  fillSide(-1);
  fillSide(1);
};

const flow = (grid: string[][], [x, y]: number[], [min, max]: number[]) => {
  if (y >= max) {
    return;
  }

  if (grid[y + 1][x] === tokens.sand) {
    grid[y + 1][x] = tokens.flow;
    flow(
      grid,
      [x, y + 1],
      [min, max],
    );
  }

  if (waterOrClay(grid, [x, y + 1]) && grid[y][x + 1] === tokens.sand) {
    grid[y][x + 1] = tokens.flow;
    flow(
      grid,
      [x + 1, y],
      [min, max],
    );
  }

  if (waterOrClay(grid, [x, y + 1]) && grid[y][x - 1] === tokens.sand) {
    grid[y][x - 1] = tokens.flow;
    flow(
      grid,
      [x - 1, y],
      [min, max],
    );
  }

  if (walled(grid, [x, y])) {
    fill(grid, [x, y]);
  }
};

const countMatching = (grid: string[][], [min, max]: number[], matches: string[]): number => {
  let count = 0;
  for (const row of grid.slice(min, max + 1)) {
    for (const cell of row) {
      if (matches.includes(cell)) {
        ++count;
      }
    }
  }

  return count;
};

const calcFor = (input: string, matches: string[]) : number => {
  const grid = parseInput(input);

  flow(
    grid.grid,
    [500, 0],
    [grid.yMin, grid.yMax],
  );

  return countMatching(grid.grid, [grid.yMin, grid.yMax], matches);

};

export const first = (input: string) => {
  return calcFor(input, [tokens.water, tokens.flow]);
};

export const second = (input: string) => {
  return calcFor(input, [tokens.water]);
};
