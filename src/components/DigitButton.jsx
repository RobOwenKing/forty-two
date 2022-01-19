import InputButton from './InputButton.jsx';

const DigitButton = ({ id, input, clickHandler }) => {
  const inputHandler = () => {
    clickHandler(id, input);
  }

  return <InputButton input={input} clickHandler={inputHandler} />;
}

export default DigitButton;
