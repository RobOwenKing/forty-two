export const parseStoredAnswers = (date) => {
  const storedAnswers = localStorage.getItem('answers');
  const returnable = {}
  if (!storedAnswers) { return returnable; }

  const parsedStoredAnswers = JSON.parse(storedAnswers);
  if (parsedStoredAnswers['date'] !== date) { return returnable; }

  returnable['answers'] = parsedStoredAnswers['answers'];
  returnable['answerDetails'] = parsedStoredAnswers['answerDetails'];
  return returnable;
};
