import { useState } from 'react';
import { evaluate } from 'mathjs';

import './App.css';

import InputButton from './components/InputButton.jsx';

import { useEventListener } from './hooks/useEventListener.js';

const App = () => {
  const [currentInputStr, setCurrentInputStr] = useState('');
  const [currentInputVal, setCurrentInputVal] = useState(0);
  const inputs = ['1', '2', '3', '4', '+', '-', '*', '/', '(', ')'];

  const updateInputVal = (newInputStr) => {
    const whitelistedStr = newInputStr.replace(/[^0-9\(\)\+\-\*\/\.]/g, "");

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

  const backspaceHandler = () => {
    const newInputStr = currentInputStr.slice(0, currentInputStr.length - 1);
    setCurrentInputStr(newInputStr);
    updateInputVal(newInputStr);
  };

  useEventListener('keydown', (e) => {
    e.preventDefault();
    if (inputs.includes(e.key)) { inputHandler(e.key); }
    if (e.key === 'Backspace') { backspaceHandler(); }
    console.log(e.key);
  });

  return (
    <div className="App">
      <h1>Forty-Two</h1>
      <div className="grid">
        <div className="output span-four">
          <div className="output-calculation">{currentInputStr}</div>
          <div className="output-value">{currentInputVal}</div>
        </div>
        {
          inputs.map((input, id) => {
            return <InputButton key={id} input={input} clickHandler={inputHandler} />;
          })
        }
        <div className="button span-two" role="button" tabIndex="0" onClick={backspaceHandler}>Back</div>
        <div className="button span-four" role="button" tabIndex="0">=</div>
      </div>
    </div>
  );
}

export default App;
