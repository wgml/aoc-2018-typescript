import { first, second } from '../day15';

describe('First', () => {
  it('Calculating score', () => {
    const input: string = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;
    expect(first(input)).toBe(36334);
  });
});

describe('First', () => {
  it('Calculating score', () => {
    const input: string = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;
    expect(first(input)).toBe(39514);
  });
});

describe('First', () => {
  it('Calculating score', () => {
    const input: string = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;
    expect(first(input)).toBe(27755);
  });
});

describe('First', () => {
  it('Calculating score', () => {
    const input: string = `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`;
    expect(first(input)).toBe(28944);
  });
});

describe('First', () => {
  it('Calculating score', () => {
const input: string = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;
    expect(first(input)).toBe(18740);
  });
});

describe('Second', () => {
  it('Calculating score', () => {
    const input: string = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;
    expect(second(input)).toBe(31284);
  });
});
