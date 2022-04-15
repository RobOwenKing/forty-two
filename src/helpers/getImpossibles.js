const data = require('../data/all_totals_all_numbers.json');

export const getImpossibles = (digits) => {
  const digitsAsKey = JSON.stringify(digits.map(d => parseInt(d)).sort((a, b) => a - b));
  return data[digitsAsKey];
};
