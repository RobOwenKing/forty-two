const buildInputReturn = (inputArr, digitsUsed, cursorPos) => {
  return {
      newInputArr: inputArr,
      newDigitsUsed: digitsUsed,
      newCursorPos: cursorPos
    };
};

const insertInputIntoArray = (inputArr, newInput, cursorPos) => {
  const newInputArr = [
    ...inputArr.slice(0, cursorPos),
    newInput,
    ...inputArr.slice(cursorPos)
  ];
  const newCursorPos = cursorPos + 1;

  return {newInputArr, newCursorPos};
};

/**
  * @param {number} testee - A digit that may or may not have been used already
  * @param {array.<number>} digits - The digits available to the player. May include repeats. Expected length = 4
  * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
  * @returns {number} The first id in digits that matches the testee and isn't yet used, else -1
*/
const firstNonUsedOccurence = (testee, digits, digitsUsed) => {
  for (let i = 0; i < 4; i += 1) {
    if (digits[i] == testee && !digitsUsed.includes(i)) {
      return i;
    }
  };

  return -1;
};

const handleDigit = (inputArr, digitsUsed, newInput, cursorPos, operations, digits) => {
  let returnable;

  if (digits.includes(newInput)) {
    const digitsUsedIndex = firstNonUsedOccurence(newInput, digits, digitsUsed);
    if (digitsUsedIndex === -1) { return buildInputReturn(inputArr, digitsUsed, cursorPos); }

    returnable = insertInputIntoArray(inputArr, newInput, cursorPos);
    digitsUsed.push(digitsUsedIndex)
    returnable['newDigitsUsed'] = digitsUsed;
  }

  return returnable;
};

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
  } else {
    returnable = handleDigit(inputArr, digitsUsed, newInput, cursorPos, operations, digits);
  }

  return returnable;
};
