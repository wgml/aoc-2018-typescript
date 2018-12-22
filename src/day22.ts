import { PriorityQueue } from './tinyqueue';

const tokens = {
  rocky: 0,
  wet: 1,
  narrow: 2,
};

const equipment = {
  torch: 0,
  climbing: 1,
  none: 2,
};

interface State {
  pos: number[];
  tool: number;
  time: number;
}

const depthAndTarget = (input: string): { depth: number; target: number[] } => {
  const parts = input.split('\n').map(l => l.split(' '));
  const depth = parseInt(parts[0][1], 10);
  const target = parts[1][1].split(',').map(c => parseInt(c, 10));

  return { depth, target };
};

const geologicIndex = ([x, y]: number[], [xt, yt]: number[], depth: number, cache: Map<string, number>): number => {
  const desc = `${x},${y}`;

  const existing = cache.get(desc);
  if (existing) {
    return existing;
  }

  let index = 0;
  if (x === 0 && y === 0) {
    index = 0;
  } else if (x === xt && y === yt) {
    index = 0;
  } else if (y === 0) {
    index = x * 16807;
  } else if (x === 0) {
    index = y * 48271;
  } else {
    index = erosionLevel([x - 1, y], [xt, yt], depth, cache) * erosionLevel([x, y - 1], [xt, yt], depth, cache);
  }

  cache.set(desc, index);
  return index;
};

const erosionLevel = ([x, y]: number[], [xt, yt]: number[], depth: number, cache: Map<string, number>): number => {
  return (geologicIndex([x, y], [xt, yt], depth, cache) + depth) % 20183;
};

const buildRegionsMap = (depth: number, target: number[], limit?: number[]): number[][] => {
  const cache: Map<string, number> = new Map();

  const limitX = limit ? limit[0] : target[0] + 1;
  const limitY = limit ? limit[1] : target[1] + 1;

  const map = Array(limitY)
    .fill(0)
    .map(() => Array(limitX).fill(0));

  for (let row = 0; row < limitY; ++row) {
    for (let col = 0; col < limitX; ++col) {
      map[row][col] = erosionLevel([col, row], target, depth, cache) % 3;
    }
  }

  return map;
};

const isValidTool = ([x, y]: number[], tool: number, regionsMap: number[][]) => {
  const type = regionsMap[y][x];
  if (type === tokens.rocky && tool !== equipment.none) {
    return true;
  }
  if (type === tokens.wet && tool !== equipment.torch) {
    return true;
  }
  if (type === tokens.narrow && tool !== equipment.climbing) {
    return true;
  }

  return false;
};

export const first = (input: string) => {
  const properties = depthAndTarget(input);
  const regionsMap = buildRegionsMap(properties.depth, properties.target);

  return regionsMap.map(row => row.reduce((a, b) => a + b)).reduce((a, b) => a + b);
};

export const second = (input: string, limit?: number[]) => {
  const seenDesc = (s: State) => {
    return `${s.pos[0]},${s.pos[1]},${s.tool}`;
  };

  if (!limit) {
    limit = [1001, 1001];
  }

  const properties = depthAndTarget(input);
  const regionsMap = buildRegionsMap(properties.depth, properties.target, limit);

  const atTarget = (state: State) =>
    state.pos[0] === properties.target[0] && state.pos[1] === properties.target[1] && state.tool === equipment.torch;

  const heap: PriorityQueue<State> = new PriorityQueue([], (a: State, b: State) => a.time - b.time);
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  const seen: Set<string> = new Set();
  heap.push({ pos: [0, 0], tool: equipment.torch, time: 0 });

  while (heap.length > 0) {
    const state = heap.pop();
    if (!state) {
      return -1;
    }

    if (atTarget(state)) {
      return state.time;
    }

    const desc = seenDesc(state);
    if (seen.has(desc)) {
      continue;
    }
    seen.add(desc);

    for (let tool = 0; tool < 3; ++tool) {
      if (tool !== state.tool && isValidTool(state.pos, tool, regionsMap)) {
        heap.push({ pos: state.pos, tool, time: state.time + 7 });
      }
    }

    for (const dir of directions) {
      const x = state.pos[0] + dir[0];
      const y = state.pos[1] + dir[1];

      if (x < 0 || x >= limit[0]) {
        continue;
      }

      if (y < 0 || y >= limit[1]) {
        continue;
      }

      if (isValidTool([x, y], state.tool, regionsMap)) {
        heap.push({ pos: [x, y], tool: state.tool, time: state.time + 1 });
      }
    }
  }
};
