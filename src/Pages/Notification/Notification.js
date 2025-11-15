import React, { useContext, useEffect } from "react";
import "./Notification.css";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import NotificationData from "../NotificationData";
import NoteContext from "../../Context/SadaqahContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Notification = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const user = userDetail;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
    }
  }, [navigate]);

  const isInstitute = user?.role === "institute";
  const username = user.userName;

  // Filter notifications:
  const filteredNotifications = NotificationData.filter((n) => {
    if (isInstitute) {
      // Show only those sent TO this institute
      return n.to.type === "institute" && n.to.name === username;
    } else {
      // Show all broadcasts (to all users) or messages sent specifically to this user (if that’s ever added)
      return (
        n.to.type === "user" && (n.to.name === "all" || n.to.name === username)
      );
    }
  });
  return (
    <div className="Home">
      <div className="Home-main">
        <div className="profile-header other" style={{marginTop:"1rem"}}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <h2>Notification</h2>
        </div>
        <div className="notification-box">
          {filteredNotifications.length === 0 ? (
            <p>No Notifications available.</p>
          ) : (
            <>
              {filteredNotifications.map((note) => (
                <NotificationCard notifications={note} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
