import { useState, useEffect } from 'react';

import './App.css';

import AnswersList from './components/AnswersList.jsx';
import Calculator from './components/Calculator.jsx';
import TotalsGrid from './components/TotalsGrid.jsx';

const App = () => {
  const date = new Date().toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const [isDisplayTotals, setIsDisplayTotals] = useState(false);
  const [isDisplayAnswers, setIsDisplayAnswers] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('answers');
    if (stored) {
      const parsedStored = JSON.parse(stored);
      if (parsedStored['date'] === date) {
        setAnswers(parsedStored['answers']);
        setAnswerDetails(parsedStored['answerDetails']);
      }
    }
  }, []);

  useEffect(() => {
    const storable = JSON.stringify({
      date: date,
      answers: answers,
      answerDetails: answerDetails
    });
    localStorage.setItem('answers', storable);
  }, [answers]);

  return (
    <div className="App">
      <h1>Twenty-Eight</h1>
      <Calculator date={date}
          answers={answers} setAnswers={setAnswers}
          answerDetails={answerDetails} setAnswerDetails={setAnswerDetails}
      />
      <h3>Score: {answers.length}/28</h3>
      <p>
        Show:&nbsp;
        <span onClick={() => setIsDisplayTotals(!isDisplayTotals)}>Totals</span>
        &nbsp;/&nbsp;
        <span onClick={() => setIsDisplayAnswers(!isDisplayAnswers)}>My Answers</span>
      </p>
      {
        isDisplayTotals &&
          <TotalsGrid answers={answerDetails} />
      }
      {
        isDisplayAnswers &&
          <AnswersList answers={answerDetails} />
      }
    </div>
  );
}

export default App;
