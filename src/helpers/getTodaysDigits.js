const seedrandom = require("seedrandom"); // So all players on same day get same digits

/**
 * @param {function} rng - Random number generator from seedrandom
 * @returns {number} Random whole number from 1 to 12 inclusive
 */
const getCandidate = (rng) => {
  return Math.floor(rng.call() * 12) + 1;
};

/**
 * @param {array.<any>} arr - The array to be checked for matches
 * @param {any} matchable - The term to be looked for in arr
 * @returns {number} Number of entries of arr that match matchable
 */
const countMatchesInArray = (arr, matchable) => {
  return arr.filter((e) => e === matchable).length;
};

const reducer = (currentTotal, currentValue) => currentTotal + currentValue;

/**
 * @param {array.<number>} arr - The array of digits so far
 * @param {number} candidate - The candidate for the next entry in arr
 * @returns {boolean} Whether or not the candidate should be added into the array
 */
const isCandidateValid = (arr, candidate, rng) => {
  if (arr.reduce(reducer, 0) + candidate < arr.length + 2) {
    return false;
  } // Total can't be too small (too difficult to make larger numbers then)

  const numberOfMatches = countMatchesInArray(arr, candidate);
  // 1 can only appear once
  if (candidate === 1 && numberOfMatches >= 1) {
    return false;
  }
  // No number can appear more than twice
  if (numberOfMatches >= 2) {
    return false;
  }
  // You can have at most one repeated digit i.e. [a, a, b, c] = valid; [a, a, b, b] != valid
  if (
    numberOfMatches === 1 &&
    arr.some((e) => countMatchesInArray(arr, e) > 1)
  ) {
    return false;
  }
  if (numberOfMatches === 1 && rng.call() < 0.25) {
    return false;
  }

  return true;
};

/**
 * @param {string} date - String representing the current date, used to seed the random number generator
 * @returns {array.<string>} Array of random digits determined by the date passed. Length = 4
 */
export const getTodaysDigits = (date) => {
  const rng = seedrandom(date);
  let candidate;
  const returnable = [];

  while (returnable.length < 4) {
    candidate = getCandidate(rng);
    if (isCandidateValid(returnable, candidate, rng)) {
      returnable.push(candidate);
    }
  }

  return returnable.map((d) => d.toString());
};
