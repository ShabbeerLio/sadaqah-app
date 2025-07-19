import React, { useState } from "react";
import "./DonateReq.css";
import avtar from "../../Assets/Posts/hadith.png"
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";

const DonateReq = () => {
    const location = useLocation();
    const item = location.state?.item;

    console.log(item, "item")
    const [responsiblity, setResponsiblity] = useState("")
    const handleGoBack = () => {
        window.history.back(); // Simple browser back
    };
    const progressPercent = 40;

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [fulfillBox, setFulfillBox] = useState("");
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // to store which action to run

    const handleTakeRes = (index) => {
        setSelectedIndex(index);
        setResponsiblity("active");
    };
    const handlecloseTakeRes = () => {
        setResponsiblity("")
    }
    const handleFullfilled = (index) => {
        setSelectedIndex(index); // So we know which item to update
        setFulfillBox("active");
    };
    const handlecloseFullfilled = () => {
        setFulfillBox("")
    }

    const [requirementList, setRequirementList] = useState([
        {
            title: "Cement",
            quantity: "100 Packets",
            pricePerUnit: "300/Packet",
            total: 38000,
            status: "available",
            description: "High quality cement for solid foundation."
        },
        {
            title: "Bricks",
            quantity: "5000 Pcs",
            pricePerUnit: "2/Pcs",
            total: 10000,
            status: "collected",
            description: "Standard size red bricks for walls."
        },
        {
            title: "Sand",
            quantity: "10 Trucks",
            pricePerUnit: "2000/truck",
            total: 20000,
            status: "fulfilled",
            description: "Clean river sand for construction use."
        },
        {
            title: "Steel Rods",
            quantity: "50 ton",
            pricePerUnit: "800/ton",
            total: 40000,
            status: "taken",
            description: "8mm TMT rods for reinforced roofing."
        },
    ]);

    const handleConfirmPledge = () => {
        if (selectedIndex !== null) {
            const updatedList = [...requirementList];
            updatedList[selectedIndex].status = "taken";
            setRequirementList(updatedList);
            setResponsiblity("");
            setSelectedIndex(null);
        }
    };

    const handleConfirmFulfilled = () => {
        if (selectedIndex !== null) {
            const updatedList = [...requirementList];
            updatedList[selectedIndex].status = "fulfilled";
            setRequirementList(updatedList);
            setFulfillBox("");
            setSelectedIndex(null);
        }
    };

    const handleCancelFulfilled = () => {
        if (selectedIndex !== null) {
            const updatedList = [...requirementList];
            updatedList[selectedIndex].status = "available";
            setRequirementList(updatedList);
            setFulfillBox("");
            setSelectedIndex(null);
        }
    };

    const openConfirmation = (actionFn) => {
        setConfirmAction(() => actionFn); // Store the function to execute
        setShowConfirmBox(true);
    };

    const handleConfirmYes = () => {
        if (confirmAction) confirmAction();
        setShowConfirmBox(false);
    };

    const handleConfirmNo = () => {
        setShowConfirmBox(false);
    };

    return (
        <div className="Home">
            <div className="Home-main">
                <div className="donatereq">
                    <div className="donatereq-title">
                        <h5><button className="back-button" onClick={handleGoBack}>
                            <IoIosArrowBack />
                        </button>
                            Donation Requested
                        </h5>
                        <p>These donations will be used to build what has been requested.</p>
                    </div>
                    <div className="SearchCard institute-info">
                        <div className="SearchCard-left">
                            <img src={item.avatar} alt={""} />
                        </div>
                        <div className="SearchCard-right">
                            <h6>{item.username}</h6>
                            <p>{item.location}</p>
                        </div>
                    </div>
                    <div className="donationreq-box2">
                        <h5>{item.title}</h5>
                        <p>{item.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, praesentium minima. Aliquam, possimus. Esse nostrum eligendi dolor unde! Ipsum, cumque? fvoinrlnslkrnvlnrlksnrlkvsnrlkvsnrlksr Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sapiente dolor quam id voluptas eum maiores autem ex aliquid deserunt.</p>
                    </div>
                    <h5 className="list-title">List Of Requirements</h5>
                    <div className="donationreq-box3">
                        <div className="donationreq-items">
                            {requirementList.map((item, index) => (
                                <div className="donationreq-card" key={index}>
                                    <div className="req-card-top">
                                        <div className="reqtop-left">
                                            <h6>{item.title} <span>({item.quantity})</span></h6>
                                            <p>₹ {item.pricePerUnit} | ₹{item.total.toLocaleString()}</p>
                                        </div>
                                        <div className={`reqtop-right ${item.status}`}>
                                            {item.status === "available" && (
                                                <p onClick={() => handleTakeRes(index)}>Take Responsibility</p>
                                            )}
                                            {item.status === "collected" && <p>Collected</p>}
                                            {item.status === "fulfilled" && <p>Fulfilled</p>}
                                            {item.status === "taken" && <p onClick={() => handleFullfilled(index)}>Responsibility Taken</p>}
                                        </div>
                                    </div>
                                    <div className="req-card-bottom">
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="donationreq-box4">
                        <div className="donate-progress-box">
                            <div className="fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <div className="donate-box4-box">
                            <div className="btn4-reqbtn">
                                <Link to={"/payment"}>Do Sadaqah</Link>
                            </div>
                            <div className="donate-payable">
                                <span>Amount Received / Required</span>
                                <p>₹{item.amountReceived} / ₹{item.donation}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`responsiblity-box ${responsiblity}`}>
                        <div className="responsiblity-box-item">
                            <div className="responsiblity-top">
                                <p>I pledge to fulfill this requirement</p>
                                <IoIosClose onClick={handlecloseTakeRes} />
                            </div>
                            {selectedIndex !== null && (
                                <div className="donationreq-card">
                                    <div className="req-card-top">
                                        <div className="reqtop-left">
                                            <h6>{requirementList[selectedIndex].title} <span>({requirementList[selectedIndex].quantity})</span></h6>
                                            <p>₹ {requirementList[selectedIndex].pricePerUnit} | ₹{requirementList[selectedIndex].total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="req-card-bottom">
                                        <p>{requirementList[selectedIndex].description}</p>
                                    </div>
                                </div>
                            )}
                            <div className="responsiblity-note">
                                <p><span>Note: </span>This pledge will mark canceled if you won’t able to send this product within 7 days from today.</p>
                                <p>icon</p>
                            </div>
                            <div className="responsiblity-btns">
                                <p onClick={handlecloseTakeRes}>Cancel</p>
                                <p className="confirm" onClick={() => openConfirmation(handleConfirmPledge)}>Confirm</p>
                            </div>
                        </div>
                        <div className="responsiblity-filter"></div>
                    </div>
                    <div className={`responsiblity-box ${fulfillBox}`}>
                        <div className="responsiblity-box-item">
                            <div className="responsiblity-top">
                                <p>I pledge to fulfill this requirement</p>
                                <IoIosClose onClick={handlecloseFullfilled} />
                            </div>
                            {selectedIndex !== null && (
                                <div className="donationreq-card">
                                    <div className="req-card-top">
                                        <div className="reqtop-left">
                                            <h6>{requirementList[selectedIndex].title} <span>({requirementList[selectedIndex].quantity})</span></h6>
                                            <p>₹ {requirementList[selectedIndex].pricePerUnit} | ₹{requirementList[selectedIndex].total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="req-card-bottom">
                                        <p>{requirementList[selectedIndex].description}</p>
                                    </div>
                                </div>
                            )}
                            <div className="responsiblity-note">
                                <p><span>Note: </span>This pledge will mark canceled if you won’t able to send this product within 7 days from today.</p>
                                <p>icon</p>
                            </div>
                            <div className="responsiblity-btns">
                                <p onClick={() => openConfirmation(handleCancelFulfilled)}>Cancel</p>
                                <p className="confirm" onClick={() => openConfirmation(handleConfirmFulfilled)}>Product Sent</p>
                            </div>
                        </div>
                        <div className="responsiblity-filter"></div>
                    </div>
                    {showConfirmBox && (
                        <div className="confirmation-modal">
                            <div className="confirmation-box">
                                <p>Are you sure you want to proceed?</p>
                                <div className="confirmation-buttons">
                                    <button onClick={handleConfirmNo}>No</button>
                                    <button onClick={handleConfirmYes}>Yes</button>
                                </div>
                            </div>
                            <div className="confirmation-backdrop" onClick={handleConfirmNo}></div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DonateReq;
