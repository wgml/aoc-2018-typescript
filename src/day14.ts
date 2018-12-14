import * as common from './common';

interface Scoreboard {
  board: number[];
  pos0: number;
  pos1: number;
}

const arraysEqual = (array1: number[], array2: number[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((v, i) => array2[i] === v);
};

const findScores = (scoreboard: number[], expected: number[]): { found: boolean; index: number } => {
  if (scoreboard.length < expected.length + 1) {
    return { found: false, index: -1 };
  }

  if (arraysEqual(scoreboard.slice(scoreboard.length - expected.length, scoreboard.length), expected)) {
    return { found: true, index: scoreboard.length - expected.length };
  }

  if (arraysEqual(scoreboard.slice(scoreboard.length - expected.length - 1, scoreboard.length - 1), expected)) {
    return { found: true, index: scoreboard.length - expected.length - 1 };
  }

  return { found: false, index: -1 };
};

const updateScoreboard = (scoreboard: Scoreboard) => {
  const elf0 = scoreboard.pos0;
  const elf1 = scoreboard.pos1;

  const score0 = scoreboard.board[elf0];
  const score1 = scoreboard.board[elf1];
  const score = score0 + score1;

  if (score >= 10) {
    scoreboard.board.push(Math.floor(score / 10));
    scoreboard.board.push(score % 10);
  } else {
    const recipe = score;
    scoreboard.board.push(recipe);
  }

  scoreboard.pos0 = (elf0 + 1 + score0) % scoreboard.board.length;
  scoreboard.pos1 = (elf1 + 1 + score1) % scoreboard.board.length;
};

export const first = (input: string) => {
  const numRecipes = parseInt(input, 10);

  const scoreboard: Scoreboard = { board: [3, 7], pos0: 0, pos1: 1 };

  while (scoreboard.board.length < numRecipes + 10) {
    updateScoreboard(scoreboard);
  }

  return scoreboard.board
    .slice(numRecipes, numRecipes + 10)
    .map(n => n.toString())
    .join('');
};

export const second = (input: string) => {
  const expectedScores = input.split('').map(s => parseInt(s, 10));

  const scoreboard: Scoreboard = { board: [3, 7], pos0: 0, pos1: 1 };

  while (true) {
    updateScoreboard(scoreboard);

    const searchResult = findScores(scoreboard.board, expectedScores);
    if (searchResult.found) {
      return searchResult.index;
    }
  }
};
