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

  if (i !== -1 || char === '1') {
    newInputArr.push(char);
    newDigitsUsed.push(i);
  }

  return { newInputArr, newDigitsUsed };
};

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
