import React, { useContext, useEffect, useRef, useState } from "react";
import "./Wallet.css";
import nofund from "../../Assets/history2.png";
import { Link, useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import Filters from "../../Components/Filters/Filters";
import CombinedFeedData from "../AppData";
import TransactionsData from "../TransationData";
import Ads from "../../Components/Ads/Ads";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Checkbox from "../Items/Checkbox";
import { WalletMinimal, X } from "lucide-react";
import NoteContext from "../../Context/SadaqahContext";
import Host from "../../Host";

const Wallet = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const donateRef = useRef(null);
  const [donateActive, setDonateActive] = useState("");
  const [walletStatus, setWalletStatus] = useState("not_submitted");
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [verificationData, setVerificationData] = useState({
    name: "",
    bankName: "",
    accountNumber: "",
    caccountNumber: "",
    ifsc: "",
    mobile: "",
  });
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [useFullBalance, setUseFullBalance] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const status = userDetail?.walletActivationStatus;

    if (status === "accepted") {
      setIsVerified(true);
      setWalletStatus("accepted");
    } else if (status === "pending") {
      setIsVerified(null);
      setWalletStatus("pending");
    } else {
      setIsVerified(false);
      setWalletStatus("not_submitted");
    }
  }, [userDetail]);

  const userData = userDetail?.wallet?.transactions || [];

  console.log(userData, "userData");

  const sortedTransactions = userData
    ? [...userData].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const filteredTransactions = sortedTransactions.filter((tx) => {
    const inDateRange =
      (!filterRange.from || tx.date >= filterRange.from) &&
      (!filterRange.to || tx.date <= filterRange.to);

    const typeMatch =
      !filterRange.type ||
      (tx.type && tx.type.toLowerCase() === filterRange.type.toLowerCase());

    return inDateRange && typeMatch;
  });

  const totalAmount = filteredTransactions
    .filter((tx) => tx.status?.toLowerCase() === "accepted")
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const thisMonthTransactions = sortedTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  const totalDonation = sortedTransactions
    .filter((tx) => tx.type?.toLowerCase() === "payment")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalWithdraw = sortedTransactions
    .filter((tx) => tx.type?.toLowerCase() === "withdraw")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const currentBalance = totalDonation - totalWithdraw;

  const thisMonthWithdrawAmount = thisMonthTransactions
    .filter((tx) => tx.type?.toLowerCase() === "withdraw")
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (!userData)
    return <div className="loading">Loading transaction history...</div>;

  const handleDonet = (mode) => {
    setDonateActive("active");
  };
  const handleCloseDonet = () => {
    setDonateActive("");
  };

  // verify
  const handleVerificationChange = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    // Validate account numbers
    if (verificationData.accountNumber !== verificationData.caccountNumber) {
      alert("Account numbers do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${Host}/auth/activate-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          bankName: verificationData.bankName,
          accountHolderName: verificationData.name,
          accountNumber: verificationData.accountNumber,
          confirmAccountNumber: verificationData.caccountNumber,
          ifscCode: verificationData.ifsc,
          financeMobile: verificationData.mobile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // SUCCESS FLOW
      setVerificationSuccess(true);

      // Refresh institute details after success
      setTimeout(() => {
        getAccountDetails();
        setIsVerified(true); // now wallet is verified / blocked until admin activates
        setDonateActive(""); // close popup
      }, 3000);
    } catch (error) {
      console.error("Verification error:", error);
      alert("Server error");
    }
  };

  const handleWithdrawSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Host}/transaction/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        amount: withdrawAmount,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong");
      return;
    }
    // Show confirmation
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setDonateActive("");
      setWithdrawAmount("");
      setUseFullBalance(false);
      getAccountDetails()
    }, 10000);
  };

  const handleCardClick = (tx) => {
    navigate("/status", {
      state: {
        institute: {
          username: tx?.institute?.username || tx.name,
          location: tx?.institute?.location || tx.location || "Delhi",
          avatar: tx?.institute?.avatar || nofund,
        },
        total: tx.amount,
        paymentMode: tx.paymentMode || "UPI",
        paymentDate: tx.date,
        transactionId: tx.id,
        success: tx?.success || "true",
        type: tx?.type || "payment",
      },
    });
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="wallet-top">
          <div className="wallet-top-left">
            <p>
              {" "}
              <WalletMinimal />
              Current Balance
            </p>
            <h2>₹{userDetail?.wallet?.balance.toFixed(2)}</h2>
          </div>
          <div className="wallet-top-right">
            <p onClick={handleDonet}>
              {walletStatus === "accepted"
                ? "Withdraw"
                : walletStatus === "pending"
                ? "Pending"
                : "Active Wallet"}
            </p>
          </div>
        </div>
        <div className="history-box">
          <div className="history-left">
            <div className="history-left-card">
              <h1>₹{userDetail?.wallet?.totalReceived.toFixed(2)}</h1>
              <span>Total Donations</span>
              <p>
                {totalDonation === 0
                  ? "No Transactions"
                  : `${
                      sortedTransactions.filter(
                        (tx) => tx.type?.toLowerCase() === "payment"
                      ).length
                    } Transactions`}
              </p>
            </div>
            <div className="history-left-card">
              <h1>₹{userDetail?.wallet?.totalWithdrawn.toFixed(2)}</h1>
              <span>Total Withdraw</span>
              <p>
                {thisMonthWithdrawAmount === 0
                  ? "No Transactions"
                  : `${
                      thisMonthTransactions.filter(
                        (tx) => tx.type?.toLowerCase() === "withdraw"
                      ).length
                    } Transactions`}
              </p>
            </div>
          </div>

          <div className={`history-right ${totalAmount === 0 ? "empty" : ""}`}>
            <Filters onFilterChange={setFilterRange} />
            {loading === true ? (
              <div className="loading">Loading transaction history...</div>
            ) : (
              <>
                {totalAmount === 0 ? (
                  <>
                    <img src={nofund} alt="No Transactions" />
                    <h5>No Transactions Found</h5>
                    <p>No transactions in this date range.</p>
                  </>
                ) : (
                  filteredTransactions.map((tx) => (
                    <HistoryCard
                      key={tx.id}
                      tx={tx}
                      onClick={handleCardClick}
                      userDetail={userDetail}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`donate-box ${donateActive}`} ref={donateRef}>
        <div className="donate-boxes">
          <div className="donate-top">
            <div className="donate-top-head">
              <div className="institute-donatereq">
                <h4>{isVerified ? "Withdraw" : "Active Wallet"} </h4>
                <X onClick={handleCloseDonet} />
              </div>
            </div>
          </div>
          <div className="donate-card-box">
            {!isVerified ? (
              verificationSuccess ? (
                <div className="post-card">
                  <div className="verification-success">
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <h3>Account Details Submitted</h3>
                    <p>Account will be activated once everything checked</p>
                    <Ads />
                    <button
                      className="post-button close"
                      type="button"
                      onClick={handleCloseDonet}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVerifySubmit} className="post-card">
                  <label>Bank Name:</label>
                  <input
                    className="search__input"
                    type="text"
                    name="bankName"
                    value={verificationData.bankName}
                    onChange={handleVerificationChange}
                    required
                  />
                  <label>Account Holder Name:</label>
                  <input
                    className="search__input"
                    type="text"
                    name="name"
                    value={verificationData.name}
                    onChange={handleVerificationChange}
                    required
                  />
                  <label>Account Number:</label>
                  <input
                    className="search__input"
                    type="password"
                    name="accountNumber"
                    value={verificationData.accountNumber}
                    onChange={handleVerificationChange}
                    required
                  />
                  <label>Enter Account Number Again:</label>
                  <input
                    className="search__input"
                    type="text"
                    name="caccountNumber"
                    value={verificationData.caccountNumber}
                    onChange={handleVerificationChange}
                    required
                  />
                  <label>IFSC Code:</label>
                  <input
                    className="search__input"
                    type="text"
                    name="ifsc"
                    value={verificationData.ifsc}
                    onChange={handleVerificationChange}
                    required
                  />
                  <label>Mobile Number(Finance)</label>
                  <input
                    className="search__input"
                    type="number"
                    name="mobile"
                    value={verificationData.mobile}
                    onChange={handleVerificationChange}
                    required
                  />
                  <button className="post-button" type="submit">
                    Verify Account
                  </button>
                  <Ads />
                </form>
              )
            ) : (
              <div className="post-card">
                {withdrawSuccess ? (
                  <div className="verification-success">
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    {/* <img className="wallet-success" src={failed2} alt="" /> */}
                    <p className="success-msg">
                      Withdraw request for ₹{withdrawAmount} submitted
                      successfully! You will get the update
                    </p>
                    <div className="wallet-note">
                      <h6>Note</h6>
                      <ul>
                        <li>
                          All withdrawal requests will be processed within 8
                          working hours.
                        </li>
                        <li>
                          Requests made on 2nd half Saturday and Full day Sunday
                          will be fulfilled on the Monday Working Hours.
                        </li>
                        <li>
                          Before sending the amount, our team will call you for
                          verification.
                        </li>
                        <li>
                          Please ensure your bank details and phone number are
                          added correct in bank Details, If not contact{" "}
                          <Link to={"/"}>our support team</Link>.
                        </li>
                      </ul>
                    </div>
                    <Ads />
                    <button
                      className="post-button close"
                      type="button"
                      onClick={handleCloseDonet}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <Checkbox
                      checked={useFullBalance}
                      onChange={setUseFullBalance}
                      setWithdrawAmount={setWithdrawAmount}
                      currentBalance={currentBalance}
                      text={"Withdraw Full Balance"}
                    />

                    <label>Enter Withdraw Amount:</label>
                    <input
                      className="search__input"
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        setWithdrawAmount(val);
                        setUseFullBalance(false); // uncheck if user types manually
                      }}
                      disabled={useFullBalance}
                    />

                    <button
                      className="post-button"
                      onClick={handleWithdrawSubmit}
                      disabled={
                        !withdrawAmount ||
                        isNaN(withdrawAmount) ||
                        Number(withdrawAmount) <= 0 ||
                        Number(withdrawAmount) > currentBalance
                      }
                    >
                      Submit Withdraw Request
                    </button>
                    <Ads />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
