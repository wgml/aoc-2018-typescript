import { first, second } from "../day01"

describe('First', () => {
    it('Should return 3 for input +1, -2, +3, +1', () => {
        const input : string = `+1
        -2
        +3
        +1`;
        expect(first(input)).toBe(3);
    })
});

describe('First', () => {
    it('Should return 3 for input +1, +1, +1', () => {
        const input : string = `+1
        +1
        +1`;
        expect(first(input)).toBe(3);
    })
});

describe('First', () => {
    it('Should return 0 for input +1, +1, -2', () => {
        const input : string = `+1
        +1
        -2`;
        expect(first(input)).toBe(0);
    })
});

describe('First', () => {
    it('Should return -6 for input -1, -2, -3', () => {
        const input : string = `-1
        -2
        -3`;
        expect(first(input)).toBe(-6);
    })
});

describe('Second', () => {
    it('Should find duplicated frequency of 2', () => {
        const input : string = `+1
        -2
        +3
        +1`;
        expect(second(input)).toBe(2);
    })
});

describe('Second', () => {
    it('Should find duplicated frequency of 0', () => {
        const input : string = `+1
        -1`;
        expect(second(input)).toBe(0);
    })
});

describe('Second', () => {
    it('Should find duplicated frequency of 10', () => {
        const input : string = `+3
        +3
        +4
        -2
        -4`;
        expect(second(input)).toBe(10);
    })
});

describe('Second', () => {
    it('Should find duplicated frequency of 5', () => {
        const input : string = `-6
        +3
        +8
        +5
        -6`;
        expect(second(input)).toBe(5);
    })
});

describe('Second', () => {
    it('Should find duplicated frequency of 14', () => {
        const input : string = `+7
        +7
        -2
        -7
        -4`;
        expect(second(input)).toBe(14);
    })
});