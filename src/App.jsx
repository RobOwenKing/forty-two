import { useState } from 'react';

import './App.css';

import InputButton from './components/InputButton.jsx';

const App = () => {
  const [currentInputString, setCurrentInputString] = useState('');
  const inputs = [1, 2, 3, 4, '+', '-', '*', '/', '(', ')'];

  const inputHandler = (input) => {
    setCurrentInputString(currentInputString + input);
  };

  return (
    <div className="App">
      <h1>Forty-Two</h1>
      <div className="grid">
        <div className="output span-four">
          <div className="output-calculation">{currentInputString}</div>
          <div className="output-value"></div>
        </div>
        {
          inputs.map((input, id) => { return <InputButton key={id} input={input} clickHandler={inputHandler} />; })
        }
        <div className="button span-two" role="button" tabIndex="0">Back</div>
        <div className="button span-four" role="button" tabIndex="0">=</div>
      </div>
    </div>
  );
}

export default App;
