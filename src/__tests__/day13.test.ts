import { first, second } from '../day13';

describe('First', () => {
  it('Should find position of first crash', () => {
    const input: string = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `;
    expect(first(input)).toBe('7,3');
  });
});

describe('Second', () => {
  it('Should find position of last cart', () => {
    const input: string = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`;
    expect(second(input)).toBe('6,4');
  });
});
