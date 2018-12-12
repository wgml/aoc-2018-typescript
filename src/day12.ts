import * as common from './common';

class Combination {
  public result: boolean;

  private context: string;

  constructor(context: string, result: boolean) {
    this.context = context;
    this.result = result;
  }

  public match(state: string): boolean {
    return this.context.localeCompare(state) === 0;
  }
}

interface State {
  state: string;
  offset: number;
  generation: number;
}

const readInput = (input: string): { initialState: string; rules: Combination[] } => {
  const rows = common.input.listOfStrings(input);
  const initialState = rows[0].split(': ')[1].replace(/\./g, ' ');

  const rules = rows.slice(2).map(row => {
    const [context, result] = row.split(' => ');
    return new Combination(context.replace(/\./g, ' '), result === '#');
  });

  return { initialState, rules };
};

const calcState = (initialState: State, rules: Combination[]): State => {
  let state = initialState.state;
  let offset = initialState.offset;

  state = ' '.repeat(5) + state + ' '.repeat(5);
  offset -= 5;

  const newState = Array(state.length).fill(false);

  for (let i = 0; i < state.length - 5; ++i) {
    newState[i + 2] = state.charAt(i + 2) === '#';
    for (const rule of rules) {
      if (rule.match(state.substr(i, 5))) {
        newState[i + 2] = rule.result;
        break;
      }
    }
  }
  state = [...newState].map(s => (s ? '#' : ' ')).join('');
  offset += state.indexOf('#');
  state = state.trim();

  const generation = initialState.generation + 1;

  return { state, offset, generation };
};

const calcSum = (state: State): number => {
  return state.state
    .split('')
    .map((c, i) => (c === '#' ? i + state.offset : 0))
    .reduce((a: number, b: number) => a + b);
};

const calcWithCache = (initialState: State, rules: Combination[], iterations: number): State => {
  let state = initialState;

  const cache: Map<string, State> = new Map();

  while (state.generation < iterations) {
    const previousState = cache.get(state.state);
    if (previousState) {
      const interationDiff = state.generation - previousState.generation;
      if (interationDiff > 0) {
        const cycles = Math.floor((iterations - state.generation) / interationDiff);

        if (cycles > 0) {
          const offsetDiff = state.offset - previousState.offset;
          state.generation += cycles * interationDiff;
          state.offset += cycles * offsetDiff;
          continue;
        }
      }
    }
    state = calcState(state, rules);

    if (!cache.has(state.state)) {
      cache.set(state.state, state);
    }
  }
  return state;
};

const execute = (input: string, iterations: number): number => {
  const parsedInput = readInput(input);

  const state = { state: parsedInput.initialState, offset: 0, generation: 0 };
  const result = calcWithCache(state, parsedInput.rules, iterations);
  return calcSum(result);
};

export const first = (input: string) => execute(input, 20);

export const second = (input: string) => execute(input, 50000000000);
