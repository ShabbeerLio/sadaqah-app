import React, { useState } from "react";
import "./Calculator.css";
import { Link } from "react-router-dom";

const ZakatCalculator = () => {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [cash, setCash] = useState(0);
  const [savings, setSavings] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [mode, setMode] = useState("yearly");

  const nisab = 612.36 * 75;

  // For monthly, use only cash and savings
  const totalAssets =
    mode === "monthly"
      ? +cash + +savings
      : +gold + +silver + +cash + +savings;

  const netWealth = totalAssets - +liabilities;
  const zakatRate = mode === "yearly" ? 0.025 : 0.025 / 12;
  const zakatDue = netWealth >= nisab ? netWealth * zakatRate : 0;

  return (
    <div className="Home">
      <div className="Home-main">
        <h5 className="zakat-title">Zakat Calculator</h5>

        {/* Toggle */}
        <div className="zakat-btns">
          <p
            className={mode === "yearly" ? "active" : ""}
            onClick={() => setMode("yearly")}
          >
            Yearly
          </p>
          <p
            className={mode === "monthly" ? "active" : ""}
            onClick={() => setMode("monthly")}
          >
            Monthly
          </p>
        </div>

        <div className="zakat-box">
          <div className="zakat-box-left">
            {mode === "yearly" && (
              <>
                <div className="form-group">
                  <label>Gold (₹)</label>
                  <input
                    type="number"
                    value={gold}
                    onChange={(e) => setGold(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Silver (₹)</label>
                  <input
                    type="number"
                    value={silver}
                    onChange={(e) => setSilver(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Cash at hand (₹)</label>
              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Savings in bank (₹)</label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Debts/Liabilities (₹)</label>
              <input
                type="number"
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
              />
            </div>
          </div>

          <div className="zakat-box-right">
            <div className="result">
              <p>
                <strong>Total Zakatable Wealth:</strong> ₹{netWealth.toFixed(2)}
              </p>
              <p>
                <strong>Nisab (Silver):</strong> ₹{nisab.toFixed(2)}
              </p>
              <p>
                <strong>
                  Zakat Due ({mode === "yearly" ? "2.5%" : "0.21%"}):
                </strong>{" "}
                ₹{zakatDue.toFixed(2)}
              </p>
            </div>
            <div className="calculator-btn">
              <Link to={"/payment"}>Donate Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;