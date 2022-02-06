const BarChart = ({ data }) => {
  const max = Math.max(...data);

  return (
    <div className="bar-chart">
      {data.map((value, i) => {
        return (
          <div key={i}>
            <div
                className="bar"
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
