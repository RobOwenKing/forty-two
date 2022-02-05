/*
  Handle creating and updating the user's score history in localStorage
*/
export const storeHistory = (date, score) => {
  const storedHistory = localStorage.getItem('history');
  if (storedHistory) {
    const parsedStoredHistory = JSON.parse(storedHistory);
    if (parsedStoredHistory['lastPlayed'] === date) {
      const lengthOfScores = parsedStoredHistory['scores'].length;
      parsedStoredHistory['scores'][lengthOfScores - 1] = score;
    } else {
      parsedStoredHistory['lastPlayed'] = date;
      parsedStoredHistory['scores'].push(score);
    }
    const storableHistory = JSON.stringify(parsedStoredHistory);
    localStorage.setItem('history', storableHistory);
  } else {
    if (score > 0) {
      const storableHistory = JSON.stringify({
        firstPlayed: new Date(),
        lastPlayed: date,
        scores: [score]
      });
      localStorage.setItem('history', storableHistory);
    }
  }
};
