import React, { useState } from "react";
import "./Suggest.css";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import Ads from "../../Components/Ads/Ads";

const Suggest = () => {
  const [name, setName] = useState("");
  const [gName, setGName] = useState("");
  const [pincode, setPincode] = useState("");
  const [institute, setInstitute] = useState("");
  const [number, setNumber] = useState("");
  const [fulfillBox, setFulfillBox] = useState("");
  const handleFullfilled = () => {
    if (!name || !gName || !pincode || !institute || !number) {
      alert("Please fill all fields before submitting.");
      return;
    }
    setFulfillBox("active");
  };
  const handlecloseFullfilled = () => {
    setFulfillBox("exiting");
    setTimeout(() => {
      setFulfillBox("");
    }, 300);
  };

  return (
    <div className="Home">
      <div className="Home-main suggest">
        <h5 className="zakat-title">Suggest Us</h5>
        <div className="zakat-box">
          <div className="zakat-box-left">
            <div className="form-group">
              <label>Name</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Father/Husband Name</label>
              <input
                type="name"
                value={gName}
                onChange={(e) => setGName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Nearest Mashjid</label>
              <input
                type="name"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
              />
            </div>
          </div>
          <div className="zakat-box-right">
            <div className="calculator-btn">
              <Link onClick={handleFullfilled}>Suggest Us</Link>
            </div>
          </div>
        </div>
          <Ads/>
        <div className={`responsiblity-box ${fulfillBox}`}>
          <div className="responsiblity-box-item">
            <div className="responsiblity-top">
              <p>Suggested</p>
              <IoIosClose onClick={handlecloseFullfilled} />
            </div>
            <div className="donationreq-card">
              <div className="req-card-top">
                <div className="reqtop-left">
                  <h6>{name}</h6>
                  <p>{gName}</p>
                  <p>{number}</p>
                  <p>{institute}</p>
                  <p>{pincode}</p>
                </div>
              </div>
            </div>
            <div className="responsiblity-note">
              <p>
                Thank You for suggesting, our team will reach you soon and
                varify it.
              </p>
            </div>
            <div className="responsiblity-btns">
              <p className="confirm" onClick={handlecloseFullfilled}>
                Close
              </p>
            </div>
          </div>
          <div className="responsiblity-filter"></div>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
