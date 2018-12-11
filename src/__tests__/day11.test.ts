import { calcPower, first, second } from '../day11';

describe('Power', () => {
  it('calculate power for examples', () => {
    expect(calcPower(122, 79, 57)).toBe(-5);
    expect(calcPower(217, 196, 39)).toBe(0);
    expect(calcPower(101, 153, 71)).toBe(4);
  });
});

describe('First', () => {
  it('Should find 33,45', () => {
    const input: string = `18`;
    expect(first(input)).toBe('33,45');
  });
});

describe('First', () => {
  it('Should find 21,61', () => {
    const input: string = `42`;
    expect(first(input)).toBe('21,61');
  });
});

describe('Second', () => {
  it('Should find 90,269 and width 16', () => {
    const input: string = `18`;
    expect(second(input)).toBe('90,269,16');
  });
});

describe('Second', () => {
  it('Should find 232,251 and width 12', () => {
    const input: string = `42`;
    expect(second(input)).toBe('232,251,12');
  });
});
