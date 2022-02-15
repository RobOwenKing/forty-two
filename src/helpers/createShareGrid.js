/**
  * Maps each found answer to a green square emoji; answers not found yet to black square emojis
  * @param {array.<string|null>} arr - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
  * @return {string} 7x4 grid of squares as above, with new lines between
*/
export const createShareGrid = (arr) => {
  const returnable = [];

  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      arr[(i*7)+j] ? returnable.push('🟩') : returnable.push('⬛');
    }
    returnable.push('\n');
  }

  return returnable.join('');
}
