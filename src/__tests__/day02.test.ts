import { first, second } from '../day02';

describe('First', () => {
  it('Check for twos and threes', () => {
    const input: string = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`;
    expect(first(input)).toBe(12);
  });
});

describe('Second', () => {
  it('Should find difference of 1', () => {
    const input: string = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`;
    expect(second(input)).toBe('fgij');
  });
});
