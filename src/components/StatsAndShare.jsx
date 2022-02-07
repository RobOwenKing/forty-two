import BarChart from './BarChart.jsx';

const getScores = () => {
  const history = localStorage.getItem('history');
  if (!history) { return null; }

  const parsedHistory = JSON.parse(history);
  return parsedHistory['scores'];
};

const groupScores = (nonZeros) => {
  return [
    nonZeros.filter(e => e >= 1 && e <= 14),
    nonZeros.filter(e => e >= 15 && e <= 21),
    nonZeros.filter(e => e >= 22 && e <= 25),
    nonZeros.filter(e => e === 26 || e === 27),
    nonZeros.filter(e => e === 28)
  ];
};

const StatsAndShare = ({ answers }) => {
  const scores = getScores();
  const nonZeros = scores.filter(entry => entry != 0);
  const scoresByGroup = groupScores(nonZeros);

  const averageScore = () => {
    const total = nonZeros.reduce((subtotal, entry) => subtotal + entry);

    return (total / nonZeros.length);
  };

  const lastSevenScores = () => {
    if (scores.length >= 7) { return scores.slice(-7); }

    const copyOfScores = [...scores];
    while (copyOfScores.length < 7) { copyOfScores.unshift(0); }
    return copyOfScores;
  };


  return (
    <div className="text-page">
      {scores && (
        <>
          <div className="stats-grid">
            <div className="stats-number">{nonZeros.length /*Days played*/}</div>
            <div className="stats-number">{answers.length /*Today's score*/}</div>
            <div className="stats-number">{Math.max(...scores) /*Highscore*/}</div>
            <div className="stats-number">{averageScore().toFixed(2) /*Average*/}</div>
            <div className="stats-label">Days played</div>
            <div className="stats-label">Today</div>
            <div className="stats-label">Highest</div>
            <div className="stats-label">Average</div>
          </div>
          <p>Apologies to those who started playing before I'd set up score saving!</p>
          <h3>Last seven days</h3>
          <BarChart
              divClass="seven-days"
              data={lastSevenScores()}
              highlights={[0,0,0,0,0,0,1]}
          />
          <h3>All time</h3>
          <BarChart
              divClass="all-time"
              data={scoresByGroup.map(s => s.length)}
              highlights={scoresByGroup.map(s => s.includes(scores[scores.length-1]))}
              labels={['1-14','15-21','21-25','26-27','28']}
          />
        </>
      )}
      {!scores && (
        <p>Come back here after you've tried playing the game!</p>
      )}
    </div>
  );
}

export default StatsAndShare;
