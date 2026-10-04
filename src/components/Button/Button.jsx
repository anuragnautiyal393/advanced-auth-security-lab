import './Button.css';

/**
 * Reusable button component.
 * variant: 'primary' | 'secondary' | 'outline' | 'danger'
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
