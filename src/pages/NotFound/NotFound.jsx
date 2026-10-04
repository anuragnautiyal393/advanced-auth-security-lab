import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <div className="not-found-container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
