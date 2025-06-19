import React, { useState } from "react";
import "./Calculator.css";

const ZakatCalculator = () => {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [cash, setCash] = useState(0);
  const [savings, setSavings] = useState(0);
  const [liabilities, setLiabilities] = useState(0);

  const nisab = 612.36 * 75; // Silver value in INR (adjustable)

  const totalAssets = +gold + +silver + +cash + +savings;
  const netWealth = totalAssets - +liabilities;
  const zakatDue = netWealth >= nisab ? netWealth * 0.025 : 0;

  return (
    <div className="Home">
      <div className="Home-main">
            <h5 className="zakat-title">Zakat Calculator</h5>
        <div className="zakat-box">
          <div className="zakat-box-left">
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
                <strong>Zakat Due (2.5%):</strong> ₹{zakatDue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
