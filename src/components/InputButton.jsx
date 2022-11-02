/**
 * @param {number|string} input - Input option to be represented by the button
 * @param {function} clickHandler - To be called onClick
 * @param {string} [classes] - Used directly as className to allow custom styling
 */
const InputButton = ({ input, clickHandler, classes = "" }) => {
  return (
    <div
      className={`grid__cell button ${classes}`}
      role="button"
      tabIndex="0"
      onClick={() => clickHandler(input)}
    >
      {input}
    </div>
  );
};

export default InputButton;
