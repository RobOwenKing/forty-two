const InputButton = ({ input, clickHandler }) => {
  return (
    <div
      className="button"
      role="button"
      tabIndex="0"
      onClick={() => clickHandler(input)}
    >
      {input}
    </div>
  );
}

export default InputButton;
