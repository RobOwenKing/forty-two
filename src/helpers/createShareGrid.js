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
