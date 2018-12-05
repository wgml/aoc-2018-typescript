import * as common from './common';
import * as day01 from './day01';
import * as day02 from './day02';
import * as day03 from './day03';
import * as day04 from './day04';
import * as day05 from './day05';

{
  const input = common.input.dayFromFile(1);
  global.console.log(day01.first(input));
  global.console.log(day01.second(input));
}

{
  const input = common.input.dayFromFile(2);
  global.console.log(day02.first(input));
  global.console.log(day02.second(input));
}

{
  const input = common.input.dayFromFile(3);
  global.console.log(day03.first(input));
  global.console.log(day03.second(input));
}

{
  const input = common.input.dayFromFile(4);
  global.console.log(day04.first(input));
  global.console.log(day04.second(input));
}

{
  const input = common.input.dayFromFile(5);
  global.console.log(day05.first(input));
  global.console.log(day05.second(input));
}
