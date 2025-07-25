import React, { useEffect, useRef, useState } from "react";
import "./Wallet.css";
import nofund from "../../Assets/history2.png";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import Filters from "../../Components/Filters/Filters";
import CombinedFeedData from "../AppData";
import TransactionsData from "../TransationData";
import { IoIosClose } from "react-icons/io";
import { LuWalletMinimal } from "react-icons/lu";


const Wallet = () => {
    const navigate = useNavigate();
    const donateRef = useRef(null);
    const [donateActive, setDonateActive] = useState("");
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [filterRange, setFilterRange] = useState({
        from: "",
        to: "",
        type: "",
    });

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        if (!authUser) {
            navigate("/login");
        } else {
            const findUser = CombinedFeedData.find((i) => i.id === authUser.id);
            const hardcoded = findUser?.transactions || [];

            const localTx =
                JSON.parse(localStorage.getItem(`userTransactions-${authUser.id}`)) ||
                [];
            const zakatTx =
                JSON.parse(localStorage.getItem(`userZakat-${authUser.id}`)) || [];

            // Filter static Zakat if it's for this user
            const staticZakatTx = TransactionsData.filter(
                (tx) =>
                    tx.type === "Zakat" &&
                    tx.transactionsType === "Donated" &&
                    tx.name === authUser.username
            );

            const allTransactions = [
                ...hardcoded,
                ...localTx,
                ...zakatTx,
                ...staticZakatTx,
            ];
            setUserData(allTransactions);
            setLoading(false);
        }
    }, [navigate]);

    const sortedTransactions = userData
        ? [...userData].sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

    const withdrawTransactions = sortedTransactions.filter(
        (tx) => tx.type && tx.type.toLowerCase() === "withdraw"
    );

    const filteredTransactions = withdrawTransactions.filter((tx) => {
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

    const totalDonation = sortedTransactions
        .filter((tx) => tx.type?.toLowerCase() === "payment")
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalWithdraw = sortedTransactions
        .filter((tx) => tx.type?.toLowerCase() === "withdraw")
        .reduce((sum, tx) => sum + tx.amount, 0);

    const currentBalance = totalDonation - totalWithdraw;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const thisMonthTransactions = sortedTransactions.filter((tx) => {
        const txDate = new Date(tx.date);
        return (
            txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
        );
    });

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

    console.log(filteredTransactions,"filteredTransactions")

    return (
        <div className="Home">
            <div className="Home-main">
                <div className="wallet-top">
                    <div className="wallet-top-left">
                        <p> <LuWalletMinimal />Current Balance</p>
                        <h2>₹{currentBalance}</h2>
                    </div>
                    <div className="wallet-top-right">
                        <p onClick={handleDonet}>Withdraw</p>
                    </div>
                </div>
                <div className="history-box">
                    <div className="history-left">
                        <div className="history-left-card">
                            <h1>₹{totalDonation}</h1>
                            <span>Total Donations</span>
                            <p>
                                {totalDonation === 0
                                    ? "No Transactions"
                                    : `${sortedTransactions.filter((tx) => tx.type?.toLowerCase() === "payment").length} Transactions`}
                            </p>
                        </div>
                        <div className="history-left-card">
                            <h1>₹{thisMonthWithdrawAmount}</h1>
                            <span>Total Withdraw</span>
                            <p>
                                {thisMonthWithdrawAmount === 0
                                    ? "No Transactions"
                                    : `${thisMonthTransactions.filter((tx) => tx.type?.toLowerCase() === "withdraw").length} Transactions`}
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
            <div className={`donate-box ${donateActive}`} ref={donateRef}>
                <div className="donate-boxes">
                    <div className="donate-top">
                        <div className="donate-top-head">
                            <div className="institute-donatereq">
                                <h4>Withdraw From Wallet</h4>
                                <IoIosClose onClick={handleCloseDonet} />
                            </div>
                        </div>
                    </div>
                    <div className="donate-card-box">
                        dkjvbek
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
