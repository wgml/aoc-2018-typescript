import { first, second } from '../day05';

describe('First', () => {
  it('Should find length of 10', () => {
    const input: string = `dabAcCaCBAcCcaDA`;
    expect(first(input)).toBe(10);
  });
});

describe('Second', () => {
  it('Should find length of 4', () => {
    const input: string = `dabAcCaCBAcCcaDA`;
    expect(second(input)).toBe(4);
  });
});
