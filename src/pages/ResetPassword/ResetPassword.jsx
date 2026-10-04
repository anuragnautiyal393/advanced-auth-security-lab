import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import * as authService from "../../services/authService";
import "./ResetPassword.css";

const ResetPassword = () => {
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const email = params.get("email");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      newErrors.newPassword = "Must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage({ type: "", text: "" });

    if (!validate()) return;

    setLoading(true);
    try {
      await authService.resetPassword(token, email, formData.newPassword);
      setServerMessage({
        type: "success",
        text: "Password reset successful. Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setServerMessage({
        type: "error",
        text:
          error.response?.data?.message || "Reset link is invalid or expired.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-form-wrapper card">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Choose a new password for your account</p>

        <AlertMessage type={serverMessage.type} message={serverMessage.text} />

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.newPassword}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirmPassword}
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? <Loader size="sm" /> : "Reset Password"}
          </Button>
        </form>

        <p className="form-footer-text">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
