import { first, second } from '../day20';

describe('First', () => {
  it('Furthest room', () => {
    const input: string = `^WNE$`;
    expect(first(input)).toBe(3);
  });
});

describe('First', () => {
  it('Furthest room', () => {
    const input: string = `^ENWWW(NEEE|SSE(EE|N))$`;
    expect(first(input)).toBe(10);
  });
});

describe('First', () => {
  it('Furthest room', () => {
    const input: string = `^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`;
    expect(first(input)).toBe(18);
  });
});

describe('First', () => {
  it('Furthest room', () => {
    const input: string = `^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$`;
    expect(first(input)).toBe(23);
  });
});

describe('First', () => {
  it('Furthest room', () => {
    const input: string = `^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`;
    expect(first(input)).toBe(31);
  });
});
