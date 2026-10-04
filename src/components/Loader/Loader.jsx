import './Loader.css';

/**
 * Simple loading spinner.
 * size: 'sm' | 'md' | 'lg'
 */
const Loader = ({ size = 'md', fullPage = false }) => {
  const spinner = <div className={`loader loader-${size}`} />;

  if (fullPage) {
    return <div className="loader-fullpage">{spinner}</div>;
  }

  return spinner;
};

export default Loader;
