import { useState, useEffect, useRef } from 'react';

import './App.css';

import AnswersGrid from './components/AnswersGrid.jsx';
import Calculator from './components/Calculator.jsx';
import HowTo from './components/HowTo.jsx';
import NewShare from './components/NewShare.jsx';
import NewStats from './components/NewStats.jsx';
import Share from './components/Share.jsx';
import ViewToggle from './components/ViewToggle.jsx';

import { getImpossibles } from './helpers/getImpossibles.js';
import { getTodaysDigits } from './helpers/getTodaysDigits.js';
import { parseStoredAnswers } from './helpers/parseStoredAnswers.js';
import { storeAnswers } from './helpers/storeAnswers.js';
import { storeNewHistory } from './helpers/storeNewHistory.js';
import { storeHistory } from './helpers/storeHistory.js';

/**
  * Show <HowTo> to new players, otherwise go straight to the <Calculator>
  * Only players who have made at least one number in <Calculator> before have localStorage.history
*/
const initialView = () => {
  return localStorage.getItem('history') ? 'game' : 'howto';
};

const App = () => {
  const date = useRef(new Date().toDateString());

  /**
    * IMPORTANT!
    * The date definition below can be used instead of that above for testing purposes
    * Before use, however, delete the localStorage related to the app at localhost:3000
    * Otherwise, you'll get infinite loops from fillScores(), etc
  */
  // const date = new Date("Thu Feb 17 2022").toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const digits = getTodaysDigits(date.current);
  const [impossibles, possibles] = getImpossibles(digits);

  const [view, setView] = useState(initialView());

  /**
    * When the app loads, check for saved state from earlier the same day
  */
  useEffect(() => {
    const returned = parseStoredAnswers(date.current);
    if (!returned['answers']) { return; } // eg: New player or first time playing that day

    setAnswers(returned['answers']);
    setAnswerDetails(returned['answerDetails']);
  }, []);

  /**
    * Adds a new total's inputStr to the correct position in the answerDetails array
    * @param {string} inputStr - The equation to be added to answerDetails
    * @param {number} inputVal - The equation's total to find the correct index in answerDetails
  */
  const updateAnswerDetails = (inputStr, inputVal) => {
    const newAnswerDetails = [...answerDetails];
    newAnswerDetails[inputVal - 1] = inputStr;
    setAnswerDetails(newAnswerDetails);
  };

  /**
    *
    * @param {array} inputArr - The array of strings to join to form the current equation
    * @param {number} inputVal - The equation's total to find the correct index in answerDetails
  */
  const handleValidAnswer = (inputArr, inputVal) => {
    const newAnswers = [...answers, inputVal].sort((a, b) => a - b);
    setAnswers(newAnswers);
    updateAnswerDetails(inputArr.join(''), inputVal);
  };

  /**
    * When the user finds a new answer, update saved score history and day's answers
  */
  useEffect(() => {
    storeAnswers(date.current, answers, answerDetails);
    storeHistory(date.current, answers.length) // Second param here is score
    storeNewHistory(date.current, answers.length, answers.length >= 28 - impossibles.length) // Second param here is score
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
              {answers.length === possibles.length && <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_jEMHbp.json" background="transparent" count="2" loop speed="1" style={{width: "300px", height: "300px"}} autoplay></lottie-player>}
              <Calculator
                  date={date.current}
                  answers={answers} setAnswers={setAnswers}
                  answerDetails={answerDetails} setAnswerDetails={setAnswerDetails}
                  digits={digits} possibles={possibles}
                  handleValidAnswer={handleValidAnswer}
              />
              <h3>Score: {answers.length}/{possibles.length}</h3>
              <AnswersGrid answerDetails={answerDetails} impossibles={impossibles} />
              {answers.length > 0 &&
                  <NewShare answers={answers} possibles={possibles} />
              }
            </div>
          )
      }
      {view === 'stats' &&
          (
            <>
              <NewStats answers={answers} />
              <Share answers={answers} answerDetails={answerDetails} />
            </>
          )
      }
      <footer>
        <small>A ReactJS app by Rob Owen King.</small>
        <small>Here's <a href="http://www.robowenking.com/">my website</a>; I'm also on <a href="https://github.com/RobOwenKing/">GitHub</a> and <a href="https://twitter.com/RobOwenKing">Twitter</a>.</small>
        <small>Animation by <a href="https://lottiefiles.com/user/61955">Emily Zhou</a>, used under the <a href="https://lottiefiles.com/page/license">Lottie Simple License</a>.</small>
      </footer>
    </div>
  );
}

export default App;
