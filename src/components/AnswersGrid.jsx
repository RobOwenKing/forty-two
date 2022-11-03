/**
 * @param {array.<string|null>} answerDetails - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
 * @param {array.<number>} impossibles - Totals (out of 1..28) that cannot be made with the current digits
 */
const AnswersGrid = ({ answerDetails, impossibles }) => {
  const returnClass = (answer, id) => {
    if (impossibles.includes(id + 1)) {
      return "impossible";
    }

    return answer ? "solved" : "not-solved";
  };

  /**
   * If answers are too long, reduce the font size so they fit nicely into the layout
   * @todo Make this less magic-number-y
   */
  const fontSize = (answer) => {
    if (!answer) {
      return "inherit";
    }
    if (answer.length < 9) {
      return "inherit";
    }

    return (80 / answer.length) * 1.2;
  };

  return (
    <div className="grid for-answers">
      {answerDetails.map((answer, id) => {
        return (
          <div
            key={id}
            className={returnClass(answer, id)}
            style={{ fontSize: fontSize(answer) }}
          >
            {answer ? answer : id + 1}
          </div>
        );
      })}
    </div>
  );
};

export default AnswersGrid;
