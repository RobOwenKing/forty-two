import { useState, useEffect } from 'react';

import './App.css';

import AnswersGrid from './components/AnswersGrid.jsx';
import Calculator from './components/Calculator.jsx';
import HowTo from './components/HowTo.jsx';
import Share from './components/Share.jsx';
import Stats from './components/Stats.jsx';
import ViewToggle from './components/ViewToggle.jsx';

import { parseStoredAnswers } from './helpers/parseStoredAnswers.js';
import { storeAnswers } from './helpers/storeAnswers.js';
import { storeHistory } from './helpers/storeHistory.js';

const initialView = () => {
  return localStorage.getItem('history') ? 'game' : 'howto'
};

const App = () => {
  const date = new Date().toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const [view, setView] = useState(initialView());

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
    /*
      When the user finds a new answer, update saved score history and day's answers
    */
    storeAnswers(date, answers, answerDetails);
    storeHistory(date, answers.length) // Second param here is score
  }, [answers]);

  return (
    <div className="App">
      <h1>Twenty-Eight</h1>
      <h3>Your Daily Numbers Game</h3>
      <ViewToggle view={view} setView={setView} />
      {view === 'howto' && <HowTo />}
      {view === 'game' &&
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
      {view === 'stats' &&
          (
            <>
              <Stats answers={answers} />
              <Share answers={answers} answerDetails={answerDetails} />
            </>
          )
      }
      <footer>
        <small>A ReactJS app by Rob Owen King.</small>
        <small>Here's <a href="http://www.robowenking.com/">my website</a>; I'm also on <a href="https://github.com/RobOwenKing/">GitHub</a> and <a href="https://twitter.com/RobOwenKing">Twitter</a>.</small>
      </footer>
    </div>
  );
}

export default App;
