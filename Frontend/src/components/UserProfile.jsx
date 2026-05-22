import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import "../styles/UserProfile.css";

const UserProfile = ({ onClose }) => {
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h2>My Profile</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="profile-content">
          {/* Profile Avatar */}
          <div className="profile-avatar-section">
            <img src={user?.pic} alt={user?.name} className="profile-avatar" />
            {isEditing && (
              <label className="avatar-upload">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <input type="file" accept="image/*" hidden />
              </label>
            )}
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="button-group">
                  <button className="save-button" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  <label>Name</label>
                  <p>{user?.name}</p>
                </div>

                <div className="info-item">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>

                <div className="info-item">
                  <label>Bio</label>
                  <p>{user?.bio || "No bio added"}</p>
                </div>

                <div className="info-item">
                  <label>Status</label>
                  <p className={`status ${user?.status}`}>
                    {user?.status === "online" ? "● Online" : "● Offline"}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="profile-footer">
            <button className="logout-button" onClick={handleLogout}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
