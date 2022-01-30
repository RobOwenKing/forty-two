import { useState, useEffect } from 'react';

import './App.css';

import AnswersGrid from './components/AnswersGrid.jsx';
import Calculator from './components/Calculator.jsx';
import HowTo from './components/HowTo.jsx'

const App = () => {
  const date = new Date().toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const [isShowHowTo, setIsShowHowTo] = useState(false);

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
      <h3>Your Daily Numbers Game</h3>
      <p
          className="clickable"
          onClick={() => setIsShowHowTo(!isShowHowTo)}
      >
        {isShowHowTo ? 'Back to game' : 'How to play?'}
      </p>
      {isShowHowTo && <HowTo />}
      {!isShowHowTo &&
          (
            <div>
              <Calculator date={date}
                  answers={answers} setAnswers={setAnswers}
                  answerDetails={answerDetails} setAnswerDetails={setAnswerDetails}
              />
              <h3>Score: {answers.length}/28</h3>
              <AnswersGrid answers={answerDetails} />
            </div>
          )
      }
    </div>
  );
}

export default App;
