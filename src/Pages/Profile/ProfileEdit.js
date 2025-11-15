import React, { useContext, useEffect, useState } from "react";
import "./ProfileEdit.css";
import { ChevronLeft } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";
import { useNavigate } from "react-router-dom";
import Host from "../../Host";

const ProfileEdit = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    number: "",
    location: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Fetch user data on mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const loadUserData = async () => {
      await getAccountDetails(); // fetch from backend & update context
      setLoading(false);
    };

    loadUserData();
  }, [navigate]);

  // ✅ When userDetail changes (after fetch), update formData
  useEffect(() => {
    if (userDetail) {
      setFormData({
        userName: userDetail?.userName || "",
        email: userDetail?.email || "",
        number: userDetail?.number || "",
        location: userDetail?.location || "",
        pincode: userDetail?.pincode || "",
      });
    }
  }, [userDetail]); // only runs when userDetail updates

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating...");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${Host}/auth/edituser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Updated successfully!");
        await getAccountDetails();
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage(data.error || data.errors?.[0]?.msg || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={handleGoBack}>
          <ChevronLeft />
        </button>
        <h2>Edit profile</h2>
      </div>

      <div className="profile-image-section">
        <img src={userDetail?.avatar} alt="Profile" className="profile-image" />
        <div className="edit-avatar">
          <button>Edit picture or avatar</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <label className="field-label">Name</label>
          <input
            className="field-value"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label className="field-label">Email</label>
          <input
            className="field-value"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label className="field-label">Number</label>
          <input
            className="field-value"
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label className="field-label">Location</label>
          <input
            className="field-value"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label className="field-label">Pincode</label>
          <input
            className="field-value"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-btn">
          {message ? message : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
