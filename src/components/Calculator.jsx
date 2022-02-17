import { useState, useEffect, useRef } from 'react';
import { evaluate } from 'mathjs';

import DigitButton from './DigitButton.jsx';
import EquationInput from './EquationInput.jsx';
import InputButton from './InputButton.jsx';

import { getTodaysDigits } from '../helpers/getTodaysDigits.js';
import { handleInput } from '../helpers/handleInput.js';

import { useEventListener } from '../hooks/useEventListener.js';

/**
  * @param {string} date - String representing the current date, used to seed the random number generator
  * @param {array.<number>} answers - Answers found by the user (values)
  * @param {function} setAnswers - Function that takes an array to set as new value of answers
  * @param {array.<string|null>} answerDetails - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
  * @param {function} setAnswerDetails -Function that takes an array to set as new value of answerDetails
*/
const Calculator = ({ date, answers, setAnswers, answerDetails, setAnswerDetails }) => {
  const digits = getTodaysDigits(date);
  const [digitsUsed, setDigitsUsed] = useState([]);
  const operations = ['+', '-', '*', '/', '!', '^', '(', ')'];

  const [inputArr, setInputArr] = useState([]);
  const [inputVal, setInputVal] = useState(0);

  // const inputRef = useRef();
  const [cursorPos, setCursorPos] = useState(0);

  /**
    * When inputArr changes, update inputVal (preview of calculation total)
    * also, for when using on screen buttons, return focus to input with correct selectionStart
  */
  useEffect(() => {
    updateInputVal(inputArr.join(''));
  }, [inputArr]);

  /**
    * Either updates inputVal in the try block if valid calculation passed, else does nothing
    * @param {string} newInputStr - Calculation as string to be evaluated
  */
  const updateInputVal = (newInputStr) => {
    const whitelistedStr = newInputStr.replace(/[^0-9()+\-*/!^]/g, "");

    try {
      const newInputVal = evaluate(whitelistedStr);
      setInputVal(newInputVal);
    } catch(e) {
      return;
    }
  };

  /**
    * Adds input in relevant position in the inputStr then
    * parses result to update inputArr and cursorPos as necessary
    * @param {string} input - The character(s) the user wishes to add to inputArr
  */
  const inputHandler = (input) => {
    const {
      newInputArr,
      newDigitsUsed,
      newCursorPos
    } = handleInput(inputArr, digitsUsed, input, cursorPos, operations, digits);
    setInputArr(newInputArr);
    setDigitsUsed(newDigitsUsed);
    setCursorPos(newCursorPos);
  };

  /**
    * Call inputHandler() and update digitsUsed with given input if digit not already used
    * @param {number} id - The index of the input in digits
    * @param {string} input - The digit(s) the user wishes to add to inputArr
  */
/*  const digitHandler = (id, input) => {
    if (digitsUsed.includes(id)) { return; }

    inputHandler(input);
    setDigitsUsed([...digitsUsed, id]);
  };*/

  /**
    * Deletes the relevant character from the inputStr
    * parses result to update inputArr, digitsUsed and cursorPos as necessary
  */
  const backspaceHandler = () => {
    /*const inputStr = inputRef.current.value;
    const targetInputStr = `${inputStr.slice(0, cursorPos - 1)}${inputStr.slice(cursorPos)}`;

    const { newInputArr, newDigitsUsed } = handleInput(targetInputStr, operations, digits);
    setInputArr(newInputArr);
    setDigitsUsed(newDigitsUsed);
    setCursorPos(cursorPos + newInputArr.join('').length - inputArr.join('').length);*/
  };

  /**
    * Clears out everything relating to the current input
  */
  const acHandler = () => {
    setDigitsUsed([]);
    setInputArr([]);
    setInputVal(0);
  };

  /**
    * @returns {boolean} Whether the current inputVal is a valid, new answer or not
  */
  const isValidAnswer = () => {
    return Number.isInteger(inputVal) &&
        inputVal > 0 &&
        inputVal <= 28 &&
        digitsUsed.length === 4 &&
        !digitsUsed.includes(-1) &&
        !answers.includes(inputVal);
  };

  /**
    * Adds a new total's inputStr to the correct position in the answerDetails array
    * @param {string} inputStr - The equation to be added to answerDetails
    * @param {number} inputVal - The equation's total to find the correct index in answerDetails
  */
  const updateAnswerDetails = (inputStr, inputVal) => {
    /*const newAnswerDetails = [...answerDetails];
    newAnswerDetails[inputVal - 1] = inputStr;
    setAnswerDetails(newAnswerDetails);*/
  };

  /**
    * Checks if the current input is a new, valid answer, if so updates everything relevant
  */
  const enterHandler = () => {
/*    if (isValidAnswer()) {
      const newAnswers = [...answers, inputVal].sort((a, b) => a - b);
      setAnswers(newAnswers);
      updateAnswerDetails(inputArr.join(''), inputVal);
      setDigitsUsed([]);
      setInputArr([]);
      setInputVal(0);
    }*/
  };

  useEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enterHandler();
    }
  });

  /**
    * Updates everything necessary when the user changes the value of the <input> element
    * @param {Event} event - The onChange event prompting this handler to be called
  */
/*  const changeHandler = (event) => {
    const { newInputArr, newDigitsUsed } = handleInput(event.target.value, operations, digits);

    setCursorPos(inputRef.current.selectionStart)
    setInputArr(newInputArr);
    setDigitsUsed(newDigitsUsed);
  };*/

  return (
    <div className="grid">
      <div className="output span-four">
        <EquationInput
          cursorPos={cursorPos} setCursorPos={setCursorPos}
          inputArr={inputArr}
        />
        <div
            className={`output-value ${isValidAnswer() ? 'valid' : 'not-valid'}`}
        >
          {inputVal}
        </div>
      </div>
      {
        digits.map((input, id) => {
          return (
            <DigitButton
                key={id} id={id} input={input}
                clickHandler={inputHandler}
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
