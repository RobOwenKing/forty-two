export const storeAnswers = (date, answers, answerDetails) => {
  const storableAnswers = JSON.stringify({
    'date': date,
    'answers': answers,
    'answerDetails': answerDetails
  });
  localStorage.setItem('answers', storableAnswers);
};
