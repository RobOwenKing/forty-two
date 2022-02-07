const BarChart = ({ data, highlights, divClass }) => {
  const max = Math.max(...data);

  return (
    <div className="bar-chart">
      {data.map((value, i) => {
        return (
          <div key={i} className={divClass}>
            <div
                className={`bar ${highlights[i] ? 'orange' : 'blue'}`}
                style={{height: (value * 100) / max}}
            ></div>
            <div className="stats-label">{value}</div>
          </div>
        )
      })}
    </div>
  );
}

export default BarChart;
