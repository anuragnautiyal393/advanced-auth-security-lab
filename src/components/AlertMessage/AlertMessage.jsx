import './AlertMessage.css';

/**
 * Displays success / error / info messages.
 * type: 'success' | 'error' | 'info' | 'warning'
 */
const AlertMessage = ({ type = 'info', message }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;
