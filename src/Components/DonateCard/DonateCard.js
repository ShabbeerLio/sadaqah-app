import React from "react";
import "./DonateCard.css";
import donate1 from "../../Assets/Posts/hadith.png";
import { Link } from "react-router-dom";

const DonateCard = ({ user, i, donationType ,handleCloseDonet,handleDonet}) => {
    const progressPercent = Math.min(
        Math.round((i.amountReceived / i.donation) * 100),
        100
    );

    const isUserLocation = i.location === donationType;
    const tagColor = isUserLocation ? "#800080" : "#00c5ff"; // purple : blue

    return (
        <div className="donate-card" key={i.id}>
            <div className="donate-header">
                <div className="donate-details">
                    <h4 className="donation-title">{i.title.split(" ").slice(0, 5).join(" ")}{i.title.split(" ").length > 5 ? "..." : ""}</h4>
                    <p className="donation-description">{i.description.split(" ").slice(0, 10).join(" ")}{i.description.split(" ").length > 10 ? "..." : ""}</p>
                </div>
                <div className="donate-view">
                    <Link to={"/request-details"} state={{ item: i }} onClick={handleCloseDonet}>View Detail</Link>
                </div>
            </div>
            <div className="donate-title">
                <img style={{ border:`2px solid ${tagColor}`}} src={i.avatar} alt="" />
                <div className="donate-deatail">
                    <div className="donation-name">
                        <h5>{i.username}
                            <span className="verified">
                                Verified
                            </span>
                        </h5>
                        <p className="location">{i.location}</p>
                    </div>
                </div>
            </div>
            <div className="donate-progress-box">
                <div className="fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="donate-pay">
                {user.type === "institute" ? (
                    <div className="donate-paybtn">
                        <p onClick={() => handleDonet("list")}>View All</p>
                        <p><Link to={"/request-details"} state={{ item: i }} onClick={handleCloseDonet}>+</Link></p>
                    </div>
                ) : (
                    <div className="donate-paybtn">
                        <Link to={"/request-details"} state={{ item: i }} onClick={handleCloseDonet}>Do Sadaqah</Link>
                    </div>
                )}
                <div className="donate-payable">
                    <span>Amount Received / Required</span>
                    <p>₹{i.amountReceived} / ₹{i.donation}</p>
                </div>
            </div>
            {/* <div
                className="donateCard-tag"
                style={{ backgroundColor: "transparent" , border:`1.5px solid ${tagColor}`}}
            ></div> */}
        </div>
    );
};

export default DonateCard;