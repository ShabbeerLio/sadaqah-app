import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StatusPage.css";
import ads from "../../Assets/Ads/ads.jpg";
import Checkbox from "../Items/Checkbox";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronLeft } from "lucide-react";

const StatusPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15);
  console.log(state);

  if (!state) {
    return (
      <div className="sadaqah-container">No payment information available.</div>
    );
  }
  const statusItem = state?.statusItem;
  const institute = state?.institute;
  const success = statusItem?.status;
  const type = statusItem?.type;
  const total = statusItem?.amount;
  const transactionId = statusItem?.transactionId;
  const paymentMode = statusItem?.paymentMode;
  const paymentDate = new Date(statusItem?.paymentDate).toLocaleString();

  const handleGoBack = () => navigate(-1);

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  const handleDone = () => {
    navigate("/");
  };

  return (
    <div className="sadaqah-container">
      <button className="back-button" onClick={handleGoBack}>
        <ChevronLeft />
        <p>Confirmation</p>
      </button>

      <div className={`status-box ${success ? "success" : "failure"}`}>
        <div className="status-message">
          {success ? (
            <>
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                  loop
                  autoplay
                  onError={(e) => console.error("Lottie load error:", e)}
                />
              </div>
              <h2>{type === "withdraw" ? "Withdraw" : "Payment"} Success!</h2>
              "Your payment has been successfully done"
            </>
          ) : (
            <>
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/8203a740-c8fe-46c5-98b0-88ee09d7ebc4/NUreWbpTSD.lottie"
                  loop
                  autoplay
                  onError={(e) => console.error("Lottie load error:", e)}
                />
              </div>
              <h2>Payment Failed!</h2>
              "Your payment has been declined by your bank"
            </>
          )}
        </div>
        {/* <p className="status-message" style={{ textAlign: "center", marginTop: "10px" }}>
                    Redirecting to homepage in {timeLeft} seconds...
                </p> */}

        <div
          className={`SearchCard institute-info ${success ? "tick" : "cross"}`}
        >
          <div className="SearchCard-left">
            <img
              src={institute?.avatar || "/default-avatar.png"}
              alt={institute?.userName}
            />
          </div>
          <div className="SearchCard-right">
            <h6>{institute?.userName}</h6>
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

          <img src={ads} alt="Payment Method" className="payment-img" />

          {success ? (
            <button className="invoice-btn" onClick={handleDone}>
              Close
            </button>
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
                <Checkbox
                  checked={""}
                  onChange={""}
                  setWithdrawAmount={""}
                  currentBalance={""}
                />
              </div>
              <div className="reminder-bot-detail">
                <h4>{institute?.userName}</h4>
                <p>
                  <strong>Location:</strong> {institute?.location}
                </p>
              </div>
            </div>
            <p className="reminder-note">
              <span>Note:</span> By clicking that option you can give us access
              to remind you every month for this donation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPage;
