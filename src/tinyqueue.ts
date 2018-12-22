// https://github.com/mourner/tinyqueue

export class PriorityQueue<T> {
  public length: number;

  private data: T[];
  private compare: (a: T, b: T) => number;

  constructor(data?: T[], compare?: (a: T, b: T) => number) {
    this.data = data || [];
    this.length = this.data.length;
    this.compare = compare || defaultCompare;

    if (this.length > 0) {
      for (let i = (this.length >> 1) - 1; i >= 0; i--) {
        this._down(i);
      }
    }
  }

  public push(item: T) {
    this.data.push(item);
    this.length++;
    this._up(this.length - 1);
  }

  public pop() {
    if (this.length === 0) {
      return undefined;
    }

    const top = this.data[0];
    const bottom = this.data.pop();
    if (!bottom) {
      return undefined;
    }
    this.length--;

    if (this.length > 0) {
      this.data[0] = bottom;
      this._down(0);
    }

    return top;
  }

  public peek() {
    return this.data[0];
  }

  private _up(pos: number) {
    const { data, compare } = this;
    const item = data[pos];

    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      const current = data[parent];
      if (compare(item, current) >= 0) {
        break;
      }
      data[pos] = current;
      pos = parent;
    }

    data[pos] = item;
  }

  private _down(pos: number) {
    const { data, compare } = this;
    const halfLength = this.length >> 1;
    const item = data[pos];

    while (pos < halfLength) {
      let left = (pos << 1) + 1;
      let best = data[left];
      const right = left + 1;

      if (right < this.length && compare(data[right], best) < 0) {
        left = right;
        best = data[right];
      }
      if (compare(best, item) >= 0) {
        break;
      }

      data[pos] = best;
      pos = left;
    }

    data[pos] = item;
  }
}

function defaultCompare<T>(a: T, b: T) {
  return a < b ? -1 : a > b ? 1 : 0;
}
