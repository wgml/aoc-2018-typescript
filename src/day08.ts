import * as common from './common';

interface Data {
  remaining: number[];
  metadata: number;
  rootValue: number;
}

const parse = (data: Data): Data => {
  const children = data.remaining[0];
  const metadata = data.remaining[1];
  const values: number[] = [];
  data.remaining.splice(0, 2);

  for (let c = 0; c < children; c++) {
    data = parse(data);
    values.push(data.rootValue);
  }

  const dataSlice = data.remaining.splice(0, metadata);
  const metas = dataSlice.reduce((a, b) => a + b, 0);
  data.metadata += metas;

  if (children === 0) {
    data.rootValue = metas;
  } else {
    data.rootValue = dataSlice
      .filter(m => m > 0 && m <= values.length)
      .map(m => values[m - 1])
      .reduce((a, b) => a + b, 0);
  }

  return data;
};

const doParse = (input: string): Data => {
  const entries = input.split(' ').map(i => parseInt(i, 10));
  return parse({ metadata: 0, rootValue: 0, remaining: entries });
};

export const first = (input: string) => {
  return doParse(input).metadata;
};

export const second = (input: string) => {
  return doParse(input).rootValue;
};
