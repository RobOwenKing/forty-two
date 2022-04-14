/**
  * Handles creating and updating the player's score history in localStorage
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
  * @param {boolean} max - Whether the player has reached the day's max score or not
*/
export const storeNewHistory = (date, score, max) => {
  const storedNewHistory = localStorage.getItem('newHistory'); // New format
  const storedHistory = localStorage.getItem('history');       // Old format

  if (storedNewHistory) {
    updateStoredNewHistory(storedNewHistory, date, score, max);
  } else {
    if (score <= 0) { return; } // Streak should only start with a score > 0

    if (storedHistory) {
      convertStoredHistory(storedHistory, date, score, max);
    } else {
      createStoredNewHistory(date, score, max);
    }
  }
};










/**
  * Updates localStorage history (given it exists) with new score
  * @param {string} storedHistory - Unparsed contents of localStorage.history
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
*/
const updateStoredHistory = (storedHistory, date, score) => {
  const parsedStoredHistory = JSON.parse(storedHistory);

  if (parsedStoredHistory['lastPlayed'] === date) {
    // If the user has already played today, update last entry in scores array
    const lengthOfScores = parsedStoredHistory['scores'].length;
    parsedStoredHistory['scores'][lengthOfScores - 1] = score;
  } else {
    // If the user hasn't played today, add day's score to end of array and update date
    parsedStoredHistory['scores'] = fillScores(parsedStoredHistory);
    parsedStoredHistory['lastPlayed'] = date;
    parsedStoredHistory['scores'].push(score);
  }

  localStorage.setItem('history', JSON.stringify(parsedStoredHistory));
};

/**
  * Creates history object in localStorage if new player
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {number} score - User's current score for the day
*/
const createStoredHistory = (date, score) => {
  const storableHistory = JSON.stringify({
    firstPlayed: new Date(),
    lastPlayed: date,
    scores: [score]
  });
  localStorage.setItem('history', storableHistory);
};
