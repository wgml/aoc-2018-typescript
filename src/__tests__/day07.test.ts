import { first, second } from '../day07';

describe('First', () => {
  it('Should deduce order of operations', () => {
    const input: string = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
    expect(first(input)).toBe('CABDFE');
  });
});

describe('First', () => {
  it('Should take 15 steps', () => {
    const input: string = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
    expect(second(input, 2, 0)).toBe(15);
  });
});
