import BarChart from "./BarChart.jsx";

/**
 * @returns {array.<number>|null} User's scores over time in order from localStorage
 */
const getScores = () => {
  const history = localStorage.getItem("history");
  if (!history) {
    return null;
  }

  const parsedHistory = JSON.parse(history);
  return parsedHistory["scores"];
};

/**
 * @param {array.<number>} scores - User's scores
 * @returns {array.<number>} Number of scores in scores which fall into each of 5 bands
 */
const groupScores = (scores) => {
  return [
    scores.filter((e) => e >= 1 && e <= 14),
    scores.filter((e) => e >= 15 && e <= 21),
    scores.filter((e) => e >= 22 && e <= 25),
    scores.filter((e) => e === 26 || e === 27),
    scores.filter((e) => e === 28),
  ];
};

/**
 * @returns {object} User's play history saved in localStorage
 */
const getHistory = () => {
  const history = localStorage.getItem("newHistory");
  if (!history) {
    return {};
  }

  return JSON.parse(history);
};

const playStreak = (newHistory) => {
  let d = new Date();
  let count = 0;

  while (newHistory[d.toDateString()]) {
    count += 1;
    d.setDate(d.getDate() - 1);
  }

  return count;
};

const countMaxes = (newHistoryAsArray) => {
  return newHistoryAsArray.filter((e) => e[1]["m"]).length;
};

/**
 * @param {array.<number>} answers - Answers found by the user (values)
 */
const NewStats = ({ answers }) => {
  const scores = getScores();

  const newHistory = getHistory();
  const newHistoryAsArray = Object.entries(newHistory);

  const daysPlayed = newHistoryAsArray.length;
  const newScores = newHistoryAsArray.map((e) => e[1]["s"]);
  const scoresByGroup = groupScores(newScores);
  const streak = playStreak(newHistory);
  const maxCount = countMaxes(newHistoryAsArray);

  /**
   * @returns {array.<number>} User's last seven scores (representing last seven days)
   * @todo Refactor to use newHistory? And remove last need for old history format
   */
  const lastSevenScores = () => {
    if (scores.length >= 7) {
      return scores.slice(-7);
    }

    /**
     * If a user has played fewer than seven days, unshift 0s to the start of the array
     * to make sure our returned array is always of length 7
     */
    const copyOfScores = [...scores];
    while (copyOfScores.length < 7) {
      copyOfScores.unshift(0);
    }
    return copyOfScores;
  };

  /**
   * Note conditional return for when a user has scores = null, ie: never player
   */
  return (
    <div className="text-page">
      {scores && (
        <>
          <div className="stats-grid">
            <div className="stats-number">{daysPlayed}</div>
            <div className="stats-number">{streak}</div>
            <div className="stats-number">{maxCount}</div>
            <div className="stats-number">
              {((maxCount * 100) / daysPlayed).toFixed() /*% maxes*/}%
            </div>
            <div className="stats-label">
              Days <br />
              played
            </div>
            <div className="stats-label">
              Day <br />
              streak
            </div>
            <div className="stats-label">
              Max <br />
              scores
            </div>
            <div className="stats-label">Maxes</div>
          </div>
          <h3>Last seven days</h3>
          <BarChart
            divClass="bar-chart__of-seven"
            data={lastSevenScores()}
            highlights={[0, 0, 0, 0, 0, 0, 1]}
          />
          <h3>All time</h3>
          <BarChart
            divClass="bar-chart__of-five"
            data={scoresByGroup.map((s) => s.length)}
            highlights={scoresByGroup.map((s) =>
              s.includes(scores[scores.length - 1])
            )}
            labels={["1-14", "15-21", "22-25", "26-27", "28"]}
          />
        </>
      )}
      {!scores && <p>Come back here after you've tried playing the game!</p>}
    </div>
  );
};

export default NewStats;
