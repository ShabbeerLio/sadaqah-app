import React, { useContext, useEffect, useState } from "react";
import "./History.css";
import nofund from "../../Assets/history2.png";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import Filters from "../../Components/Filters/Filters";
import NoteContext from "../../Context/SadaqahContext";
import { ChevronLeft } from "lucide-react";

const History = () => {
  const { userDetail, getAccountDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAccountDetails();
      setLoading(false);
    }
  }, [navigate]);
  const userData =
    userDetail?.role === "user"
      ? userDetail?.transactions || []
      : userDetail?.wallet?.transactions || [];
  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "",
  });

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

  const thisMonthAmount = thisMonthTransactions
    .filter((tx) => tx.type?.toLowerCase() === "payment")
    .reduce((sum, tx) => sum + tx.amount, 0);

  console.log(userData, "userData");

  if (!userData)
    return <div className="loading">Loading transaction history...</div>;

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
  // console.log(userData, "userData");
  // console.log(sortedTransactions, "sortedTransactions");
  // console.log(filteredTransactions, "filteredTransactions");

  return (
    <div className="Home other">
      <div className="Home-main">
        <div className="profile-header other" style={{ marginTop: "1rem" }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <h2>History</h2>
        </div>
        <div className="history-box">
          <div className="history-left">
            <div className="history-left-card">
              <h1>₹{totalAmount}</h1>
              {userDetail?.role === "institute" ? (
                <span>Total Donations</span>
              ) : (
                <span>Total Donated</span>
              )}
              <p>
                {totalAmount === 0
                  ? "No Transactions"
                  : `${filteredTransactions.length} Transactions`}
              </p>
            </div>
            <div className="history-left-card">
              <h1>₹{thisMonthAmount}</h1>
              <span>This month</span>
              <p>
                {thisMonthAmount === 0
                  ? "No Transactions"
                  : `${thisMonthTransactions.length} Transactions`}
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
                      key={tx._id}
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
    </div>
  );
};

export default History;
