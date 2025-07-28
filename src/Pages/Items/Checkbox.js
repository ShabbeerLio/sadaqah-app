import React from "react";

const Checkbox = ({
  name,
  checked,
  onChange,
  handleChange,
  setWithdrawAmount,
  currentBalance,
  text,
}) => {
  // Determine which handler to use
  const handleCheckboxChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
      if (e.target.checked) {
        setWithdrawAmount(currentBalance);
      } else {
        setWithdrawAmount("");
      }
    } else {
      handleChange(e);
    }
  };
  return (
    <div className="wallet-withdraw-checkbox">
      <label className="neon-checkbox">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div className="neon-checkbox__frame">
          <div className="neon-checkbox__box">
            <div className="neon-checkbox__check-container">
              <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                <path d="M3,12.5l7,7L21,5"></path>
              </svg>
            </div>
            <div className="neon-checkbox__glow"></div>
            <div className="neon-checkbox__borders">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="neon-checkbox__effects">
            <div className="neon-checkbox__particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span> <span></span>
              <span></span>
              <span></span>
              <span></span> <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="neon-checkbox__rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <div className="neon-checkbox__sparks">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </label>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Checkbox;
