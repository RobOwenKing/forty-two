import { useState } from 'react';
import { evaluate } from 'mathjs';

import DigitButton from './DigitButton.jsx';
import InputButton from './InputButton.jsx';

import { getTodaysDigits } from '../helpers/getTodaysDigits.js';

import { useEventListener } from '../hooks/useEventListener.js';

const Calculator = ({ date, answers, setAnswers, answerDetails, setAnswerDetails }) => {
  const [digits, setDigits] = useState(getTodaysDigits(date));
  const [digitsUsed, setDigitsUsed] = useState([]);
  const operations = ['+', '-', '*', '/', '!', '^', '(', ')'];

  const [currentInputArr, setCurrentInputArr] = useState([]);
  const [currentInputVal, setCurrentInputVal] = useState(0);

  const updateInputVal = (newInputStr) => {
    const whitelistedStr = newInputStr.replace(/[^0-9\(\)\+\-\*\/\.\!\^]/g, "");

    try {
      const newInputVal = evaluate(whitelistedStr);
      setCurrentInputVal(newInputVal);
    } catch(e) {
      return;
    }
  };

  const inputHandler = (input) => {
    const newInputArr = [...currentInputArr, input];
    setCurrentInputArr(newInputArr);
    updateInputVal(newInputArr.join(''));
  };

  const digitHandler = (id, input) => {
    if (digitsUsed.includes(id)) { return false; }

    inputHandler(input);
    setDigitsUsed([...digitsUsed, id]);
  };

  const advancedDigitsHandler = (input) => {
    for (let i = 0; i < 4; i += 1) {
      if (digits[i] == input) {
        if (digitHandler(i, input)) { break; }
      }
    };
  }

  const backspaceHandler = () => {
    if (digits.includes(currentInputArr[currentInputArr.length - 1])) {
      setDigitsUsed(digitsUsed.slice(0, digitsUsed.length - 1));
    }

    const newInputArr = [...currentInputArr];
    newInputArr.pop();
    setCurrentInputArr(newInputArr);
    updateInputVal(newInputArr.join(''));
  };

  const acHandler = () => {
    setDigitsUsed([]);
    setCurrentInputArr([]);
    setCurrentInputVal(0);
  };

  const isValidAnswer = () => {
    return Number.isInteger(currentInputVal) &&
        currentInputVal > 0 &&
        currentInputVal <= 28 &&
        digitsUsed.length === 4 &&
        !answers.includes(currentInputVal);
  };

  const updateAnswerDetails = (inputStr, inputVal) => {
    const newAnswerDetails = [...answerDetails];
    newAnswerDetails[inputVal - 1] = inputStr;
    setAnswerDetails(newAnswerDetails);
  };

  const enterHandler = () => {
    if (isValidAnswer()) {
      const newAnswers = [...answers, currentInputVal].sort((a, b) => a - b);
      setAnswers(newAnswers);
      updateAnswerDetails(currentInputArr.join(''), currentInputVal);
      setDigitsUsed([]);
      setCurrentInputArr([]);
      setCurrentInputVal(0);
    }
  };

  useEventListener('keydown', (e) => {
    e.preventDefault();
    if (digits.includes(e.key)) { advancedDigitsHandler(e.key); }
    if (operations.includes(e.key)) { inputHandler(e.key); }
    if (e.key === 'Backspace') { backspaceHandler(); }
    if (e.key === 'Enter') { enterHandler(); }
  });

  return (
    <div className="grid">
      <div className="output span-four">
        <div className="output-calculation">{currentInputArr.join('')}</div>
        <div
            className={`output-value ${isValidAnswer() ? 'valid' : 'not-valid'}`}
        >
          {currentInputVal}
        </div>
      </div>
      {
        digits.map((input, id) => {
          return (
            <DigitButton
                key={id} id={id} input={input}
                clickHandler={digitHandler}
                digitsUsed={digitsUsed}
            />
          );
        })
      }
      {
        operations.map((input, id) => {
          return <InputButton key={id} input={input} clickHandler={inputHandler} />;
        })
      }
      <div className="button span-two" role="button" tabIndex="0" onClick={backspaceHandler}>Back</div>
      <div className="button span-two" role="button" tabIndex="0" onClick={acHandler}>A/C</div>
      <div className="button span-four equals" role="button" tabIndex="0" onClick={enterHandler}>=</div>
    </div>
  );
}

export default Calculator;
