/**
 * @param {string} view - Current tab chosen by user to highlight name ['howto', 'game', 'stats']
 * @param {function} setView - Function that takes a string to set as new value of view
 */
const ViewToggle = ({ view, setView }) => {
  return (
    <p>
      <span
        className={`clickable ${
          view === "howto" ? "tab__name--is-chosen" : ""
        }`}
        onClick={() => setView("howto")}
      >
        How to Play
      </span>
      <span> / </span>
      <span
        className={`clickable ${view === "game" ? "tab__name--is-chosen" : ""}`}
        onClick={() => setView("game")}
      >
        Game
      </span>
      <span> / </span>
      <span
        className={`clickable ${
          view === "stats" ? "tab__name--is-chosen" : ""
        }`}
        onClick={() => setView("stats")}
      >
        My Results
      </span>
    </p>
  );
};

export default ViewToggle;
