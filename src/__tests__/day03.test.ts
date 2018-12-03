import { first, second } from '../day03';

describe('First', () => {
  it('Check number of claims', () => {
    const input: string = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
    expect(first(input)).toBe(4);
  });
});

describe('Second', () => {
  it('Check if finds unique non-overlapping', () => {
    const input: string = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
    expect(second(input)).toBe(3);
  });
});
