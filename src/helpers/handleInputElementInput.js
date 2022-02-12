const firstNonUsedOccurence = (testee, digits, newDigitsUsed) => {
  for (let i = 0; i < 4; i += 1) {
    if (digits[i] == testee && !newDigitsUsed.includes(i)) {
      return i;
    }
  };

  return -1;
};

const handleDigit = (char, newInputArr, digits, newDigitsUsed) => {
  const i = firstNonUsedOccurence(char, digits, newDigitsUsed);

  if (i !== -1) {
    newInputArr.push(char);
    newDigitsUsed.push(i);
  }

  return { newInputArr, newDigitsUsed };
};

/*const handleOne = (str, i, newInputArr, digits, newDigitsUsed) => {
  let char;

  if (['0', '1', '2'].includes(str[i+1])) {
    const pair = str.slice(i, i+2);
    if (digits.includes(pair)) {
      char = pair
    }
    newInputArr.push(digits);
    newDigitsUsed.push(digits);
    i += 1
  } else {
    newInputArr.push(char);
    newDigitsUsed.push(char);
  }
};*/

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
      /*const newArrays = handleOne(str, i, newInputArr, digits, newDigitsUsed);
      newInputArr = newArrays['newInputArr'];
      newDigitsUsed = newArrays['newDigitsUsed'];*/
    }
  }

  return {newInputArr, newDigitsUsed};
};
