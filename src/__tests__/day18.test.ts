import { first, second } from '../day18';

describe('First', () => {
  it('Rechable cells', () => {
    const input: string = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;
    expect(first(input)).toBe(1147);
  });
});
