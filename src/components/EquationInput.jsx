/**
  * @param {number} cursorPos - Where in inputArr the cursor should be
  * @param {function} setCursorPos - Function to change the value of cursorPos
  * @param {array.<string>} inputArr - The array of digits and operations entered by the player
*/
const EquationInput = ({ cursorPos, setCursorPos, inputArr }) => {
  const clickHandler = (e, id, entry) => {
    const isOnLeftHalf = e.nativeEvent.pageX - e.target.offsetLeft < 0.5*e.target.offsetWidth

    console.log(entry);
    console.log(id);
    console.log(e.nativeEvent.pageX - e.target.offsetLeft);
    console.log(0.5*e.target.offsetWidth);

    if (isOnLeftHalf) {
      setCursorPos(id);
    } else {
      setCursorPos(id + 1);
    }
  };

  return (
    <div className="output-calculation">
      {inputArr.slice(0, cursorPos).map((entry, id) => {
        return (
          <span key={id} onClick={(e) => clickHandler(e, id, entry)}>{entry}</span>
        )
      })}
      <span className="caret"></span>
      {inputArr.map((entry, id) => {
        if (id < cursorPos) {
          return null;
        } else {
          return (
            <span key={id} onClick={(e) => clickHandler(e, id, entry)}>{entry}</span>
          )
        }
      })}
    </div>
  );
}

export default EquationInput;
