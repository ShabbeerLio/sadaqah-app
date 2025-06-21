import React from "react";
import "./Collection.css";
import { GoArrowUpRight, GoShareAndroid, GoArrowRight } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import HistoryCard from "../HistoryCard/HistoryCard";
import TransactionsData from "../../Pages/TransationData";
import { Link } from "react-router-dom";
import { FcMoneyTransfer, FcCalendar, FcDonate } from "react-icons/fc";
import { LuCalculator } from "react-icons/lu";
import makka from "../../Assets/makka.png"
import donate from "../../Assets/donate.png"
import calender from "../../Assets/calender.png"


const Collection = () => {
    const progressPercent = 60;
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
                            <Link to={"/history"} className="View-more-transatction" >View More <GoArrowRight /></Link>
                        </div>
                    ) : (
                        <div className="Collection-box-right">
                            {/* <h5>Zakat</h5> */}
                            <div className="Collection-box-right-box">
                                <div className="collection-right-card item1">
                                    <h6>Zakat</h6>
                                    <p>Donate your zakat here</p>
                                    <div className="donate-progress-box">
                                        <div className="fill" style={{ width: `${progressPercent}%` }}></div>
                                    </div>
                                    <p>Total ₹12344</p>
                                    <p>Donated ₹2344</p>
                                    <Link to={"/payment"} className="donate-btn">Donate Now</Link>
                                    <img src={makka} alt="" />
                                </div>
                                <div className="collection-right-card item2">
                                    <h6>Zakat (This Month)</h6>
                                    <div className="donate-progress-box">
                                        <div className="fill" style={{ width: `${progressPercent}%` }}></div>
                                    </div>
                                    <p>Total ₹12344</p>
                                    <p>Donated ₹1344</p>
                                    <img src={calender} alt="" />
                                </div>
                                <div className="collection-right-card item3">
                                    <h6>Zakat Calculator</h6>
                                    <p>Calculate your Zakat</p>
                                    <Link to={"/calculator"} className="donate-btn">Calculate</Link>
                                    <img src={donate} alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
