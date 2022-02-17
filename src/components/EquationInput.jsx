/**
  * @param {number} cursorPos - Where in inputArr the cursor should be
  * @param {function} setCursorPos - Function to change the value of cursorPos
  * @param {array.<string>} inputArr - The array of digits and operations entered by the player
*/
const EquationInput = ({ cursorPos, setCursorPos, inputArr }) => {
  const clickHandler = (e, id) => {
    const isOnLeftHalf = e.nativeEvent.offsetX < e.target.offsetLeft + 0.5*e.target.offsetWidth

    if (isOnLeftHalf) {
      setCursorPos(id);
    } else {
      setCursorPos(id + 1);
    }
  };

  return (
    <div>
      {inputArr.slice(0, cursorPos).map((entry, id) => {
        return (
          <span key={id} onClick={(e) => clickHandler(e, id)}>{entry}</span>
        )
      })}
      <span>c</span>
      {inputArr.slice(cursorPos).map((entry, id) => {
        return (
          <span key={id} onClick={(e) => clickHandler(e, id)}>{entry}</span>
        )
      })}
    </div>
  );
}

export default EquationInput;
