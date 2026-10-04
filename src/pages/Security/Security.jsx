import { useAuth } from "../../context/AuthContext";
import "./Security.css";


// Static placeholder security tips
const securityTips = [
  {
    icon: "🔑",
    title: "Use a Strong Password",
    description:
      "Combine uppercase, lowercase, numbers, and symbols for stronger security.",
  },
  {
    icon: "📱",
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of protection beyond just your password.",
  },
  {
    icon: "🚫",
    title: "Don't Reuse Passwords",
    description: "Use a unique password for every account you create online.",
  },
  {
    icon: "🕵️",
    title: "Watch for Phishing",
    description:
      "Never click suspicious links asking for your login credentials.",
  },
];

const Security = () => {
  const { user } = useAuth();

  // Placeholder static password strength - would come from real analysis later
  const passwordStrength = "Strong";

  return (
    <div className="page-wrapper">
      <div className="container security-container">
        <h1 className="section-title">Security Dashboard</h1>
        <p className="section-subtitle">
          Monitor and manage your account's security status
        </p>

        <div className="security-status-grid">
          <div className="status-card card">
            <span className="status-icon">📧</span>
            <span className="status-label">Email Verification</span>
            <span
              className={`badge ${user?.emailVerified ? "badge-success" : "badge-warning"}`}
            >
              {user?.emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          <div className="status-card card">
            <span className="status-icon">💪</span>
            <span className="status-label">Password Strength</span>
            <span className="badge badge-success">{passwordStrength}</span>
          </div>

          <div className="status-card card">
            <span className="status-icon">🕒</span>
            <span className="status-label">Last Login</span>
            <span className="status-value">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString():'Never'}</span>
          </div>

          <div className="status-card card">
            <span className="status-icon">✅</span>
            <span className="status-label">Account Status</span>
            <span className="badge badge-success">Active</span>
          </div>
        </div>

        <h2 className="tips-heading">Security Tips</h2>
        <div className="tips-grid">
          {securityTips.map((tip) => (
            <div className="tip-card card" key={tip.title}>
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;
