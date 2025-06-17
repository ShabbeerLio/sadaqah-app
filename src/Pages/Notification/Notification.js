import React from "react";
import "./Notification.css";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import NotificationData from "../NotificationData";

const Notification = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));

  const isInstitute = user.type === "institute";
  const username = user.username;

  // Filter notifications:
  const filteredNotifications = NotificationData.filter((n) => {
    if (isInstitute) {
      // Show only those sent TO this institute
      return n.to.type === "institute" && n.to.name === username;
    } else {
      // Show all broadcasts (to all users) or messages sent specifically to this user (if that’s ever added)
      return n.to.type === "user" && (n.to.name === "all" || n.to.name === username);
    }
  });
  return (
    <div className="Home">
      <div className="Home-main">
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
