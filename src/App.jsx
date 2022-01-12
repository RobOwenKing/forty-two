import logo from './logo.svg';
import './App.css';

import InputButton from './components/InputButton.jsx';

const App = () => {
  const inputs = [1, 2, 3, 4, '+', '-', '*', '/', '(', ')'];

  return (
    <div className="App">
      <h1>Forty-Two</h1>
      <div className="grid">
        <div className="output span-four">
          <div className="output-calculation"></div>
          <div className="output-value"></div>
        </div>
        {
          inputs.map((input, id) => { return <InputButton key={id} input={input} />; })
        }
        <div className="input span-two">Back</div>
        <div className="input span-four">=</div>
      </div>
    </div>
  );
}

export default App;
