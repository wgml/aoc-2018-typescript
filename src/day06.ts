import * as common from './common';

interface Point {
  x: number;
  y: number;
}

const parsePoints = (input: string): Point[] => {
  return common.input.listOfStrings(input).map(point => {
    const [x, y] = point.split(', ');
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  });
};

const deduceMaxCoord = (points: Point[]): number => {
  return points.map(point => Math.max(point.x, point.y)).reduce((a: number, b: number) => Math.max(a, b));
};

const distance = (a: Point, b: Point): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const first = (input: string) => {
  const points = parsePoints(input);
  const maxCoord = deduceMaxCoord(points) + 1;

  const areas = Array(points.length).fill(0);
  const ignored = Array(points.length).fill(false);

  for (let x = -maxCoord; x <= maxCoord; ++x) {
    for (let y = -maxCoord; y <= maxCoord; ++y) {
      let bestDist = 2 * maxCoord;
      let bestPoint = 0;
      let inTheMiddle = true;
      for (let p = 0; p < points.length; ++p) {
        const point = points[p];
        const dist = distance(point, { x, y });

        if (dist < bestDist) {
          bestDist = dist;
          bestPoint = p;
          inTheMiddle = false;
        } else if (dist === bestDist) {
          inTheMiddle = true;
        }
      }
      if (!inTheMiddle) {
        ++areas[bestPoint];
      }
      if (Math.abs(x) === maxCoord || Math.abs(y) === maxCoord) {
        ignored[bestPoint] = true;
      }
    }
  }

  return areas.filter((_, i) => !ignored[i]).reduce((area, best) => Math.max(area, best));
};

export const second = (input: string, maxDist?: number) => {
  if (!maxDist) {
    maxDist = 10000;
  }

  const points = parsePoints(input);
  const maxCoord = deduceMaxCoord(points) + maxDist / points.length;

  let matchingPoints = 0;
  for (let x = -maxCoord; x <= maxCoord; ++x) {
    for (let y = -maxCoord; y <= maxCoord; ++y) {
      let dist = 0;
      for (const point of points) {
        dist += Math.abs(point.x - x) + Math.abs(point.y - y);

        if (dist >= maxDist) {
          break;
        }
      }
      if (dist < maxDist) {
        matchingPoints++;
      }
    }
  }

  return matchingPoints;
};
