import React, { useState, useEffect, useRef } from "react";
import "./Payment.css";
import CombinedFeedData from "../AppData";
import ads from "../../Assets/Ads/ads.jpg"
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import Searchbox from "../../Components/Searchbox/Searchbox";


const Payment = () => {
  const location = useLocation();
  const item = location.state?.item;
  console.log(item, "item")


  const navigate = useNavigate();
  const institutes = CombinedFeedData.filter((item) => item.type === "institute");
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [amount, setAmount] = useState("");
  const [includeFee, setIncludeFee] = useState(true); // 👈 new
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");


  let selectedInstitute = [];

  if (item) {
    selectedInstitute = institutes.find(
      (inst) => String(inst.username) === String(item.username)
    );
  } else {
    selectedInstitute = institutes.find(
      (inst) => String(inst.id) === String(selectedInstituteId)
    );
  }

  console.log(selectedInstitute, "selectedInstitute")

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

    if (amount >= 0 && amount <= 1000) {
      percentage = 3;
      fee = amount * 0.03;
    } else if (amount <= 2000) {
      percentage = (25 / amount) * 100;
      fee = 25;
    } else if (amount <= 3000) {
      percentage = (30 / amount) * 100;
      fee = 30;
    } else if (amount <= 4000) {
      fee = 40;
      percentage = (40 / amount) * 100;
    } else {
      percentage = (50 / amount) * 100;
      fee = 50;
      if (fee > 50) {
        fee = 50;
        percentage = (50 / amount) * 100; 
      }
    }

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
      success: isSuccess,
      institute: selectedInstitute,
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

  // Flatten and enrich all posts with user info and relative date
  const allPosts = CombinedFeedData.filter((user) => user.type === "institute");

  // Sort newest posts first
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Search filter
  const filteredPosts = sortedPosts.filter((post) => {
    const terms = searchTerm.toLowerCase().split(" ");
    const combined = `${post.username} ${post.location}`.toLowerCase();
    return terms.every(term => combined.includes(term));
  });

  return (
    <div className="sadaqah-container">
      {!selectedInstitute ? (
        <div className="section">
          <button className="back-button" onClick={handleGoBack}>
            <IoIosArrowBack />
            <h5>Select an Institute</h5>
          </button>
          <Searchbox value={searchTerm} setSearch={setSearchTerm} />
          <div className="institute-list">
            {filteredPosts.map((inst) => (
              <div className="SearchCard"
                onClick={() => setSelectedInstituteId(String(inst.id))}>
                <div className="SearchCard-left">
                  <img src={inst.avatar} alt={inst.username} />
                </div>
                <div className="SearchCard-right">
                  <h6>{inst.username} {inst?.type === "institute" ? (
                    <span>({inst?.instituteType})  <span className="verified">Verified</span></span>
                  ) : (
                    <span>({inst?.type})</span>
                  )} </h6>
                  <p>{inst.location}</p>
                </div>
              </div>
            ))}
            {filteredPosts.map((inst) => (
              <div className="SearchCard"
                onClick={() => setSelectedInstituteId(String(inst.id))}>
                <div className="SearchCard-left">
                  <img src={inst.avatar} alt={inst.username} />
                </div>
                <div className="SearchCard-right">
                  <h6>{inst.username} {inst?.type === "institute" ? (
                    <span>({inst?.instituteType})  <span className="verified">Verified</span></span>
                  ) : (
                    <span>({inst?.type})</span>
                  )} </h6>
                  <p>{inst.location}</p>
                </div>
              </div>
            ))}
            {filteredPosts.map((inst) => (
              <div className="SearchCard"
                onClick={() => setSelectedInstituteId(String(inst.id))}>
                <div className="SearchCard-left">
                  <img src={inst.avatar} alt={inst.username} />
                </div>
                <div className="SearchCard-right">
                  <h6>{inst.username} {inst?.type === "institute" ? (
                    <span>({inst?.instituteType})  <span className="verified">Verified</span></span>
                  ) : (
                    <span>({inst?.type})</span>
                  )} </h6>
                  <p>{inst.location}</p>
                </div>
              </div>
            ))}
            {filteredPosts.map((inst) => (
              <div className="SearchCard"
                onClick={() => setSelectedInstituteId(String(inst.id))}>
                <div className="SearchCard-left">
                  <img src={inst.avatar} alt={inst.username} />
                </div>
                <div className="SearchCard-right">
                  <h6>{inst.username} {inst?.type === "institute" ? (
                    <span>({inst?.instituteType})  <span className="verified">Verified</span></span>
                  ) : (
                    <span>({inst?.type})</span>
                  )} </h6>
                  <p>{inst.location}</p>
                </div>
              </div>
            ))}
          </div>
          <Ads />
        </div>
      ) : (
        <div className="section">
          <button className="back-button" onClick={handleGoBack}>
            <IoIosArrowBack />
            <h5>Selected Institute</h5>
          </button>
        </div>
      )}

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
                <label class="neon-checkbox">
                  <input type="checkbox" checked={includeFee}
                    onChange={() => setIncludeFee(!includeFee)}/>
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
                 Platform Fee ({percentage.toFixed(2)}%)
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