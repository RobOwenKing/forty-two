export const parseStoredAnswers = (date, setAnswers, setAnswerDetails) => {
  const storedAnswers = localStorage.getItem('answers');

  if (storedAnswers) {
    const parsedStoredAnswers = JSON.parse(storedAnswers);
    if (parsedStoredAnswers['date'] === date) {
      setAnswers(parsedStoredAnswers['answers']);
      setAnswerDetails(parsedStoredAnswers['answerDetails']);
    }
  }
};
