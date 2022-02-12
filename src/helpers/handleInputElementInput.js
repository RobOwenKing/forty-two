const handleDigit = (char, newInputArr, digits, newDigitsUsed) => {
  for (let i = 0; i < 4; i += 1) {
    if (digits[i] == char && !newDigitsUsed.includes(i)) {
      newInputArr.push(char);
      newDigitsUsed.push(i);
    }
  };

  return { newInputArr, newDigitsUsed };
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
      if (['0', '1', '2'].includes(str[i+1])) {
        const digits = str.slice(i, i+2);
        newInputArr.push(digits);
        newDigitsUsed.push(digits);
        i += 1
      } else {
        newInputArr.push(char);
        newDigitsUsed.push(char);
      }
    }
  }

  return {newInputArr, newDigitsUsed};
};
