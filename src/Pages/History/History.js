import React, { useEffect, useState } from "react";
import "./History.css";
import nofund from "../../Assets/no fund.jpg";
import Banners from "../../Components/Banner/Banner";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import TransactionsData from "../TransationData";

const History = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);
  const today = new Date().toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Sort all transactions by latest date first
  const sortedTransactions = [...TransactionsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Apply filter only if both dates are selected
  const filteredTransactions =
    fromDate && toDate
      ? sortedTransactions.filter(
          (tx) => tx.date >= fromDate && tx.date <= toDate
        )
      : sortedTransactions;

  // Calculate total for displayed (filtered or full) transactions
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  console.log(filteredTransactions, "filteredTransactions");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  // Filter only this month's transactions (from full sorted list)
  const thisMonthTransactions = sortedTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  const thisMonthAmount = thisMonthTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  return (
    <div className="Home">
      <div className="Home-main">
        <Banners />

        <div className="history-box">
          <div className="history-left">
            <div className="history-left-card">
              <h1>₹{totalAmount}</h1>
              <span>Total Donated</span>
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

          {/* Conditional Rendering */}
          <div className="history-right">
            <div className="date-filter">
              <div className="date-inpt">
                <label>From:</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="date-inpt">
                <label>To:</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
            {totalAmount === 0 ? (
              <>
                <img src={nofund} alt="No Transactions" />
                <h5>No Transactions Found</h5>
                <p>No transactions in this date range.</p>
              </>
            ) : (
              filteredTransactions.map((tx) => <HistoryCard tx={tx} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
