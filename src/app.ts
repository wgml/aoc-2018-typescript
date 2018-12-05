import * as common from './common';

const runForDay = (day: number) => {
  const dayStr = `${day}`.padStart(2, '0');
  try {
    const functions = require(`./day${dayStr}`);
    process.stdout.write(`\n* Running problem for day ${dayStr}...\n`);

    const input = common.input.dayFromFile(dayStr);
    {
      process.stdout.write('  First  ... ');
      const result = common.time(() => functions.first(input));
      process.stdout.write('(took ' + `${result.elapsed}`.padStart(5, ' ') + `ms) ${result.result}\n`);
    }
    {
      process.stdout.write('  Second ... ');
      const result = common.time(() => functions.second(input));
      process.stdout.write('(took ' + `${result.elapsed}`.padStart(5, ' ') + `ms) ${result.result}\n`);
    }
  } catch (e) {
    return;
  }
};

let days = [];
if (process.argv.length > 2) {
  for (const day of process.argv.slice(2)) {
    days.push(parseInt(day, 10));
  }
} else {
  days = Array(25)
    .fill(0)
    .map((v, i) => i);
}

days.forEach(runForDay);
