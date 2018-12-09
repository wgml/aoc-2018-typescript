import { first } from '../day09';

describe('First', () => {
  it('Should find scode of 32', () => {
    const input: string = `9 players; last marble is worth 25 points`;
    expect(first(input)).toBe(32);
  });
});

describe('First', () => {
  it('Additional examples', () => {
    const input: string = `10 players; last marble is worth 1618 points`;
    expect(first(input)).toBe(8317);
  });
});

describe('First', () => {
  it('Additional examples', () => {
    const input: string = `13 players; last marble is worth 7999 points`;
    expect(first(input)).toBe(146373);
  });
});

describe('First', () => {
  it('Additional examples', () => {
    const input: string = `17 players; last marble is worth 1104 points`;
    expect(first(input)).toBe(2764);
  });
});

describe('First', () => {
  it('Additional examples', () => {
    const input: string = `21 players; last marble is worth 6111 points`;
    expect(first(input)).toBe(54718);
  });
});

describe('First', () => {
  it('Additional examples', () => {
    const input: string = `30 players; last marble is worth 5807 points`;
    expect(first(input)).toBe(37305);
  });
});
