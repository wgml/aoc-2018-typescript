import * as fs from 'fs';
import * as day01 from './day01'

const loadInput = (day: number) => {
    return fs.readFileSync(`./input/${day}.txt`).toString();
};

const input = loadInput(1);
global.console.log(day01.first(input));
global.console.log(day01.second(input));
