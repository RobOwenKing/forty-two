const BarChart = ({ data, highlights, divClass, labels = null }) => {
  const max = Math.max(...data);

  return (
    <div className="bar-chart">
      {data.map((value, i) => {
        return (
          <div key={i} className={divClass}>
            <div className="stats-value">{value}</div>
            <div
                className={`bar ${highlights[i] ? 'orange' : 'blue'}`}
                style={{height: (value * 100) / max}}
            ></div>
            {
              labels &&
                  <div className="stats-label">{labels[i]}</div>
            }
          </div>
        )
      })}
    </div>
  );
}

export default BarChart;
