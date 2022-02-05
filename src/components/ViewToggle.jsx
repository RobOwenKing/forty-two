const ViewToggle = ({ view, setView }) => {
  return (
    <p>
      <span
          className="clickable"
          onClick={() => setView('howto')}
      >
        How to Play
      </span>
      <span> / </span>
      <span
          className="clickable"
          onClick={() => setView('game')}
      >
        Game
      </span>
      <span> / </span>
      <span
          className="clickable"
          onClick={() => setView('stats')}
      >
        My Results
      </span>
    </p>
  );
}

export default ViewToggle;
