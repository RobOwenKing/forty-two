/*
  If the user hasn missed day(s) since last playing,
  fill the scores array with 0s for every missed day
*/
const fillScores = (history) => {
  const lastPlayed = history['lastPlayed'];
  const scores = history['scores'];

  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 1);

  while (testDate.toDateString() !== lastPlayed) {
    scores.push(0);
    testDate.setDate(testDate.getDate() - 1);
  }

  return scores;
};

/*
  Update localStorage history (given it exists) with new score
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

/*
  Create history object in localStorage if new player
*/
const createStoredHistory = (date, score) => {
  const storableHistory = JSON.stringify({
    firstPlayed: new Date(),
    lastPlayed: date,
    scores: [score]
  });
  localStorage.setItem('history', storableHistory);
};

/*
  Handle creating and updating the user's score history in localStorage
*/
export const storeHistory = (date, score) => {
  const storedHistory = localStorage.getItem('history');

  if (storedHistory) {
    updateStoredHistory(storedHistory, date, score);
  } else {
    if (score <= 0) { return; } // Streak should only start with a score > 0

    createStoredHistory(date, score);
  }
};
