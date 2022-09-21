/**
 * Checks whether the brackets are valid in the given string
 * @param {string} str - The equation string to be checked
 * @returns boolean
 */
export const areBracketsBalanced = (str) => {
  const stack = [];

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === "(") {
      stack.push("(");
    }
    if (str[i] === ")" && !stack.pop()) {
      return false;
    }
  }

  return stack.length === 0;
};
