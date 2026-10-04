import './Input.css';

/**
 * Reusable text input with label and inline error message.
 */
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  rightElement = null,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? 'input-error' : ''}`}
        />
        {rightElement && <div className="input-right">{rightElement}</div>}
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default Input;
