export const handleInputElementInput = (str, operations) => {
  const newCurrentInputArr = [];
  const newDigitsUsed = [];

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (operations.includes(char)) { newCurrentInputArr.push(char); }
  }

  return newCurrentInputArr;
};
