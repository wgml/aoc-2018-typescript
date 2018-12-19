import * as common from './common';

const sumOfDivisors = (num: number) => {
  return Array(Math.floor(Math.sqrt(num)))
    .fill(0)
    .map((_, i) => i + 1)
    .filter(divisor => num % divisor === 0)
    .map(divisor => divisor + Math.floor(num / divisor))
    .reduce((a, b) => a + b);
};

const numOf = (line: string, pos: number) => parseInt(line.split(' ')[pos], 10);

export const first = (input: string) => {
  const lines = common.input.listOfStrings(input);
  const limit = numOf(lines[22], 2) * 22 + numOf(lines[24], 2) + 836;

  return sumOfDivisors(limit);
};

export const second = (input: string) => {
  const lines = common.input.listOfStrings(input);
  const limit = 10550400 + numOf(lines[22], 2) * 22 + numOf(lines[24], 2) + 836;

  return sumOfDivisors(limit);
};
