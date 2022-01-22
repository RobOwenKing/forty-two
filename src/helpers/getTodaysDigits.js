const seedrandom = require('seedrandom');          // So all players on same day get same digits
const rng = seedrandom(new Date().toDateString());

const getCandidate = () => {
  return Math.floor(rng() * 12) + 1;  // Random number from 1 to 12
};

const countMatchesInArray = (array, matchable) => {
  return array.filter(e => e === matchable).length;
};

const reducer = (currentTotal, currentValue) => currentTotal + currentValue;

const isCandidateValid = (array, candidate) => {
  if (array.reduce(reducer, 0) + candidate < array.length + 2) { return false; }  // Total can't be too small (too difficult to make larger numbers then)

  const numberOfMatches = countMatchesInArray(array, candidate);
  if (candidate === 1 && numberOfMatches >= 1) { return false; }  // 1 can only appear once
  if (numberOfMatches >= 2) { return false; }  // No number can appear more than twice
  if (numberOfMatches === 1 && !array.some(e => countMatchesInArray(array, e)) == 2) {
    // You can have at most one repeated digit i.e. [a, a, b, c] = valid; [a, a, b, b] != valid
    return false;
  }

  return true;
};

export const getTodaysDigits = () => {
  let i = 0;
  let candidate = 0;
  const returnable = [];

  while (returnable.length < 4) {
    candidate = getCandidate();
    if (isCandidateValid(returnable, candidate)) { returnable.push(candidate); }
    i += 1;
  };

  return returnable;
};
