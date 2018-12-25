import * as common from './common';

type Constellation = number[][];

const parsePoints = (input: string): number[][] => {
  return input.split('\n').map(line => line.split(',').map(v => parseInt(v, 10)));
};

const manhattan = (a: number[], b: number[]): number => {
  return common
    .zip([a, b])
    .map(p => Math.abs(p[0] - p[1]))
    .reduce((d1, d2) => d1 + d2, 0);
};

const assignPointToConstellations = (point: number[], constellations: Constellation[]) => {
  for (const constellation of constellations) {
    for (const part of constellation) {
      if (manhattan(point, part) <= 3) {
        constellation.push(point);
        return;
      }
    }
  }
  constellations.push([point]);
};

const glueConstellations = (constellations: Constellation[]): Constellation[] => {
  const glueConstellation = (constellation: Constellation, candidates: Constellation[]) => {
    for (const candidate of candidates) {
      for (const origPoint of constellation) {
        for (const resultPoint of candidate) {
          if (manhattan(origPoint, resultPoint) <= 3) {
            constellation.forEach(point => candidate.push(point));
            return;
          }
        }
      }
    }
    candidates.push(constellation);
  };

  const result: Constellation[] = [];

  for (const constellation of constellations) {
    glueConstellation(constellation, result);
  }

  return result;
};

const reduceConstellations = (constellations: Constellation[]): Constellation[] => {
  let numConstellations = constellations.length;
  while (true) {
    constellations = glueConstellations(constellations);
    if (constellations.length === numConstellations) {
      break;
    }
    numConstellations = constellations.length;
  }

  return constellations;
};

export const first = (input: string) => {
  const points = parsePoints(input);

  let constellations: Constellation[] = [];
  for (const point of points) {
    assignPointToConstellations(point, constellations);
  }

  constellations = reduceConstellations(constellations);
  return constellations.length;
};

export const second = (input:string) => "⭐ Merry Christmas! ⭐";