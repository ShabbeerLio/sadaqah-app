import React from "react";
import "./Collection.css";
import { GoArrowUpRight, GoShareAndroid, GoArrowRight } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import HistoryCard from "../HistoryCard/HistoryCard";
import TransactionsData from "../../Pages/TransationData";
import { Link, useNavigate } from "react-router-dom";
import makka from "../../Assets/suggest2 (1).png"
import donate from "../../Assets/donate.png"
import calender from "../../Assets/calender.png"
import suggest from "../../Assets/suggest3.png"
import CombinedFeedData from "../../Pages/AppData";
import { LuWalletMinimal } from "react-icons/lu";


const Collection = () => {
    const navigate = useNavigate();
    const progressPercent = 60;
    const user = JSON.parse(localStorage.getItem("authUser"));
    const transactions = CombinedFeedData.find((item) => item?.username === user?.username);

    const totalFinalAmount = transactions?.transactions.reduce((acc, tx) => {
        return acc + tx.amount;
    }, 0);

    const handleWallet = () => {
        navigate("/wallet");
    };


    return (
        <div className="Collection">
            <div className="Collection-main">
                <div className="Collection-box">
                    <div className="Collection-box-left">
                        <div className="collection-left-top">
                            <div className="collection-left-top-left">
                                <span>Total {transactions?.transactions.length} Payment</span>
                                <h2>₹{totalFinalAmount}</h2>
                            </div>
                            {user?.type === "institute" ? (
                                <div className="collection-left-top-right" onClick={handleWallet}>
                                    <span><LuWalletMinimal />Total</span>
                                    <h2>₹3344</h2>
                                </div>
                            ) : ("")}
                        </div>
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
                            {transactions?.transactions.slice(0, 5).map((tx) => (
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
                                    <Link to={"/zakat-payment"} className="donate-btn">Donate Now</Link>
                                    <img src={makka} alt="" />
                                </div>
                                <div className="collection-right-card item2">
                                    <h6>Zakat (This Month)</h6>
                                    <div className="donate-progress-box">
                                        <div className="fill" style={{ width: `${progressPercent}%` }}></div>
                                    </div>
                                    <p>Total ₹12344</p>
                                    <p>Donated ₹1344</p>
                                    <Link to={"/zakat-history"} className="donate-btn">View</Link>
                                    <img src={calender} alt="" />
                                </div>
                                <div className="collection-right-card item3">
                                    <h6>Zakat Calculator</h6>
                                    <p>Calculate your Zakat</p>
                                    <Link to={"/calculator"} className="donate-btn">Calculate</Link>
                                    <img src={donate} alt="" />
                                </div>
                            </div>
                            <div className="collection-right-card item4">
                                <h6>Suggest Masakeen (345)</h6>
                                <p>A needy person who is eligible to receive Zakat is referred to as "Miskeen" (مسکین).</p>
                                <Link to={"/suggest"} className="donate-btn">Suggest Us!</Link>
                                <img src={suggest} alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
