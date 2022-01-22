import { useState } from 'react';
import { evaluate } from 'mathjs';

import './App.css';

import DigitButton from './components/DigitButton.jsx';
import InputButton from './components/InputButton.jsx';

import { getTodaysDigits } from './helpers/getTodaysDigits.js';

import { useEventListener } from './hooks/useEventListener.js';

const App = () => {
  const digits = getTodaysDigits();
  const [digitsUsed, setDigitsUsed] = useState([]);
  const operations = ['+', '-', '*', '/', '!', '^', '(', ')'];

  const [currentInputStr, setCurrentInputStr] = useState('');
  const [currentInputVal, setCurrentInputVal] = useState(0);

  const [answers, setAnswers] = useState([]);

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
    const newInputStr = currentInputStr + input;
    setCurrentInputStr(newInputStr);
    updateInputVal(newInputStr);
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
    if (digits.includes(currentInputStr[currentInputStr.length - 1])) {
      setDigitsUsed(digitsUsed.slice(0, digitsUsed.length - 1));
    }

    const newInputStr = currentInputStr.slice(0, currentInputStr.length - 1);
    setCurrentInputStr(newInputStr);
    updateInputVal(newInputStr);
  };

  const acHandler = () => {
    setDigitsUsed([]);
    setCurrentInputStr('');
    setCurrentInputVal(0);
  };

  const isValidAnswer = () => {
    return Number.isInteger(currentInputVal) &&
        currentInputVal > 0 &&
        currentInputVal < 43 &&
        digitsUsed.length === 4 &&
        !answers.includes(currentInputVal);
  };

  const enterHandler = () => {
    if (isValidAnswer()) {
      setAnswers([...answers, currentInputVal].sort((a, b) => a - b));
      setDigitsUsed([]);
      setCurrentInputStr('');
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
    <div className="App">
      <h1>Twenty-Eight</h1>
      <div className="grid">
        <div className="output span-four">
          <div className="output-calculation">{currentInputStr}</div>
          <div className="output-value">{currentInputVal}</div>
        </div>
        {
          digits.map((input, id) => {
            return (
              <DigitButton
                  key={id} id={id} input={input}
                  clickHandler={digitHandler}
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
        <div className="button span-four" role="button" tabIndex="0" onClick={enterHandler}>=</div>
      </div>
      <p>You've found: {answers.join(', ')}</p>
    </div>
  );
}

export default App;
