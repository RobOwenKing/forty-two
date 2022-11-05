/**
 * Updates the localStorage with all the answers the user has got so far today
 * @param {string} date - String representing the current date, used to seed the random number generator
 * @param {array.<number>} answers - Answers found by the user (values)
 * @param {array.<string|null>} answerDetails - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
 */
export const storeAnswers = (date, answers, answerDetails) => {
  const storableAnswers = JSON.stringify({
    date: date,
    answers: answers,
    answerDetails: answerDetails,
  });
  localStorage.setItem("answers", storableAnswers);
};
