/**
  * @param {number} cursorPos - Where in inputArr the cursor should be
  * @param {function} setCursorPos - Function to change the value of cursorPos
  * * @param {array.<string>} inputArr - The array of digits and operations entered by the player
*/
const EquationInput = ({ cursorPos, setCursorPos, inputArr }) => {
  return (
    <div>
      {inputArr.slice(0, cursorPos).map((entry, id) => {
        return (
          <span key={id}>{entry}</span>
        )
      })}
      <span>c</span>
      {inputArr.slice(cursorPos).map((entry, id) => {
        return (
          <span key={id}>{entry}</span>
        )
      })}
    </div>
  );
}

export default EquationInput;
