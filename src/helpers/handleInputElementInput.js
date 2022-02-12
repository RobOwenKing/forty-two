export const handleInputElementInput = (str) => {
  const newCurrentInputArr = [];
  const newDigitsUsed = [];

  for (let i = 0; i < str.length; i += 1) {
    newCurrentInputArr.push(str[i]);
  }

  return newCurrentInputArr;
};
