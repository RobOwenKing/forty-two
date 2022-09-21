/**
 * @param {array.<number>} data - The values for the sizes of the bars
 * @param {array.<boolean>} highlights - Same length as data. Defines colouring of the bars: true = orange; false = blue.
 * @param {string} divClass - Used directly as className to allow custom styling
 * @param {array.<string>} [labels] - Same length as data. Label to describe what each bar represents.
 */
const BarChart = ({ data, highlights, divClass, labels = null }) => {
  /** Used to scale bars */
  const max = Math.max(...data);

  return (
    <div className="bar-chart">
      {data.map((value, i) => {
        return (
          <div key={i} className={divClass}>
            <div className="stats-value">{value}</div>
            <div
              className={`bar ${highlights[i] ? "orange" : "blue"}`}
              style={{ height: (value * 100) / max }}
            ></div>
            {labels && <div className="stats-label">{labels[i]}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
