import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";

const ZakatHistoryCard = ({ tx ,activeTab}) => {
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
  const isReceived = activeTab !== "Donated" && tx.transactionsType === "Received";

  return (
    <div className="history-right-card" key={tx.id}>
      {isReceived ? (
        <>
          <div className="history-card-detail-box">
            <div className="history-card-detail">
              <p>
                <GoArrowDownLeft />
              </p>
              <div className="history-card-title">
                <span>Received from</span>
                <div className="scrolling-name-wrapper">
                  <h2
                    className={`scrolling-name ${isOverflowing ? "scrolling" : ""}`}
                    ref={nameRef}
                  >
                    {tx.name}
                  </h2>
                </div>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <h4>₹{tx.amount}</h4>
            </div>
          </div>
          <div
            className="donateCard-tag"
            style={{ backgroundColor: "#fdb618" }}
          ></div>
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
                <div className="scrolling-name-wrapper">
                  <h2
                    className={`scrolling-name ${isOverflowing ? "scrolling" : ""}`}
                    ref={nameRef}
                  >
                    {tx.name}
                  </h2>
                </div>
                <h6>{new Date(tx.date).toLocaleDateString()}</h6>
              </div>
            </div>
            <div className="history-amount">
              <h4>₹{tx.amount}</h4>
            </div>
          </div>
          <div
            className="donateCard-tag"
            style={{ backgroundColor: "#fdb618" }}
          ></div>
        </>
      )}
    </div>
  );
};

export default ZakatHistoryCard;
