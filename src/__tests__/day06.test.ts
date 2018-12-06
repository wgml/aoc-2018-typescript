import { first, second } from '../day06';

describe('First', () => {
  it('Should find area of 17', () => {
    const input: string = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
    expect(first(input)).toBe(17);
  });
});

describe('Second', () => {
  it('Should region of 16 points', () => {
    const input: string = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
    expect(second(input, 32)).toBe(16);
  });
});
