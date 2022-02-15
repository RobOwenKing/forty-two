/**
  * @param {number} testee - A digit that may or may not have been used already
  * @param {array.<number>} digits - The digits available to the player. May include repeats. Expected length = 4
  * @param {array.<number>} newDigitsUsed - The indexes from digits of the digits already used by the player
  * @returns {number} The first id in digits that matches the testee and isn't yet used, else -1
*/
const firstNonUsedOccurence = (testee, digits, newDigitsUsed) => {
  for (let i = 0; i < 4; i += 1) {
    if (digits[i] == testee && !newDigitsUsed.includes(i)) {
      return i;
    }
  };

  return -1;
};

/**
  * @param {string} char - The digit(s) the user wants to play
  * @param {array.<string>} newInputArr - The array of digits and operations entered by the player
  * @param {array.<number>} digits - The digits available to the player. May include repeats. Expected length = 4
  * @param {array.<number>} newDigitsUsed - The indexes from digits of the digits already used by the player
  * @returns {object} Containing two arrays, params newInputArr and newDigitsUsed updated as required
*/
const handleDigit = (char, newInputArr, digits, newDigitsUsed) => {
  const i = firstNonUsedOccurence(char, digits, newDigitsUsed);

  if (i !== -1 || char === '1') {
    newInputArr.push(char);
    newDigitsUsed.push(i);
  }

  return { newInputArr, newDigitsUsed };
};

/**
  * @param {string} str - The user's target equation as a string
  * @param {number} i - The index in str of the 1 under consideration
  * @param {array.<string>} newInputArr - The array of digits and operations entered by the player
  * @param {array.<number>} digits - The digits available to the player. May include repeats. Expected length = 4
  * @param {array.<number>} newDigitsUsed - The indexes from digits of the digits already used by the player
  * @returns {object} Containing two arrays, params newInputArr and newDigitsUsed updated as required, plus {number} increment - 0 or 1 whether the for loop in handleInputElementInput needs to skip next digit
*/
const handleOne = (str, i, newInputArr, digits, newDigitsUsed) => {
  let char, increment;

  if (['0', '1', '2'].includes(str[i+1])) {
    const pair = str.slice(i, i+2);
    if (firstNonUsedOccurence(pair, digits, newDigitsUsed) !== -1) {
      char = pair;
      increment = 1;
    } else {
      char = str[i];
      increment = 0;
    }
  } else {
    char = str[i];
    increment = 0;
  }

  const returnable = handleDigit(char, newInputArr, digits, newDigitsUsed);
  returnable['increment'] = increment;
  return returnable;
};

/**
  * @param {string} str - The user's target equation as a string
  * @param {array.<string>} operations - The operations available to the user
  * @param {array.<number>} digits - The digits available to the user
  * @returns {object} Two arrays, newInputArray and newDigitsUsed to update state in <Calculator>
*/
export const handleInputElementInput = (str, operations, digits) => {
  let newInputArr = [];
  let newDigitsUsed = [];

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (operations.includes(char)) {
      newInputArr.push(char);
    } else if (['0', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
      const newArrays = handleDigit(char, newInputArr, digits, newDigitsUsed);
      newInputArr = newArrays['newInputArr'];
      newDigitsUsed = newArrays['newDigitsUsed'];
    } else if (char === '1') {
      const newArrays = handleOne(str, i, newInputArr, digits, newDigitsUsed);
      newInputArr = newArrays['newInputArr'];
      newDigitsUsed = newArrays['newDigitsUsed'];
      i += newArrays['increment'];
    }
  }

  return {newInputArr, newDigitsUsed};
};
