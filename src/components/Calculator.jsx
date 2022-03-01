import { useState, useEffect } from 'react';
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
  // const digits = ['1', '11', '12', '12']
  const [digitsUsed, setDigitsUsed] = useState([]);
  const operations = ['+', '-', '*', '/', '!', '^', '(', ')'];

  const [inputArr, setInputArr] = useState([]);
  const [inputVal, setInputVal] = useState(0);
  const [previewVal, setPreviewVal] = useState('');

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
    * When inputVal changes, update previewVal
  */
  useEffect(() => {
    setPreviewVal(inputVal);
  }, [inputVal]);

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
  const inputHandler = (input, id = -1) => {
    const {
        newInputArr,
        newDigitsUsed,
        newCursorPos
      } = handleInput([...inputArr], [...digitsUsed], input, cursorPos, operations, digits);

    setInputArr(newInputArr);
    setCursorPos(newCursorPos);

    if (id === -1) {
      setDigitsUsed(newDigitsUsed);
    } else {
      setDigitsUsed([...digitsUsed, id]);
    }
  };

  /**
    * Deletes the relevant character from the inputStr
    * parses result to update inputArr, digitsUsed and cursorPos as necessary
  */
  const backspaceHandler = () => {
    if (cursorPos === 0) { return false; }

    const deletable = inputArr[cursorPos-1];
    const newInputArr = [...inputArr.slice(0, cursorPos-1), ...inputArr.slice(cursorPos)];

    let digitsIndex = 9;
    for (let i = 0; i <= digits.length; i += 1) {
      if (digits[i] === deletable && digitsUsed.includes(i)) { digitsIndex = i; }
    }
    if (deletable === '1' && digitsUsed.includes(-1)) { digitsIndex = -1 }

    setInputArr(newInputArr);
    setDigitsUsed(digitsUsed.filter(x => x !== digitsIndex))
    setCursorPos(cursorPos-1);
  };

  /**
    * Clears out everything relating to the current input
  */
  const acHandler = () => {
    setDigitsUsed([]);
    setInputArr([]);
    setCursorPos(0);
  };

  const areBracketsBalanced = (str) => {
    const stack = [];

    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === '(') { stack.push('('); }
      if (str[i] === ')' && !stack.pop()) { return false; }
    }

    return stack.length === 0;
  };

  /**
    * @returns {string} Whether the current inputVal is a valid, new answer or not
  */
  const checkAnswer = () => {
    if (!Number.isInteger(inputVal)) { return 'Not an integer'; }
    if (inputVal <= 0) { return 'Too small'; }
    if (inputVal > 28) { return 'Too large'; }
    if (digitsUsed.length !== 4 || digitsUsed.includes(-1) ) { return 'Use each given digit once'; }
    if (!areBracketsBalanced(inputArr.join(''))) { return 'Check your brackets'; }
    if (answers.includes(inputVal)) { return 'Already found'; }

    return 'valid';
  };

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
    * Checks if the current input is a new, valid answer, if so updates everything relevant
  */
  const enterHandler = () => {
    const answerCheck = checkAnswer();

    if (answerCheck === 'valid') {
      const newAnswers = [...answers, inputVal].sort((a, b) => a - b);
      setAnswers(newAnswers);
      updateAnswerDetails(inputArr.join(''), inputVal);
      setDigitsUsed([]);
      setInputArr([]);
      setCursorPos(0);
    } else {
      setPreviewVal(answerCheck);
    }
  };

  /**
    * Updates cursorPos appropriately based on arrow key pressed by user
    * @param {string} arrow - As in Event, one of "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"
  */
  const arrowHandler = (arrow) => {
    switch (arrow) {
      case 'ArrowUp':
        setCursorPos(0);
        break;
      case 'ArrowDown':
        setCursorPos(inputArr.length);
        break;
      case 'ArrowLeft':
        if (cursorPos > 0) { setCursorPos(cursorPos-1); }
        break;
      case 'ArrowRight':
        if (cursorPos < inputArr.length) { setCursorPos(cursorPos+1); }
        break;
      default:
        return;
    };
  };

  useEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enterHandler();
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      arrowHandler(e.key);
    } else if (operations.includes(e.key)
          || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
      e.preventDefault();
      inputHandler(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      backspaceHandler();
    }
  });

  const previewValClass = () => {
    if (typeof previewVal === 'number') {
      if (checkAnswer() === 'valid') { return 'valid'; }

      return 'wip';
    } else {
      return 'not-valid';
    }
  };

  return (
    <div className="grid">
      <div className="output span-four">
        {answers.length < 28 &&
            <EquationInput
                cursorPos={cursorPos} setCursorPos={setCursorPos}
                inputArr={inputArr}
            />
        }
        {answers.length >= 28 &&
            <div className="output-calculation">CONGRATS!</div>
        }
        <div
            className={`output-value ${previewValClass()}`}
        >
          {previewVal}
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
