/*
  Update the localStorage with all the answers the user has got so far today
*/
export const storeAnswers = (date, answers, answerDetails) => {
  const storableAnswers = JSON.stringify({
    'date': date,
    'answers': answers,
    'answerDetails': answerDetails
  });
  localStorage.setItem('answers', storableAnswers);
};
