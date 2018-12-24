import * as common from './common';

const army = {
  immuneSystem: 0,
  infection: 1,
};

interface Group {
  type: number;
  units: number;
  hp: number;
  attackPoints: number;
  attackType: string;
  initiative: number;
  immunes: string[];
  weaknesses: string[];
}

const parsePerks = (perks: RegExpMatchArray | null): { immunes: string[]; weaknesses: string[] } => {
  let immunes: string[] = [];
  let weaknesses: string[] = [];

  if (!perks) {
    return { immunes, weaknesses };
  }

  const perksStr = perks[0].slice(1, perks[0].length - 1);
  for (const perk of perksStr.split('; ')) {
    const types = perk.split(' to ');
    const separated = types[1].split(', ');
    if (perk.startsWith('immune')) {
      immunes = separated;
    } else {
      weaknesses = separated;
    }
  }

  return { immunes, weaknesses };
};

const parseAttackType = (input: string): string => {
  const regex = /does \d+ ([a-z]+) damage/;
  const match = regex.exec(input);

  if (!match) {
    throw new Error('Failed to parse input');
  }
  return match[1];
};

const parseArmy = (input: string, type: number, attackBoost: number): Group[] => {
  const result: Group[] = [];

  for (const line of input.split('\n').slice(1)) {
    const { immunes, weaknesses } = parsePerks(line.match(/\(.*\)/g));
    const [units, hp, attackPoints, initiative] = line.match(/\d+/g)!.map(v => parseInt(v, 10));
    const attackType = parseAttackType(line);

    result.push({
      type,
      units,
      hp,
      attackPoints: attackPoints + attackBoost,
      attackType,
      initiative,
      immunes,
      weaknesses,
    });
  }

  return result;
};

const parseArmies = (input: string, immuneSystemBoost: number): { system: Group[]; infection: Group[] } => {
  const [system, infection] = input.split('\n\n');

  return {
    system: parseArmy(system, army.immuneSystem, immuneSystemBoost),
    infection: parseArmy(infection, army.infection, 0),
  };
};

const effectivePower = (group: Group): number => group.units * group.attackPoints;

const sortByPower = (a: Group, b: Group): number => {
  const p1 = effectivePower(a);
  const p2 = effectivePower(b);

  if (p1 !== p2) {
    return p2 - p1;
  }

  return b.initiative - a.initiative;
};

const calcAttack = (attacker: Group, target: Group): number => {
  if (target.immunes.includes(attacker.attackType)) {
    return 0;
  }

  let attackPower = effectivePower(attacker);
  if (target.weaknesses.includes(attacker.attackType)) {
    attackPower *= 2;
  }

  return attackPower;
};

const selectTarget = (attacker: Group, targets: Group[], occupied: Array<Group | null>): Group | null => {
  let bestTarget: Group | null = null;
  let bestAttack = 0;
  let bestPower = 0;

  for (const target of targets) {
    const attackPower = calcAttack(attacker, target);

    if (occupied.includes(target)) {
      continue;
    }
    const targetPower = effectivePower(target);
    if (attackPower < bestAttack) {
      continue;
    }
    if (attackPower === bestAttack) {
      if (targetPower < bestPower) {
        continue;
      }
      if (targetPower === bestPower) {
        if (bestTarget && target.initiative <= bestTarget.initiative) {
          continue;
        }
      }
    }

    bestTarget = target;
    bestAttack = attackPower;
    bestPower = targetPower;
  }

  return bestTarget;
};

const attack = (attacker: Group, target: Group) => {
  const power = calcAttack(attacker, target);

  const loses = Math.floor(power / target.hp);
  target.units = Math.max(0, target.units - loses);
};

const countUnits = (groups: Group[]): number => groups.map(g => g.units).reduce((a, b) => a + b, 0);

const byAttackerInitiative = (a: Array<Group | null>, b: Array<Group | null>): number =>
  b[0]!.initiative - a[0]!.initiative;

export const first = (input: string) => {
  const { system, infection } = calculateWithBoost(input, 0);
  return countUnits(system) + countUnits(infection);
};

const calculateWithBoost = (input: string, systemBoost: number): { system: Group[]; infection: Group[] } => {
  let { system, infection } = parseArmies(input, systemBoost);

  let remainingUnits = countUnits(system) + countUnits(infection);
  while (system.length > 0 && infection.length > 0) {
    const byEffectivePower = system.concat(infection).sort(sortByPower);
    const targets: Array<Group | null> = [];
    for (const attacker of byEffectivePower) {
      targets.push(selectTarget(attacker, attacker.type === army.immuneSystem ? infection : system, targets));
    }

    const attackersAndTargets = common.zip([byEffectivePower, targets]).sort(byAttackerInitiative);
    for (const [attacker, target] of attackersAndTargets) {
      if (!attacker || !target) {
        continue;
      }
      attack(attacker, target);
    }

    system = system.filter(group => group.units > 0);
    infection = infection.filter(group => group.units > 0);

    const unitsAfterFight = countUnits(system) + countUnits(infection);
    if (unitsAfterFight === remainingUnits) {
      break;
    }
    remainingUnits = unitsAfterFight;
  }

  return { system, infection };
};

export const second = (input: string) => {
  let boost = 0;
  while (true) {
    const { system, infection } = calculateWithBoost(input, boost);

    if (system.length > 0 && infection.length === 0) {
      return countUnits(system);
    }
    ++boost;
  }
};
