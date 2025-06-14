import React from "react";
import "./DonateCard.css";
import donate1 from "../../Assets/Posts/hadith.png";

const DonateCard = ({ user, i }) => {
    const progressPercent = Math.min(
        Math.round((i.amountReceived / i.donation) * 100),
        100
    ); // Cap at 100%

    return (
        <div className="donate-card">
            <div className="donate-title">
                <img src={donate1} alt="" />
                <h5>{i.username} <span className="verified">Verified</span></h5>
            </div>
            <p>{i.description}</p>
            <div className="donate-progress-box">
                <div className="fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="donate-pay">
                {user.type === "institute" ? (
                    <div className="donate-paybtn">
                        <p>View All</p>
                        <p>+</p>
                    </div>
                ) : (
                    <div className="donate-paybtn">
                    <p>Donate Now</p>
                    </div>
                )}
                <p>₹{i.amountReceived} / ₹{i.donation}</p>
            </div>
        </div>
    );
};

export default DonateCard;