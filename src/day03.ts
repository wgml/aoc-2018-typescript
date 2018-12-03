import * as common from './common';

interface Coord {
  x: number;
  y: number;
}

interface Claim {
  id: number;
  start: Coord;
  size: Coord;
}

const buildClaims = (input: string) => {
  const descs = common.input.listOfStrings(input);

  return descs.map(desc => {
    const [id, x1, y1, x2, y2] = desc.match(/\d+/g)!.map(v => parseInt(v, 10));
    return { id, start: { x: x1, y: y1 }, size: { x: x2, y: y2 } };
  });
};

const buildCells = (claims: Claim[]) => {
  const cells = new Map();
  for (const claim of claims) {
    for (let x = claim.start.x; x < claim.start.x + claim.size.x; ++x) {
      for (let y = claim.start.y; y < claim.start.y + claim.size.y; ++y) {
        const coord = `${x}.${y}`;

        if (!cells.has(coord)) {
          cells.set(coord, []);
        }
        cells.set(coord, cells.get(coord).concat(claim.id));
      }
    }
  }

  return cells;
};

export const first = (input: string) => {
  let count = 0;
  for (const v of buildCells(buildClaims(input)).values()) {
    if (v.length >= 2) {
      count += 1;
    }
  }
  return count;
};

export const second = (input: string) => {
  const claims: Claim[] = buildClaims(input);

  const overlaps: Set<number> = new Set();
  for (const claimIds of buildCells(claims).values()) {
    if (claimIds.length === 1) {
      continue;
    }
    claimIds.forEach((id: number) => overlaps.add(id));
  }

  for (const claim of claims) {
    if (!overlaps.has(claim.id)) {
      return claim.id;
    }
  }
  return -1;
};
