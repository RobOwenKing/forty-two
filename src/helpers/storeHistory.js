/**
 * If the user hasn missed day(s) since last playing,
 * fills the scores array with 0s for every missed day
 * @param {object} history - User's saved playing history parsed as JSON
 * @param {string} history.lastPlayed - String representing the date the user last played
 * @param {array.<number>} history.scores - Array of the user's past scores
 * @param {array.<number>} New array of scores with 0s at the end for missed days
 */
const fillScores = (history) => {
  const lastPlayed = history["lastPlayed"];
  const scores = history["scores"];

  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 1);

  while (testDate.toDateString() !== lastPlayed) {
    scores.push(0);
    testDate.setDate(testDate.getDate() - 1);
  }

  return scores;
};

/**
 * Updates localStorage history (given it exists) with new score
 * @param {string} storedHistory - Unparsed contents of localStorage.history
 * @param {string} date - String representing the current date, used to seed the random number generator
 * @param {number} score - User's current score for the day
 */
const updateStoredHistory = (storedHistory, date, score) => {
  const parsedStoredHistory = JSON.parse(storedHistory);

  if (parsedStoredHistory["lastPlayed"] === date) {
    // If the user has already played today, update last entry in scores array
    const lengthOfScores = parsedStoredHistory["scores"].length;
    parsedStoredHistory["scores"][lengthOfScores - 1] = score;
  } else {
    // If the user hasn't played today, add day's score to end of array and update date
    parsedStoredHistory["scores"] = fillScores(parsedStoredHistory);
    parsedStoredHistory["lastPlayed"] = date;
    parsedStoredHistory["scores"].push(score);
  }

  localStorage.setItem("history", JSON.stringify(parsedStoredHistory));
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
    scores: [score],
  });
  localStorage.setItem("history", storableHistory);
};

/**
 * Handles creating and updating the user's score history in localStorage
 * @param {string} date - String representing the current date, used to seed the random number generator
 * @param {number} score - User's current score for the day
 */
export const storeHistory = (date, score) => {
  const storedHistory = localStorage.getItem("history");

  if (storedHistory) {
    updateStoredHistory(storedHistory, date, score);
  } else {
    if (score <= 0) {
      return;
    } // Streak should only start with a score > 0

    createStoredHistory(date, score);
  }
};
