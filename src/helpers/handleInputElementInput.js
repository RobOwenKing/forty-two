export const handleInputElementInput = (str, operations) => {
  const newCurrentInputArr = [];
  const newDigitsUsed = [];

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (operations.includes(char)) {
      newCurrentInputArr.push(char);
    } else if (['0', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
      newCurrentInputArr.push(char);
      newDigitsUsed.push(char);
    } else if (char === '1') {
      if (['0', '1', '2'].includes(str[i+1])) {
        const digits = str.slice(i, i+2);
        newCurrentInputArr.push(digits);
        newDigitsUsed.push(digits);
        i += 1
      } else {
        newCurrentInputArr.push(char);
        newDigitsUsed.push(char);
      }
    }
  }

  return newCurrentInputArr;
};
