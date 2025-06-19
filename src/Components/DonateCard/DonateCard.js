import React from "react";
import "./DonateCard.css";
import donate1 from "../../Assets/Posts/hadith.png";
import verify from "../../Assets/Logo/verification-badge.png"

const DonateCard = ({ user, i }) => {
    const progressPercent = Math.min(
        Math.round((i.amountReceived / i.donation) * 100),
        100
    );
    return (
        <div className="donate-card" key={i.id}>
            <div className="donate-title">
                <img src={donate1} alt="" />
                <div className="donate-deatail">
                    <div className="donation-name">
                        <h5>{i.username}
                            <span className="verified">
                                Verified
                            </span>
                        </h5>
                        <p className="location">{i.location}</p>
                    </div>
                    <p className="status">Following</p>
                    {/* <p className="status follow">Follow</p> */}
                </div>
            </div>
            <p className="donation-description">{i.description}</p>
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