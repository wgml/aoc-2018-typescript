const directions = new Map();
directions.set('N', [0, -1]);
directions.set('S', [0, 1]);
directions.set('W', [-1, 0]);
directions.set('E', [1, 0]);
Object.freeze(directions);

const updateDistance = (distances: Map<string, number>, position: number[], previous: number[]) => {
  const desc = `${position[0]},${position[1]}`;
  const distance = distances.get(desc);
  const descPrev = `${previous[0]},${previous[1]}`;
  let distancePrev = distances.get(descPrev);
  if (!distancePrev) {
    distancePrev = 0;
  }
  if (distance) {
    distances.set(desc, Math.min(distance, distancePrev + 1));
  } else {
    distances.set(desc, distancePrev + 1);
  }
};

const calculateDistances = (input: string) => {
  let position = [0, 0];
  let previous = [...position];

  const stack: number[][] = [];
  const distances: Map<string, number> = new Map();
  const chars = input.split('');

  for (const c of chars.slice(1, chars.length - 1)) {
    switch (c) {
      case '(':
        stack.push([...position]);
        break;
      case ')':
        const pos = stack.pop();
        if (pos) {
          position = pos;
        }
        break;
      case '|':
        position = [...stack[stack.length - 1]];
        break;
      default:
        const dir = directions.get(c);
        if (!dir) {
          break;
        }
        position[0] += dir[0];
        position[1] += dir[1];

        updateDistance(distances, position, previous);
    }
    previous = [...position];
  }

  return distances;
};

export const first = (input: string) => {
  const distances = calculateDistances(input);

  let max = 0;
  for (const dist of distances.values()) {
    max = Math.max(max, dist);
  }

  return max;
};

export const second = (input: string) => {
  const distances = calculateDistances(input);

  let count = 0;
  for (const dist of distances.values()) {
    if (dist >= 1000) {
      ++count;
    }
  }

  return count;
};
