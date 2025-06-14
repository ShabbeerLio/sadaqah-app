import React from "react";
import "./Collection.css";
import { GoArrowUpRight, GoShareAndroid } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import HistoryCard from "../HistoryCard/HistoryCard";
import TransactionsData from "../../Pages/TransationData";
import { Link } from "react-router-dom";

const Collection = () => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    // console.log(user, "user");
    const transactions = TransactionsData;
    console.log(transactions, "dta");
    function calculatePlatformFee(amount) {
        let fee = 0;
        let percentage = 0;

        if (amount <= 500) {
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

        return {
            fee: Math.round(fee),
            percentage: parseFloat(percentage.toFixed(2)),
        };
    }

    const totalFinalAmount = transactions.reduce((acc, tx) => {
        const { fee } = calculatePlatformFee(tx.amount);
        return acc + (tx.amount - fee);
    }, 0);


    return (
        <div className="Collection">
            <div className="Collection-main">
                <div className="Collection-box">
                    <div className="Collection-box-left">
                        <span>Total {transactions.length} Payment</span>
                        <h2>₹{totalFinalAmount}</h2>
                        <div className="collection-left-bottom">
                            <p>
                                <FaArrowTrendUp />
                                Discover new Insights!
                            </p>
                            <h6> <Link to={"/history"}>View Analytics</Link></h6>
                        </div>
                    </div>
                    {user?.type === "institute" ? (
                        <div className="Collection-box-right institute">
                            <h5>Recent Transactions</h5>
                            {transactions.map((tx) => (
                                <HistoryCard tx={tx} />
                            ))}
                            <Link to={"/history"} className="View-more-transatction" >View More</Link>
                        </div>
                    ) : (
                        <div className="Collection-box-right">
                            <div className="collection-right-card">
                                <p>
                                    <GoArrowUpRight />
                                </p>
                                <span>Send Money</span>
                            </div>
                            <div className="collection-right-card">
                                <p>
                                    <GoShareAndroid />
                                </p>
                                <span>Share</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
