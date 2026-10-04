import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import * as authService from '../../services/authService';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage({ type: '', text: '' });

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    setError('');

    setLoading(true);
    try {
      await authService.forgotPassword({ email });
      setSubmitted(true);
    } catch (error) {
      setServerMessage({
        type: 'error',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-form-wrapper card">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">
          Enter your email and we'll send you a link to reset your password
        </p>

        <AlertMessage type={serverMessage.type} message={serverMessage.text} />

        {submitted ? (
          <AlertMessage
            type="success"
            message="If an account exists with that email, a reset link has been sent."
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="john@example.com"
              error={error}
            />
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? <Loader size="sm" /> : 'Send Reset Link'}
            </Button>
          </form>
        )}

        <p className="form-footer-text">
          Remembered your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
