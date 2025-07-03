import React, { useEffect, useState } from "react";
import "./History.css";
import nofund from "../../Assets/history2.png";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import Filters from "../../Components/Filters/Filters";
import CombinedFeedData from "../AppData";

const History = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "", // Add this line
  });

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (!authUser) {
      navigate("/login");
    } else {
      const findUser = CombinedFeedData.find((i) => i.id === authUser.id);
      setUserData(findUser?.transactions || []);
      setLoading(false);
    }
  }, [navigate]);

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

  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

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

  if (!userData)
    return <div className="loading">Loading transaction history...</div>;

  return (
    <div className="Home">
      <div className="Home-main">
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
                    <HistoryCard key={tx.id} tx={tx} />
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
