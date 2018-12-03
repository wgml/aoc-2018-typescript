import * as fs from 'fs';

export const input = {
  dayFromFile: (day: number) => fs.readFileSync(`./input/${day}.txt`).toString(),
  listOfNumbers: (lines: string) => lines.split('\n').map(Number),
  listOfStrings: (lines: string) => lines.split('\n'),
};

export const zip = (rows: any[][]) => rows[0].map((_, c) => rows.map(row => row[c]));
