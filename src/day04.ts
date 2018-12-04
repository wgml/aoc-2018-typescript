import * as common from './common';

const buildSchedule = (input: string) => {
  const schedule = new Map();

  let currentGuard: number = 0;
  let currentStart: number = 0;
  let currentEnd: number = 0;
  for (const entry of common.input.listOfStrings(input).sort()) {
    const bits = entry.split(' ');
    const time = bits[1].substr(0, 5);
    const [hours, minutes] = time.split(':').map(n => parseInt(n, 10));
    const action = bits[3];

    if (action.startsWith('#')) {
      currentGuard = parseInt(action.substring(1), 10);

      if (!schedule.has(currentGuard)) {
        schedule.set(currentGuard, Array(60).fill(0));
      }
    } else if (action === 'asleep') {
      currentStart = minutes;
      if (hours !== 0) {
        currentStart = 0;
      }
    } else {
      currentEnd = minutes;
      if (hours !== 0) {
        currentEnd = 60;
      }

      const curSchedule = schedule.get(currentGuard);
      for (let m = currentStart; m < currentEnd; ++m) {
        ++curSchedule[m];
      }

      schedule.set(currentGuard, curSchedule);
    }
  }

  return schedule;
};

const findByTransform = (schedule: Map<number, number[]>, transform: (minutes: number[]) => number) => {
  let bestGuard = 0;
  let bestValue = -1;
  let bestMinute = 0;
  for (const [guard, minutes] of schedule) {
    const curBestValue = transform(minutes);
    if (curBestValue > bestValue) {
      bestGuard = guard;
      bestValue = curBestValue;
      bestMinute = minutes.indexOf(common.math.max(minutes));
    }
  }
  return bestGuard * bestMinute;
};

export const first = (input: string) => {
  const schedule = buildSchedule(input);
  return findByTransform(schedule, common.math.sum);
};

export const second = (input: string) => {
  const schedule = buildSchedule(input);
  return findByTransform(schedule, common.math.max);
};
