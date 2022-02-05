import { useState, useEffect } from 'react';

import './App.css';

import AnswersGrid from './components/AnswersGrid.jsx';
import Calculator from './components/Calculator.jsx';
import HowTo from './components/HowTo.jsx'

import { parseStoredAnswers } from './helpers/parseStoredAnswers.js';
import { storeAnswers } from './helpers/storeAnswers.js';

const App = () => {
  const date = new Date().toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const [isShowHowTo, setIsShowHowTo] = useState(false);

  useEffect(() => {
    /*
      When the app loads, check for saved state from earlier the same day
    */
    const returned = parseStoredAnswers(date);
    if (!returned['answers']) { return; } // eg: New player or first time playing that day

    setAnswers(returned['answers']);
    setAnswerDetails(returned['answerDetails']);
  }, []);

  useEffect(() => {
    storeAnswers(date, answers, answerDetails);

    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      const parsedStoredHistory = JSON.parse(storedHistory);
      if (parsedStoredHistory['lastPlayed'] === date) {
        const lengthOfScores = parsedStoredHistory['scores'].length;
        parsedStoredHistory['scores'][lengthOfScores - 1] = answers.length;
      } else {
        parsedStoredHistory['lastPlayed'] = date;
        parsedStoredHistory['scores'].push(answers.length);
      }
      const storableHistory = JSON.stringify(parsedStoredHistory);
      localStorage.setItem('history', storableHistory);
    } else {
      if (answers.length > 0) {
        const storableHistory = JSON.stringify({
          firstPlayed: new Date(),
          lastPlayed: date,
          scores: [answers.length]
        });
        localStorage.setItem('history', storableHistory);
      }
    }
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
              <Calculator
                  date={date}
                  answers={answers} setAnswers={setAnswers}
                  answerDetails={answerDetails} setAnswerDetails={setAnswerDetails}
              />
              <h3>Score: {answers.length}/28</h3>
              <AnswersGrid answers={answerDetails} />
            </div>
          )
      }
      <footer>
        <small>A ReactJS app by Rob Owen King. Here's <a href="http://www.robowenking.com/">my website</a>; I'm also on <a href="https://github.com/RobOwenKing/">GitHub</a> and <a href="https://twitter.com/RobOwenKing">Twitter</a>.</small>
      </footer>
    </div>
  );
}

export default App;
