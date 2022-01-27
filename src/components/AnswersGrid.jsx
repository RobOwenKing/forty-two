const AnswersGrid = ({ answers }) => {
  const fontSize = (answer) => {
    if (!answer) { return 'inherit'; }
    if (answer.length < 9) { return 'inherit'; }

    return (80 / answer.length) * 1.2;
  }

  return (
    <div className="answers-grid">
      {
        answers.map((answer, id) => {
          return (
            <div
                key={id}
                className={answer ? "solved" : "not-solved"}
                style={{fontSize: fontSize(answer)}}
            >
              {answer ? answer : id+1}
            </div>
          )
        })
      }
    </div>
  );
}

export default AnswersGrid;
