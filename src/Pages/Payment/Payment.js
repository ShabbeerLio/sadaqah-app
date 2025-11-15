import React, { useState, useEffect, useRef, useContext } from "react";
import "./Payment.css";
import CombinedFeedData from "../AppData";
import ads from "../../Assets/Ads/ads.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import Searchbox from "../../Components/Searchbox/Searchbox";
import { ChevronLeft } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";
import Host from "../../Host";

const Payment = () => {
  const location = useLocation();
  const item = location.state?.item;
  const { institutefollowDetail, getAllInstitutebyFollowing } =
    useContext(NoteContext);
  const navigate = useNavigate();
  const institutes = institutefollowDetail?.followingInstitutes;
  // console.log(institutes, "institutes");
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [amount, setAmount] = useState("");
  const [includeFee, setIncludeFee] = useState(true); // 👈 new
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAllInstitutebyFollowing();
      if (item !== null && item !== undefined) {
        setSelectedInstituteId(item.institute._id);
      }
    }
  }, [navigate]);

  console.log(item, "item");

  let selectedInstitute = [];
  console.log(item?.institute?._id, "id");

  if (item) {
    selectedInstitute = institutes?.find(
      (inst) => String(inst._id) === String(item.institute._id)
    );
  } else {
    selectedInstitute = institutes?.find(
      (inst) => String(inst._id) === String(selectedInstituteId)
    );
  }

  console.log(selectedInstituteId, "selectedInstituteId");
  // console.log(selectedInstitute, "selectedInstitute");

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
  // console.log(fee, "fee");
  const total = includeFee ? amountValue + fee : amountValue;
  const finalText = `Pay ₹ ${total}`;
  // console.log(amountValue, "amountValue");

  const handleGoBack = () => {
    window.history.back(); // Simple browser back
  };

  const handlePay = async () => {
    console.log("clicked");
    const transactionId = "#TXN" + Math.floor(Math.random() * 1000000);
    let transactionData = [];
    if (item !== null && item !== undefined) {
      transactionData = {
        type: "Donation",
        amount: total,
        fee: fee,
        transactionId,
        donationRequestId: item._id,
      };
    } else {
      transactionData = {
        type: "payment",
        fee: fee,
        amount: total,
        transactionId,
      };
    }

    console.log(transactionData, "transactionData");

    try {
      const res = await fetch(
        `${Host}/transaction/pay/${selectedInstituteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(transactionData),
        }
      );

      const data = await res.json();
      console.log(data, "data");
      if (data.success) {
        // transaction
        const statusItem = {
          status: data.transaction.status,
          amount: data.transaction.amount,
          date: data.transaction.date,
          type: data.transaction.type,
          transactionId: data.transaction.transactionId,
        };
        navigate("/status", {
          state: {
            institute: selectedInstitute,
            statusItem,
          },
        });
      }
    } catch {}
  };

  // Flatten and enrich all posts with user info and relative date
  const allPosts = institutefollowDetail?.followingInstitutes;

  // Sort newest posts first
  const sortedPosts = allPosts?.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // console.log(sortedPosts, "sortedPosts");
  // Search filter
  const filteredPosts = sortedPosts?.filter((post) => {
    const terms = searchTerm.toLowerCase().split(" ");
    const combined = `${post.userName} ${post.location}`.toLowerCase();
    return terms.every((term) => combined.includes(term));
  });

  return (
    <div className="sadaqah-container">
      {!selectedInstitute ? (
        <div className="section">
          <button className="back-button" onClick={handleGoBack}>
            <ChevronLeft />
            <h5>Select an Institute</h5>
          </button>
          <Searchbox value={searchTerm} setSearch={setSearchTerm} />
          <div className="institute-list">
            {filteredPosts?.map((inst) => (
              <div
                className="SearchCard"
                onClick={() => setSelectedInstituteId(inst._id)}
              >
                <div className="SearchCard-left">
                  <img src={inst.avatar} alt={inst.userName} />
                </div>
                <div className="SearchCard-right">
                  <h6>
                    {inst.userName}{" "}
                    {inst?.role === "institute" ? (
                      <span>
                        ({inst?.instituteType}){" "}
                        <span className="verified">Verified</span>
                      </span>
                    ) : (
                      <span>({inst?.type})</span>
                    )}{" "}
                  </h6>
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
            <ChevronLeft />
            <h5>Selected Institute</h5>
          </button>
        </div>
      )}

      {selectedInstitute && (
        <div className="SearchCard institute-info">
          <div className="SearchCard-left">
            <img
              src={selectedInstitute.avatar}
              alt={selectedInstitute.userName}
            />
          </div>
          <div className="SearchCard-right">
            <h6>{selectedInstitute.userName}</h6>
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
                  <input
                    type="checkbox"
                    checked={includeFee}
                    onChange={() => setIncludeFee(!includeFee)}
                  />
                  <div class="neon-checkbox__frame">
                    <div class="neon-checkbox__box">
                      <div class="neon-checkbox__check-container">
                        <svg viewBox="0 0 24 24" class="neon-checkbox__check">
                          <path d="M3,12.5l7,7L21,5"></path>
                        </svg>
                      </div>
                      <div class="neon-checkbox__glow"></div>
                      <div class="neon-checkbox__borders">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div class="neon-checkbox__effects">
                      <div class="neon-checkbox__particles">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="neon-checkbox__rings">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                      </div>
                      <div class="neon-checkbox__sparks">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </label>
                Service Charge ({percentage.toFixed(2)}%)
              </div>
              <p>₹ {fee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="summary-detail">
              <p>Institute Amount</p>
              <p>₹ {(total - fee).toFixed(2)}</p>
            </div>
            <div className="summary-detail adsnote">
              <p>
                <span>Note:</span>By Clicking the check box you are allowing us
                to take plateform fee from the main amount
              </p>
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
