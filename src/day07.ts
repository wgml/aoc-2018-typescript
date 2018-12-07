import * as common from './common';

interface Rule {
  first: string;
  second: string;
}

interface Worker {
  remaining: number;
  value: string;
}

export const calculate = (input: string, workers?: number, timeOffset?: number) => {
  if (workers == null) {
    workers = 5;
  }

  if (timeOffset == null) {
    timeOffset = 60;
  }

  const rules = common.input
    .listOfStrings(input)
    .map((rule: string) => rule.split(' '))
    .map((r: string[]) => {
      return { first: r[1], second: r[7] };
    });

  const map: Map<string, string[]> = new Map();
  const knownPredecesors = new Set<string>();

  for (const rule of rules) {
    const current = map.get(rule.second);
    knownPredecesors.add(rule.first);
    if (current) {
      map.set(rule.second, [...current, rule.first]);
    } else {
      map.set(rule.second, [rule.first]);
    }
  }

  let executables = [...knownPredecesors].filter(p => !map.has(p));
  const executionOrder: string[] = [];

  let steps = -1;
  let workersState: Worker[] = [];

  while (map.size > 0 || workersState.length > 0) {
    ++steps;
    for (const worker of workersState) {
      --worker.remaining;
      if (worker.remaining === 0) {
        executionOrder.push(worker.value);
        for (const [task, predecesors] of map.entries()) {
          const taskIndex = predecesors.indexOf(worker.value);
          if (taskIndex > -1) {
            predecesors.splice(taskIndex, 1);
          }
          if (predecesors.length === 0) {
            executables.push(task);
            map.delete(task);
          } else {
            map.set(task, predecesors);
          }
        }
      }
    }

    workersState = workersState.filter(w => w.remaining > 0);
    if (workersState.length === workers) {
      continue;
    }

    executables = executables.sort();
    while (workersState.length < workers && executables.length > 0) {
      const executable = executables[0];
      executables.shift();
      workersState.push({
        remaining: executable.charCodeAt(0) - 'A'.charCodeAt(0) + timeOffset + 1,
        value: executable,
      });
    }
  }

  return { result: executionOrder.join(''), steps };
};

export const first = (input: string) => {
  return calculate(input, 1, 0).result;
};

export const second = (input: string, workers?: number, timeOffset?: number) => {
  return calculate(input, workers, timeOffset).steps;
};
