const InputButton = ({ input, clickHandler, classes = '' }) => {
  return (
    <div
      className={`button ${classes}`}
      role="button"
      tabIndex="0"
      onClick={() => clickHandler(input)}
    >
      {input}
    </div>
  );
}

export default InputButton;
