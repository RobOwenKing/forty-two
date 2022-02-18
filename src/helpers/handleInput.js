const insertInputIntoArray = (inputArr, newInput, cursorPos) => {
  const newInputArr = [
    ...inputArr.slice(0, cursorPos),
    newInput,
    ...inputArr.slice(cursorPos)
  ];
  const newCursorPos = cursorPos + 1;

  return {newInputArr, newCursorPos};
}

/**
  * @param {array.<string>} operations - The operations available to the user
  * @param {array.<number>} digits - The digits available to the user
  * @returns {object} Two arrays, newInputArray and newDigitsUsed to update state in <Calculator>
*/
export const handleInput = (inputArr, digitsUsed, newInput, cursorPos, operations, digits) => {
  let returnable;

  if (operations.includes(newInput)) {
    returnable = insertInputIntoArray(inputArr, newInput, cursorPos);
    returnable['newDigitsUsed'] = digitsUsed;
  };

  return returnable;
};
