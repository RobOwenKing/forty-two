import logo from './logo.svg';
import './App.css';

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
          inputs.map((input, id) => { return <div key={id}>{input}</div>; })
        }
        <div className="span-two">Back</div>
        <div className="span-four">=</div>
      </div>
    </div>
  );
}

export default App;
