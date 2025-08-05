import React, { useEffect, useRef, useState } from "react";
import ads from "../../Assets/Ads/ads.jpg";
import { useNavigate } from "react-router-dom";
import zakatprof from "../../Assets/Posts/post4.jpg"
import { ChevronLeft } from "lucide-react";

const ZakatPayment = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [includeFee, setIncludeFee] = useState(true); // 👈 new

    function calculatePlatformFee(amount) {
        let fee = 0;
        let percentage = 0;

        if (amount >= 0 && amount <= 500) {
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
        console.log(fee);

        return {
            fee: fee,
            percentage: parseFloat(percentage),
        };
    }

    const amountValue = parseFloat(amount || 0);
    const { fee, percentage } = calculatePlatformFee(amountValue);
    const total = includeFee ? amountValue + fee : amountValue;
    const payable = amountValue + fee;
    const finalText = `Pay ₹ ${total}`;

    const handleGoBack = () => {
        window.history.back(); // Simple browser back
    };

    const zakatuser = {
        avatar: zakatprof,
        username: "Zakat",
        location: "Delhi"
    }


    const handlePay = () => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        if (!authUser) return;

        const today = new Date().toISOString().split("T")[0];
        const id = Date.now();

        // Create donation for user history
        const userZakat = {
            id,
            name: "Zakat",
            amount: total,
            date: today,
            type: "Zakat",
            transactionsType: "Donated",
        };

        const userKey = `userZakat-${authUser.id}`;
        const existingUserZakat = JSON.parse(localStorage.getItem(userKey)) || [];
        localStorage.setItem(userKey, JSON.stringify([...existingUserZakat, userZakat]));

        // Create donation for global "received" list
        const receivedZakat = {
            id,
            name: authUser.username,
            amount: total,
            date: today,
            type: "Zakat",
            transactionsType: "Received",
        };

        const existingReceived = JSON.parse(localStorage.getItem("zakatReceived")) || [];
        localStorage.setItem("zakatReceived", JSON.stringify([...existingReceived, receivedZakat]));

        // Redirect to status
        const isSuccess = Math.random() < 0.8;

        navigate("/status", {
            state: {
                institute: zakatuser,
                total,
                paymentMode: "Phone Pe",
                paymentDate: today,
                transactionId: "#TXN" + Math.floor(Math.random() * 1000000),
                success: isSuccess,
            },
        });
    };

    return (
        <div className="sadaqah-container">
            <div className="section">
                <button className="back-button" onClick={handleGoBack}>
                    <ChevronLeft />
                </button>
            </div>
            <div className="section">
                <label>Enter Amount</label>
                <input
                    type="number"
                    placeholder="₹ 0.00"
                    value={amount}
                    min="10"
                    onChange={(e) => setAmount(e.target.value)}
                />
                <small>Minimum amount ₹10</small>
            </div>

            <div className="summary-card">
                <div className="summary-detail">
                    <p>Amount</p>
                    <p>₹ {amountValue}</p>
                </div>
                <div className="summary-detail">
                    <div className="checkbox-section">
                        <label className="checkbox-btn">
                            <label htmlFor="checkbox"></label>
                            <input
                                type="checkbox"
                                checked={includeFee}
                                onChange={() => setIncludeFee(!includeFee)}
                            />
                            Platform Fee ({percentage}%)
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <p>₹ {fee.toFixed(2)}</p>
                </div>
                <hr />
                <div className="summary-detail adsnote">
                    <p>
                        <span>Note:</span>By Clicking the check box you are allowing us to
                        take plateform fee from the main amount
                    </p>
                    <img src={ads} alt="" />
                </div>
            </div>
            <button className="pay-button" onClick={handlePay}>
                {finalText}
            </button>
        </div>
    );
};

export default ZakatPayment;
