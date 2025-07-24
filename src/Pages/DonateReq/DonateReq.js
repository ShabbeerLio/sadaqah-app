import React, { useEffect, useRef, useState } from "react";
import "./DonateReq.css";
import avtar from "../../Assets/Posts/hadith.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosClose, IoIosAdd } from "react-icons/io";
import DonateCard from "../../Components/DonateCard/DonateCard";
import DonateData from "../DonateData";
import CombinedFeedData from "../AppData";
import TransactionsData from "../TransationData";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import nofund from "../../Assets/history2.png";
import DonateForm from "../../Components/DonateCard/DonateForm";


const DonateReq = () => {

    const navigate = useNavigate();
    const donateRef = useRef(null);

    const [donateActive, setDonateActive] = useState("");
    const [donateBoxMode, setDonateBoxMode] = useState(""); // "form" or "list"

    const [user, setUser] = useState(null);
    const userLocation = "Delhi";
    const [donationType, setDonationType] = useState(userLocation);

    const [userData, setUserData] = useState();
    const [instituteData, setInstituteData] = useState()
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
            setInstituteData(findUser);
            const hardcoded = findUser?.transactions || [];

            const localTx = JSON.parse(localStorage.getItem(`userTransactions-${authUser.id}`)) || [];
            const zakatTx = JSON.parse(localStorage.getItem(`userZakat-${authUser.id}`)) || [];

            // Filter static Zakat if it's for this user
            const staticZakatTx = TransactionsData.filter(
                (tx) => tx.type === "Zakat" && tx.transactionsType === "Donated" && tx.name === authUser.username
            );

            const allTransactions = [...hardcoded, ...localTx, ...zakatTx, ...staticZakatTx];
            setUserData(allTransactions);
            setLoading(false);
        }
    }, [navigate]);

    const handleDonet = (mode) => {
        setDonateBoxMode(mode); // "form" or "list"
        setDonateActive("active");
    };
    const handleCloseDonet = () => {
        setDonateActive("");
    };

    useEffect(() => {
        const authUser = localStorage.getItem("authUser");
        if (!authUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(authUser));
        }
    }, [navigate]);

    console.log(instituteData, "data")


    if (!user) return null; // Don't render until user is loaded

    let filteredDonation = [];
    if (user.type === "user") {
        filteredDonation = DonateData;
        filteredDonation = filteredDonation.filter((i) => {
            if (donationType === userLocation) {
                return i.location === userLocation;
            } else {
                return i.location !== userLocation;
            }
        });
    } else {
        filteredDonation = DonateData.filter((i) => i.username === user.username);
    }

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

    return (
        <div className="Home">
            <div className="Home-main">
                <div className="donation-request">
                    <div className="donate-boxes">
                        <div className="donate-top">
                            <div className="donate-top-head">
                                {user.type === "user" ? (
                                    <>
                                        <h4>Donation Requests</h4>
                                        <div className="radio-options">
                                            <label
                                                className={`radio-label ${donationType === "Delhi" ? "purple" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="Delhi"
                                                    checked={donationType === "Delhi"}
                                                    onChange={() => setDonationType("Delhi")}
                                                />
                                                Your Location
                                            </label>
                                            <label
                                                className={`radio-label ${donationType === "others" ? "blue" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="others"
                                                    checked={donationType === "others"}
                                                    onChange={() => setDonationType("others")}
                                                />
                                                System Requested
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <div className="institute-donatereq">
                                        <h4>Your Donation Requests</h4>
                                        <p onClick={() => handleDonet("form")} className="add-req"><IoIosAdd /> Add</p>
                                    </div>
                                )}
                            </div>
                            {/* <IoIosClose onClick={handleCloseDonet} /> */}
                        </div>
                        <div className="donate-card-box">
                            {filteredDonation.map((i, index) => (
                                <DonateCard
                                    key={index}
                                    user={user}
                                    i={i}
                                    donationType={donationType}
                                    handleCloseDonet={handleCloseDonet}
                                    handleDonet={handleDonet}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`donate-box ${donateActive}`} ref={donateRef}>
                    <div className="donate-boxes">
                        <div className="donate-top">
                            <div className="donate-top-head">
                                <div className="institute-donatereq">
                                    {donateBoxMode === "form" ? (
                                        <h4>Add your donation request</h4>
                                    ) : (
                                        <h4>List of user donated</h4>
                                    )}
                                    <IoIosClose onClick={handleCloseDonet} />
                                </div>
                            </div>
                        </div>
                        <div className="donate-card-box">
                            {donateBoxMode === "form" ? (
                                <DonateForm instituteData={instituteData}/>
                            ) : (
                                <div className={`donate-card-right ${totalAmount === 0 ? "empty" : ""}`}>
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateReq;