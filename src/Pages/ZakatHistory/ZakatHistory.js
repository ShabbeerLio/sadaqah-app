import React, { useContext, useEffect, useState } from "react";
import nofund from "../../Assets/history2.png";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import TransactionsData from "../TransationData";
import Filters from "../../Components/Filters/Filters";
import ZakatHistoryCard from "../../Components/HistoryCard/ZakatHistoryCard";
import "./ZakatHistory.css";
import ZakatFilters from "../../Components/Filters/ZakatFilter";
import NoteContext from "../../Context/SadaqahContext";
import { ChevronLeft } from "lucide-react";

const ZakatHistory = () => {
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
  const [activeTab, setActiveTab] = useState("Received");
  const [sortedTransactions, setSortedTransactions] = useState([]);

  const [filterRange, setFilterRange] = useState({
    from: "",
    to: "",
    type: "", // Add this line
  });

  console.log(userDetail, "userDetail");
  useEffect(() => {
    const sorted = userDetail?.transactions
      ?.filter((tx) => tx.type?.toLowerCase() === "zakat")
      ?.sort((a, b) => new Date(b.date) - new Date(a.date));

    setSortedTransactions(sorted);
  }, [navigate, activeTab]); // 👈 FIXED HERE

  //   console.log(TransactionsData, "TransactionsData");

  const filteredTransactions = sortedTransactions?.filter((tx) => {
    const inDateRange =
      (!filterRange.from || tx.date >= filterRange.from) &&
      (!filterRange.to || tx.date <= filterRange.to);

    const typeMatch =
      !filterRange.type ||
      (tx.type && tx.type.toLowerCase() === filterRange.type.toLowerCase());

    return inDateRange && typeMatch;
  });

  const totalAmount = filteredTransactions?.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const thisMonthTransactions = sortedTransactions?.filter((tx) => {
    const txDate = new Date(tx.date);
    const isSameMonth =
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear;

    const matchesTab = tx.transactionsType === activeTab; // "Donated" or "Received"

    return isSameMonth && matchesTab;
  });

  const thisMonthAmount = thisMonthTransactions?.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const filteredByTab = sortedTransactions?.filter((tx) => {
    if (activeTab === "Donated") return tx.transactionsType === "Donated";
    if (activeTab === "Received") return tx.transactionsType === "Received";
    return true;
  });

  // console.log(sortedTransactions, "filteredByTab")

  const totalAmountByTab = filteredByTab?.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="profile-header other" style={{ marginTop: "1rem" }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <h2>Zakat History</h2>
        </div>
        <div className="history-box">
          <div className="history-left">
            <div className="history-left-card">
              <h1>₹{totalAmountByTab}</h1>
              <span>{activeTab} Zakat</span>
              <p>
                {totalAmountByTab === 0
                  ? `No Zakat Found`
                  : `${filteredByTab?.length} Transactions`}
              </p>
            </div>
            <div className="history-left-card">
              <h1>₹{thisMonthAmount}</h1>
              <span>This month</span>
              <p>
                {thisMonthAmount === 0
                  ? "No Zakat Found"
                  : `${thisMonthTransactions?.length} Transactions`}
              </p>
            </div>
          </div>

          <div className={`history-right ${totalAmount === 0 ? "empty" : ""}`}>
            <ZakatFilters onFilterChange={setFilterRange} />
            {totalAmount === 0 ? (
              <>
                <img src={nofund} alt="No Transactions" />
                <h5>No Zakat Found</h5>
                <p>No Zakat in this date range.</p>
              </>
            ) : (
              filteredByTab?.map((tx) => (
                <ZakatHistoryCard key={tx.id} tx={tx} activeTab={activeTab} />
              ))
            )}
          </div>
          <div className="zakat-history-filter">
            <div
              className={`zakat-filter-box ${
                activeTab === "Donated" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Donated")}
            >
              <p>Donated</p>
            </div>
            <div
              className={`zakat-filter-box ${
                activeTab === "Received" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Received")}
            >
              <p>Received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatHistory;
