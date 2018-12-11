import * as common from './common';

interface Cell {
  x: number;
  y: number;
  power: number;
  width: number;
}

export const calcPower = (x: number, y: number, serial: number): number => {
  const rackId = x + 10;
  const power = (rackId * y + serial) * rackId;
  return Math.floor((power % 1000) / 100) - 5;
};

const buildPartialSumMatrix = (maxWidth: number, powerFunc: (x: number, y: number) => number): number[][] => {
  const partialSums: number[][] = Array(maxWidth + 1)
    .fill([])
    .map(() => Array(maxWidth + 1).fill(0));

  for (let y = 1; y <= maxWidth; ++y) {
    for (let x = 1; x <= maxWidth; ++x) {
      const cellPower = powerFunc(x, y);
      partialSums[y][x] = cellPower + partialSums[y - 1][x] + partialSums[y][x - 1] - partialSums[y - 1][x - 1];
    }
  }

  return partialSums;
};

const findBestCell = (matrix: number[][], width: number, maxWidth: number): Cell => {
  let bestPower = Number.MIN_SAFE_INTEGER;
  let bestX = 0;
  let bestY = 0;

  for (let y = width; y <= maxWidth; ++y) {
    for (let x = width; x <= maxWidth; ++x) {
      const power = matrix[y][x] - matrix[y - width][x] - matrix[y][x - width] + matrix[y - width][x - width];
      if (power > bestPower) {
        bestPower = power;
        bestX = x;
        bestY = y;
      }
    }
  }

  return { x: bestX - width + 1, y: bestY - width + 1, power: bestPower, width };
};

export const first = (input: string) => {
  const serial = parseInt(input, 10);

  const maxWidth = 300;
  const width = 3;

  const partialSums = buildPartialSumMatrix(maxWidth, (x, y) => calcPower(x, y, serial));

  const cell = findBestCell(partialSums, width, maxWidth);

  return `${cell.x},${cell.y}`;
};

export const second = (input: string) => {
  const serial = parseInt(input, 10);

  const maxWidth = 300;
  const partialSums = buildPartialSumMatrix(maxWidth, (x, y) => calcPower(x, y, serial));

  let bestCell = findBestCell(partialSums, 1, maxWidth);
  for (let width = 2; width <= maxWidth; ++width) {
    const cell = findBestCell(partialSums, width, maxWidth);
    if (cell.power > bestCell.power) {
      bestCell = cell;
    }
  }

  return `${bestCell.x},${bestCell.y},${bestCell.width}`;
};
