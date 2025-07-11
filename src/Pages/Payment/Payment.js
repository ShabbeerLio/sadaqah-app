import React, { useState, useEffect, useRef } from "react";
import "./Payment.css";
import CombinedFeedData from "../AppData";
import ads from "../../Assets/Ads/ads.jpg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Payment = () => {
  const navigate = useNavigate();
  const institutes = CombinedFeedData.filter((item) => item.type === "institute");
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [amount, setAmount] = useState("");
  const [includeFee, setIncludeFee] = useState(true); // 👈 new
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedInstitute = institutes.find(
    (inst) => String(inst.id) === String(selectedInstituteId)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        percentage = (50 / amount) * 100;
      }
    }
    console.log(fee)

    return {
      fee: fee,
      percentage: parseFloat(percentage),
    };
  }

  const amountValue = parseFloat(amount || 0);
  const { fee, percentage } = calculatePlatformFee(amountValue);
  console.log(fee, "fee")
  const total = includeFee ? amountValue + fee : amountValue;
  const payable = amountValue + fee;
  const finalText = `Pay ₹ ${total}`;

  const handleGoBack = () => {
    window.history.back(); // Simple browser back
  };

  const handlePay = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  if (!authUser) return;

  const isSuccess = Math.random() < 0.8;
  const paymentDate = new Date().toISOString().split("T")[0];
  const transactionId = "#TXN" + Math.floor(Math.random() * 1000000);

  const newTransaction = {
    id: Date.now(),
    name: selectedInstitute.username,
    amount: total,
    date: paymentDate,
    type: "payment",
    transactionId,
  };

  // Save to USER transactions
  const userKey = `userTransactions-${authUser.id}`;
  const existingUserTx = JSON.parse(localStorage.getItem(userKey)) || [];
  existingUserTx.push(newTransaction);
  localStorage.setItem(userKey, JSON.stringify(existingUserTx));

  // Save to INSTITUTE transactions
  const instituteKey = `instituteTransactions-${selectedInstitute.id}`;
  const existingInstituteTx = JSON.parse(localStorage.getItem(instituteKey)) || [];
  existingInstituteTx.push({
    ...newTransaction,
    name: authUser.username, // So the institute sees who paid
  });
  localStorage.setItem(instituteKey, JSON.stringify(existingInstituteTx));

  // Navigate to status page
  navigate("/status", {
    state: {
      institute: selectedInstitute,
      total,
      paymentMode: "Phone Pe",
      paymentDate,
      transactionId,
      success: isSuccess,
    },
  });
};

  return (
    <div className="sadaqah-container">
      <div className="section">
        <button className="back-button" onClick={handleGoBack}>
          <IoIosArrowBack />
        </button>
        <label>Select an Institute</label>
        <div className="custom-dropdown" ref={dropdownRef}>
          <div className="dropdown-selected" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedInstitute ? (
              <div className="dropdown-option">
                <img src={selectedInstitute.avatar || "/default-avatar.png"} alt="avatar" />
                <span>{selectedInstitute.username} ({selectedInstitute.location})</span>
              </div>
            ) : (
              <span>Choose Institute</span>
            )}
            <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
          </div>
          {dropdownOpen && (
            <div className="institute-dropdown">
              {institutes.map((inst) => (
                <div
                  key={inst.id}
                  className="dropdown-option"
                  onClick={() => {
                    setSelectedInstituteId(String(inst.id));
                    setDropdownOpen(false);
                  }}
                >
                  <img src={inst.avatar || "/default-avatar.png"} alt="avatar" />
                  <span>{inst.username} ({inst.location})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedInstitute && (
        <div className="SearchCard institute-info">
          <div className="SearchCard-left">
            <img src={selectedInstitute.avatar} alt={selectedInstitute.username} />
          </div>
          <div className="SearchCard-right">
            <h6>{selectedInstitute.username}</h6>
            <p>{selectedInstitute.location}</p>
          </div>
        </div>
      )}

      {selectedInstitute && (
        <>
          <div className="section">
            <label>Enter Amount</label>
            <input
              type="number"
              placeholder="₹ 0.00"
              value={amount}
              min="10"
              onChange={(e) => setAmount(e.target.value)}
            />
            <small>Minimum amount ₹10</small>
          </div>


          <div className="summary-card">
            <div className="summary-detail">
              <p>Amount</p>
              <p>₹ {amountValue}</p>
            </div>
            <div className="summary-detail">
              <div className="checkbox-section">
                <label className="checkbox-btn">
                  <label htmlFor="checkbox"></label>
                  <input
                    type="checkbox"
                    checked={includeFee}
                    onChange={() => setIncludeFee(!includeFee)}
                  />
                  Platform Fee ({percentage}%)
                  <span className="checkmark"></span>
                </label>
              </div>
              <p>₹ {fee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="summary-detail adsnote">
              <p><span>Note:</span>By Clicking the check box you are allowing us to take plateform fee from the main amount</p>
              <img src={ads} alt="" />
            </div>

          </div>
          <button className="pay-button" onClick={handlePay}>
            {finalText}
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;