const InputButton = ({ input }) => {
  return (
    <div className="input"
         role="button"
         tabIndex="0" >
      {input}
    </div>
  );
}

export default InputButton;
