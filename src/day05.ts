import * as common from './common';

const calculateReaction = (polymer: string): number => {
  let index = 0;

  while (index + 1 < polymer.length) {
    const a = polymer.charCodeAt(index);
    const b = polymer.charCodeAt(index + 1);

    if (Math.abs(a - b) === 32) {
      polymer = polymer.substring(0, index) + polymer.substr(index + 2);
      --index;
    } else {
      ++index;
    }
  }

  return polymer.length;
};

export const first = (input: string) => {
  return calculateReaction(input);
};

export const second = (input: string) => {
  const inputLower = input.toLowerCase();
  const uniqueUnits = input
    .toLowerCase()
    .split('')
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .join('');

  let best = input.length;
  for (const unit of uniqueUnits) {
    const polymer = input
      .split('')
      .filter(c => c.toLowerCase() !== unit)
      .join('');

    best = Math.min(best, calculateReaction(polymer));
  }

  return best;
};
