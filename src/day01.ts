const parseInput = (input: string) =>  input.split('\n').map(Number);

export const first = (input: string) => {
    const adjustments = parseInput(input);
    return adjustments.reduce((a : number, b : number) => a + b, 0);
};

export const second = (input: string) => {
    const adjustments = parseInput(input);
    let freq : number = 0;
    const seen = new Set();
    let index : number = 0;

    while (true) {
        if (seen.has(freq)) {
            return freq;
        } else {
            seen.add(freq);
        }
        freq += adjustments[index];
        index = (++index) % adjustments.length;
    }
};
