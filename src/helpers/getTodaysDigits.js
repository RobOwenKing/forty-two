const seedrandom = require('seedrandom');
const rng = seedrandom(new Date().toDateString());

const getCandidate = (seed) => {
  return Math.floor(rng() * 12) + 1;
};

const countMatchesInArray = (array, matchable) => {
  return array.filter(e => e === matchable).length;
};

const reducer = (currentTotal, currentValue) => currentTotal + currentValue;

const isCandidateValid = (array, candidate) => {
  if (array.reduce(reducer, 0) + candidate < array.length + 2) { return false; }

  const numberOfMatches = countMatchesInArray(array, candidate);
  if (numberOfMatches >= 2) { return false; }
  if (numberOfMatches === 1 && !array.some(e => countMatchesInArray(array, e)) == 2) {
    return false;
  }

  return true;
};

export const getTodaysDigits = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  let i = 0;
  let seed = 0;
  let candidate = 0;
  const returnable = [];

  while (returnable.length < 4) {
    seed += i % 2 === 0 ? day : month;
    candidate = getCandidate(seed);
    if (isCandidateValid(returnable, candidate)) { returnable.push(candidate); }
    i += 1;
  };

  console.log(returnable);
  return returnable;
};
