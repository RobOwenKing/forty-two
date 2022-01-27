const AnswersList = ({ answers }) => {
  return (
    <ul>
      {
        answers.map((answer, id) => {
          return (
            <li>{answer ? answer : id+1}</li>
          )
        })
      }
    </ul>
  );
}

export default AnswersList;
