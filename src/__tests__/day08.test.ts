import { first, second } from '../day08';

describe('First', () => {
  it('Should find metadata sum of 138', () => {
    const input: string = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;
    expect(first(input)).toBe(138);
  });
});

describe('Second', () => {
  it('Should value root node to 66', () => {
    const input: string = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;
    expect(second(input)).toBe(66);
  });
});
