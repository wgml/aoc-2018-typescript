import { first, second } from '../day14';

describe('First', () => {
  it('Score after 9 recipes', () => {
    const input: string = `9`;
    expect(first(input)).toBe('5158916779');
  });
});

describe('First', () => {
  it('Score after 5 recipes', () => {
    const input: string = `5`;
    expect(first(input)).toBe('0124515891');
  });
});

describe('First', () => {
  it('Score after 18 recipes', () => {
    const input: string = `18`;
    expect(first(input)).toBe('9251071085');
  });
});

describe('First', () => {
  it('Score after 2018 recipes', () => {
    const input: string = `2018`;
    expect(first(input)).toBe('5941429882');
  });
});

describe('Second', () => {
  it('Score appears 9 recipes', () => {
    const input: string = `51589`;
    expect(second(input)).toBe(9);
  });
});

describe('Second', () => {
  it('Score appears 5 recipes', () => {
    const input: string = `01245`;
    expect(second(input)).toBe(5);
  });
});

describe('Second', () => {
  it('Score appears 18 recipes', () => {
    const input: string = `92510`;
    expect(second(input)).toBe(18);
  });
});

describe('Second', () => {
  it('Score appears 2018 recipes', () => {
    const input: string = `59414`;
    expect(second(input)).toBe(2018);
  });
});
