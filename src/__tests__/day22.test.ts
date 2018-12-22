import { first, second } from '../day22';

describe('First', () => {
  it('Score', () => {
    const input: string = `depth: 510
target: 10,10`;
    expect(first(input)).toBe(114);
  });
});

describe('Second', () => {
  it('Time taken', () => {
    const input: string = `depth: 510
target: 10,10`;
    expect(second(input, [20,20])).toBe(45);
  });
});
