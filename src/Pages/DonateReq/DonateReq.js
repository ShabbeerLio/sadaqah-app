import React, { useEffect, useRef, useState } from "react";
import "./DonateReq.css";
import avtar from "../../Assets/Posts/hadith.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import DonateCard from "../../Components/DonateCard/DonateCard";
import DonateData from "../DonateData";

const DonateReq = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const donateRef = useRef(null);

    const navRefs = useRef([]);
    const [tail, setTail] = useState(null);
    const [donateActive, setDonateActive] = useState("");

    const [user, setUser] = useState(null);
    const userLocation = "Delhi";
    const [donationType, setDonationType] = useState(userLocation);

    const handleDonet = () => {
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
                                    <h4>Your Donation Requests</h4>
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
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`donate-box ${donateActive}`} ref={donateRef}>
                    <div className="donate-boxes">
                        <div className="donate-top">
                            <div className="donate-top-head">
                                <h4>Donation Requests</h4>
                                {user.type === "user" ? (
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
                                ) : (
                                    ""
                                )}
                            </div>
                            <IoIosClose onClick={handleCloseDonet} />
                        </div>
                        <div className="donate-card-box">
                            {filteredDonation.map((i, index) => (
                                <DonateCard
                                    key={index}
                                    user={user}
                                    i={i}
                                    donationType={donationType}
                                    handleCloseDonet={handleCloseDonet}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateReq;