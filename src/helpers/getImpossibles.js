const data = require("../data/all_totals_all_numbers.json");

const allTargets = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
];

const getPossibles = (impossibles) => {
  return allTargets.filter((e) => !impossibles.includes(e));
};

export const getImpossibles = (digits) => {
  const digitsAsKey = JSON.stringify(
    digits.map((d) => parseInt(d)).sort((a, b) => a - b)
  );
  const impossibles = data[digitsAsKey];

  return [impossibles, getPossibles(impossibles)];
};
