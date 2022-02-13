import { useState, useEffect, useRef } from 'react';
import { evaluate } from 'mathjs';

import DigitButton from './DigitButton.jsx';
import InputButton from './InputButton.jsx';

import { getTodaysDigits } from '../helpers/getTodaysDigits.js';
import { handleInputElementInput } from '../helpers/handleInputElementInput.js';

import { useEventListener } from '../hooks/useEventListener.js';

const Calculator = ({ date, answers, setAnswers, answerDetails, setAnswerDetails }) => {
  const [digits, setDigits] = useState(getTodaysDigits(date));
  const [digitsUsed, setDigitsUsed] = useState([]);
  const operations = ['+', '-', '*', '/', '!', '^', '(', ')'];

  const [currentInputArr, setCurrentInputArr] = useState([]);
  const [currentInputVal, setCurrentInputVal] = useState(0);

  const inputRef = useRef();
  const [cursorPos, setCursorPos] = useState(0);

  useEffect(() => {
    updateInputVal(currentInputArr.join(''));
    setCursorPos(inputRef.current.selectionStart);
  }, [currentInputArr]);

  const updateInputVal = (newInputStr) => {
    const whitelistedStr = newInputStr.replace(/[^0-9()+\-*/.!^]/g, "");

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
  };

  const digitHandler = (id, input) => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(cursorPos, cursorPos);

    const inputStr = inputRef.current.value;
    const targetInputStr = `${inputStr.slice(0, cursorPos)}${input}${inputStr.slice(cursorPos)}`;

    const { newInputArr } = handleInputElementInput(targetInputStr, operations, digits);
    setCurrentInputArr(newInputArr);
  };

  const backspaceHandler = () => {
    if (digits.includes(currentInputArr[currentInputArr.length - 1])) {
      setDigitsUsed(digitsUsed.slice(0, digitsUsed.length - 1));
    }

    const newInputArr = [...currentInputArr];
    newInputArr.pop();
    setCurrentInputArr(newInputArr);
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
        !digitsUsed.includes(-1) &&
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
    if (e.key === 'Enter') {
      e.preventDefault();
      enterHandler();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      backspaceHandler();
    }
  });

  const changeHandler = (event) => {
    const { newInputArr, newDigitsUsed } = handleInputElementInput(event.target.value, operations, digits);

    setCurrentInputArr(newInputArr);
    setDigitsUsed(newDigitsUsed);
  };

  return (
    <>
    <input
        type="text" ref={inputRef}
        value={currentInputArr.join('')}
        onChange={changeHandler}
        onBlur={() => setCursorPos(inputRef.current.selectionStart)}
    />
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
    </>
  );
}

export default Calculator;
