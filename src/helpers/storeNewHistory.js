import { getImpossibles } from './getImpossibles.js';
import { getTodaysDigits } from './getTodaysDigits.js';

/**
  * Saves the passed newHistory to localStorage
  * @param {object} newHistory - Player's score history to be saved to localStorage
*/
const saveHistory = (newHistory) => {
  localStorage.setItem('newHistory', JSON.stringify(newHistory));
};

/**
  * Returns new history ready for storage
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
  * @param {boolean} max - Whether the player has reached the day's max score or not
  * @param {string} storedHistory - Unparsed contents of localStorage.history
*/
const updateStoredNewHistory = (date, score, max, newHistory = {}) => {
  newHistory[date] = { 's': score, 'm': max };

  return newHistory;
};

/**
  * Converts history from old to new format
  * @param {string} storedHistory - Unparsed contents of localStorage.history
*/
export const convertStoredHistory = (storedHistory) => {
  const newHistory = {};

  let d = new Date();
  while (d.toDateString() !== storedHistory['lastPlayed']) { d.setDate(d.getDate() - 1); }
  while (storedHistory['scores'].length > 0) {
    const s = storedHistory['scores'].pop();
    if (s > 0) {
      const dateString = d.toDateString();
      newHistory[dateString] = {
        's': s,
        'm': s >= getImpossibles(getTodaysDigits(dateString))[1].length
      };
    }
    d.setDate(d.getDate() - 1);
  }

  return newHistory;
};

/**
  * Handles creating and updating the player's score history in localStorage
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
  * @param {boolean} max - Whether the player has reached the day's max score or not
*/
export const storeNewHistory = (date, score, max) => {
  const storedNewHistory = JSON.parse(localStorage.getItem('newHistory')); // New format
  const storedHistory = JSON.parse(localStorage.getItem('history'));       // Old format
  let newHistory = {};

  if (storedNewHistory) {
    newHistory = updateStoredNewHistory(date, score, max, storedNewHistory);
  } else {
    if (score <= 0) { return; } // Streak should only start with a score > 0

    if (storedHistory) { newHistory = convertStoredHistory(storedHistory); }
    newHistory = updateStoredNewHistory(date, score, max, newHistory);
  }

  saveHistory(newHistory);
};
