import * as common from './common';

interface Operation {
  before: number[];
  test: number[];
  after: number[];
}

const instructions: Map<string, (mem: number[], a: number, b: number, c: number) => void> = new Map();

instructions.set('addr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] + mem[b];
});
instructions.set('addi', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] + b;
});
instructions.set('mulr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] * mem[b];
});
instructions.set('muli', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] * b;
});
instructions.set('banr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] & mem[b];
});
instructions.set('bani', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] & b;
});
instructions.set('borr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] | mem[b];
});
instructions.set('bori', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] | b;
});
instructions.set('setr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a];
});
instructions.set('seti', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = a;
});
instructions.set('gtir', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = a > mem[b] ? 1 : 0;
});
instructions.set('gtri', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] > b ? 1 : 0;
});
instructions.set('gtrr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] > mem[b] ? 1 : 0;
});
instructions.set('eqir', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = a === mem[b] ? 1 : 0;
});
instructions.set('eqrr', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] === b ? 1 : 0;
});
instructions.set('eqri', (mem: number[], a: number, b: number, c: number) => {
  mem[c] = mem[a] === mem[b] ? 1 : 0;
});
Object.freeze(instructions);

const parseOperations = (input: string): Operation[] => {
  const readMemory = (line: string): number[] => {
    return line
      .split(/[\[\],]/)
      .splice(1, 4)
      .map(s => parseInt(s, 10));
  };

  const result: Operation[] = [];
  for (const context of input.split('\n'.repeat(2))) {
    const lines = context.split('\n');
    const before = readMemory(lines[0]);
    const after = readMemory(lines[2]);
    const test = lines[1].split(' ').map(s => parseInt(s, 10));

    result.push({ before, test, after });
  }

  return result;
};

const parseTestProgram = (input: string): number[][] => {
  return input.split('\n').map(line => line.split(' ').map(i => parseInt(i, 10)));
};

const parseInput = (input: string): { examples: Operation[]; testProgram: number[][] } => {
  const [examples, testProgram] = input.split('\n'.repeat(4));

  return { examples: parseOperations(examples), testProgram: parseTestProgram(testProgram) };
};

const runExemplaryProgram = (
  operations: Operation[],
): { matchingOperations: Map<number, Map<string, number>>; atLeastThreeMatches: number } => {
  const matchingOperations: Map<number, Map<string, number>> = new Map();

  const noteInstructionUsed = (code: number, name: string) => {
    let codeMap = matchingOperations.get(code);
    if (!codeMap) {
      codeMap = new Map();
    }

    let codeVal = codeMap.get(name);
    if (!codeVal) {
      codeVal = 0;
    }
    codeMap.set(name, codeVal + 1);
    matchingOperations.set(code, codeMap);
  };

  let atLeastThreeMatches = 0;

  for (const operation of operations) {
    let matchingInstructions = 0;
    for (const [code, instr] of instructions.entries()) {
      const mem = [...operation.before];
      const [a, b, c] = operation.test.slice(1, 4);

      instr(mem, a, b, c);

      if (mem.every((v, i) => v === operation.after[i])) {
        matchingInstructions += 1;
        noteInstructionUsed(operation.test[0], code);
      }
    }
    if (matchingInstructions >= 3) {
      atLeastThreeMatches += 1;
    }
  }

  return { matchingOperations, atLeastThreeMatches };
};

const deduceInstructionSet = (matchingOperations: Map<number, Map<string, number>>): Map<number, string> => {
  const instrMap: Map<number, string> = new Map();

  const removeInstrFromMap = (name: string) => {
    for (let instr = 0; instr < 16; ++instr) {
      const map = matchingOperations.get(instr);
      if (!map) {
        continue;
      }

      map.delete(name);
      if (map.size === 0) {
        matchingOperations.delete(instr);
      }
    }
  };

  while (instrMap.size < 16) {
    for (let instr = 0; instr < 16; ++instr) {
      const map = matchingOperations.get(instr);
      if (!map || map.size > 1) {
        continue;
      }

      const instrName: string = map.keys().next().value;
      instrMap.set(instr, instrName);

      removeInstrFromMap(instrName);
    }
  }

  return instrMap;
};

const executeProgram = (instructionSet: Map<number, string>, program: number[][]): number[] => {
  const memory = Array(4).fill(0);

  for (const operation of program) {
    const instrCode = operation[0];
    const [a, b, c] = operation.slice(1, 4);

    const instrName = instructionSet.get(instrCode);
    if (!instrName) {
      return [-1];
    }
    const instruction = instructions.get(instrName);
    if (!instruction) {
      return [-2];
    }

    instruction(memory, a, b, c);
  }
  return memory;
};

export const first = (input: string) => {
  const operations = parseOperations(input.split('\n'.repeat(4))[0]);

  return runExemplaryProgram(operations).atLeastThreeMatches;
};

export const second = (input: string) => {
  const parsedInput = parseInput(input);

  const opMap = runExemplaryProgram(parsedInput.examples).matchingOperations;
  const instructionSet = deduceInstructionSet(opMap);
  const memory = executeProgram(instructionSet, parsedInput.testProgram);

  return memory[0];
};
