const AnswersList = ({ answers }) => {
  return (
    <ul>
      {
        answers.map((answer, id) => {
          return (
            <li>{id+1} = {answer ? answer : '???'}</li>
          )
        })
      }
    </ul>
  );
}

export default AnswersList;
