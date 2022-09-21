/**
 * @param {string} view - Current tab chosen by user to highlight name ['howto', 'game', 'stats']
 * @param {function} setView - Function that takes a string to set as new value of view
 */
const ViewToggle = ({ view, setView }) => {
  return (
    <p>
      <span
        className={`clickable ${view === "howto" ? "chosen-mode" : ""}`}
        onClick={() => setView("howto")}
      >
        How to Play
      </span>
      <span> / </span>
      <span
        className={`clickable ${view === "game" ? "chosen-mode" : ""}`}
        onClick={() => setView("game")}
      >
        Game
      </span>
      <span> / </span>
      <span
        className={`clickable ${view === "stats" ? "chosen-mode" : ""}`}
        onClick={() => setView("stats")}
      >
        My Results
      </span>
    </p>
  );
};

export default ViewToggle;
