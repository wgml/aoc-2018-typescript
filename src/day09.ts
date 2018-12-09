import * as common from './common';

class Node {
  public value: number;
  public next: Node;
  public prev: Node;

  constructor(value: number) {
    this.value = value;
    this.next = this;
    this.prev = this;
  }

  public rotate(increment: number): Node {
    let result: Node = this;

    if (increment > 0) {
      for (let i = 0; i < increment; ++i) {
        result = result.next;
      }
    } else if (increment < 0) {
      for (let i = 0; i > increment; --i) {
        result = result.prev;
      }
    }
    return result;
  }
}

const add = (value: number, next: Node): Node => {
  const node: Node = {
    next: next.next,
    prev: next,
    rotate: Node.prototype.rotate,
    value,
  };
  next.next.prev = node;
  next.next = node;

  return node;
};

const calculate = (players: number, marbles: number): number => {
  const scores: number[] = Array(players).fill(0);
  let currentMarble = new Node(0);

  for (let marble = 1; marble <= marbles; ++marble) {
    if (marble % 23 !== 0) {
      currentMarble = add(marble, currentMarble.next);
    } else {
      scores[marble % players] += marble;
      currentMarble = currentMarble.rotate(-6);
      scores[marble % players] += currentMarble.prev.value;
      currentMarble.prev.prev.next = currentMarble;
      currentMarble.prev = currentMarble.rotate(-2);
    }
  }
  return Math.max(...scores);
};

export const first = (input: string) => {
  const parts = input.split(' ');
  const players = parseInt(parts[0], 10);
  const lastMarble = parseInt(parts[6], 10);

  return calculate(players, lastMarble);
};

export const second = (input: string) => {
  const parts = input.split(' ');
  const players = parseInt(parts[0], 10);
  const lastMarble = parseInt(parts[6], 10) * 100;
  
  return calculate(players, lastMarble);
};
