import * as common from './common';

export const first = (input: string) => {
  const occurences = (count: number) => (word: string) => {
    const countInString = (str: string, match: string) => (str.match(new RegExp(match, 'g')) || []).length;
    return [...word].some(l => countInString(word, l) === count);
  };
  const twos = occurences(2);
  const threes = occurences(3);

  const words = common.input.listOfStrings(input);

  let occuredTwice: number = 0;
  let occuredThrice: number = 0;

  words.forEach(word => {
    if (twos(word)) {
      occuredTwice++;
    }
    if (threes(word)) {
      occuredThrice++;
    }
  });

  return occuredTwice * occuredThrice;
};

export const second = (input: string) => {
  const exactlyOneDifference = (word1: string, word2: string) => {
    let foundDiffs = 0;
    for (const [l1, l2] of common.zip([word1.split(''), word2.split('')])) {
      if (l1 !== l2) {
        ++foundDiffs;
      }
      if (foundDiffs > 1) {
        return false;
      }
    }
    return foundDiffs === 1;
  };

  const buildResult = (word1: string, word2: string) => {
    let result: string = '';
    for (const [l1, l2] of common.zip([word1.split(''), word2.split('')])) {
      if (l1 === l2) {
        result += l1;
      }
    }
    return result;
  };

  const words = common.input.listOfStrings(input);

  for (const word1 of words) {
    for (const word2 of words) {
      if (word1 === word2 || word1.length !== word2.length) {
        continue;
      }

      if (exactlyOneDifference(word1, word2)) {
        return buildResult(word1, word2);
      }
    }
  }
};
