import React from "react";
import "./NotificationCard.css";

const NotificationCard = ({ notifications }) => {
      const showFollowButton = notifications.reason === "new-institute";

    return (
        <div className="notification-card" key={notifications.id}>
            <div className="nontification-img">
                <img src={notifications.avatar} alt="" />
            </div>
            <div className="notification-detali">
                <p>{notifications.notification}</p>
                <span>{notifications.from.name}</span>
            </div>
            <div className="notificaation-type">
                {showFollowButton ? (
                    <p className="status follow">Follow</p>
                ) : (
                    " "
                )}
            </div>
        </div>
    )
};

export default NotificationCard;
