import InputButton from "./InputButton.jsx";

/**
 * @param {number} id - Index of the given input in digits in <Calculator>
 * @param {number|string} input - Input option to be represented by the button
 * @param {function} clickHandler - To be called onClick
 * @param {array.<number>} digitsUsed - Array of id's (as above). If used already, button is deactivated.
 */
const DigitButton = ({ id, input, clickHandler, digitsUsed }) => {
  const inputHandler = () => {
    if (digitsUsed.includes(id)) {
      return false;
    }

    clickHandler(input.toString(), id);
  };

  return (
    <InputButton
      input={input}
      clickHandler={inputHandler}
      classes={digitsUsed.includes(id) ? "used" : ""}
    />
  );
};

export default DigitButton;
