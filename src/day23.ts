interface Nanobot {
  x: number;
  y: number;
  z: number;
  r: number;
}

const parseNanobots = (input: string): Nanobot[] => {
  const result: Nanobot[] = [];

  for (const line of input.split('\n')) {
    const [x, y, z, r] = line.match(/\-?\d+/g)!.map(v => parseInt(v, 10));
    result.push({ x, y, z, r });
  }

  return result;
};

const manhattan = (a: Nanobot, b: Nanobot): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
};

const calcIncrement = ([xmax, xmin, ymax, ymin, zmax, zmin]: number[]) => {
  let increment = 1;

  const biggestDist = Math.max(xmax - xmin, ymax - ymin, zmax - zmin);
  while (increment < biggestDist) {
    increment *= 2;
  }
  return increment;
};

const nanobotsInRange = (nanobots: Nanobot[], x: number, y: number, z: number) => {
  let count = 0;

  for (const bot of nanobots) {
    const dist = Math.abs(bot.x - x) + Math.abs(bot.y - y) + Math.abs(bot.z - z);
    if (dist <= bot.r) {
      ++count;
    }
  }
  return count;
};

export const first = (input: string) => {
  const nanobots = parseNanobots(input);
  const largest = nanobots.reduce((a, b) => (a.r > b.r ? a : b));

  let intersecting = 0;
  for (const nanobot of nanobots) {
    if (manhattan(nanobot, largest) <= largest.r) {
      ++intersecting;
    }
  }

  return intersecting;
};

export const second = (input: string) => {
  const nanobots = parseNanobots(input);
  const xs = nanobots.map(b => b.x);
  const ys = nanobots.map(b => b.y);
  const zs = nanobots.map(b => b.z);

  let [xmin, xmax] = [Math.min(...xs), Math.max(...xs)];
  let [ymin, ymax] = [Math.min(...ys), Math.max(...ys)];
  let [zmin, zmax] = [Math.min(...zs), Math.max(...zs)];

  let increment = 1;
  increment = calcIncrement([xmax, xmin, ymax, ymin, zmax, zmin]);

  while (true) {
    let best: number[] = [];
    let bestCount = 0;
    let bestDist = Number.MAX_SAFE_INTEGER;

    for (let x = xmin; x <= xmax; x += increment) {
      for (let y = ymin; y <= ymax; y += increment) {
        for (let z = zmin; z <= zmax; z += increment) {
          const count = nanobotsInRange(nanobots, x, y, z);

          const distance = Math.abs(x) + Math.abs(y) + Math.abs(z);
          if (count > bestCount || (count === bestCount && bestDist > distance)) {
            bestCount = count;
            bestDist = distance;
            best = [x, y, z];
          }
        }
      }
    }

    if (increment === 1) {
      return bestDist;
    }

    [xmin, xmax] = [best[0] - increment, best[0] + increment];
    [ymin, ymax] = [best[1] - increment, best[1] + increment];
    [zmin, zmax] = [best[2] - increment, best[2] + increment];
    increment /= 2;
  }
};
