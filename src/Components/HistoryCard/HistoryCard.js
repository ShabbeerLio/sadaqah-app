import React from "react";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";

const HistoryCard = ({ tx }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  console.log(tx, "tx");
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
            <h4>₹{tx.amount}</h4>
          </div>
          <p className="history-Desc">0.8% Taken as platform Fee, We are trying to remove it.</p>
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
            <h4>₹{tx.amount}</h4>
          </div>
          <p className="history-Desc">0.8% Taken as platform Fee, We are trying to remove it.</p>
        </>
      )}
    </div>
  );
};

export default HistoryCard;
