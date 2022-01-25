const TotalsGrid = ({ answers }) => {
  return (
    <div>
      {
        answers.map((answer, id) => {
          return (
            <div key={id} class={answer ? "solved" : "not-solved"}>{id+1}</div>
          )
        })
      }
    </div>
  );
}

export default TotalsGrid;
