import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { CiBank } from "react-icons/ci";
import { Landmark, WalletMinimal } from "lucide-react";


const HistoryCard = ({ tx, onClick }) => {
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

  const nameRef = useRef();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <div className="history-right-card" key={tx.id} onClick={() => onClick(tx)}>
      {user.type === "institute" ? (
        <>
          {tx.type === "Zakat" ? ("") : (
            <>
              <div className="history-card-detail-box">
                {tx?.type === "withdraw" ? (
                  <>
                    <div className="history-card-detail">

                      <div className="transaction-tag sadaqah">
                        <Landmark />
                        <div
                          className="donateCard-tag"
                        >W</div>
                      </div>
                      <div className="history-card-title">
                        <span>Wallet Withdraw</span>
                        <div className="scrolling-name-wrapper">
                          <h2
                            className={`scrolling-name ${isOverflowing ? "scrolling" : ""}`}
                            ref={nameRef}
                          >
                            {tx?.transactionId}
                          </h2>
                        </div>
                        <h6>{new Date(tx.date).toLocaleDateString()}</h6>
                        <div className="wallet-status">
                          <span>Amount Sent</span>
                        </div>
                      </div>
                    </div>
                    <div className="history-amount">
                      <h4>₹{tx.amount}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="history-card-detail">
                      <div className="transaction-tag sadaqah">
                        <WalletMinimal />
                        <div
                          className="donateCard-tag"
                        >S</div>
                      </div>
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
                      <p>₹{tx.amount}</p>
                      <p>(Platform Fee - {percentage}%) - ₹{fee}</p>
                      <h4>₹{finalAmount}</h4>
                    </div>
                  </>
                )}
              </div>
              <p className="history-Desc">{percentage}% Taken as platform Fee, We are trying to remove it.</p>
            </>
          )}

        </>
      ) : (
        <>
          {tx.type === "Zakat" ? (
            <>
              <div className="history-card-detail-box">
                <div className="history-card-detail">
                  <div className="transaction-tag zakat">
                    <GoArrowUpRight />
                    <div className="donateCard-tag">Z</div>
                  </div>
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
                  <p>₹{tx.amount}</p>
                  <p>(Platform Fee - {percentage}%) - ₹{fee}</p>
                  <h4>₹{finalAmount}</h4>
                </div>
              </div>
              <p className="history-Desc">{percentage}% Taken as platform Fee, We are trying to remove it.</p>
              {/* <div
                className="donateCard-tag"
                style={{ backgroundColor: "transparent", border:"1.5px solid #fdb618" }}
              ></div> */}
            </>
          ) : (
            <>
              <div className="history-card-detail-box">
                <div className="history-card-detail">
                  <div className="transaction-tag sadaqah">
                    <GoArrowUpRight />
                    <div
                      className="donateCard-tag"
                    >S</div>
                  </div>
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
                  <p>₹{tx.amount}</p>
                  <p>(Platform Fee - {percentage}%) - ₹{fee}</p>
                  <h4>₹{finalAmount}</h4>
                </div>
              </div>
              <p className="history-Desc">{percentage}% Taken as platform Fee, We are trying to remove it.</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryCard;
