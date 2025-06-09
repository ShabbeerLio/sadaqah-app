import React, { useEffect, useState } from "react";
import "./History.css";
import nofund from "../../Assets/no fund.jpg";
import { GoArrowUpRight } from "react-icons/go";
import Banners from "../../Components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const History = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser) {
      navigate("/login");
    }
  }, [navigate]);
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    // Mock transactions data
    const transactions = [
        {
            id: 1,
            date: "2025-05-20",
            name: "Mashjid momin",
            amount: 100,
        },
        {
            id: 2,
            date: "2025-05-19",
            name: "John Doe",
            amount: 200,
        },
        {
            id: 3,
            date: "2025-05-18",
            name: "Ali Khan",
            amount: 300,
        },
    ];

    // Filter transactions by date range
    const filteredTransactions = transactions.filter((tx) => {
        return tx.date >= fromDate && tx.date <= toDate;
    });

    // Total amount calculation
    const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="Home">
            <div className="Home-main">
                <Banners />

                <div className="history-box">
                    <div className="history-left">
                        <div className="history-left-card">
                            <h1>₹{totalAmount}</h1>
                            <span>Total Donated</span>
                            <p>{totalAmount === 0 ? "No Transactions" : `${filteredTransactions.length} Transactions`}</p>
                        </div>
                        <div className="history-left-card">
                            <h1>₹{totalAmount}</h1>
                            <span>This month</span>
                            <p>{totalAmount === 0 ? "No Transactions" : `${filteredTransactions.length} Transactions`}</p>
                        </div>
                    </div>

                    {/* Conditional Rendering */}
                    <div className="history-right">
                        <div className="date-filter">
                            {/* <label>Date Range:</label> */}
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
                            filteredTransactions.map((tx) => (
                                <div className="history-right-card" key={tx.id}>
                                    <div className="history-card-detail">
                                        <p><GoArrowUpRight /></p>
                                        <div className="history-card-title">
                                            <span>Paid to</span>
                                            <h2>{tx.name}</h2>
                                            <h6>{new Date(tx.date).toLocaleDateString()}</h6>
                                        </div>
                                    </div>
                                    <h4>₹{tx.amount}</h4>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* <div className="history-transation-box">
                    {totalAmount === 0 ? (
                        <>
                            <img src={nofund} alt="No Transactions" />
                            <h5>No Transactions Found</h5>
                            <p>No transactions in this date range.</p>
                        </>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <div className="history-right-card" key={tx.id}>
                                <div className="history-card-detail">
                                    <p><GoArrowUpRight /></p>
                                    <div className="history-card-title">
                                        <span>Paid to</span>
                                        <h2>{tx.name}</h2>
                                        <h6>{new Date(tx.date).toLocaleDateString()}</h6>
                                    </div>
                                </div>
                                <h4>₹{tx.amount}</h4>
                            </div>
                        ))
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default History;