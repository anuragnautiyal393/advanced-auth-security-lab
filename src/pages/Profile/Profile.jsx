import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import Input from "../../components/Input/Input";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/authService";
import "./Profile.css";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await authService.getProfile();
        if (response?.data) {
          updateUser(response.data);
          setFormData({
            fullName: response.data.fullName || "",
            email: response.data.email || "",
          });
        }
      } catch (error) {
        // Silently ignore for now - placeholder backend not connected
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.data);
      setMessage({ type: "success", text: "Profile updated successfully." });
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading && !user) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <div className="page-wrapper">
      <div className="container profile-container">
        <div className="profile-card card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1>{user?.fullName || "User Name"}</h1>
              <p className="profile-email-muted">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <AlertMessage type={message.type} message={message.text} />

          {isEditing ? (
            <form onSubmit={handleSave} className="profile-edit-form">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="profile-edit-actions">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader size="sm" /> : "Save Changes"}
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user?.fullName || "-"}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user?.email || "-"}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Account Created</span>
                  <span className="info-value">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">Email Verified</span>
                  <span
                    className={`badge ${user?.emailVerified ? "badge-success" : "badge-warning"}`}
                  >
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>

              <div className="profile-actions">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                <Link to="/change-password">
                  <Button variant="secondary">Change Password</Button>
                </Link>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
