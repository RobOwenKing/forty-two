/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @returns {object}
 */
const buildInputReturn = (inputArr, digitsUsed, cursorPos) => {
  return {
    newInputArr: inputArr,
    newDigitsUsed: digitsUsed,
    newCursorPos: cursorPos,
  };
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @returns {object}
 */
const insertInputIntoArray = (inputArr, newInput, cursorPos) => {
  const newInputArr = [
    ...inputArr.slice(0, cursorPos),
    newInput,
    ...inputArr.slice(cursorPos),
  ];
  const newCursorPos = cursorPos + 1;

  return { newInputArr, newCursorPos };
};

/**
 * @param {number} testee - A digit that may or may not have been used already
 * @param {array.<string>} digits - The digits available to the player. May include repeats. Expected length = 4
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @returns {number} The first id in digits that matches the testee and isn't yet used, else -1
 */
const firstNonUsedOccurence = (testee, digits, digitsUsed) => {
  for (let i = 0; i < 4; i += 1) {
    if (digits[i] === testee && !digitsUsed.includes(i)) {
      return i;
    }
  }

  return -1;
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @param {number} digitsUsedIndex - The index of newInput in digitsUsed
 * @returns {object}
 */
const insertDigitIntoArray = (
  inputArr,
  digitsUsed,
  newInput,
  cursorPos,
  digitsUsedIndex
) => {
  const returnable = insertInputIntoArray(inputArr, newInput, cursorPos);
  digitsUsed.push(digitsUsedIndex);
  returnable["newDigitsUsed"] = digitsUsed;

  return returnable;
};

const oneFilter = (x) => {
  return x === "1" || x === "10" || x === "11" || x === "12";
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @param {array.<string>} digits - The digits available to the player. May include repeats. Expected length = 4
 * @returns {object|false}
 */
const handlePotentialSecondDigit = (
  inputArr,
  digitsUsed,
  newInput,
  cursorPos,
  digits
) => {
  if (inputArr[cursorPos - 1] !== "1") {
    return false;
  }

  const digitsUsedIndex = firstNonUsedOccurence(
    `1${newInput}`,
    digits,
    digitsUsed
  );
  if (digitsUsedIndex === -1) {
    return false;
  }

  inputArr[cursorPos - 1] = `1${newInput}`;
  if (digitsUsed.includes(-1)) {
    digitsUsed[digitsUsed.indexOf(-1)] = digitsUsedIndex;
  } else {
    const indexOf1InDigits = digits.indexOf("1");
    if (digitsUsed.includes(indexOf1InDigits)) {
      digitsUsed[digitsUsed.indexOf(indexOf1InDigits)] = digitsUsedIndex;
    }
  }

  return {
    newInputArr: inputArr,
    newDigitsUsed: digitsUsed,
    newCursorPos: cursorPos,
  };
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @param {array.<string>} digits - The digits available to the player. May include repeats. Expected length = 4
 * @returns {object|false}
 */
const handleOne = (inputArr, digitsUsed, newInput, cursorPos, digits) => {
  if (inputArr.filter(oneFilter).length >= digits.filter(oneFilter).length) {
    return false;
  }

  return insertDigitIntoArray(inputArr, digitsUsed, newInput, cursorPos, -1);
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @param {array.<string>} digits - The digits available to the player. May include repeats. Expected length = 4
 * @returns {object}
 */
const handleDigit = (inputArr, digitsUsed, newInput, cursorPos, digits) => {
  if (inputArr[cursorPos - 1] === "1" && ["0", "1", "2"].includes(newInput)) {
    const returnable = handlePotentialSecondDigit(
      inputArr,
      digitsUsed,
      newInput,
      cursorPos,
      digits
    );
    if (returnable) {
      return returnable;
    }
  }

  if (newInput === "1") {
    const returnable = handleOne(
      inputArr,
      digitsUsed,
      newInput,
      cursorPos,
      digits
    );
    if (returnable) {
      return returnable;
    }
  } else if (digits.includes(newInput)) {
    const digitsUsedIndex = firstNonUsedOccurence(newInput, digits, digitsUsed);
    if (digitsUsedIndex === -1) {
      return buildInputReturn(inputArr, digitsUsed, cursorPos);
    }

    return insertDigitIntoArray(
      inputArr,
      digitsUsed,
      newInput,
      cursorPos,
      digitsUsedIndex
    );
  }

  return buildInputReturn(inputArr, digitsUsed, cursorPos);
};

/**
 * @param {array.<string>} inputArr - The array of digits and operations entered by the player
 * @param {array.<number>} digitsUsed - The indexes from digits of the digits already used by the player
 * @param {string} newInput - The input to be added to inputArr
 * @param {number} cursorPos - The position of the cursor (relative to inputArr)
 * @param {array.<string>} operations - The operations available to the user
 * @param {array.<string>} digits - The digits available to the player. May include repeats. Expected length = 4
 * @returns {object}
 */
export const handleInput = (
  inputArr,
  digitsUsed,
  newInput,
  cursorPos,
  operations,
  digits
) => {
  let returnable;

  if (operations.includes(newInput)) {
    returnable = insertInputIntoArray(inputArr, newInput, cursorPos);
    returnable["newDigitsUsed"] = digitsUsed;
  } else {
    returnable = handleDigit(inputArr, digitsUsed, newInput, cursorPos, digits);
  }

  /*If we have a 1 left in inputArr which should be just that, a 1, update digitsUsed*/
  if (
    returnable["newInputArr"].filter(oneFilter).length ===
      digits.filter(oneFilter).length &&
    digits.includes("1") &&
    returnable["newInputArr"].filter((x) => x === "1").length === 1
  ) {
    const index = returnable["newDigitsUsed"].indexOf(-1);
    returnable["newDigitsUsed"][index] = digits.indexOf("1");
  }

  return returnable;
};
