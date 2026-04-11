const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-test"
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};

export default Button;
