import { first } from '../day16';

describe('First', () => {
  it('Calculating score', () => {
    const input: string = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`;
    expect(first(input)).toBe(1);
  });
});
