import * as common from './common';

const EntityType = { elf: 0, goblin: 1 };
Object.freeze(EntityType);

interface Coord {
  x: number;
  y: number;
}

const coordKey = (coord: Coord): string => `${coord.x},${coord.y}`;

class Entity {
  public hp: number = 200;
  public attack: number = 3;
  public type: number;

  public coord: Coord;

  constructor(type: number, coord: Coord) {
    this.type = type;
    this.coord = coord;
  }
}

const sortByPos = (a: Entity, b: Entity): number =>
  a.coord.y !== b.coord.y ? a.coord.y - b.coord.y : a.coord.x - b.coord.x;

const parseInput = (input: string) => {
  const board = input.split('\n').map(s => s.split(''));

  const elves: Entity[] = [];
  const goblins: Entity[] = [];

  for (let y = 0; y < board.length; ++y) {
    const line = board[y];
    for (let x = 0; x < line.length; ++x) {
      const symbol = line[x];

      if (symbol === 'E') {
        elves.push(new Entity(EntityType.elf, { x, y }));
      } else if (symbol === 'G') {
        goblins.push(new Entity(EntityType.goblin, { x, y }));
      }
    }
  }

  const map = board.map(line => line.map(symbol => symbol === '#'));
  return { map, elves, goblins };
};

const findTarget = (
  fighter: Entity,
  targets: Entity[],
  nonTargets: Entity[],
  map: boolean[][],
): { move: Coord | undefined; distance: number; target: Entity | undefined } => {
  const visitables: Coord[] = [];
  const history: Map<string, Coord> = new Map();
  const distance: Map<string, number> = new Map();

  distance.set(coordKey(fighter.coord), 0);

  const handleIncrements = (current: Coord) => {
    const incremets: Coord[] = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];

    for (const inc of incremets) {
      const coords = { x: current.x + inc.x, y: current.y + inc.y };
      const key = coordKey(coords);

      if (history.has(key)) {
        continue;
      }

      visitables.push(coords);
      history.set(key, current);
      distance.set(key, 1 + (distance.get(coordKey(current)) || 0));
    }
  };

  handleIncrements(fighter.coord);

  let target = null;
  while (visitables.length > 0) {
    const candidate = visitables.shift();
    if (!candidate) {
      continue;
    }

    if (candidate.x < 0 || candidate.y < 0 || candidate.y >= map.length || candidate.x >= map[candidate.y].length) {
      continue;
    }

    if (map[candidate.y][candidate.x]) {
      continue;
    }

    if (nonTargets.some(t => t.coord.x === candidate.x && t.coord.y === candidate.y)) {
      continue;
    }

    const attackables = targets.filter(t => t.coord.x === candidate.x && t.coord.y === candidate.y);

    if (attackables.length === 1) {
      target = attackables[0];
      break;
    }

    handleIncrements(candidate);
  }

  if (!target) {
    return { move: undefined, distance: 0, target: undefined };
  }

  let coord = target.coord;
  let next = history.get(coordKey(coord)) || fighter.coord;
  while (coordKey(next) !== coordKey(fighter.coord)) {
    coord = next;
    next = history.get(coordKey(coord)) || fighter.coord;
  }

  return { move: coord, distance: distance.get(coordKey(target.coord)) || 0, target };
};

const move = (fighter: Entity, targets: Entity[], nonTargets: Entity[], map: boolean[][]): number | undefined => {
  const result = findTarget(fighter, targets, nonTargets, map);

  if (result.move !== undefined && result.distance > 1) {
    fighter.coord = result.move;
    --result.distance;
  }

  return result.distance;
};

const attack = (fighter: Entity, targets: Entity[]) => {
  const targetsSorted = targets
    .filter(t => Math.abs(t.coord.x - fighter.coord.x) + Math.abs(t.coord.y - fighter.coord.y) === 1)
    .sort(sortByPos)
    .sort((a, b) => a.hp - b.hp);

  if (targetsSorted.length === 0) {
    return;
  }

  const target = targetsSorted[0];
  target.hp -= fighter.attack;
};

const simulate = (
  elves: Entity[],
  goblins: Entity[],
  map: boolean[][],
): { rounds: number; elves: Entity[]; goblins: Entity[] } => {
  let turn = -1;
  while (elves.length > 0 && goblins.length > 0) {
    const fighters = elves.concat(goblins).sort(sortByPos);

    for (const fighter of fighters) {
      if (fighter.hp <= 0) {
        continue;
      }

      const alive = (entities: Entity[]) => entities.filter(e => e.hp > 0);
      const targets = alive(fighter.type === EntityType.elf ? goblins : elves);
      const nonTargets = alive(fighter.type === EntityType.elf ? elves : goblins);
      if (targets.length === 0) {
        break;
      }

      const distance = move(fighter, targets, nonTargets, map);
      if (distance && distance <= 1) {
        attack(fighter, targets);
      }
    }

    elves = elves.filter(e => e.hp > 0);
    goblins = goblins.filter(g => g.hp > 0);
    ++turn;
  }

  return { rounds: turn, elves, goblins };
};

const result = (rounds: number, elves: Entity[], goblins: Entity[]): number => {
  return (
    rounds *
    elves
      .concat(goblins)
      .map(e => e.hp)
      .reduce((a, b) => a + b, 0)
  );
};

export const first = (input: string) => {
  const simulation = parseInput(input);
  simulation.elves.forEach(e => (e.attack = 3));
  const res = simulate(simulation.elves, simulation.goblins, simulation.map);

  return result(res.rounds, res.elves, res.goblins);
};

export const second = (input: string) => {
  for (let attackPower = 3; attackPower < Number.MAX_SAFE_INTEGER; ++attackPower) {
    const simulation = parseInput(input);
    simulation.elves.forEach(e => (e.attack = attackPower));
    const res = simulate(simulation.elves, simulation.goblins, simulation.map);

    if (res.elves.length === simulation.elves.length) {
      return result(res.rounds, res.elves, res.goblins);
    }
  }
};
