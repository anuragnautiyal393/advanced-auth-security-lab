import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import * as authService from "../../services/authService";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const hasCalled = useRef(false);
  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const verify = async () => {
      try {
        console.log("Token:", token);
        console.log("EMAIL:", email);

        await authService.verifyEmail(token, email);

        setStatus("success");
        window.history.replaceState({}, document.title, "/verify-email");
      } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.response?.data?.message);

        setStatus("error");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
    }
  }, [token, email]);

  return (
    <div className="page-wrapper">
      <div className="auth-form-wrapper card verify-email-card">
        {status === "loading" && (
          <>
            <Loader size="lg" />
            <p className="verify-status-text">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="verify-icon success">✅</div>
            <h1>Email Verified!</h1>
            <p className="auth-subtitle">
              Your email has been verified successfully. You can now log in.
            </p>
            <Link to="/login">
              <Button fullWidth>Go to Login</Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="verify-icon error">❌</div>
            <h1>Verification Failed</h1>
            <AlertMessage
              type="error"
              message="This verification link is invalid or has expired."
            />
            <Link to="/login">
              <Button variant="outline" fullWidth>
                Back to Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
