/*
  Update localStorage history (given it exists) with new score
*/
const updateStoredHistory = (storedHistory, date, score) => {
  const parsedStoredHistory = JSON.parse(storedHistory);

  if (parsedStoredHistory['lastPlayed'] === date) {
    const lengthOfScores = parsedStoredHistory['scores'].length;
    parsedStoredHistory['scores'][lengthOfScores - 1] = score;
  } else {
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
    if (score <= 0) { return; }

    createStoredHistory(date, score);
  }
};
