const AnswersGrid = ({ answers }) => {
  return (
    <div class="answers-grid">
      {
        answers.map((answer, id) => {
          return (
            <div key={id} className={answer ? "solved" : "not-solved"}>{answer ? answer : id+1}</div>
          )
        })
      }
    </div>
  );
}

export default AnswersGrid;
