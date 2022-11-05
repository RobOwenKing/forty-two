/*
 * For use when the app loads
 * Parse any saved state from earlier the same day
 * @param {string} date - String representing the current date, used to seed the random number generator
 * @returns {object} - Either empty (no stored data found), or containing keys {array.<number>} answers and {array.<string>} answerDetails
 */
export const parseStoredAnswers = (date) => {
  const storedAnswers = localStorage.getItem("answers");
  const returnable = {};
  if (!storedAnswers) {
    return returnable;
  } // If new player, return an empty object

  const parsedStoredAnswers = JSON.parse(storedAnswers);
  if (parsedStoredAnswers["date"] !== date) {
    return returnable;
  } // If saved state from previous day
  // return an empty object

  returnable["answers"] = parsedStoredAnswers["answers"];
  returnable["answerDetails"] = parsedStoredAnswers["answerDetails"];
  return returnable;
};
