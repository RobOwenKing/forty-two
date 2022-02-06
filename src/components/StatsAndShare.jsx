const getScores = () => {
  const history = localStorage.getItem('history');
  if (!history) { return null; }

  const parsedHistory = JSON.parse(history);
  return parsedHistory['scores'];
};

const StatsAndShare = ({ answers }) => {
  const scores = getScores();

  const averageScore = () => {
    const total = scores.reduce((subtotal, entry) => subtotal + entry);

    return (total / scores.length);
  };

  return (
    <div className="text-page">
      {scores && (
        <>
          <div className="stats-grid">
            <div className="stats-number">{scores.length /*Days played*/}</div>
            <div className="stats-number">{answers.length /*Today's score*/}</div>
            <div className="stats-number">{Math.max(...scores) /*Highscore*/}</div>
            <div className="stats-number">{averageScore().toFixed(2) /*Average*/}</div>
            <div className="stats-label">Days played</div>
            <div className="stats-label">Today</div>
            <div className="stats-label">Highest</div>
            <div className="stats-label">Average</div>
          </div>
          <p>Apologies to those who started playing before I'd set up score saving!</p>
        </>
      )}
      {!scores && (
        <p>Come back here after you've tried playing the game!</p>
      )}
    </div>
  );
}

export default StatsAndShare;
