import React from "react";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";

const HistoryCard = ({ tx }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  // console.log(tx, "tx");
  function calculatePlatformFee(amount) {
    let fee = 0;
    let percentage = 0;

    if (amount >= 0 && amount <= 500) {
      percentage = 3;
      fee = amount * 0.03;
    } else if (amount <= 1000) {
      percentage = 2;
      fee = amount * 0.02;
    } else if (amount <= 3000) {
      percentage = 1.5;
      fee = amount * 0.015;
    } else {
      percentage = 1;
      fee = amount * 0.01;
      if (fee > 50) {
        fee = 50;
        percentage = (50 / amount) * 100; // recalculate actual applied %
      }
    }

    return {
      fee: Math.round(fee), // Round to nearest whole number
      percentage: parseFloat(percentage.toFixed(2)) // Limit to 2 decimals
    };
  }
  const { fee, percentage } = calculatePlatformFee(tx.amount);
  const finalAmount = tx.amount - fee;

  return (
    <div className="history-right-card" key={tx.id}>
      {user.type === "institute" ? (
        <>
          <div className="history-card-detail-box">
            <div className="history-card-detail">
              <p>
                <GoArrowDownLeft />
              </p>
              <div className="history-card-title">
                <span>Received from</span>
                <h2>{tx.name}</h2>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <p>₹{tx.amount}</p>
              <p>(Platform Fee - {percentage}%) - ₹{fee}</p>
              <h4>₹{finalAmount}</h4>
            </div>
          </div>
          <p className="history-Desc">{percentage}% Taken as platform Fee, We are trying to remove it.</p>
        </>
      ) : (
        <>
          <div className="history-card-detail-box">
            <div className="history-card-detail">
              <p>
                <GoArrowUpRight />
              </p>
              <div className="history-card-title">
                <span>Paid to</span>
                <h2>{tx.name}</h2>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <p>₹{tx.amount}</p>
              <p>(Platform Fee - {percentage}%) - ₹{fee}</p>
              <h4>₹{finalAmount}</h4>
            </div>
          </div>
          <p className="history-Desc">{percentage}% Taken as platform Fee, We are trying to remove it.</p>
        </>
      )}
    </div>
  );
};

export default HistoryCard;
