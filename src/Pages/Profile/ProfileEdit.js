import React from "react";
import "./ProfileEdit.css"; // Import raw CSS
import ProfileData from "./ProfileData";
import { IoIosArrowBack } from "react-icons/io";

const ProfileEdit = () => {
  const handleEdit = (field) => {
    alert(`Edit ${field}`);
  };

  const handleGoBack = () => {
    window.history.back(); // Simple browser back
  };

  const data = ProfileData[0];
  console.log(data, "data");

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={handleGoBack}>
         <IoIosArrowBack/>
        </button>
        <h2>Edit profile</h2>
      </div>

      <div className="profile-image-section">
        <img src={data.profile} alt="Profile" className="profile-image" />
        <div className="edit-avatar">
          <button onClick={() => handleEdit("picture or avatar")}>
            Edit picture or avatar
          </button>
        </div>
      </div>

      <div className="profile-field" onClick={() => handleEdit("Name")}>
        <span className="field-label">Name</span>
        <span className="field-value">shabbeer</span>
      </div>

      <div className="profile-field" onClick={() => handleEdit("Username")}>
        <span className="field-label">Pincode</span>
        <span className="field-value">123456</span>
      </div>
      <div className="profile-field" onClick={() => handleEdit("Password")}>
        <span className="field-label">Password</span>
        <span className="field-value">**********</span>
      </div>
    </div>
  );
};

export default ProfileEdit;
