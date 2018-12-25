import { first } from '../day25';

describe('First', () => {
  it('Find 2 constellations', () => {
    const input: string = `0,0,0,0
3,0,0,0
0,3,0,0
0,0,3,0
0,0,0,3
0,0,0,6
9,0,0,0
12,0,0,0`;
    expect(first(input)).toBe(2);
  });
});

describe('First', () => {
  it('Find 2 constellations', () => {
    const input: string = `-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`;
    expect(first(input)).toBe(4);
  });
});

describe('First', () => {
  it('Find 2 constellations', () => {
    const input: string = `1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2`;
    expect(first(input)).toBe(3);
  });
});

describe('First', () => {
  it('Find 2 constellations', () => {
    const input: string = `1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`;
    expect(first(input)).toBe(8);
  });
});
