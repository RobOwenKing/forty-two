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
const updateStoredNewHistory = (date, score, max, storedNewHistory = '{}') => {
  const newHistory = JSON.parse(storedNewHistory);
  newHistory[date] = { 'score': score, 'max': max };

  return newHistory;
};

/**
  * Converts history from old to new format
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
  * @param {boolean} max - Whether the player has reached the day's max score or not
  * @param {string} storedHistory - Unparsed contents of localStorage.history
*/
const convertStoredHistory = (storedHistory, date, score, max) => {
  const newHistory = {};

  const oldHistory = JSON.parse(storedHistory);
  let start = false;
  let d = new Date();
  while (d.toDateString() !== oldHistory['lastPlayed']) { d.setDate(d.getDate() - 1); }
  while (oldHistory['scores'].length > 0) {
    const e = oldHistory['scores'].pop();
    if (e > 0) { newHistory[d.toDateString()] = e; }
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
  const storedNewHistory = localStorage.getItem('newHistory'); // New format
  const storedHistory = localStorage.getItem('history');       // Old format
  let newHistory = {};

  if (storedNewHistory) {
    newHistory = updateStoredNewHistory(date, score, max, storedNewHistory);
  } else {
    if (score <= 0) { return; } // Streak should only start with a score > 0

    if (storedHistory) { newHistory = convertStoredHistory(storedHistory, date, score, max); }
    newHistory = updateStoredNewHistory(date, score, max, newHistory);
  }

  saveHistory(newHistory);
};
