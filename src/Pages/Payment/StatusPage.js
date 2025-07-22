import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { LuCircleCheck } from "react-icons/lu";
import "./StatusPage.css";
import ads from "../../Assets/Ads/ads.jpg"

const StatusPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(15);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimeLeft((prev) => prev - 1);
    //     }, 1000);

    //     const timeout = setTimeout(() => {
    //         navigate("/");
    //     }, 15000);

    //     return () => {
    //         clearInterval(interval);
    //         clearTimeout(timeout);
    //     };
    // }, []);

    if (!state) {
        return <div className="sadaqah-container">No payment information available.</div>;
    }

    const {
        institute,
        total,
        paymentMode,
        paymentDate,
        transactionId,
        success,
    } = state;

    const handleGoBack = () => navigate(-1);

    console.log(institute,
        total,
        paymentMode,
        paymentDate,
        transactionId,
        success, "data")

    return (
        <div className="sadaqah-container">
            <button className="back-button" onClick={handleGoBack}>
                <IoIosArrowBack />
                <p>Confirmation</p>
            </button>

            <div className={`status-box ${success ? "success" : "failure"}`}>
                <h2>{success ? "Payment Success!" : "Payment Failed!"}</h2>
                <p className="status-message">
                    {success
                        ? "Your payment has been successfully done"
                        : "Your payment has been declined by your bank"}
                </p>
                {/* <p className="status-message" style={{ textAlign: "center", marginTop: "10px" }}>
                    Redirecting to homepage in {timeLeft} seconds...
                </p> */}

                <div className={`SearchCard institute-info ${success ? "tick" : "cross"}`}>
                    <div className="SearchCard-left">
                        <img src={institute?.avatar || "/default-avatar.png"} alt={institute?.username} />
                    </div>
                    <div className="SearchCard-right">
                        <h6>{institute?.username ? institute?.username : institute}</h6>
                        <p>Location: {institute?.location}</p>
                    </div>
                </div>

                <div className="details">
                    <div>
                        <strong>Amount</strong>
                        <span>₹{total?.toFixed(2)}</span>
                    </div>
                    <div>
                        <strong>Transaction Id</strong>
                        <span>{transactionId}</span>
                    </div>
                    <div>
                        <strong>Payment Mode</strong>
                        <span>{paymentMode}</span>
                    </div>
                    <div>
                        <strong>Payment Date</strong>
                        <span>{paymentDate}</span>
                    </div>

                    <img
                        src={ads}
                        alt="Payment Method"
                        className="payment-img"
                    />

                    {success ? (
                        <button className="invoice-btn">Download Invoice</button>
                    ) : (
                        <button className="try-again-btn" onClick={() => navigate(-1)}>
                            Try Again
                        </button>
                    )}
                </div>

                {success && (
                    <div className="reminder-box">
                        <div className="reminder-bot-top">
                            <div className="reminder-bot-detail">
                                <label class="neon-checkbox">
                  <input type="checkbox" />
                  <div class="neon-checkbox__frame">
                    <div class="neon-checkbox__box">
                      <div class="neon-checkbox__check-container">
                        <svg viewBox="0 0 24 24" class="neon-checkbox__check">
                          <path d="M3,12.5l7,7L21,5"></path>
                        </svg>
                      </div>
                      <div class="neon-checkbox__glow"></div>
                      <div class="neon-checkbox__borders">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    </div>
                    <div class="neon-checkbox__effects">
                      <div class="neon-checkbox__particles">
                        <span></span><span></span><span></span><span></span> <span></span
                        ><span></span><span></span><span></span> <span></span><span></span
                        ><span></span><span></span>
                      </div>
                      <div class="neon-checkbox__rings">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                      </div>
                      <div class="neon-checkbox__sparks">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                </label>
                            </div>
                            <div className="reminder-bot-detail">
                                <h4>{institute?.username ? institute?.username : institute}</h4>
                                <p><strong>Location:</strong> {institute?.location}</p>
                            </div>
                        </div>
                        <p className="reminder-note">
                            <span>Note:</span> By clicking that option you can give us access to remind
                            you every month for this donation.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusPage;