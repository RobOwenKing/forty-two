import InputButton from './InputButton.jsx';

const DigitButton = ({ id, input, clickHandler, digitsUsed }) => {
  const inputHandler = () => {
    clickHandler(id, input);
  }

  return (
    <InputButton
        input={input} clickHandler={inputHandler}
        classes={digitsUsed.includes(id) ? 'used' : ''}
    />
  );
}

export default DigitButton;
