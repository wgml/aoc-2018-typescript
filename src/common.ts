import * as fs from 'fs';

export const input = {
  dayFromFile: (day: string) => fs.readFileSync(`./input/${day}.txt`).toString(),
  listOfNumbers: (lines: string) => lines.split('\n').map(Number),
  listOfStrings: (lines: string) => lines.split('\n'),
};

export const math = {
  max: (values: number[]) => values.reduce((a: number, b: number) => Math.max(a, b)),
  sum: (values: number[]) => values.reduce((a: number, b: number) => a + b),
};

export const zip = <T>(rows: T[][]) => rows[0].map((_, c) => rows.map(row => row[c]));

export const time = (func: () => any): { result: any; elapsed: number } => {
  const start = new Date().getTime();
  const result = func();
  const elapsed = new Date().getTime() - start;

  return { result, elapsed };
};

export function DefaultArray<T>(factory: () => T): T[] {
  const tgt: T[] = [];

  const handler = {
    get: (target: any, name: any) => {
      if (!(name in target)) {
        target[name] = factory();
      }
      return target[name];
    },
  };
  return new Proxy(tgt, handler);
}
