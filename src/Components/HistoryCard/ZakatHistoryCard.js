import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";

const ZakatHistoryCard = ({ tx, activeTab }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  // console.log(tx, "tx");

  const nameRef = useRef();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setIsOverflowing(true);
    }
  }, []);
  const isReceived =
    activeTab !== "Donated" && tx.transactionsType === "Received";

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
      {isReceived ? (
        <>
          <div className="history-card-detail-box">
            <div className="history-card-detail">
              <p className="transaction-tag zakat">
                <GoArrowDownLeft />
                 <div
                      className="donateCard-tag"
                    >Z</div>
              </p>
              <div className="history-card-title">
                <span>Received from</span>
                <div className="scrolling-name-wrapper">
                  <h2
                    className={`scrolling-name ${
                      isOverflowing ? "scrolling" : ""
                    }`}
                    ref={nameRef}
                  >
                    {tx.name}
                  </h2>
                </div>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <p>₹{tx.amount}</p>
              <p>
                (Platform Fee - {percentage}%) - ₹{fee}
              </p>
              <h4>₹{finalAmount}</h4>
            </div>
          </div>
          <p className="history-Desc">
            {percentage}% Taken as platform Fee, We are trying to remove it.
          </p>
          {/* <div
            className="donateCard-tag"
            style={{ backgroundColor: "transparent" ,border:"1.5px solid #fdb618"}}
          ></div> */}
        </>
      ) : (
        <>
          <div className="history-card-detail-box">
            <div className="history-card-detail">
              <p className="transaction-tag zakat">
                <GoArrowUpRight />
                 <div
                      className="donateCard-tag"
                    >Z</div>
              </p>
              <div className="history-card-title">
                <span>Paid to</span>
                <div className="scrolling-name-wrapper">
                  <h2
                    className={`scrolling-name ${
                      isOverflowing ? "scrolling" : ""
                    }`}
                    ref={nameRef}
                  >
                    {tx.name}
                  </h2>
                </div>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <p>₹{tx.amount}</p>
              <p>
                (Platform Fee - {percentage}%) - ₹{fee}
              </p>
              <h4>₹{finalAmount}</h4>
            </div>
          </div>
          <p className="history-Desc">
            {percentage}% Taken as platform Fee, We are trying to remove it.
          </p>
          {/* <div
            className="donateCard-tag"
            style={{ backgroundColor: "transparent" ,border:"1.5px solid #fdb618" }}
          ></div> */}
        </>
      )}
    </div>
  );
};

export default ZakatHistoryCard;
