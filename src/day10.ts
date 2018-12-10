import * as common from './common';

interface Vec2 {
  x: number;
  y: number;
}

const rangesPairs = (positions: Vec2[]): { xs: Vec2; ys: Vec2 } => {
  const xs = positions.map(p => p.x);
  const ys = positions.map(p => p.y);

  return { xs: { x: Math.min(...xs), y: Math.max(...xs) }, ys: { x: Math.min(...ys), y: Math.max(...ys) } };
};

const ranges = (positions: Vec2[]): Vec2 => {
  const results = rangesPairs(positions);
  return { x: results.xs.y - results.xs.x, y: results.ys.y - results.ys.x };
};

const display = (positions: Vec2[], iteration: number) => {
  const results = rangesPairs(positions);

  process.stdout.write(`Iteration #${iteration}\n`);
  for (let y = results.ys.x; y <= results.ys.y; y++) {
    for (let x = results.xs.x; x <= results.xs.y; x++) {
      if (positions.some(p => p.x === x && p.y === y)) {
        process.stdout.write('#');
      } else {
        process.stdout.write(' ');
      }
    }
    process.stdout.write('\n');
  }
};

export const first = (input: string) => {
  return 'This is a manual one. Run second to find answers.';
};

export const second = (input: string) => {
  const positions: Vec2[] = [];
  const velocities: Vec2[] = [];

  common.input.listOfStrings(input).forEach(line => {
    const [dx, dy, vx, vy] = line.match(/-?\d+/g)!.map((v: string) => parseInt(v, 10));
    positions.push({ x: dx, y: dy });
    velocities.push({ x: vx, y: vy });
  });

  let minRanges = ranges(positions);

  let iterations = 0;
  const columns: number = process.stdout.columns ? process.stdout.columns : 80;
  while (++iterations) {
    for (let i = 0; i < positions.length; ++i) {
      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;
    }
    const curRanges = ranges(positions);

    if (curRanges.x * curRanges.y < minRanges.x * minRanges.y) {
      minRanges = curRanges;
    } else if (4 * curRanges.x * curRanges.y > minRanges.x * minRanges.y) {
      break;
    }
    if (curRanges.x <= columns) {
      display(positions, iterations);
    }
  }

  return --iterations;
};
