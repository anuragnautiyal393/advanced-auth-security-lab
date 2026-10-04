import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Home.css';

const features = [
  {
    icon: '🔒',
    title: 'Secure Authentication',
    description: 'Industry-standard password hashing and JWT-based session management.',
  },
  {
    icon: '📧',
    title: 'Email Verification',
    description: 'Confirm user identity through secure, time-limited verification links.',
  },
  {
    icon: '🔁',
    title: 'Password Recovery',
    description: 'Self-service forgot/reset password flow with secure token expiry.',
  },
  {
    icon: '🛡️',
    title: 'Account Security',
    description: 'Track login activity and manage account protection settings.',
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">🔐 Advanced Auth & Security Lab</span>
          <h1>
            Secure Authentication, <br /> Built the Right Way
          </h1>
          <p>
            A full-featured MERN authentication system with email verification,
            password recovery, and account security monitoring - built for
            learning modern, secure web development.
          </p>
          <div className="hero-actions">
            <Link to="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">
            A complete authentication toolkit designed with security best practices.
          </p>

          <div className="features-grid">
            {features.map((feature) => (
              <div className="feature-card card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
